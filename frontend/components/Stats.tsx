'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Package, Clock, Star, TrendingUp, Award, Shield, Zap, Truck, ArrowRight } from 'lucide-react';

const Stats = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      id: 1,
      number: 2000000,
      suffix: "+",
      label: "Happy Customers",
      description: "Trusted by customers nationwide",
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      id: 2,
      number: 10000,
      suffix: "+",
      label: "Products Available",
      description: "Wide range of premium electronics",
      icon: Package,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      id: 3,
      number: 24,
      suffix: "/7",
      label: "Customer Support",
      description: "Round-the-clock assistance",
      icon: Clock,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      id: 4,
      number: 100,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Customer satisfaction guarantee",
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isVisible && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }, [isVisible, target, hasAnimated]);

    return (
      <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6">
            <Award className="size-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Our Achievements</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Millions of Customers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We&apos;re proud of our track record in delivering exceptional products and service to our valued customers
          </p>
          
          {/* View All Achievements Button */}
          <button
            onClick={() => router.push('/achievements')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span>View All Achievements</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="group">
                <div 
                  onClick={() => router.push('/achievements')}
                  className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Icon */}
                  <div className={`size-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="size-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                      <h3 className="text-xl font-bold text-gray-900">
                        {stat.label}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Shield className="size-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Secure Shopping</h4>
                <p className="text-sm text-gray-600">SSL encrypted transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Truck className="size-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                <p className="text-sm text-gray-600">Same day dispatch available</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="size-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Growing Fast</h4>
                <p className="text-sm text-gray-600">Expanding nationwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 