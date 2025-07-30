"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
  originalPrice?: number;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.some(existingItem => existingItem.id === item.id)) {
        toast.error('Item already in wishlist!');
        return prev;
      }
      const newWishlist = [...prev, item];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
    toast.success('Added to wishlist!');
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => {
      const newWishlist = prev.filter(item => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
    toast.success('Removed from wishlist!');
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
} 