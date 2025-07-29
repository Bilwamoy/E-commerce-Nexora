import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json({ error: 'Admin email not configured' }, { status: 500 });
    }
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: `[Support Request] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const successResponse = {
      message: 'Support request submitted successfully!',
      ticketId: `SUP-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      note: 'We will get back to you within 24 hours.'
    };
    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Support request error:', error);
    return NextResponse.json({
      error: 'Failed to submit support request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 