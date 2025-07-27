'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';

const trackingSteps = [
  {
    id: 1,
    title: 'Order Placed',
    description: 'Your order has been confirmed and is being processed',
    icon: Package,
    status: 'completed',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Order Confirmed',
    description: 'Payment verified and order is being prepared for shipping',
    icon: CheckCircle,
    status: 'completed',
    time: '1 hour ago'
  },
  {
    id: 3,
    title: 'Processing',
    description: 'Your order is being packed and prepared for dispatch',
    icon: Package,
    status: 'completed',
    time: '30 minutes ago'
  },
  {
    id: 4,
    title: 'Shipped',
    description: 'Your order has been shipped and is on its way',
    icon: Truck,
    status: 'current',
    time: 'Just now'
  },
  {
    id: 5,
    title: 'Out for Delivery',
    description: 'Your package is out for delivery',
    icon: Truck,
    status: 'pending',
    time: 'Expected in 2 days'
  },
  {
    id: 6,
    title: 'Delivered',
    description: 'Your order has been delivered successfully',
    icon: CheckCircle,
    status: 'pending',
    time: 'Expected in 3 days'
  }
];

const mockOrders = [
  {
    orderId: 'NEX1703123456789',
    trackingNumber: 'TRK1703123456789',
    status: 'Shipped',
    estimatedDelivery: '2024-01-25',
            customerName: 'Bilwamoy',
    items: ['iPhone 15 Pro', 'AirPods Pro'],
    total: 125000
  },
  {
    orderId: 'NEX1703123456790',
    trackingNumber: 'TRK1703123456790',
    status: 'Processing',
    estimatedDelivery: '2024-01-26',
    customerName: 'Jane Smith',
    items: ['MacBook Air', 'Magic Mouse'],
    total: 95000
  }
];

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [showMockOrders, setShowMockOrders] = useState(false);

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) {
      return;
    }

    // Simulate finding an order
    const foundOrder = mockOrders.find(order => 
      order.trackingNumber === trackingNumber || order.orderId === trackingNumber
    );

    if (foundOrder) {
      setSearchedOrder(foundOrder);
    } else {
      // Create a fake order for demonstration
      setSearchedOrder({
        orderId: trackingNumber.startsWith('NEX') ? trackingNumber : `NEX${Date.now()}`,
        trackingNumber: trackingNumber.startsWith('TRK') ? trackingNumber : `TRK${Date.now()}`,
        status: 'Shipped',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        customerName: 'Demo Customer',
        items: ['Sample Product 1', 'Sample Product 2'],
        total: 2500
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Order</h1>
          <p className="text-gray-600">Enter your order ID or tracking number to track your delivery</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter Order ID or Tracking Number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleTrackOrder}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Track Order
            </button>
          </div>

          {/* Demo Orders */}
          <div className="mt-6">
            <button
              onClick={() => setShowMockOrders(!showMockOrders)}
              className="text-blue-600 hover:underline text-sm"
            >
              {showMockOrders ? 'Hide' : 'Show'} Demo Orders
            </button>
            
            {showMockOrders && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Try these demo tracking numbers:</p>
                <div className="space-y-2">
                  {mockOrders.map((order) => (
                    <div key={order.orderId} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div>
                        <span className="font-mono text-sm">{order.trackingNumber}</span>
                        <span className="text-gray-500 text-sm ml-2">({order.status})</span>
                      </div>
                      <button
                        onClick={() => {
                          setTrackingNumber(order.trackingNumber);
                          setSearchedOrder(order);
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Use this
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tracking Results */}
        {searchedOrder && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">{searchedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-semibold">{searchedOrder.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold text-blue-600">{searchedOrder.status}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span>{searchedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span>{searchedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold">₹{searchedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Delivery Timeline</h2>
              <div className="space-y-6">
                {trackingSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = step.status === 'completed';
                  const isCurrent = step.status === 'current';
                  
                  return (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100' : isCurrent ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${
                            isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </h3>
                          {isCurrent && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${
                          isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{step.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Delivery Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">Delivery Address</h4>
                      <p className="text-gray-600 text-sm">
                        123 Main Street<br />
                        Apartment 4B<br />
                        New Delhi, Delhi 110001<br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">Contact Number</h4>
                      <p className="text-gray-600 text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">Courier Partner</h4>
                      <p className="text-gray-600 text-sm">Nexora Express</p>
                      <p className="text-gray-500 text-xs">Tracking ID: NEX{Date.now()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <h4 className="font-semibold">Email Updates</h4>
                      <p className="text-gray-600 text-sm">customer@nexora.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  setSearchedOrder(null);
                  setTrackingNumber('');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}

        {/* Help Section */}
        {!searchedOrder && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Call Us</h3>
                <p className="text-gray-600 text-sm">24/7 Customer Support</p>
                <p className="text-blue-600 text-sm">1800-NEXORA</p>
              </div>
              <div className="text-center p-4">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Email Us</h3>
                <p className="text-gray-600 text-sm">Get help via email</p>
                <p className="text-blue-600 text-sm">support@nexora.com</p>
              </div>
              <div className="text-center p-4">
                <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Return Policy</h3>
                <p className="text-gray-600 text-sm">Easy returns within 30 days</p>
                <Link href="/returns" className="text-blue-600 text-sm hover:underline">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 