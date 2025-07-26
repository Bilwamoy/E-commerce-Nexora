/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Temporarily disable ESLint for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Completely disable SWC to avoid download issues
  swcMinify: false,
  
  // Disable SWC compilation completely
  experimental: {
    forceSwcTransforms: false,
    swcTraceProfiling: false,
    swcPlugins: false,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Use webpack instead of SWC
  webpack: (config, { isServer }) => {
    // Disable SWC loader
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.loader && oneOfRule.loader.includes('swc')) {
            oneOfRule.loader = require.resolve('babel-loader');
            oneOfRule.options = {
              presets: ['next/babel'],
            };
          }
        });
      }
    });
    return config;
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/product',
        permanent: true,
      },
    ]
  },
};

export default nextConfig
