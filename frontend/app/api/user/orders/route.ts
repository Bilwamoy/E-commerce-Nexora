import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client.db();
  return cachedDb;
}

// GET - Fetch user's order history
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      orderHistory: user.orderHistory || [],
      wishlist: user.wishlist || [],
      cart: user.cart || []
    });

  } catch (error) {
    console.error('Get orders API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add new order to user's history
export async function POST(req: NextRequest) {
  try {
    const { email, order } = await req.json();

    if (!email || !order) {
      return NextResponse.json(
        { success: false, message: 'Email and order data are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const newOrder = {
      ...order,
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date(),
      status: 'pending'
    };

    const result = await users.updateOne(
      { email: email.toLowerCase() },
      {
        $push: { orderHistory: newOrder },
        $set: { lastUpdated: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order added successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('Add order API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update order status
export async function PUT(req: NextRequest) {
  try {
    const { email, orderId, status } = await req.json();

    if (!email || !orderId || !status) {
      return NextResponse.json(
        { success: false, message: 'Email, order ID, and status are required' },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const result = await users.updateOne(
      { 
        email: email.toLowerCase(),
        'orderHistory.orderId': orderId
      },
      {
        $set: {
          'orderHistory.$.status': status,
          'orderHistory.$.updatedAt': new Date(),
          lastUpdated: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User or order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Update order API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 