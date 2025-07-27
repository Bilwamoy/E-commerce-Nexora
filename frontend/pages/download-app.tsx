import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const DownloadApp: NextPage = () => {
  const features = [
    {
      icon: '🛒',
      title: 'Easy Shopping',
      description: 'Browse and buy products with just a few taps'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Get alerts for deals, orders, and promotions'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'One-tap checkout with saved payment methods'
    },
    {
      icon: '📱',
      title: 'Mobile Optimized',
      description: 'Perfect experience on any device'
    },
    {
      icon: '🎯',
      title: 'Personalized',
      description: 'Get recommendations based on your preferences'
    },
    {
      icon: '🚚',
      title: 'Track Orders',
      description: 'Real-time updates on your deliveries'
    }
  ]

  const appStats = [
    { number: '1M+', label: 'Downloads' },
    { number: '4.8★', label: 'Rating' },
    { number: '50K+', label: 'Reviews' },
    { number: '24/7', label: 'Support' }
  ]

  return (
    <>
      <Head>
        <title>Download Nexora App - Nexora</title>
        <meta name="description" content="Download the Nexora mobile app for the best shopping experience. Available on iOS and Android." />
      </Head>

      {/* Header */}
      <header className="bg-amazon-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">NEXORA</span>
            </Link>
            
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
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Shop Smarter with Nexora App
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Get the best deals, fastest delivery, and exclusive app-only offers. Download now and experience shopping like never before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download on App Store
                </a>
                <a href="#" className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Get it on Google Play
                </a>
              </div>
            </div>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-64 h-96 bg-white rounded-3xl shadow-2xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 opacity-20"></div>
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-800 rounded-t-2xl"></div>
                  <div className="absolute top-16 left-4 right-4 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg"></div>
                  <div className="absolute top-52 left-4 right-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {appStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Nexora App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">App Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-48 h-80 bg-white rounded-3xl shadow-lg mx-auto mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-b from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Home Screen</span>
                </div>
              </div>
              <p className="text-gray-600">Beautiful home interface</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-80 bg-white rounded-3xl shadow-lg mx-auto mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Product View</span>
                </div>
              </div>
              <p className="text-gray-600">Detailed product information</p>
            </div>
            <div className="text-center">
              <div className="w-48 h-80 bg-white rounded-3xl shadow-lg mx-auto mb-4 overflow-hidden">
                <div className="h-full bg-gradient-to-b from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">Checkout</span>
                </div>
              </div>
              <p className="text-gray-600">Fast and secure checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Download the Nexora app today and enjoy a seamless shopping experience with exclusive app-only benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a href="#" className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default DownloadApp 