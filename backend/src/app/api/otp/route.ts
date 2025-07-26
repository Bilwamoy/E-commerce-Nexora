import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
// import twilio from 'twilio';
import fetch from 'node-fetch';
import { MongoClient, Db, Collection } from 'mongodb';

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client.db();
  return cachedDb;
}

export interface User {
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

export async function getUserCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  return db.collection<User>('users');
}

const ADMIN_EMAIL = 'chakrabortybilwamoy@gmail.com';
const ADMIN_PHONE = '+918583866014'; // Use E.164 format for SMS

// Store OTPs in-memory (for demo; use DB in production)
const otpStore: { [key: string]: { otp: string; expires: number } } = {};

// Configure nodemailer (use your real credentials in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
  const { method, email, phone, otp } = await req.json();
  if (method === 'request') {
    // Generate and store OTP
    const code = generateOTP();
    const expires = Date.now() + 5 * 60 * 1000; // 5 min
    otpStore[email || phone] = { otp: code, expires };
    // Send email
    if (email) {
      await transporter.sendMail({
        from: process.env.OTP_EMAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'Admin Login OTP',
        text: `Your OTP is: ${code}`,
      });
    }
    // Send SMS via Textbelt
    if (phone) {
      const smsRes = await fetch('https://textbelt.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: ADMIN_PHONE,
          message: `Your admin login OTP is: ${code}`,
          key: 'textbelt',
        }),
      });
      const smsData: any = await smsRes.json();
      if (!smsData.success) {
        return NextResponse.json({ success: false, message: 'Failed to send SMS OTP.' }, { status: 500 });
      }
    }
    return NextResponse.json({ success: true, message: 'OTP sent.' });
  } else if (method === 'verify') {
    const store = otpStore[email || phone];
    if (store && store.otp === otp && store.expires > Date.now()) {
      delete otpStore[email || phone];
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid or expired OTP.' }, { status: 401 });
    }
  }
  return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
} 