'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalProducts: number;
  totalRevenue: number;
  monthlyGrowth: number;
  pendingOrders: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'active' | 'inactive';
}

interface Customer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  avatar: string;
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const stats: DashboardStats = {
    totalUsers: 15420,
    totalOrders: 8923,
    totalProducts: 1247,
    totalRevenue: 15420000,
    monthlyGrowth: 12.5,
    pendingOrders: 156
  };

  const orders: Order[] = [
    {
      id: 'ORD-001',
      customerName: 'Bilwamoy Chakraborty',
      customerEmail: 'bilwamoy@example.com',
      products: [{ name: 'iPhone 15 Pro', quantity: 1, price: 149999 }],
      total: 149999,
      status: 'delivered',
      orderDate: '2024-01-15',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-002',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      products: [{ name: 'MacBook Pro', quantity: 1, price: 199999 }],
      total: 199999,
      status: 'shipped',
      orderDate: '2024-01-14',
      paymentStatus: 'paid'
    }
  ];

  const products: Product[] = [
    {
      id: 'PROD-001',
      name: 'iPhone 15 Pro Max',
      category: 'Electronics',
      price: 149999,
      stock: 45,
      image: '/laptops.jpg',
      status: 'active'
    },
    {
      id: 'PROD-002',
      name: 'Samsung Galaxy S24',
      category: 'Electronics',
      price: 129999,
      stock: 32,
      image: '/smart watches.jpg',
      status: 'active'
    }
  ];

  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'Bilwamoy Chakraborty',
      email: 'bilwamoy@example.com',
      joinDate: '2023-12-01',
      totalOrders: 15,
      totalSpent: 450000,
      avatar: '/hero.jpg'
    }
  ];

  // Check if user is admin
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user?.email !== 'admin@nexora.com') {
      router.push('/login');
    }
  }, [session, status, router]);

  // Helper functions to prevent hydration errors
  const formatDate = (dateString: string) => {
    if (typeof window === 'undefined') return dateString;
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatTime = (dateString: string) => {
    if (typeof window === 'undefined') return '';
    return new Date(dateString).toLocaleTimeString('en-IN');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full size-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.email !== 'admin@nexora.com') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nexora Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user?.name}</span>
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="size-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'orders', name: 'Orders', icon: ShoppingCart },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'customers', name: 'Customers', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp },
              { id: 'settings', name: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="size-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="size-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="size-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="size-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="size-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(stats.totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Products</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <Plus className="size-4" />
                <span>Add Product</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            className="size-10 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="size-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Other tabs can be implemented similarly */}
        {activeTab !== 'dashboard' && activeTab !== 'products' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 