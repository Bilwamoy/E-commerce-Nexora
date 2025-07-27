'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Order {
  id: string;
  product: string;
  status: string;
  orderDate: string;
  deliveryDate: string;
  price: number;
  image: string;
  trackingNumber: string;
}

interface Delivery {
  id: string;
  product: string;
  status: string;
  estimatedDelivery: string;
  price: number;
  image: string;
  trackingNumber: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    product: 'iPhone 15 Pro Max',
    status: 'Delivered',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-15',
    price: 149999,
    image: '/laptops.jpg',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    product: 'MacBook Pro M3',
    status: 'Shipped',
    orderDate: '2024-01-12',
    deliveryDate: '2024-01-18',
    price: 199999,
    image: '/smart watches.jpg',
    trackingNumber: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    product: 'Sony WH-1000XM5',
    status: 'Processing',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-20',
    price: 24999,
    image: '/pcs.jpg',
    trackingNumber: 'TRK456789123'
  }
];

const mockDeliveries: Delivery[] = [
  {
    id: 'DEL-001',
    product: 'PlayStation 5',
    status: 'Out for Delivery',
    estimatedDelivery: '2024-01-16',
    price: 49999,
    image: '/game.jpg',
    trackingNumber: 'TRK111222333'
  },
  {
    id: 'DEL-002',
    product: 'Nike Air Max 270',
    status: 'In Transit',
    estimatedDelivery: '2024-01-17',
    price: 8999,
    image: '/shoes.jpg',
    trackingNumber: 'TRK444555666'
  }
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [returnRequested, setReturnRequested] = useState(false);
  const [tracking, setTracking] = useState({ lat: 22.57, lng: 88.36 });
  const [trackingActive, setTrackingActive] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [deliveryTracking, setDeliveryTracking] = useState({ lat: 22.57, lng: 88.36 });
  const [deliveryActive, setDeliveryActive] = useState(false);

  // Mock live tracking: move marker every second
  useEffect(() => {
    if (!trackingActive) return;
    const interval = setInterval(() => {
      setTracking((t) => ({ lat: t.lat + 0.001, lng: t.lng + 0.001 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [trackingActive]);

  // Mock live tracking for delivery
  useEffect(() => {
    if (!deliveryActive) return;
    const interval = setInterval(() => {
      setDeliveryTracking((t) => ({ lat: t.lat + 0.0005, lng: t.lng + 0.0005 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [deliveryActive]);

  const handleReturnRequest = (orderId: string) => {
    setReturnRequested(true);
    setTimeout(() => setReturnRequested(false), 3000);
  };

  const startTracking = (index: number) => {
    setSelectedOrder(index);
    setTrackingActive(true);
    setTimeout(() => setTrackingActive(false), 10000);
  };

  const startDeliveryTracking = (index: number) => {
    setSelectedDelivery(index);
    setDeliveryActive(true);
    setTimeout(() => setDeliveryActive(false), 10000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders & Returns</h1>
          <p className="text-gray-600">Track your orders and manage returns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="p-6 space-y-4">
              {mockOrders.map((order, index) => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Image 
                      src={order.image} 
                      alt={order.product} 
                      width={64}
                      height={64}
                      className="size-16 object-contain rounded" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{order.product}</h3>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">₹{order.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                        {order.status === 'Delivered' && (
                          <button
                            onClick={() => handleReturnRequest(order.id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                          >
                            Request Return
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => startTracking(index)}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Track
                      </button>
                      {selectedOrder === index && trackingActive && (
                        <div className="text-xs text-green-600">Live tracking active</div>
                      )}
                    </div>
                  </div>
                  {selectedOrder === index && trackingActive && (
                    <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                      <div className="flex justify-between">
                        <span>Current Location:</span>
                        <span>{tracking.lat.toFixed(4)}, {tracking.lng.toFixed(4)}</span>
                      </div>
                      <div className="mt-2 text-gray-600">
                        Estimated delivery: {order.deliveryDate}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deliveries Section */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Active Deliveries</h2>
            </div>
            <div className="p-6 space-y-4">
              {mockDeliveries.map((delivery, index) => (
                <div key={delivery.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <Image 
                      src={delivery.image} 
                      alt={delivery.product} 
                      width={64}
                      height={64}
                      className="size-16 object-contain rounded" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{delivery.product}</h3>
                      <p className="text-sm text-gray-500">Delivery #{delivery.id}</p>
                      <p className="text-sm text-gray-500">₹{delivery.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          delivery.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {delivery.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => startDeliveryTracking(index)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Track
                      </button>
                      {selectedDelivery === index && deliveryActive && (
                        <div className="text-xs text-green-600">Live tracking active</div>
                      )}
                    </div>
                  </div>
                  {selectedDelivery === index && deliveryActive && (
                    <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                      <div className="flex justify-between">
                        <span>Current Location:</span>
                        <span>{deliveryTracking.lat.toFixed(4)}, {deliveryTracking.lng.toFixed(4)}</span>
                      </div>
                      <div className="mt-2 text-gray-600">
                        Estimated delivery: {delivery.estimatedDelivery}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Return Request Success Message */}
        {returnRequested && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
            Return request submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
} 