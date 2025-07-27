import Head from 'next/head';
import Link from 'next/link';
import Stats from '../components/Stats';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Nexora - Home</title>
        <meta name="description" content="Welcome to Nexora" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Nexora
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted source for premium products
          </p>
          <div className="space-x-4">
            <Link href="/shop" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              Shop Now
            </Link>
            <Link href="/about" className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition">
              Learn More
            </Link>
          </div>
        </div>
        <Stats />
      </main>
    </div>
  );
} 