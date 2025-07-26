import { NextRequest, NextResponse } from 'next/server';

let orders = [
  { id: 1, user: 'User1', product: 'Product 1', status: 'Delivered' },
  { id: 2, user: 'User2', product: 'Product 2', status: 'Shipped' },
];

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  return NextResponse.json(orders, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newOrder = { ...body, id: orders.length + 1 };
  orders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201, headers: corsHeaders });
} 