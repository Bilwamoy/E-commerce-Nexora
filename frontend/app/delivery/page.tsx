'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../hooks/useLocation';
import { useRouter } from 'next/navigation';

interface DeliveryStatus {
  status: 'preparing' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered';
  message: string;
  estimatedTime: string;
  currentLocation?: string;
}

const DeliveryPage = () => {
  const router = useRouter();
  const { location, loading, error, getLocation } = useLocation();
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>({
    status: 'preparing',
    message: 'Your order is being prepared',
    estimatedTime: '2-3 business days'
  });
  const [orderNumber] = useState(`NEX-${Date.now().toString().slice(-6)}`);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate delivery progress
    const progressInterval = setInterval(() => {
      setDeliveryStatus(prev => {
        switch (prev.status) {
          case 'preparing':
            return {
              status: 'shipped',
              message: 'Your order has been shipped',
              estimatedTime: '1-2 business days',
              currentLocation: 'Warehouse'
            };
          case 'shipped':
            return {
              status: 'in-transit',
              message: 'Your order is in transit',
              estimatedTime: '1 business day',
              currentLocation: 'Distribution Center'
            };
          case 'in-transit':
            return {
              status: 'out-for-delivery',
              message: 'Your order is out for delivery',
              estimatedTime: 'Today',
              currentLocation: 'Local Facility'
            };
          case 'out-for-delivery':
            return {
              status: 'delivered',
              message: 'Your order has been delivered',
              estimatedTime: 'Delivered',
              currentLocation: location?.address || 'Your location'
            };
          default:
            return prev;
        }
      });
    }, 5000); // Change status every 5 seconds for demo

    return () => clearInterval(progressInterval);
  }, [location]);

  const getStatusIcon = (status: DeliveryStatus['status']) => {
    switch (status) {
      case 'preparing':
        return '📦';
      case 'shipped':
        return '🚚';
      case 'in-transit':
        return '✈️';
      case 'out-for-delivery':
        return '🛵';
      case 'delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status: DeliveryStatus['status']) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'in-transit':
        return 'bg-purple-500';
      case 'out-for-delivery':
        return 'bg-orange-500';
      case 'delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Delivery Page...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🚚 Delivery Tracking
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Order #{orderNumber}
          </p>
          <p className="text-lg text-gray-400">
            Track your NEXORA order in real-time
          </p>
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            📍 Delivery Location
          </h2>
          
          {!location && !loading && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Enable location access to get accurate delivery updates
              </p>
              <button
                onClick={getLocation}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                Enable Location Access
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-2"></div>
              <p className="text-gray-300">Getting your location...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {location && (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-cyan-400">📍</span>
                <span className="text-white">{location.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-cyan-400">🌐</span>
                <span className="text-gray-300">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Delivery Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            {getStatusIcon(deliveryStatus.status)} Delivery Status
          </h2>

          {/* Status Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">{deliveryStatus.message}</span>
              <span className="text-cyan-400 font-semibold">{deliveryStatus.estimatedTime}</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${getStatusColor(deliveryStatus.status)}`}
                initial={{ width: 0 }}
                animate={{ 
                  width: deliveryStatus.status === 'preparing' ? '20%' :
                         deliveryStatus.status === 'shipped' ? '40%' :
                         deliveryStatus.status === 'in-transit' ? '60%' :
                         deliveryStatus.status === 'out-for-delivery' ? '80%' : '100%'
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            {[
              { status: 'preparing', label: 'Order Prepared', icon: '📦' },
              { status: 'shipped', label: 'Shipped', icon: '🚚' },
              { status: 'in-transit', label: 'In Transit', icon: '✈️' },
              { status: 'out-for-delivery', label: 'Out for Delivery', icon: '🛵' },
              { status: 'delivered', label: 'Delivered', icon: '✅' }
            ].map((step, index) => (
              <motion.div
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                  deliveryStatus.status === step.status
                    ? 'bg-cyan-500/20 border border-cyan-500/50'
                    : 'bg-gray-700/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  deliveryStatus.status === step.status
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    deliveryStatus.status === step.status
                      ? 'text-cyan-400'
                      : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  {deliveryStatus.status === step.status && deliveryStatus.currentLocation && (
                    <p className="text-sm text-gray-300">{deliveryStatus.currentLocation}</p>
                  )}
                </div>
                {deliveryStatus.status === step.status && (
                  <div className="animate-pulse">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            🏠 Back to Home
          </button>
          
          <button
            onClick={() => router.push('/orders')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
          >
            📋 View All Orders
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DeliveryPage;