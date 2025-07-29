'use client';

import React from 'react';
import Carousel from './carousel';
import { Button } from './ui/button';

const CustomHero = () => {
  const heroSlides = [
    {
      id: 1,
      title: "New Collection 2024",
      subtitle: "Discover the latest trends in technology",
      description: "Get up to 50% off on premium electronics and gadgets",
      ctaText: "Shop Now",
      ctaLink: "/product",
      bgColor: "bg-gradient-to-r from-blue-600 to-purple-600",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Premium Smartphones",
      subtitle: "Latest Flagship Models",
      description: "Experience cutting-edge technology with our premium smartphone collection",
      ctaText: "Explore Phones",
      ctaLink: "/product",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    },
    {
      id: 3,
      title: "Gaming & Entertainment",
      subtitle: "Level Up Your Experience",
      description: "High-performance gaming laptops and accessories for the ultimate gaming setup",
      ctaText: "Shop Gaming",
      ctaLink: "/product",
      bgColor: "bg-gradient-to-r from-red-500 to-pink-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Home & Lifestyle",
      subtitle: "Smart Living Solutions",
      description: "Transform your home with smart devices and lifestyle products",
      ctaText: "Discover More",
      ctaLink: "/product",
      bgColor: "bg-gradient-to-r from-orange-500 to-yellow-500",
      textColor: "text-white",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  return (
    <section className="relative w-full">
      <Carousel autoPlay={true} interval={6000}>
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className={`relative h-[600px] ${slide.bgColor} overflow-hidden`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center max-w-4xl mx-auto px-6">
                <div className="mb-4">
                  <h2 className={`text-sm font-semibold tracking-wider uppercase mb-2 ${slide.textColor}`}>
                    {slide.subtitle}
                  </h2>
                  <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${slide.textColor}`}>
                    {slide.title}
                  </h1>
                  <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${slide.textColor} opacity-90`}>
                    {slide.description}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.ctaText}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Additional Features */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default CustomHero;