'use client';

import React, { useState } from 'react';

const NexoraLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex items-center cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Icon */}
      <div className="relative mr-2">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          className="overflow-visible"
        >
          {/* Outer ring */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
            className={`transition-all duration-700 ${
              isHovered ? 'stroke-dasharray-[113] stroke-dashoffset-[0]' : 'stroke-dasharray-[90,23] stroke-dashoffset-[113]'
            }`}
            style={{
              transformOrigin: '20px 20px',
              animation: isHovered ? 'spin 2s linear infinite' : 'none'
            }}
          />
          {/* Inner diamond shape */}
          <path
            d="M20 6 L30 20 L20 34 L10 20 Z"
            fill="url(#gradient2)"
            className={`transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            style={{ transformOrigin: '20px 20px' }}
          />
          {/* Center dot */}
          <circle
            cx="20"
            cy="20"
            r="3"
            fill="#fff"
            className={`transition-all duration-300 ${
              isHovered ? 'scale-150' : 'scale-100'
            }`}
            style={{ transformOrigin: '20px 20px' }}
          />
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Animated Text */}
      <div className="relative overflow-hidden">
        <h1 className="text-2xl font-bold tracking-tight">
          {/* Letter animations */}
          {'NEXORA'.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-300 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent ${
                isHovered 
                  ? 'animate-bounce' 
                  : ''
              }`}
              style={{
                animationDelay: isHovered ? `${index * 0.1}s` : '0s',
                animationDuration: '0.6s'
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        {/* Underline animation */}
        <div 
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />
      </div>
      {/* CSS animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default NexoraLogo; 