'use client';

import { useState, useEffect } from 'react';

import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Search, Filter, Download, RefreshCw } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
  returnEligible: boolean;
}

// Consistent date formatting function to prevent hydration errors
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Consistent number formatting function to prevent hydration errors
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function ReturnsOrdersPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'returns'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'NEX-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      items: [
        {
          name: 'iPhone 15 Pro Max',
          quantity: 1,
          price: 149999,
          image: '/phones.jpg'
        }
      ],
      total: 149999,
      trackingNumber: 'TRK1703123456789',
      estimatedDelivery: '2024-01-20',
      returnEligible: true
    },
    {
      id: '2',
      orderNumber: 'NEX-2024-002',
      date: '2024-01-18',
      status: 'Shipped',
      items: [
        {
          name: 'Samsung Galaxy S24 Ultra',
          quantity: 1,
          price: 129999,
          image: '/phones.jpg'
        },
        {
          name: 'AirPods Pro',
          quantity: 1,
          price: 24999,
          image: '/phones.jpg'
        }
      ],
      total: 154998,
      trackingNumber: 'TRK1703123456790',
      estimatedDelivery: '2024-01-25',
      returnEligible: true
    },
    {
      id: '3',
      orderNumber: 'NEX-2024-003',
      date: '2024-01-20',
      status: 'Processing',
      items: [
        {
          name: 'MacBook Pro M3',
          quantity: 1,
          price: 249999,
          image: '/laptops.jpg'
        }
      ],
      total: 249999,
      returnEligible: false
    }
  ]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      case 'Returned': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Processing': return <Clock className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => window.history.back()}
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">My Orders & Returns</h1>
            </div>
            <p className="text-gray-600">Track your orders and manage returns in one place</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'orders'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mx-auto mb-2" />
                Orders
              </button>
              <button
                onClick={() => setActiveTab('returns')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'returns'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <RefreshCw className="w-5 h-5 mx-auto mb-2" />
                Returns
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by order number or item name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                </select>
                <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                        <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                        {order.returnEligible && order.status === 'Delivered' && (
                          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            Return Item
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium text-gray-900">₹{formatNumber(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-900">₹{formatNumber(order.total)}</p>
                        </div>
                        {order.trackingNumber && (
                          <div>
                            <p className="text-sm text-gray-600">Tracking Number</p>
                            <p className="text-sm font-medium text-gray-900">{order.trackingNumber}</p>
                          </div>
                        )}
                        {order.estimatedDelivery && (
                          <div>
                            <p className="text-sm text-gray-600">Estimated Delivery</p>
                            <p className="text-sm font-medium text-gray-900">{order.estimatedDelivery}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-600">Return Eligibility</p>
                          <p className={`text-sm font-medium ${order.returnEligible ? 'text-green-600' : 'text-gray-500'}`}>
                            {order.returnEligible ? 'Eligible' : 'Not Eligible'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                        Track Order
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Download Invoice
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatWidget />
    </>
  );
} 