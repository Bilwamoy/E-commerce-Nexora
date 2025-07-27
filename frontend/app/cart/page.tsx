'use client';

import React from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="size-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <svg className="size-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">Add some amazing products to get started!</p>
            <button 
              onClick={() => router.push('/shop')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
        <ChatWidget />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cart Items ({cartItems.length})</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="size-20 object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          <p className="text-lg font-semibold text-gray-900 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="size-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="size-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{(total * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{(total * 1.18).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg mt-6"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-center">
                  <button
                    onClick={() => router.push('/shop')}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <ChatWidget />
    </>
  );
};

export default CartPage; 