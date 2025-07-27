'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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
  status: 'active' | 'inactive';
  image: string;
  sales: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    pendingOrders: 0
  });

  // Mock data for demonstration
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      products: [{ name: 'iPhone 15 Pro', quantity: 1, price: 999 }],
      total: 999,
      status: 'pending',
      orderDate: '2024-01-15',
      paymentStatus: 'paid'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      products: [{ name: 'MacBook Air', quantity: 1, price: 1299 }],
      total: 1299,
      status: 'processing',
      orderDate: '2024-01-14',
      paymentStatus: 'paid'
    }
  ]);

  const [products] = useState<Product[]>([
    {
      id: 'PROD-001',
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      price: 999,
      stock: 50,
      status: 'active',
      image: '/iphone.jpg',
      sales: 25
    },
    {
      id: 'PROD-002',
      name: 'MacBook Air',
      category: 'Electronics',
      price: 1299,
      stock: 30,
      status: 'active',
      image: '/macbook.jpg',
      sales: 15
    }
  ]);

  const [customers] = useState<Customer[]>([
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-01',
      totalOrders: 5,
      totalSpent: 2500,
      status: 'active'
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      joinDate: '2024-01-05',
      totalOrders: 3,
      totalSpent: 1800,
      status: 'active'
    }
  ]);

  useEffect(() => {
    // Check if user is admin
    if (status === 'loading') return;
    
    if (!session || session.user?.email !== 'admin@nexora.com') {
      router.push('/login');
      return;
    }

    // Load dashboard stats
    loadDashboardStats();
  }, [session, status, router]);

  const loadDashboardStats = () => {
    // Mock stats - in real app, fetch from API
    setStats({
      totalUsers: 1250,
      totalOrders: 3420,
      totalProducts: 156,
      totalRevenue: 125000,
      monthlyGrowth: 15.5,
      pendingOrders: 23
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nexora Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={session?.user?.image || '/default-avatar.png'} 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {session?.user?.name}
                </span>
              </div>
              <button 
                onClick={() => router.push('/')}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings }
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
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+8%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+5%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            {/* Orders table content similar to dashboard */}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Products</h3>
                <button className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt={product.name} />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit size={16} />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 size={16} />
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

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Customers</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(customer.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {customer.totalOrders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${customer.totalSpent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          customer.status === 'active' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye size={16} />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit size={16} />
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-500">Settings configuration will be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 