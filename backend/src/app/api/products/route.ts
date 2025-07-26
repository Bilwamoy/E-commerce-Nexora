import { NextRequest, NextResponse } from 'next/server';

const categories = [
  'Fresh', 'MX Player', 'Sell', 'Bestsellers', "Today's Deals", 'Mobiles', 'Prime', 'Customer Service', 'Fashion', 'New Releases', 'Home & Kitchen', 'Electronics', 'Amazon Pay', 'Computers'
];

let products = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 100 + 10).toFixed(2),
  image: '/next.svg',
  description: `This is a placeholder description for Product ${i + 1}.`,
  category: categories[i % categories.length],
}));

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  return NextResponse.json(products, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newProduct = { ...body, id: products.length + 1 };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201, headers: corsHeaders });
} 