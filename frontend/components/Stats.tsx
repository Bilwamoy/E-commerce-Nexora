'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Package, Clock, Star } from 'lucide-react';

const Stats = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      id: 1,
      number: 50,
      suffix: "K+",
      label: "Happy Customers",
      description: "Trusted by customers nationwide",
      icon: Users,
    },
    {
      id: 2,
      number: 10,
      suffix: "K+",
      label: "Products Available",
      description: "Wide range of premium electronics",
      icon: Package,
    },
    {
      id: 3,
      number: 24,
      suffix: "/7",
      label: "Customer Support",
      description: "Round-the-clock assistance",
      icon: Clock,
    },
    {
      id: 4,
      number: 99,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Customer satisfaction guarantee",
      icon: Star,
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
      <span className="text-4xl lg:text-5xl font-bold text-gray-900">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="text-center">
                {/* Icon with purple-to-blue gradient circle */}
                <div className="size-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="size-8 text-white" />
                </div>
                
                {/* Statistic */}
                <div className="mb-2">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats; 