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
        const user = await db.collection('users').findOne({ email: credentials.email });
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email, image: user.image || null };
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
    async signIn({ user, account }) {
      // Allow all users to sign in
      return true;
    },
    async session({ session, token }) {
      if (session.user && session.user.email) {
        (session.user as typeof session.user & { isAdmin?: boolean }).isAdmin = session.user.email === adminEmail;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
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