import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const adminEmail = 'admin@nexora.com';

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

// Create providers array
const providers: NextAuthOptions['providers'] = [
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
      
      // Only try to connect to MongoDB if MONGODB_URI is available
      if (!process.env.MONGODB_URI) {
        console.warn('MONGODB_URI not configured, skipping database authentication');
        return null;
      }
      
      try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email });
        await client.close();
        
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user._id.toString(), name: user.name, email: user.email, image: user.image || null };
        }
        return null;
      } catch (error) {
        console.error('Database connection error:', error);
        return null;
      }
    },
  }),
];

// Add Google provider only if credentials are available
if (googleId && googleSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret,
    })
  );
}

const authOptions: NextAuthOptions = {
  providers,
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
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  pages: {
    error: '/auth/error', // Custom error page for OAuth errors
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 