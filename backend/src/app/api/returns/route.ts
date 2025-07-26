import { NextRequest, NextResponse } from 'next/server';

let returns = [
  { id: 1, user: 'User1', product: 'Product 1', status: 'Requested' },
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
  return NextResponse.json(returns, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newReturn = { ...body, id: returns.length + 1 };
  returns.push(newReturn);
  return NextResponse.json(newReturn, { status: 201, headers: corsHeaders });
} 