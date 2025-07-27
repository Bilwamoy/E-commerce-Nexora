import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client.db();
  return cachedDb;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await connectToDatabase();
    const users = db.collection('users');

    // Find user by email
    const user = await users.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.verified) {
      return NextResponse.json(
        { success: false, message: 'Please verify your email before logging in' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (without password)
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image || null,
      isAdmin: user.email === 'admin@nexora.com'
    };

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData
    });

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 