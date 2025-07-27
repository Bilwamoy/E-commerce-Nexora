'use client';

import React from 'react';
import { useCart } from '@/components/CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
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
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">Add some amazing products to get started!</p>
            <button 
              onClick={() => router.push('/shop')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Items</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-lg mr-6 shadow-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-2">Category: {item.category}</p>
                      <p className="text-2xl font-bold text-purple-600">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Item removed from cart');
                        }}
                        className="text-red-600 hover:text-red-800 font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Tax (18% GST)</span>
                    <span className="font-semibold">₹{(total * 0.18).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>₹{(total + (total * 0.18)).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Checkout
                </button>
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => router.push('/shop')}
                    className="text-purple-600 hover:text-purple-800 font-medium transition-colors"
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