'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Mic, ArrowLeft, Camera, Clock, TrendingUp, Star } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches, setTrendingSearches] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [showSearchContent, setShowSearchContent] = useState(true);

  // Initialize data on component mount
  useEffect(() => {
    // Get recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }

    // Get trending searches (top products by reviews)
    const trending = [...products]
      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
      .slice(0, 8);
    setTrendingSearches(trending);

    // Get popular products (top by rating)
    const popular = [...products]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
    setPopularProducts(popular);
  }, []);

  // Save search to recent searches
  const saveToRecentSearches = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 6);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchContent(true);
      return;
    }

    saveToRecentSearches(query);
    setIsSearching(true);
    setShowSearchContent(false);

    // Simulate search delay
    setTimeout(() => {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(query.toLowerCase())) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      performSearch(searchQuery.trim());
    }
  };

  // Handle trending search click
  const handleTrendingClick = (product: any) => {
    const query = product.name;
    setSearchQuery(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    performSearch(query);
  };

  // Handle recent search click
  const handleRecentClick = (query: string) => {
    setSearchQuery(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    performSearch(query);
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        router.push(`/search?q=${encodeURIComponent(transcript)}`);
        performSearch(transcript);
      };
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  // Handle image search (placeholder)
  const handleImageSearch = () => {
    alert('Image search feature coming soon!');
  };

  // Perform search when query changes from URL
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Mic className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    type="button"
                    onClick={handleImageSearch}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <Camera className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Search Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {showSearchContent && !searchQuery && (
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Recent Searches
                </h2>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentClick(search)}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Trending Searches
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trendingSearches.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleTrendingClick(product)}
                    className="text-left p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <Search className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Products */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Popular Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {!showSearchContent && (
          <div>
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Search Results for "{searchQuery}" ({searchResults.length} items)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No results found for "{searchQuery}"
                </h3>
                <p className="text-gray-500 mb-6">
                  Try checking your spelling or using different keywords
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchContent(true);
                    router.push('/search');
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse Trending
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;