'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Monitor, Gamepad2, Headphones, Tv, Home, ArrowRight, Star } from 'lucide-react';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Smartphones",
      description: "Latest mobile devices with cutting-edge technology",
      icon: Smartphone,
      count: "500+ Products",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      href: "/phones"
    },
    {
      id: 2,
      name: "Computers & Laptops",
      description: "High-performance computing solutions",
      icon: Monitor,
      count: "300+ Products",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      href: "/shop"
    },
    {
      id: 3,
      name: "Gaming & Entertainment",
      description: "Gaming accessories & consoles",
      icon: Gamepad2,
      count: "200+ Products",
      gradient: "from-red-500 to-orange-500",
      bgGradient: "from-red-50 to-orange-50",
      href: "/shop"
    },
    {
      id: 4,
      name: "Audio & Music",
      description: "Premium audio equipment",
      icon: Headphones,
      count: "150+ Products",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      href: "/shop"
    },
    {
      id: 5,
      name: "TV & Entertainment",
      description: "Professional entertainment systems",
      icon: Tv,
      count: "100+ Products",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50",
      href: "/shop"
    },
    {
      id: 6,
      name: "Smart Home",
      description: "Home automation & appliances",
      icon: Home,
      count: "80+ Products",
      gradient: "from-indigo-500 to-purple-500",
      bgGradient: "from-indigo-50 to-purple-50",
      href: "/shop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100 mb-6">
            <Star className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Featured Categories</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore Our
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Product Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium electronics and smart devices across all categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link 
                href={category.href}
                key={category.id}
                className="group block"
              >
                <div className={`relative bg-gradient-to-br ${category.bgGradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm font-semibold text-gray-500">
                        {category.count}
                      </span>
                      <div className={`w-8 h-8 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our complete product catalog with thousands of items across all categories
            </p>
            <Link 
              href="/product"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Browse All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories; 