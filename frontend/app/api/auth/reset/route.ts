import { NextRequest, NextResponse } from 'next/server';

const users: any = (globalThis as any)._users || ((globalThis as any)._users = {});
const resets: any = (globalThis as any)._resets || ((globalThis as any)._resets = {});

export async function POST(req: NextRequest) {
  const { email, code, password } = await req.json();
  if (!email || !code || !password) {
    return NextResponse.json({ success: false, message: 'All fields required.' }, { status: 400 });
  }
  const r = resets[email];
  if (!r || r.code !== code || r.expires < Date.now()) {
    return NextResponse.json({ success: false, message: 'Invalid or expired code.' }, { status: 400 });
  }
  if (users[email]) {
    users[email].password = password;
    delete resets[email];
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
} 