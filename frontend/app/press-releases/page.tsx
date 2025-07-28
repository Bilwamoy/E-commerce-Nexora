"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar, Clock, User, Tag, ArrowLeft, ExternalLink,
  TrendingUp, Award, Globe, Users, DollarSign, ShoppingBag,
  Filter, Search, ChevronDown, ChevronUp, FileText, Share2, X
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const pressReleases = [
  {
    id: 1,
    title: "Nexora Reaches 2 Million Happy Customers Milestone",
    summary: "Nexora celebrates a major milestone as we reach 2 million satisfied customers across India, marking a significant achievement in our journey to become the leading e-commerce platform.",
    content: "Nexora, India's fastest-growing e-commerce platform, is proud to announce that we have reached the milestone of 2 million happy customers. This achievement reflects our commitment to providing exceptional products and service to our valued customers nationwide.\n\nOur growth has been driven by our focus on customer satisfaction, wide product selection, and reliable delivery services. We continue to invest in technology and infrastructure to serve our customers better.\n\n'This milestone is a testament to the trust our customers have placed in us,' said our CEO. 'We remain committed to delivering the best shopping experience possible.'",
    date: "2024-01-15",
    author: "Nexora Communications Team",
    category: "Company News",
    tags: ["Milestone", "Customers", "Growth"],
    readTime: "3 min read",
    featured: true,
    image: "/hero.jpg"
  },
  {
    id: 2,
    title: "Nexora Launches New Mobile App with Enhanced Features",
    summary: "The new Nexora mobile app brings improved user experience, faster checkout, and exclusive mobile-only deals to enhance your shopping experience.",
    content: "We're excited to announce the launch of our completely redesigned mobile app, featuring enhanced user experience, faster checkout process, and exclusive mobile-only deals.\n\nThe new app includes:\n• Improved product search and filtering\n• One-tap checkout with saved payment methods\n• Real-time order tracking\n• Personalized recommendations\n• Mobile-exclusive flash sales\n\nDownload the app today and enjoy a seamless shopping experience on the go!",
    date: "2024-01-10",
    author: "Product Team",
    category: "Product Launch",
    tags: ["Mobile App", "Technology", "User Experience"],
    readTime: "2 min read",
    featured: false,
    image: "/smartphones.jpg"
  },
  {
    id: 3,
    title: "Nexora Partners with Leading Electronics Brands",
    summary: "Strategic partnerships with top electronics manufacturers to bring exclusive products and better prices to our customers.",
    content: "Nexora is proud to announce strategic partnerships with leading electronics manufacturers including Samsung, Apple, Sony, and LG. These partnerships will enable us to offer exclusive products, better prices, and enhanced customer support.\n\nBenefits for our customers:\n• Exclusive product launches\n• Competitive pricing\n• Extended warranty options\n• Dedicated customer support\n• Early access to new releases\n\nThese partnerships strengthen our position as the go-to destination for electronics shopping in India.",
    date: "2024-01-05",
    author: "Partnership Team",
    category: "Partnerships",
    tags: ["Partnerships", "Electronics", "Brands"],
    readTime: "4 min read",
    featured: true,
    image: "/laptops.jpg"
  },
  {
    id: 4,
    title: "Nexora Expands to 50+ Cities Across India",
    summary: "Our delivery network now covers 50+ cities, ensuring faster delivery and better service to customers nationwide.",
    content: "Nexora is expanding its delivery network to cover 50+ cities across India. This expansion will ensure faster delivery times and better service for customers nationwide.\n\nNew cities added to our network include:\n• Tier 2 and Tier 3 cities\n• Remote locations with growing demand\n• Industrial hubs and tech corridors\n\nOur logistics partners are working round the clock to ensure seamless delivery experience for all customers.",
    date: "2023-12-28",
    author: "Operations Team",
    category: "Expansion",
    tags: ["Expansion", "Delivery", "Logistics"],
    readTime: "3 min read",
    featured: false,
    image: "/truck.jpg"
  },
  {
    id: 5,
    title: "Nexora Introduces AI-Powered Product Recommendations",
    summary: "Advanced AI technology to provide personalized product recommendations based on your shopping behavior and preferences.",
    content: "Nexora is introducing AI-powered product recommendations to enhance your shopping experience. Our advanced machine learning algorithms analyze your shopping behavior, preferences, and browsing patterns to suggest products you'll love.\n\nKey features:\n• Personalized recommendations\n• Smart search suggestions\n• Price drop alerts\n• Similar product suggestions\n• Seasonal recommendations\n\nThis technology helps you discover new products and make informed purchasing decisions.",
    date: "2023-12-20",
    author: "AI Team",
    category: "Technology",
    tags: ["AI", "Technology", "Personalization"],
    readTime: "3 min read",
    featured: false,
    image: "/gaming.jpg"
  }
];

const categories = ["All", "Company News", "Product Launch", "Partnerships", "Expansion", "Technology"];

export default function PressReleasesPage() {
  const router = useRouter();
  const [selectedRelease, setSelectedRelease] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === "All" || release.category === selectedCategory;
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (release: any) => {
    if (navigator.share) {
      navigator.share({
        title: release.title,
        text: release.summary,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${release.title}\n\n${release.summary}\n\nRead more at: ${window.location.href}`);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Press Releases</h1>
              <p className="text-gray-600 mt-1">Latest news and announcements from Nexora</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search press releases..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Featured Only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">This Month</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Last 3 Months</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredReleases.length} of {pressReleases.length} press releases
          </p>
        </div>

        {/* Press Releases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredReleases.map((release) => (
            <div
              key={release.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedRelease(release)}
            >
              {release.image && (
                <div className="h-48 bg-gray-200 rounded-t-xl overflow-hidden">
                  <img
                    src={release.image}
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(release.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {release.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {release.author}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {release.category}
                  </span>
                  {release.featured && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 ml-2">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {release.title}
                </h3>

                {/* Summary */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {release.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {release.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRelease(release);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(release);
                    }}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredReleases.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No press releases found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Modal for Detailed View */}
      {selectedRelease && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedRelease.title}</h2>
                <button
                  onClick={() => setSelectedRelease(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedRelease.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRelease.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedRelease.author}
                </div>
              </div>

              {/* Category and Tags */}
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {selectedRelease.category}
                </span>
                {selectedRelease.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6 font-medium">
                  {selectedRelease.summary}
                </p>
                <div className="text-gray-600 whitespace-pre-line">
                  {selectedRelease.content}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                {selectedRelease.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    <Tag className="w-4 h-4 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleShare(selectedRelease)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Release
                </button>
                <button
                  onClick={() => setSelectedRelease(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 