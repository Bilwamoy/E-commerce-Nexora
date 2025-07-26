import { NextRequest, NextResponse } from 'next/server';

// Simulated OTP storage (in real app, use Redis or database)
const otpStore = new Map<string, { otp: string; timestamp: number }>();

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with timestamp (expires in 5 minutes)
    otpStore.set(phone, {
      otp,
      timestamp: Date.now()
    });

    // In a real app, you would integrate with SMS service like Twilio, AWS SNS, etc.
    // For now, we'll simulate the SMS sending
    console.log(`SMS sent to ${phone}: Your Nexora OTP is ${otp}. Valid for 5 minutes.`);

    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      phone: phone,
      note: 'Check your phone for the OTP'
    });

  } catch (error) {
    console.error('OTP sending error:', error);
    return NextResponse.json({
      error: 'Failed to send OTP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { phone, otp } = await request.json();
    
    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    const storedData = otpStore.get(phone);
    
    if (!storedData) {
      return NextResponse.json({ error: 'OTP not found or expired' }, { status: 400 });
    }

    // Check if OTP is expired (5 minutes)
    const now = Date.now();
    const otpAge = now - storedData.timestamp;
    const fiveMinutes = 5 * 60 * 1000;

    if (otpAge > fiveMinutes) {
      otpStore.delete(phone);
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Remove OTP after successful verification
    otpStore.delete(phone);

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully'
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json({
      error: 'Failed to verify OTP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
} 