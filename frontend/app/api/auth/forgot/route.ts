import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const users: any = (globalThis as any)._users || ((globalThis as any)._users = {});
const resets: any = (globalThis as any)._resets || ((globalThis as any)._resets = {});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || !users[email]) {
    return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
  }
  const code = generateCode();
  resets[email] = { code, expires: Date.now() + 10 * 60 * 1000 };
  await transporter.sendMail({
    from: process.env.OTP_EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${code}`,
  });
  return NextResponse.json({ success: true });
} 