import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        error: 'Invalid email format' 
      }, { status: 400 });
    }

    // Simulate support request processing
    console.log('Support request received:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      action: 'support_request'
    });

    // In a production environment, you would:
    // 1. Save the support request to your database
    // 2. Send an email to admin using a service like SendGrid, Mailgun, or AWS SES
    // 3. Send a confirmation email to the customer
    // 4. Create a support ticket in your system

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

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