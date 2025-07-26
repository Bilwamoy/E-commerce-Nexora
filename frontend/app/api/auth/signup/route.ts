import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { MongoClient, Db, Collection } from 'mongodb';
import bcrypt from 'bcryptjs';

let cachedDb: Db | null = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client.db();
  return cachedDb;
}

interface User {
  name: string;
  email: string;
  password: string;
  verified: boolean;
}

async function getUserCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  return db.collection<User>('users');
}

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
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'All fields required.' }, { status: 400 });
    }
    const users = await getUserCollection();
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: 'User already exists.' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateCode();
    await users.insertOne({ name, email, password: hashedPassword, verified: false });
    await transporter.sendMail({
      from: process.env.OTP_EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      text: `Your verification code is: ${code}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Signup API error:', err);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
} 