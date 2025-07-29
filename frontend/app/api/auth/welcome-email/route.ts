import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter with proper error handling
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.warn('Email credentials not configured. Welcome emails will be skipped.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user || !user.email || !user.name) {
      return NextResponse.json(
        { success: false, message: 'Invalid user data' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    
    // If email is not configured, return success but skip sending
    if (!transporter) {
      console.log('Skipping welcome email - email not configured');
      return NextResponse.json({
        success: true,
        message: 'Welcome email skipped - email not configured'
      });
    }

    // Welcome email template
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to Nexora! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Nexora</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background-color: white;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .welcome-text {
              font-size: 24px;
              font-weight: 600;
              color: #1f2937;
              margin-bottom: 20px;
            }
            .content {
              margin-bottom: 30px;
            }
            .feature-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin: 30px 0;
            }
            .feature {
              background-color: #f8fafc;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
            }
            .feature-icon {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .feature-title {
              font-weight: 600;
              margin-bottom: 5px;
            }
            .feature-desc {
              font-size: 14px;
              color: #6b7280;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 14px;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              display: inline-block;
              margin: 0 10px;
              color: #667eea;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">NEXORA</div>
              <div class="welcome-text">Welcome, ${user.name}! 🎉</div>
            </div>
            
            <div class="content">
              <p>Thank you for joining Nexora! We're excited to have you as part of our community.</p>
              
              <p>At Nexora, we're committed to providing you with:</p>
              
              <div class="feature-grid">
                <div class="feature">
                  <div class="feature-icon">🛒</div>
                  <div class="feature-title">Premium Products</div>
                  <div class="feature-desc">Wide range of electronics and gadgets</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🚚</div>
                  <div class="feature-title">Fast Delivery</div>
                  <div class="feature-desc">Same day dispatch available</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">🔒</div>
                  <div class="feature-title">Secure Shopping</div>
                  <div class="feature-desc">SSL encrypted transactions</div>
                </div>
                <div class="feature">
                  <div class="feature-icon">💬</div>
                  <div class="feature-title">24/7 Support</div>
                  <div class="feature-desc">Round-the-clock assistance</div>
                </div>
              </div>
              
              <div style="text-align: center;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}" class="cta-button">
                  Start Shopping Now
                </a>
              </div>
              
              <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
            </div>
            
            <div class="social-links">
              <p>Follow us on social media:</p>
              <a href="#">Facebook</a> |
              <a href="#">Twitter</a> |
              <a href="#">Instagram</a> |
              <a href="#">LinkedIn</a>
            </div>
            
            <div class="footer">
              <p>© 2024 Nexora. All rights reserved.</p>
              <p>This email was sent to ${user.email}</p>
              <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
} 