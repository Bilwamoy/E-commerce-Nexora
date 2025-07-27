"use client";
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ChatWidget from '../../components/ChatWidget';
import Footer from '../../components/Footer';
import NexoraLogo from '../../components/NexoraLogo';
import { useCart } from '../../components/CartContext';
import toast from 'react-hot-toast';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { cartItems, addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 149999,
      originalPrice: 169999,
      category: 'electronics',
      image: '/laptops.jpg',
      rating: 4.8,
      reviews: 1247,
      badge: 'New',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      price: 129999,
      originalPrice: 149999,
      category: 'electronics',
      image: '/smart watches.jpg',
      rating: 4.7,
      reviews: 892,
      badge: 'Best Seller',
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5 Headphones',
      price: 24999,
      originalPrice: 29999,
      category: 'electronics',
      image: '/pcs.jpg',
      rating: 4.9,
      reviews: 2156,
      badge: 'Trending',
    },
    {
      id: 4,
      name: 'MacBook Pro M3',
      price: 199999,
      originalPrice: 229999,
      category: 'electronics',
      image: '/laptops.jpg',
      rating: 4.8,
      reviews: 567,
      badge: 'Premium',
    },
    {
      id: 5,
      name: 'PlayStation 5',
      price: 49999,
      originalPrice: 54999,
      category: 'gaming',
      image: '/game.jpg',
      rating: 4.6,
      reviews: 3421,
      badge: 'Hot Deal',
    },
    {
      id: 6,
      name: 'Nike Air Max 270',
      price: 8999,
      originalPrice: 11999,
      category: 'fashion',
      image: '/shoes.jpg',
      rating: 4.5,
      reviews: 1892,
      badge: 'Sale',
    },
    {
      id: 7,
      name: 'Apple Watch Series 9',
      price: 39999,
      originalPrice: 44999,
      category: 'electronics',
      image: '/smart watches.jpg',
      rating: 4.7,
      reviews: 1234,
      badge: 'New',
    },
    {
      id: 8,
      name: 'Dell XPS 13 Laptop',
      price: 89999,
      originalPrice: 99999,
      category: 'electronics',
      image: '/laptops.jpg',
      rating: 4.6,
      reviews: 756,
      badge: 'Limited',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'electronics', name: 'Electronics', count: products.filter((p) => p.category === 'electronics').length },
    { id: 'gaming', name: 'Gaming', count: products.filter((p) => p.category === 'gaming').length },
    { id: 'fashion', name: 'Fashion', count: products.filter((p) => p.category === 'fashion').length },
    { id: 'lifestyle', name: 'Lifestyle', count: products.filter((p) => p.category === 'lifestyle').length },
  ];

  const filteredProducts = selectedCategory === 'all' ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Head>
        <title>Shop - Nexora</title>
        <meta name="description" content="Shop the latest electronics, gaming, fashion, and lifestyle products at Nexora. Find great deals and premium quality items." />
      </Head>
      {/* Removed custom header to avoid duplicate navbar */}
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <NexoraLogo />
                <div className="text-2xl font-bold text-gray-900">Shop</div>
              </div>
            </div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-gray-500">Shop</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${selectedCategory === category.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{selectedCategory === 'all' ? 'All Products' : categories.find((c) => c.id === selectedCategory)?.name}</h1>
                <p className="text-gray-600">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                      {product.badge && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">{product.badge}</span>
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                      <button
                        className="w-full bg-amazon-blue text-white py-2 px-4 rounded-md hover:bg-gray-800 transition font-medium"
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category,
                            slug: product.name.toLowerCase().replace(/\s+/g, '-')
                          });
                          toast.success('Added to cart!');
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
};

export default Shop; 