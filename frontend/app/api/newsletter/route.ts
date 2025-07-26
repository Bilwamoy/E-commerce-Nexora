import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Simulate email sending (in a real app, you would integrate with an email service)
    console.log('Newsletter subscription request:', {
      email,
      timestamp: new Date().toISOString(),
      action: 'newsletter_subscription'
    });

    // In a production environment, you would:
    // 1. Save the email to your database
    // 2. Send a welcome email using a service like SendGrid, Mailgun, or AWS SES
    // 3. Send a notification to admin
    
    // For now, we'll simulate success
    const successResponse = {
      message: 'Newsletter subscription successful!',
      email: email,
      subscribedAt: new Date().toISOString(),
      note: 'Welcome email will be sent shortly.'
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Failed to subscribe to newsletter',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 