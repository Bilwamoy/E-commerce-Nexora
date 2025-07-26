import { NextRequest, NextResponse } from 'next/server';

const users: any = (globalThis as any)._users || ((globalThis as any)._users = {});
const verifications: any = (globalThis as any)._verifications || ((globalThis as any)._verifications = {});

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();
  if (!email || !code) {
    return NextResponse.json({ success: false, message: 'Email and code required.' }, { status: 400 });
  }
  const v = verifications[email];
  if (!v || v.code !== code || v.expires < Date.now()) {
    return NextResponse.json({ success: false, message: 'Invalid or expired code.' }, { status: 400 });
  }
  if (users[email]) {
    users[email].verified = true;
    delete verifications[email];
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
} 