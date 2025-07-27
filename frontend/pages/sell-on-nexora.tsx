import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const SellOnNexora: NextPage = () => {
  const benefits = [
    {
      icon: '🚀',
      title: 'Reach Millions',
      description: 'Access our vast customer base across India'
    },
    {
      icon: '💰',
      title: 'High Margins',
      description: 'Competitive commission rates and fast payouts'
    },
    {
      icon: '📦',
      title: 'Fulfillment Support',
      description: 'We handle storage, packaging, and shipping'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Track sales, inventory, and performance metrics'
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Safe and timely payment processing'
    },
    {
      icon: '🎯',
      title: 'Marketing Tools',
      description: 'Promote your products with our marketing suite'
    }
  ]

  const categories = [
    'Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Sports', 'Beauty',
    'Automotive', 'Toys & Games', 'Health & Personal Care', 'Grocery'
  ]

  const steps = [
    {
      number: '01',
      title: 'Register',
      description: 'Create your seller account in minutes'
    },
    {
      number: '02',
      title: 'List Products',
      description: 'Add your products with detailed descriptions'
    },
    {
      number: '03',
      title: 'Start Selling',
      description: 'Begin receiving orders and earning money'
    },
    {
      number: '04',
      title: 'Scale Up',
      description: 'Grow your business with our tools and support'
    }
  ]

  return (
    <>
      <Head>
        <title>Sell on Nexora - Become a Seller</title>
        <meta name="description" content="Start selling on Nexora and reach millions of customers across India. Join our marketplace today!" />
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
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Start Selling on Nexora
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join thousands of successful sellers and reach millions of customers across India. 
            Start your e-commerce journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start Selling Now
            </button>
            <Link href="#benefits" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on Nexora?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition cursor-pointer">
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Sellers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">₹100Cr+</div>
              <div className="text-blue-100">Monthly Sales</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Seller Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Get Started Today</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter contact person name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your business address"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to sell?
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How much does it cost to sell on Nexora?</h3>
              <p className="text-gray-600">We offer competitive commission rates starting from 5% depending on the category. There are no upfront fees to start selling.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">How long does it take to get approved?</h3>
              <p className="text-gray-600">Most seller applications are reviewed and approved within 2-3 business days.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Do you provide shipping and fulfillment services?</h3>
              <p className="text-gray-600">Yes, we offer comprehensive fulfillment services including storage, packaging, and shipping to help you scale your business.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">What support do you provide to sellers?</h3>
              <p className="text-gray-600">We provide 24/7 seller support, marketing tools, analytics dashboard, and dedicated account managers for top sellers.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default SellOnNexora 