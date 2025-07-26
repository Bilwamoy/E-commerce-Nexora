import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Nexora</h1>
          
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Nexora was founded in 2024 with a simple mission: to provide high-quality electronics and technology products 
              to customers across India at competitive prices. What started as a small online store has grown into one of 
              India&apos;s leading e-commerce platforms for electronics and gadgets.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We believe that technology should be accessible to everyone, and we work tirelessly to bring the latest 
              innovations to our customers while maintaining the highest standards of quality and customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize technology by making high-quality electronics accessible to everyone, 
                while providing exceptional customer service and competitive pricing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become India&apos;s most trusted and customer-centric e-commerce platform for electronics, 
                setting new standards in online shopping experience.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Nexora?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">Free and fast delivery across India</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 text-sm">100% secure payment processing</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Products</h3>
                <p className="text-gray-600 text-sm">Genuine products with warranty</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amazon-blue mb-2">1M+</div>
                <div className="text-gray-600 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amazon-blue mb-2">50K+</div>
                <div className="text-gray-600 text-sm">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amazon-blue mb-2">500+</div>
                <div className="text-gray-600 text-sm">Cities Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amazon-blue mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Customer Support</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-amazon-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 