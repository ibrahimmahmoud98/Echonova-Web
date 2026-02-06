import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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
// CSRF VALIDATION
// ============================================
function validateCSRFToken(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Allow requests from our own domain
  const allowedOrigins = [
    'https://echonovastudio.com',
    'https://www.echonovastudio.com',
    'http://localhost:3000'
  ];
  
  if (origin && allowedOrigins.some(o => origin.startsWith(o))) return true;
  if (referer && allowedOrigins.some(o => referer.startsWith(o))) return true;
  
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
  const { limited, remaining } = isRateLimited(clientIP);
  
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
        { error: 'Configuration Error', message: 'Server configuration incomplete. Please contact support.' },
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

    console.log(`Attempting to send email from: website@echonovastudio.com to: contact@echonovastudio.com for ${name}`);

    // 4. Send Email
    const data = await resend.emails.send({
      from: 'Echonova Website <website@echonovastudio.com>',
      to: ['contact@echonovastudio.com'],
      subject: `New Project Inquiry: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #333;">New Project Inquiry</h1>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${countryKey || ''} ${phone || 'N/A'}</p>
          <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services || 'None'}</p>
          
          <div style="margin-top: 20px; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin-top: 0; font-weight: bold;">Message:</p>
            <p style="white-space: pre-wrap;">${message || 'No additional message.'}</p>
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

    return NextResponse.json({ success: true, id: data.data?.id });

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
