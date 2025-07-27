'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import { toast } from 'react-hot-toast';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  Truck, 
  CheckCircle, 
  ArrowLeft,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'payment' | 'otp' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Secure payment gateway'
    },
    {
      id: 'paytm',
      name: 'Paytm',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Digital wallet payment'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Instant bank transfer'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    toast.success(`OTP sent to your phone: ${otp}`);
    return otp;
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const otp = generateOTP();
      setStep('otp');
      setIsProcessing(false);
    }, 2000);
  };

  const verifyOTP = () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp === generatedOtp) {
      setIsProcessing(true);
      
      // Simulate order processing
      setTimeout(() => {
        toast.success('Payment successful! Order placed successfully.');
        clearCart();
        setStep('success');
        setIsProcessing(false);
      }, 2000);
    } else {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
    }
  };

  const resendOTP = () => {
    const newOtp = generateOTP();
    setOtp(['', '', '', '', '', '']);
  };

  const getStepColor = (currentStep: string, targetStep: string) => {
    if (currentStep === targetStep) return 'bg-blue-600 text-white';
    if (targetStep === 'payment' && (currentStep === 'otp' || currentStep === 'success')) return 'bg-green-600 text-white';
    if (targetStep === 'otp' && currentStep === 'success') return 'bg-green-600 text-white';
    return 'bg-gray-200 text-gray-600';
  };

  if (cartItems.length === 0 && step !== 'success') {
    router.push('/cart');
    return null;
  }

  if (step === 'success') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-8">Your order has been placed successfully. You will receive a confirmation email shortly.</p>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/orders')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Orders
              </button>
            </div>
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
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Cart
              </button>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getStepColor(step, 'details')}`}>
                    1
                  </div>
                  <span className="text-sm">Details</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getStepColor(step, 'payment')}`}>
                    2
                  </div>
                  <span className="text-sm">Payment</span>
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${getStepColor(step, 'otp')}`}>
                    3
                  </div>
                  <span className="text-sm">Verify</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {step === 'details' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter full address"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter pincode"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => setStep('payment')}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Methods */}
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            paymentMethod === method.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {method.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Card Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter cardholder name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="123"
                            maxLength={4}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing Payment...' : 'Pay ₹' + total.toLocaleString('en-IN')}
                    </button>
                    <button
                      onClick={() => setStep('details')}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back to Details
                    </button>
                  </div>
                </div>
              )}

              {step === 'otp' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify OTP</h2>
                  <p className="text-gray-600 mb-6">We've sent a 6-digit OTP to your phone number. Please enter it below.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">Enter OTP</label>
                      <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                            maxLength={1}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={verifyOTP}
                        disabled={isProcessing || otp.join('').length !== 6}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Verifying...' : 'Verify OTP'}
                      </button>
                      <button
                        onClick={resendOTP}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Resend OTP
                      </button>
                      <button
                        onClick={() => setStep('payment')}
                        className="w-full text-gray-600 py-3 font-semibold hover:text-gray-800 transition-colors"
                      >
                        Back to Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Secure Payment</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Your payment information is encrypted and secure.</p>
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

export default CheckoutPage; 