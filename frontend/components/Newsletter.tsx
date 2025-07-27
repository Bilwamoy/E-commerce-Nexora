'use client';

import React, { useState } from 'react';
import { Mail, Bell, Zap, ArrowRight, CheckCircle, Star } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        
        // Reset the success message after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      } else {
        const error = await response.json();
        alert('Failed to subscribe: ' + (error.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Side */}
            <div className="p-12 lg:p-16">
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                    <Star className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700">Stay Connected</span>
                  </div>
                  
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Never Miss
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      a Great Deal
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Join our community of tech enthusiasts and get exclusive access to early releases, 
                    special discounts, and insider tech insights delivered straight to your inbox.
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Exclusive subscriber-only discounts</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Early access to new product launches</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">Weekly tech trends and insights</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Success Message */}
                {isSubscribed && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-800 font-medium">
                        Successfully subscribed! Check your email for confirmation.
                      </span>
                    </div>
                  </div>
                )}

                {/* Privacy Notice */}
                <p className="text-sm text-gray-500">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy-policy" className="text-blue-600 hover:text-blue-700 underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms-of-use" className="text-blue-600 hover:text-blue-700 underline">
                    Terms of Service
                  </a>
                  . You can unsubscribe at any time.
                </p>
              </div>
            </div>

            {/* Visual Side */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute top-1/4 right-0 w-24 h-24 bg-white rounded-full translate-x-12"></div>
                <div className="absolute bottom-0 left-1/3 w-20 h-20 bg-white rounded-full translate-y-10"></div>
              </div>
              
              {/* Content */}
              <div className="relative text-center text-white space-y-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-12 h-12" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Join 50,000+ Tech Enthusiasts</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Get the latest tech news, exclusive deals, and insider insights delivered to your inbox every week.
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-blue-100">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-sm text-blue-100">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 