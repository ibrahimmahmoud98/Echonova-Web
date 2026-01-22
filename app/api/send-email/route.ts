import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Log presence only, never the value
    console.log('Sending email with Resend. API Key present:', !!apiKey);

    if (!apiKey) {
      console.error('CRITICAL: RESEND_API_KEY is missing in environment variables.');
      return NextResponse.json(
        { error: 'Configuration Error', details: 'Missing Resend API Key' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { name, email, phone, services, message, countryKey } = await request.json();

    const data = await resend.emails.send({
      from: 'Echonova Website <website@echonovastudio.com>',
      to: ['contact@echonovastudio.com'],
      subject: `New Project Inquiry: ${name}`,
      replyTo: email,
      html: `
        <h1>New Project Inquiry</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryKey} ${phone}</p>
        <p><strong>Services:</strong> ${services.join(', ')}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (data.error) {
      console.error('Resend API returned error:', data.error);
      return NextResponse.json(
        { error: 'Email Service Error', details: data.error.message, fullError: data.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Unexpected API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        details: error.message,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
      }, 
      { status: 500 }
    );
  }
}
