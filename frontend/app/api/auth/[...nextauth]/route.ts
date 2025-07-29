import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const adminEmail = 'admin@nexora.com';

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
if (!googleId || !googleSecret) {
  throw new Error('Missing GOOGLE_ID or GOOGLE_SECRET in .env.local');
}

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client.db();
  return cachedDb;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const client = await MongoClient.connect(process.env.MONGODB_URI!);
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email.toLowerCase() });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { 
            id: user._id.toString(), 
            name: user.name, 
            email: user.email, 
            image: user.image || null,
            isAdmin: user.email.toLowerCase() === adminEmail.toLowerCase()
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: googleId!,
      clientSecret: googleSecret!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile) {
        try {
          const db = await connectToDatabase();
          const users = db.collection('users');

          // Check if user already exists
          const existingUser = await users.findOne({ email: user.email?.toLowerCase() });

          if (existingUser) {
            // Update existing user's Google data
            await users.updateOne(
              { email: user.email?.toLowerCase() },
              {
                $set: {
                  name: user.name,
                  image: user.image,
                  googleId: profile.sub,
                  lastLogin: new Date(),
                  verified: true
                }
              }
            );
          } else {
            // Create new user with Google data
            const newUser = {
              name: user.name,
              email: user.email?.toLowerCase(),
              image: user.image,
              googleId: profile.sub,
              verified: true,
              createdAt: new Date(),
              lastLogin: new Date(),
              orderHistory: [],
              wishlist: [],
              cart: [],
              preferences: {
                language: 'en',
                theme: 'light',
                notifications: true
              }
            };

            await users.insertOne(newUser);
          }
        } catch (error) {
          console.error('Error handling Google sign-in:', error);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        try {
          const db = await connectToDatabase();
          const users = db.collection('users');
          const user = await users.findOne({ email: session.user.email.toLowerCase() });
          
          if (user) {
            (session.user as any).id = user._id.toString();
            (session.user as any).isAdmin = user.email.toLowerCase() === adminEmail.toLowerCase();
            (session.user as any).orderHistory = user.orderHistory || [];
            (session.user as any).wishlist = user.wishlist || [];
            (session.user as any).cart = user.cart || [];
          }
        } catch (error) {
          console.error('Error fetching user data for session:', error);
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as any).isAdmin;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // Check if user is admin and redirect to admin dashboard
      if (url.includes('admin@nexora.com') || url.includes('/admin')) {
        return `${baseUrl}/admin`;
      }
      // Handle redirect after successful authentication
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/auth/error', // Custom error page for OAuth errors
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST }; 