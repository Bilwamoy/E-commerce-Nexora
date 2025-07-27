import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import ChatWidget from '../components/ChatWidget'
import Footer from '../components/Footer'

const Account: NextPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [user] = useState({
            name: 'Bilwamoy',
          email: 'bilwamoy@nexora.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Mumbai, Maharashtra 400001'
  })

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '₹2,499',
      items: ['iPhone 15 Pro Max', 'AirPods Pro']
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: '₹1,299',
      items: ['Samsung Galaxy S24', 'Wireless Charger']
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: '₹899',
      items: ['MacBook Pro M3']
    }
  ]

  const wishlist = [
    {
      id: 1,
      name: 'Sony WH-1000XM5 Headphones',
      price: '₹24,999',
      image: '/pcs.jpg'
    },
    {
      id: 2,
      name: 'Apple Watch Series 9',
      price: '₹39,999',
      image: '/smart watches.jpg'
    },
    {
      id: 3,
      name: 'PlayStation 5',
      price: '₹49,999',
      image: '/game.jpg'
    }
  ]

  return (
    <>
      <Head>
        <title>My Account - Nexora</title>
        <meta name="description" content="Manage your Nexora account, view orders, and update your profile information." />
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

      {/* Account Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md">
            {/* Account Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'profile', label: 'Profile', icon: '👤' },
                  { id: 'orders', label: 'Orders', icon: '📦' },
                  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={user.phone}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={user.address}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Order History</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                            <p className="text-sm text-gray-600">Placed on {order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{order.total}</p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p className="mb-1">Items: {order.items.join(', ')}</p>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Track Order
                          </button>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">My Wishlist</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="w-full h-32 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                          <span className="text-gray-500">Product Image</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-lg font-bold text-blue-600 mb-3">{item.price}</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                            Add to Cart
                          </button>
                          <button className="px-3 py-2 text-red-600 hover:text-red-800">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive updates about orders and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Get order updates via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </>
  )
}

export default Account 