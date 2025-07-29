import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';

interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  experience: string;
  suggestions: string;
}

const CLIENT_ID = process.env.GOOGLE_ID!;
const CLIENT_SECRET = process.env.GOOGLE_SECRET!;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'; // or your own
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;

const oAuth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    const { name, email, rating, experience, suggestions } = body;

    // Validate required fields
    if (!name || !email || !rating || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create star rating display
    const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

    // Log feedback to console (for immediate testing)
    console.log('🎉 NEXORA FEEDBACK RECEIVED 🎉');
    console.log('=====================================');
    console.log(`📊 Rating: ${stars} (${rating}/5)`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`💭 Experience: ${experience}`);
    if (suggestions) {
      console.log(`💡 Suggestions: ${suggestions}`);
    }
    console.log(`⏰ Submitted: ${new Date().toLocaleString()}`);
    console.log('=====================================');

    // Send email using google-auth-library for OAuth2
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ADMIN_EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      // Email content
      const mailOptions = {
        from: ADMIN_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🎉 New NEXORA Website Feedback - ${rating} Star Rating`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00ffff; margin-bottom: 10px;">🌟 NEXORA Feedback Received</h1>
              <p style="color: #94a3b8; font-size: 18px;">A new customer has shared their experience!</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">📊 Rating</h2>
              <div style="font-size: 24px; margin-bottom: 10px;">${stars}</div>
              <p style="color: #94a3b8;">${rating} out of 5 stars</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">👤 Customer Details</h2>
              <p><strong style="color: #00ffff;">Name:</strong> ${name}</p>
              <p><strong style="color: #00ffff;">Email:</strong> ${email}</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">💭 Experience</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">${experience}</p>
            </div>
            ${suggestions ? `
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">💡 Suggestions</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">${suggestions}</p>
            </div>
            ` : ''}
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
              <p style="color: #94a3b8; font-size: 14px;">
                This feedback was submitted from the NEXORA website on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully to admin');

      // Send confirmation email to customer
      const customerMailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: '🎉 Thank You for Your NEXORA Feedback!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #0f172a, #1e293b); color: white; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00ffff; margin-bottom: 10px;">Thank You, ${name}! 🎉</h1>
              <p style="color: #94a3b8; font-size: 18px;">We've received your valuable feedback</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">Your Rating</h2>
              <div style="font-size: 24px; margin-bottom: 10px;">${stars}</div>
              <p style="color: #94a3b8;">Thank you for your ${rating}-star rating!</p>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #00ffff; margin-bottom: 15px;">What's Next?</h2>
              <p style="color: #e2e8f0; line-height: 1.6;">
                Our team will review your feedback and use it to improve our website and services. 
                We truly appreciate you taking the time to share your thoughts with us!
              </p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3004'}" 
                 style="display: inline-block; background: linear-gradient(135deg, #00ffff, #0066ff); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Visit NEXORA Again
              </a>
            </div>
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
              <p style="color: #94a3b8; font-size: 14px;">
                Best regards,<br>
                The NEXORA Team
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(customerMailOptions);
      console.log('✅ Confirmation email sent to customer');
      console.log('🎉 All emails sent successfully via OAuth2!');
    } catch (emailError) {
      console.log('⚠️ OAuth2 email sending failed:');
      if (emailError && typeof emailError === 'object') {
        const err = emailError as { message?: string; code?: string; response?: any };
        console.log('Error details:', err.message);
        console.log('Error code:', err.code);
        console.log('Error response:', err.response);
        if (err.code === 'EAUTH') {
          console.log('💡 OAuth2 Setup Required:');
          console.log('1. You need to get Gmail OAuth2 tokens');
          console.log('2. Add GMAIL_REFRESH_TOKEN to .env.local');
          console.log('3. See OAuth2_SETUP.md for detailed instructions');
        }
      } else {
        console.log('ℹ️ OAuth2 credentials not configured');
        console.log('📝 Please configure OAuth2 credentials for Gmail');
      }
    }

    return NextResponse.json(
      { message: 'Feedback submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}