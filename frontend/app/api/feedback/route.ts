import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  experience: string;
  suggestions: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Send email using Resend
    try {
      console.log('🚀 Starting email sending process...');
      console.log('📧 Admin Email:', process.env.ADMIN_EMAIL);
      console.log('🔑 Resend API Key exists:', !!process.env.RESEND_API_KEY);
      
      // Send email to admin
      const adminEmailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [process.env.ADMIN_EMAIL || 'chakrabortybilwamoy@gmail.com'],
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
      });

      console.log('✅ Email sent successfully to admin');
      console.log('📊 Admin email result:', adminEmailResult);

      // Send confirmation email to customer
      const customerEmailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
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
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}" 
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
      });

      console.log('✅ Confirmation email sent to customer');
      console.log('📧 Customer email result:', customerEmailResult);
      console.log('🎉 All emails sent successfully via Resend!');

    } catch (emailError) {
      console.log('⚠️ Resend email sending failed:');
      console.log('Error details:', emailError);
      console.log('💡 Make sure RESEND_API_KEY is set in your .env.local file');
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