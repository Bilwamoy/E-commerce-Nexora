# Environment Variables Template for NEXORA

Create a file called `.env.local` in your `frontend` directory with these variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=06ef216ca1bcc34f67595366f66a365c57364690cb9167ffe1549dbf20505a05

# Database
MONGODB_URI="mongodb+srv://chakrabortybilwamoy:4Fs5SqPSPDPm99aL@clusterbilwa.oxbmyag.mongodb.net/?retryWrites=true&w=majority&appName=Clusterbilwa"

# Google OAuth (for login only)
GOOGLE_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_SECRET=your_google_client_secret_here

# Email Configuration (Resend - much simpler!)
RESEND_API_KEY=re_your_resend_api_key_here
ADMIN_EMAIL=chakrabortybilwamoy@gmail.com

# Other APIs
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCyplD-ung-PtZSTJDgBAx-mRXfPaurpZY
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# OTP Email (if you're using it)
OTP_EMAIL_USER=chakrabortybilwamoy@gmail.com
OTP_EMAIL_PASS=xcai brbw cbmp klyg
```

## 🔑 **What You Need to Replace:**

1. **`your_google_client_id_here`** - Your Google OAuth Client ID (for login)
2. **`your_google_client_secret_here`** - Your Google OAuth Client Secret (for login)
3. **`re_your_resend_api_key_here`** - Your Resend API Key (for emails)

## 📝 **Setup Steps:**

1. **For Google Login**: Follow the Google Cloud Console setup for OAuth
2. **For Email**: Follow the Resend setup in `RESEND_SETUP.md`
3. **Restart your server** after updating `.env.local`

## 🎉 **Benefits:**

- ✅ **Simple email setup** with Resend
- ✅ **No complex OAuth tokens** for emails
- ✅ **Better deliverability**
- ✅ **Free tier available**