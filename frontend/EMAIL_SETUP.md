# Email Setup for NEXORA Feedback System

## 🚨 IMMEDIATE SETUP REQUIRED

To enable email functionality, you need to create a `.env.local` file in the `frontend` directory.

### Step 1: Create Environment File
Create a file named `.env.local` in the `frontend` directory with this content:

```env
# Email Configuration for NEXORA Feedback System
ADMIN_EMAIL=your-actual-gmail@gmail.com
ADMIN_EMAIL_PASSWORD=your-gmail-app-password
NEXT_PUBLIC_SITE_URL=http://localhost:3004
```

### Step 2: Gmail App Password Setup
1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Factor Authentication** (if not already enabled)
3. **Go to Security** → **2-Step Verification** → **App passwords**
4. **Generate a new app password** for "Mail"
5. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
6. **Paste it as `ADMIN_EMAIL_PASSWORD`** in your `.env.local` file

### Step 3: Restart Development Server
After creating the `.env.local` file:
```bash
# Stop the current server (Ctrl+C)
# Then restart it
cd frontend
npm run dev
```

## 🔍 Troubleshooting

### If emails still don't work:

1. **Check the terminal logs** - you should see:
   - `✅ Email sent successfully to admin` (if working)
   - `⚠️ Email sending failed` (if there's an error)
   - `ℹ️ Email credentials not configured` (if .env.local is missing)

2. **Verify your .env.local file**:
   - File should be in `frontend/.env.local`
   - No spaces around the `=` sign
   - No quotes around values
   - Correct Gmail address and app password

3. **Common issues**:
   - Using regular Gmail password instead of app password
   - Not enabling 2-factor authentication
   - Wrong Gmail address
   - File not saved properly

## 📧 What You'll Receive

### Admin Email (to your Gmail):
- Customer's rating with stars
- Customer's name and email
- Detailed feedback and suggestions
- Timestamp of submission

### Customer Email (to the email they provided):
- Thank you message with their rating
- Confirmation that feedback was received
- Link back to your website

## 🎯 Testing

1. Create the `.env.local` file with your credentials
2. Restart the development server
3. Visit `/thank-you` page
4. Fill out the form and submit
5. Check your Gmail inbox
6. Check the customer's email (if you used a real email)

## 🔒 Security Notes

- ✅ Use app passwords, never your main Gmail password
- ✅ Keep `.env.local` secure and never commit it to git
- ✅ The file is already in `.gitignore` for security

## 📞 Need Help?

If you're still having issues:
1. Check the terminal for specific error messages
2. Verify your Gmail app password is correct
3. Make sure 2-factor authentication is enabled
4. Try with a different Gmail account if needed

The feedback system will work perfectly once the email credentials are properly configured! 🎉