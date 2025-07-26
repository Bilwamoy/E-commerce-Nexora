"use client";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { useLanguage } from "@/components/LanguageContext";
import { User, CreditCard, Shield, Truck, Lock, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [checkedOut, setCheckedOut] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    address: "",
    phone: ""
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    bankName: ""
  });
  const [otp, setOtp] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  // Send real OTP to user's phone
  const sendOTP = async () => {
    if (!form.phone) {
      toast.error("Please enter your phone number first");
      return;
    }

    try {
      const response = await fetch('/api/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP sent to your phone! Check your messages.");
        // Store the OTP temporarily for verification (in real app, this would be server-side)
        const tempOTP = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOTP(tempOTP);
        console.log(`Demo OTP for testing: ${tempOTP}`);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error('OTP sending error:', error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!form.name || !form.email || !form.address || !form.phone) {
      setFormError(t('allFieldsRequired'));
      return;
    }

    if (!paymentForm.cardNumber || !paymentForm.cardHolder || !paymentForm.expiry || !paymentForm.cvv) {
      setFormError("Please fill all payment details");
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      sendOTP();
      setShowOTP(true);
    }, 2000);
  };

  const handleOTPVerification = () => {
    if (otp === generatedOTP) {
      // Simulate successful payment
      const orderId = `NEX${Date.now()}`;
      const orderData = {
        orderId,
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        deliveryAddress: form.address,
        items: cartItems,
        total: total + (total * 0.18),
        tax: total * 0.18,
        subtotal: total,
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        trackingNumber: `TRK${Date.now()}`
      };
      
      setOrderDetails(orderData);
      setOrderConfirmed(true);
      clearCart();
      toast.success("Payment successful! Order confirmed.");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  if (orderConfirmed && orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been successfully placed.</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-green-800 font-semibold">Order ID: {orderDetails.orderId}</p>
              <p className="text-green-700 text-sm">Tracking Number: {orderDetails.trackingNumber}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{new Date(orderDetails.orderDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span>{new Date(orderDetails.estimatedDelivery).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg">₹{orderDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Delivery Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block">Name:</span>
                  <span className="font-semibold">{orderDetails.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Phone:</span>
                  <span>{orderDetails.customerPhone}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Address:</span>
                  <span>{orderDetails.deliveryAddress}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Tracking Number:</span>
                  <span className="font-semibold text-blue-600">{orderDetails.trackingNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Order Items</h2>
            <div className="space-y-4">
              {orderDetails.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-600 text-sm">{item.category}</div>
                    <div className="text-gray-600">Qty: {item.quantity}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link 
              href="/track-order" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Truck className="w-5 h-5 mr-2" />
              Track Order
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Payment</h2>
              <p className="text-gray-600">Enter the 6-digit OTP sent to your phone</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                />
              </div>

                             <div className="text-center text-sm text-gray-600">
                 <p>Didn't receive OTP? <button className="text-blue-600 hover:underline" onClick={() => sendOTP()}>Resend</button></p>
               </div>

                             <button
                 onClick={handleOTPVerification}
                 disabled={otp.length !== 6}
                 className="w-full bg-amazon-blue hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
               >
                Verify & Complete Payment
              </button>

              <button
                onClick={() => setShowOTP(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h2>
              <p className="text-gray-600">Complete your purchase securely</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value.replace(/\D/g, '')})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  value={paymentForm.cardHolder}
                  onChange={(e) => setPaymentForm({...paymentForm, cardHolder: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={paymentForm.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                      }
                      setPaymentForm({...paymentForm, expiry: value});
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value.replace(/\D/g, '')})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>

                             <div className="bg-amazon-yellow/10 border border-amazon-yellow/20 rounded-lg p-4">
                 <div className="flex items-center gap-2 text-amazon-blue">
                   <Shield className="w-5 h-5" />
                   <span className="font-semibold">Secure Payment</span>
                 </div>
                 <p className="text-gray-700 text-sm mt-1">
                   Your payment information is encrypted and secure. This is a simulation for demonstration purposes.
                 </p>
               </div>

              {formError && <div className="text-red-600 text-sm">{formError}</div>}

              <div className="flex gap-4">
                                 <button
                   onClick={handlePayment}
                   disabled={loading}
                   className="flex-1 bg-amazon-blue hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ₹{(total + (total * 0.18)).toFixed(0)}
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowPayment(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-lg mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">{t('checkout')}</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('namePlaceholder')}
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('emailPlaceholder')}
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('addressPlaceholder')}
                  rows={3}
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                />
              </div>
              {formError && <div className="text-red-600 text-sm">{formError}</div>}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                type="button"
                onClick={() => setShowPayment(true)}
              >
                Proceed to Payment
              </button>
              <button
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Back to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* User Info */}
        {session && session.user && (
          <div className="flex items-center gap-3 mb-6 p-4 bg-white rounded-lg shadow-sm border">
            {session.user.image ? (
              <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full border-2 border-amazon-blue" />
            ) : (
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 border-2 border-amazon-blue">
                <User className="w-6 h-6 text-amazon-blue" />
              </span>
            )}
            <div>
              <div className="font-semibold text-lg">{session.user.name || t('guest')}</div>
              <div className="text-sm text-gray-500">{session.user.email}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('yourCart')}</h1>
            
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('cartEmpty')}</h2>
                <p className="text-gray-600 mb-4">Add some products to get started!</p>
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-amazon-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center gap-4">
                      <Link href={`/product/${item.category.toLowerCase().replace(/\s+/g, '-')}/${item.slug}`} className="flex items-center gap-4 flex-1">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-contain rounded-lg" />
                        <div className="flex-1">
                          <div className="font-semibold text-lg hover:underline text-amazon-blue">{item.name}</div>
                          <div className="text-gray-600 text-sm">{item.category}</div>
                          <div className="text-gray-600">₹{item.price.toLocaleString()} x {item.quantity}</div>
                        </div>
                      </Link>
                      <div className="text-right">
                        <div className="font-bold text-xl text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</div>
                        <button
                          className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (18%)</span>
                    <span>₹{(total * 0.18).toFixed(0)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{(total + (total * 0.18)).toFixed(0)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Secure payment simulation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-blue-500" />
                    <span>Free delivery on orders above ₹499</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Estimated delivery: 3-5 days</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    className="w-full bg-amazon-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    onClick={() => setShowForm(true)}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 