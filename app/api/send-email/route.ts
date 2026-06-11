import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import crypto from 'crypto';

import { escapeHtml } from '@/lib/escape-html';

// ============================================
// RATE LIMITING (In-Memory Store)
// ============================================
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // Max 5 requests
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

function isRateLimited(ip: string): { limited: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, remaining: RATE_LIMIT_MAX - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { limited: true, remaining: 0 };
  }
  
  record.count++;
  return { limited: false, remaining: RATE_LIMIT_MAX - record.count };
}

// ============================================
// CRYPTOGRAPHIC RATE LIMITING (Serverless State via Signed Cookies)
// ============================================
const COOKIE_SECRET = process.env.RESEND_API_KEY || 'echonova-studio-fallback-secret-key-1823908';

function signPayload(payload: string): string {
  return crypto.createHmac('sha256', COOKIE_SECRET).update(payload).digest('hex');
}

function verifyAndRotateCookie(request: Request, clientIP: string): { limited: boolean; count: number; resetTime: number } {
  const now = Date.now();
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(/ens_rl_token=([^;]+)/);
    if (match) {
      const token = decodeURIComponent(match[1]);
      const [payload, signature] = token.split('.');
      if (payload && signature) {
        const expectedSignature = signPayload(payload);
        if (signature === expectedSignature) {
          const [cookieIP, timestampStr, countStr] = payload.split(':');
          const timestamp = parseInt(timestampStr, 10);
          const count = parseInt(countStr, 10);

          if (cookieIP === clientIP && now < timestamp) {
            if (count >= RATE_LIMIT_MAX) {
              return { limited: true, count, resetTime: timestamp };
            }
            return { limited: false, count: count + 1, resetTime: timestamp };
          }
        }
      }
    }
  } catch (e) {
    // Ignore error and fallback
  }
  return { limited: false, count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS };
}

// ============================================
// CSRF VALIDATION
// ============================================
function validateCSRFToken(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Allow requests from our own domain
  const allowedOrigins = [
    'https://echonovastudio.com',
    'https://www.echonovastudio.com'
  ];
  
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:3000');
  }
  
  const verifyHost = (urlStr: string): boolean => {
    try {
      const url = new URL(urlStr);
      return allowedOrigins.includes(url.origin);
    } catch {
      return false;
    }
  };

  if (origin) {
    return verifyHost(origin);
  }
  
  if (referer) {
    return verifyHost(referer);
  }
  
  return false;
}

export async function POST(request: Request) {
  // 0. CSRF Check
  if (!validateCSRFToken(request)) {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Invalid request origin' },
      { status: 403 }
    );
  }

  // 1. Rate Limiting Check
  const clientIP = getClientIP(request);

  // 1.1 Check cryptographically signed cookie (Serverless State)
  const cookieCheck = verifyAndRotateCookie(request, clientIP);

  // 1.2 Check in-memory store (Fallback for programmatic/non-cookie clients)
  const inMemoryCheck = isRateLimited(clientIP);

  const limited = cookieCheck.limited || inMemoryCheck.limited;
  
  if (limited) {
    return NextResponse.json(
      { error: 'Too Many Requests', message: 'Please try again later.' },
      { 
        status: 429,
        headers: {
          'Retry-After': '3600',
          'X-RateLimit-Remaining': '0'
        }
      }
    );
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;

    // 1. Configuration Check
    if (!apiKey) {
      console.error('CRITICAL: RESEND_API_KEY is missing in environment variables.');
      return NextResponse.json(
        { error: 'Service Unavailable', message: 'Service temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    // 2. Safe Body Parsing
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return NextResponse.json(
        { error: 'Bad Request', message: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { name, email, phone, services, message, countryKey } = body;

    // 3. Validation
    if (!name || !email) {
       return NextResponse.json(
        { error: 'Validation Error', message: 'Name and Email are required' },
        { status: 400 }
      );
    }

    // 3.1 Email format validation (also prevents header injection via replyTo)
    const emailRegex = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 3.2 Escape ALL user-controlled values to raw text to prevent any HTML injection
    // Using escapeHtml prevents tracking pixels (<img>) or phishing links (<a>)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'N/A');
    const safeCountryKey = escapeHtml(countryKey || '');
    const safeServices = escapeHtml(
      Array.isArray(services) ? services.join(', ') : (services || 'None')
    );
    const safeMessage = escapeHtml(message || 'No additional message.');

    console.log(`Attempting to send email from: website@echonovastudio.com to: contact@echonovastudio.com for ${safeName}`);

    // 4. Send Email — all interpolations are pre-escaped above.
    const data = await resend.emails.send({
      from: 'Echonova Website <website@echonovastudio.com>',
      to: ['contact@echonovastudio.com'],
      subject: `New Project Inquiry: ${safeName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #333;">New Project Inquiry</h1>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safeCountryKey} ${safePhone}</p>
          <p><strong>Services:</strong> ${safeServices}</p>

          <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    // 5. API Response Handling
    if (data.error) {
      console.error('Resend API returned error:', data.error);
      return NextResponse.json(
        { error: 'Email Service Error', message: data.error.message, code: data.error.name },
        { status: 502 } 
      );
    }

    const response = NextResponse.json({ success: true, id: data.data?.id });

    // Set signed cookie to persist rate limit state in browser across serverless boots
    const newCount = cookieCheck.count;
    const resetTime = cookieCheck.resetTime;
    const payload = `${clientIP}:${resetTime}:${newCount}`;
    const signature = signPayload(payload);
    const token = `${payload}.${signature}`;
    
    response.cookies.set('ens_rl_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/send-email',
      maxAge: Math.max(0, Math.ceil((resetTime - Date.now()) / 1000)),
    });

    return response;

  } catch (error: any) {
    // 6. Global Catch - Prevent Header/Crash Issues
    console.error('Unexpected API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: error.message || 'An unexpected error occurred',
        // Only include stack in development if needed, but safe to omit for security
      }, 
      { status: 500 }
    );
  }
}
