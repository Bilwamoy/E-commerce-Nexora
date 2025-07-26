import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL;

  if (!BREVO_API_KEY || !SUPPORT_EMAIL) {
    return NextResponse.json({ error: 'Brevo not configured' }, { status: 500 });
  }

  const brevoUrl = 'https://api.brevo.com/v3/smtp/email';

  const payload = {
    sender: { name: name || 'Support Bot', email: email || 'no-reply@nexora.com' },
    to: [{ email: SUPPORT_EMAIL }],
    subject: 'New Support Escalation',
    textContent: `Name: ${name || 'N/A'}\nEmail: ${email || 'N/A'}\nMessage: ${message}`,
  };

  try {
    const res = await fetch(brevoUrl, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 