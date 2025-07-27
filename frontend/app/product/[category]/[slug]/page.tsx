import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import productsData from '@/data/products.json';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = (productsData as any[]).find(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category && p.slug === resolvedParams.slug
  );
  return {
    title: product ? `${product.name} | Nexora` : 'Product Not Found',
    description: product ? product.description : 'Product not found.'
  };
}

export default async function ProductPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const resolvedParams = await params;
  const product = (productsData as any[]).find(
    (p) => p.category.toLowerCase().replace(/\s+/g, '-') === resolvedParams.category && p.slug === resolvedParams.slug
  );
  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <ProductDetail product={product} />
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="mb-4">{product.description || 'This is a high-quality, reliable product designed for modern needs. It offers exceptional performance, durability, and value for money.'}</p>
        <h2 className="text-xl font-bold mb-2">Use Cases</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Everyday personal and professional use</li>
          <li>Gift for friends and family</li>
          <li>Business and travel needs</li>
        </ul>
        <h2 className="text-xl font-bold mb-2">Potential Vulnerabilities</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Physical damage if dropped or mishandled</li>
          <li>Exposure to water or extreme temperatures</li>
          <li>Outdated software if not regularly updated</li>
        </ul>
        <h2 className="text-xl font-bold mb-2">How to Order</h2>
        <ol className="list-decimal list-inside mb-4 text-gray-700">
          <li>Click the "Add to Cart" button above</li>
          <li>Go to your cart and proceed to checkout</li>
          <li>Enter your shipping and payment details</li>
          <li>Review and place your order</li>
        </ol>
        <h2 className="text-xl font-bold mb-2">Delivery & Returns</h2>
        <p className="mb-4">Fast, reliable delivery to your doorstep. Easy 7-day return policy for eligible products. See our Returns Policy for details.</p>
        <h2 className="text-xl font-bold mb-2">Warranty</h2>
        <p className="mb-4">{product.warranty || '1-year manufacturer warranty included.'}</p>
        <h2 className="text-xl font-bold mb-2">FAQs</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Q: Is this product genuine? <br/>A: Yes, all products on Nexora are 100% genuine and sourced from authorized sellers.</li>
          <li>Q: How do I track my order? <br/>A: You can track your order from the Orders page after purchase.</li>
          <li>Q: Can I return the product? <br/>A: Yes, eligible products can be returned within 7 days of delivery.</li>
        </ul>
        <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
        <div className="mb-2 text-yellow-500 font-bold">★ {product.rating} / 5</div>
        <div className="mb-2 text-gray-600">{product.reviews} reviews</div>
        <div className="text-gray-700">"Great product! Highly recommended."</div>
      </div>
    </div>
  );
} 