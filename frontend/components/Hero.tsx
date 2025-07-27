'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, Star, Zap, Shield, Truck } from 'lucide-react';
import Carousel from './carousel';

const Hero = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      id: 1,
      title: "Next-Gen Tech",
      subtitle: "Experience the Future",
      description: "Discover cutting-edge smartphones and electronics that redefine what's possible",
      ctaText: "Explore Collection",
      ctaLink: "/shop",
      image: "/hero.jpg",
      accent: "from-indigo-500 to-purple-600",
      features: ["5G Ready", "AI Powered", "Premium Quality"]
    },
    {
      id: 2,
      title: "Smart Living",
      subtitle: "Connected Lifestyle",
      description: "Transform your home with intelligent devices that make life easier and more enjoyable",
      ctaText: "Shop Smart Home",
      ctaLink: "/shop",
      image: "/hero2.jpg",
      accent: "from-emerald-500 to-teal-600",
      features: ["Voice Control", "Energy Efficient", "Easy Setup"]
    },
    {
      id: 3,
      title: "Gaming Excellence",
      subtitle: "Level Up Your Game",
      description: "High-performance gaming gear designed for competitive players and enthusiasts",
      ctaText: "View Gaming",
      ctaLink: "/shop",
      image: "/hero3.jpg",
      accent: "from-rose-500 to-pink-600",
      features: ["High FPS", "Low Latency", "Premium Audio"]
    }
  ];

  const handleShopNow = (link: string) => {
    router.push(link);
  };

  const renderSlide = (slide: any, index: number) => (
    <div key={slide.id} className="relative w-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">New Arrivals</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {slide.title}
                <span className={`block bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}>
                  {slide.subtitle}
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg">
                {slide.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {slide.features.map((feature: string, featureIndex: number) => (
                <div key={featureIndex} className="flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleShopNow(slide.ctaLink)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  {slide.ctaText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Premium Tech</h3>
                  <p className="text-gray-600">Experience the difference</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">50%</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xs">NEW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
    </div>
  );

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <Carousel autoPlay={true} interval={5000}>
        {heroSlides.map((slide, index) => renderSlide(slide, index))}
      </Carousel>
    </section>
  );
};

export default Hero; 