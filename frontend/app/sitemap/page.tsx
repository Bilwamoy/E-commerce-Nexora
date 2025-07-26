'use client';

import Link from 'next/link';

export default function SitemapPage() {
  const sitemapData = [
    {
      category: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'All Products', href: '/product' },
        { name: 'Cart', href: '/cart' },
        { name: 'Login', href: '/login' },
        { name: 'Account', href: '/account' },
      ]
    },
    {
      category: 'Product Categories',
      links: [
        { name: 'Mobiles', href: '/product/mobiles' },
        { name: 'Computers', href: '/product/computers' },
        { name: 'Electronics', href: '/product/electronics' },
        { name: 'TV', href: '/product/tv' },
        { name: 'Home & Kitchen', href: '/product/home-kitchen' },
        { name: 'Toys & Games', href: '/product/toys-games' },
      ]
    },
    {
      category: 'Company Information',
      links: [
        { name: 'About Nexora', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Sell on Nexora', href: '/sell-on-nexora' },
        { name: 'Download App', href: '/download-app' },
      ]
    },
    {
      category: 'Legal & Support',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Use', href: '/terms-of-use' },
        { name: 'Customer Support', href: '#' },
        { name: 'Returns & Refunds', href: '#' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sitemap</h1>
            <p className="text-gray-600">Find all pages and sections of our website</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sitemapData.map((section) => (
              <div key={section.category} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  {section.category}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.href === '#' ? (
                        <span className="text-gray-500 cursor-not-allowed">
                          {link.name} (Coming Soon)
                        </span>
                      ) : (
                        <Link 
                          href={link.href}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Need Help?</h3>
            <p className="text-blue-800 mb-4">
              Can&apos;t find what you&apos;re looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/faq"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 