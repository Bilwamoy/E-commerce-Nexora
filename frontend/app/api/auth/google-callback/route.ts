import { NextRequest, NextResponse } from 'next/server';
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
    const { user } = await req.json();

    if (!user || !user.email) {
      return NextResponse.json(
        { success: false, message: 'Invalid user data' },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await connectToDatabase();
    const users = db.collection('users');

    // Check if user already exists
    const existingUser = await users.findOne({ email: user.email.toLowerCase() });

    if (existingUser) {
      // Update existing user's Google data
      await users.updateOne(
        { email: user.email.toLowerCase() },
        {
          $set: {
            name: user.name,
            image: user.image,
            googleId: user.id,
            lastLogin: new Date(),
            verified: true
          }
        }
      );

      // Return updated user data
      const updatedUser = await users.findOne({ email: user.email.toLowerCase() });
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: updatedUser._id.toString(),
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
          isAdmin: updatedUser.email === 'admin@nexora.com'
        }
      });
    } else {
      // Create new user
      const newUser = {
        name: user.name,
        email: user.email.toLowerCase(),
        image: user.image,
        googleId: user.id,
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

      const result = await users.insertOne(newUser);

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: {
          id: result.insertedId.toString(),
          name: newUser.name,
          email: newUser.email,
          image: newUser.image,
          isAdmin: false
        }
      });
    }

  } catch (error) {
    console.error('Google callback API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 