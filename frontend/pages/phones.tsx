import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const Phones: NextPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const phones = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: '₹149,999',
      originalPrice: '₹159,999',
      image: '/smart watches.jpg',
      rating: 4.8,
      reviews: 1247,
      features: ['A17 Pro Chip', '48MP Camera', 'Titanium Design', 'USB-C'],
      inStock: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: '₹139,999',
      originalPrice: '₹149,999',
      image: '/laptops.jpg',
      rating: 4.7,
      reviews: 892,
      features: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen', '5000mAh'],
      inStock: true
    },
    {
      id: 3,
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      price: '₹99,999',
      originalPrice: '₹109,999',
      image: '/pcs.jpg',
      rating: 4.6,
      reviews: 567,
      features: ['Google Tensor G3', '50MP Camera', 'AI Features', '30W Charging'],
      inStock: true
    },
    {
      id: 4,
      name: 'OnePlus 12',
      brand: 'OnePlus',
      price: '₹69,999',
      originalPrice: '₹79,999',
      image: '/game.jpg',
      rating: 4.5,
      reviews: 423,
      features: ['Snapdragon 8 Gen 3', '50MP Camera', '100W Charging', 'Hasselblad'],
      inStock: true
    },
    {
      id: 5,
      name: 'Xiaomi 14 Ultra',
      brand: 'Xiaomi',
      price: '₹89,999',
      originalPrice: '₹99,999',
      image: '/fashion.jpg',
      rating: 4.4,
      reviews: 234,
      features: ['Snapdragon 8 Gen 3', '50MP Leica Camera', '90W Charging', 'Ceramic'],
      inStock: false
    },
    {
      id: 6,
      name: 'Nothing Phone (2)',
      brand: 'Nothing',
      price: '₹44,999',
      originalPrice: '₹49,999',
      image: '/beauty.jpeg',
      rating: 4.3,
      reviews: 189,
      features: ['Snapdragon 8+ Gen 1', '50MP Camera', 'Glyph Interface', '45W Charging'],
      inStock: true
    }
  ]

  const brands = ['all', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Nothing']

  const filteredPhones = phones.filter(phone => 
    selectedBrand === 'all' || phone.brand === selectedBrand
  )

  const sortedPhones = [...filteredPhones].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', ''))
      case 'price-high':
        return parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', ''))
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <>
      <Head>
        <title>Premium Smartphones - Nexora</title>
        <meta name="description" content="Explore the latest premium smartphones from top brands. iPhone, Samsung, Google Pixel, OnePlus and more with competitive prices." />
      </Head>

             {/* Header */}
       <header className="bg-amazon-blue text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
             <Link href="/" className="flex items-center space-x-2">
               <div className="size-8 bg-purple-600 rounded-md flex items-center justify-center">
                 <span className="text-white font-bold text-sm">N</span>
               </div>
               <span className="text-xl font-bold">NEXORA</span>
             </Link>
             
             {/* Search Bar */}
             <div className="flex-1 max-w-2xl mx-8">
               <div className="relative flex">
                 <div className="relative flex-1">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                   </div>
                   <input
                     type="text"
                     placeholder="Search in Nexora"
                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md leading-5 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                   />
                 </div>
                 <button 
                   className="bg-amazon-orange hover:bg-orange-500 text-white px-6 py-2 rounded-r-md border border-amazon-orange hover:border-orange-500 transition-colors duration-200 flex items-center justify-center"
                   onClick={() => {
                     const searchInput = document.querySelector('input[placeholder="Search in Nexora"]') as HTMLInputElement;
                     if (searchInput && searchInput.value.trim()) {
                       console.log('Searching for:', searchInput.value);
                       // You can add search functionality here
                       alert(`Searching for: ${searchInput.value}`);
                     } else {
                       alert('Please enter a search term');
                     }
                   }}
                 >
                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </button>
               </div>
             </div>
             
             <div className="flex items-center space-x-4">
               <Link href="/" className="text-sm hover:text-gray-300 transition">
                 Home
               </Link>
               <Link href="/shop" className="text-sm hover:text-gray-300 transition">
                 Shop
               </Link>
               <Link href="/about" className="text-sm hover:text-gray-300 transition">
                 About
               </Link>
             </div>
           </div>
         </div>
       </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Smartphones
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the latest flagship smartphones with cutting-edge technology, 
            stunning cameras, and powerful performance
          </p>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Brand:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand === 'all' ? 'All Brands' : brand}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPhones.map((phone) => (
              <div key={phone.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Phone Image</span>
                  </div>
                  {!phone.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      Out of Stock
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    {phone.brand}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{phone.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`size-4 ${
                            i < Math.floor(phone.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {phone.rating} ({phone.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">{phone.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">{phone.originalPrice}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phone.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
                        phone.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!phone.inStock}
                    >
                      {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                      <svg className="size-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Nexora for Smartphones?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                      <div className="size-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p className="text-gray-600">All smartphones are 100% genuine with manufacturer warranty</p>
            </div>
            <div className="text-center">
                      <div className="size-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive prices with regular discounts and offers</p>
            </div>
            <div className="text-center">
                      <div className="size-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="size-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery in select cities, next-day delivery nationwide</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default Phones 