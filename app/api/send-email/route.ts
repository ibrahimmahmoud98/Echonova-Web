import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing Resend API Key' },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, phone, services, message, countryKey } = await request.json();

    const data = await resend.emails.send({
      from: 'Echonova Website <onboarding@resend.dev>',
      to: ['contact@echonovastudio.com'],
      subject: `New Contact Form Submission from ${name}`,
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

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
