"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Trash2, Eye, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWishlist } from '@/components/WishlistContext';
import { useCart } from '@/components/CartContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  originalPrice?: number;
}

export default function WishlistPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const sessionData = JSON.parse(userSession);
        setSession(sessionData);
      } catch (error) {
        console.error('Error parsing session:', error);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: Number(item.id),
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      slug: ''
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    removeFromWishlist(itemId);
    toast.success('Item removed from wishlist');
  };

  const handleViewProduct = (item: WishlistItem) => {
    // Navigate to product detail page using ID-based route
    router.push(`/product/id/${item.id}`);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart({
        id: Number(item.id),
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        slug: ''
      });
    });
    toast.success('All items moved to cart!');
  };

  const handleClearWishlist = () => {
    wishlistItems.forEach(item => {
      removeFromWishlist(item.id);
    });
    toast.success('Wishlist cleared!');
  };

  const filteredItems = selectedCategory === 'all' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(wishlistItems.map(item => item.category)))];

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleMoveAllToCart}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move All to Cart</span>
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filter */}
        {wishlistItems.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start adding items to your wishlist to see them here.</p>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items in this category</h3>
            <p className="text-gray-500">Try selecting a different category or add more items to your wishlist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => handleViewProduct(item)}
                      className="p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                      title="View Product"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="p-2 bg-white/80 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                  {typeof item.discount === 'number' && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{item.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {typeof item.originalPrice === 'number' && item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {wishlistItems.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Wishlist Summary</h3>
                <p className="text-gray-600">
                  Total items: {wishlistItems.length} | 
                  Total value: ₹{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleMoveAllToCart}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Move All to Cart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 