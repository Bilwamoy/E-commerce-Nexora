# OAuth2 Setup for NEXORA Feedback System (Workspace Accounts)

## 🚨 **Perfect for Workspace Accounts!**

This OAuth2 setup is specifically designed for Google Workspace accounts that don't support app passwords. It's more secure and follows Google's recommended practices.

## 📋 **What You Need to Add to .env.local**

Add these lines to your existing `.env.local` file:

```env
# OAuth2 Gmail Configuration
GMAIL_REFRESH_TOKEN=your_refresh_token_here
GMAIL_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3004
```

## 🔧 **Step-by-Step OAuth2 Setup**

### **Step 1: Enable Gmail API**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Gmail API**
4. Go to **APIs & Services** → **Library** → Search "Gmail API" → Enable

### **Step 2: Configure OAuth Consent Screen**
1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have a workspace domain)
3. Fill in required information:
   - App name: "NEXORA Feedback System"
   - User support email: your email
   - Developer contact email: your email
4. Add scopes: `https://www.googleapis.com/auth/gmail.send`
5. Add test users: your email address

### **Step 3: Create OAuth Credentials**
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client IDs**
3. Choose **Web application**
4. Add authorized redirect URIs:
   - `http://localhost:3004/api/auth/google/callback`
   - `http://localhost:3004/api/auth/callback`
5. Copy the **Client ID** and **Client Secret**

### **Step 4: Get OAuth Tokens**
You have two options:

#### **Option A: Use Google OAuth Playground (Easiest)**
1. Go to [Google OAuth Playground](https://developers.google.com/oauthplayground/)
2. Click the settings icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your Client ID and Client Secret
5. Close settings
6. Scroll down and select "Gmail API v1"
7. Select "https://www.googleapis.com/auth/gmail.send"
8. Click "Authorize APIs"
9. Sign in with your workspace account
10. Click "Exchange authorization code for tokens"
11. Copy the **Refresh token** and **Access token**

#### **Option B: Use a Simple OAuth Flow**
1. Visit: `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3004/api/auth/callback&scope=https://www.googleapis.com/auth/gmail.send&response_type=code`
2. Replace `YOUR_CLIENT_ID` with your actual client ID
3. Authorize the application
4. Copy the authorization code from the URL
5. Exchange it for tokens using a tool like Postman or curl

### **Step 5: Update Your .env.local**

Your complete `.env.local` should look like this:

```env
# Existing credentials
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=06ef216ca1bcc34f67595366f66a365c57364690cb9167ffe1549dbf20505a05
MONGODB_URI="mongodb+srv://chakrabortybilwamoy:4Fs5SqPSPDPm99aL@clusterbilwa.oxbmyag.mongodb.net/?retryWrites=true&w=majority&appName=Clusterbilwa"
OTP_EMAIL_USER=chakrabortybilwamoy@gmail.com
OTP_EMAIL_PASS=xcai brbw cbmp klyg
GOOGLE_ID=305906035978-ff5q2r9f9s47ekacirre49kt1ciqaau3.apps.googleusercontent.com
GOOGLE_SECRET=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
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCyplD-ung-PtZSTJDgBAx-mRXfPaurpZY
ADMIN_EMAIL=chakrabortybilwamoy@gmail.com

# NEW OAuth2 Gmail Configuration
GMAIL_REFRESH_TOKEN=your_refresh_token_here
GMAIL_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3004
```

## 🔄 **Token Refresh**

- **Access tokens** expire after 1 hour
- **Refresh tokens** are long-lived (unless revoked)
- The system will automatically refresh access tokens using the refresh token

## 🧪 **Testing**

1. **Restart your development server**
2. **Submit feedback** from `/thank-you` page
3. **Check terminal** for OAuth2 connection status
4. **Check your Gmail inbox** for the feedback email

## 🔒 **Security Benefits**

✅ **More secure** than app passwords  
✅ **Works with workspace accounts**  
✅ **Follows Google's best practices**  
✅ **Can be revoked individually**  
✅ **No password storage**  

## 🚨 **Troubleshooting**

### **If you get "Invalid Credentials" error:**
1. Check that your Client ID and Secret are correct
2. Verify the refresh token is valid
3. Make sure Gmail API is enabled
4. Check that your email is added as a test user

### **If you get "Access Denied" error:**
1. Make sure you're using a workspace account
2. Check that the OAuth consent screen is configured
3. Verify the redirect URIs are correct

### **If tokens expire:**
1. Get a new refresh token from OAuth Playground
2. Update your `.env.local` file
3. Restart the development server

## 🎉 **Success Indicators**

When working correctly, you'll see:
```
🔍 Configuration Check:
📧 Admin Email: ✅ Set
🔑 Google ID: ✅ Set
🔐 Google Secret: ✅ Set
🚀 Attempting to send emails via OAuth2...
🔐 Testing OAuth2 connection...
✅ OAuth2 connection verified successfully
✅ Email sent successfully to admin
✅ Confirmation email sent to customer
🎉 All emails sent successfully via OAuth2!
```

**This OAuth2 setup is perfect for workspace accounts and provides enterprise-level security!** 🔐