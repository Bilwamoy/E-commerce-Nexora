"use client";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/components/CartContext";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useRouter } from "next/navigation";
import NexoraLogo from "@/components/NexoraLogo";
import { useSession, signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useWishlist } from "@/components/WishlistContext";
import { useNotifications } from "@/components/NotificationContext";
import { 
  Search, User, MapPin, ShoppingCart, Mic, ChevronDown, Menu, X, 
  Bell, Heart, Package, Zap, Grid, Gift, Star, TrendingUp,
  Smartphone, Laptop, Headphones, Watch, Camera, Gamepad2,
  Home, ShoppingBag, UserCheck, Settings, LogOut, Crown, Shield, Car
} from "lucide-react";

const languageOptions = [
  "English", "हिन्दी", "বাংলা", "தமிழ்", "తెలుగు", "మరాఠీ", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ", "Français", "Deutsch", "Español", "Italiano", "Português", "中文", "日本語", "한국어", "Русский", "العربية"
];

const categories = [
  { name: "Electronics", icon: Smartphone, subcategories: ["TV", "Computers", "Mobiles", "Appliances", "Accessories"], slug: "electronics" },
  { name: "Fashion", icon: User, subcategories: ["Men's Fashion", "Women's Fashion", "Kids", "Accessories"], slug: "fashion" },
  { name: "Home & Kitchen", icon: Home, subcategories: ["Furniture", "Decor", "Kitchen", "Garden"], slug: "home-kitchen" },
  { name: "Sports & Outdoors", icon: TrendingUp, subcategories: ["Fitness", "Outdoor", "Team Sports", "Equipment"], slug: "sports-outdoors" },
  { name: "Books", icon: Package, subcategories: ["Kindle E-Readers", "Audible Audiobooks", "Fiction", "Non-Fiction"], slug: "books" },
  { name: "Beauty & Personal Care", icon: Star, subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"], slug: "beauty-personal-care" },
  { name: "Toys & Games", icon: Gamepad2, subcategories: ["Action Figures", "Board Games", "Educational", "Outdoor"], slug: "toys-games" },
  { name: "Automotive", icon: Car, subcategories: ["Car Care", "Accessories", "Tools", "Electronics"], slug: "automotive" }
];



export function NexoraNavbar() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [location, setLocation] = useState("Kolkata 700007");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [showLang, setShowLang] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { lang, setLang, t } = useLanguage();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  
  const languageMap: Record<string, 'en' | 'hi' | 'bn'> = {
    English: "en",
    हिन्दी: "hi",
    বাংলা: "bn",
  };
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        setSession(JSON.parse(userSession));
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }
    
    // Listen for storage changes to update session when user logs in/out
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userSession') {
        if (e.newValue) {
          try {
            setSession(JSON.parse(e.newValue));
          } catch (error) {
            console.error('Error parsing session:', error);
          }
        } else {
          setSession(null);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event listener for same-tab session changes
    const handleSessionChange = (e: CustomEvent) => {
      if (e.detail) {
        setSession(e.detail);
      } else {
        setSession(null);
      }
    };
    
    window.addEventListener('sessionChange', handleSessionChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionChange', handleSessionChange as EventListener);
    };
  }, []);

  async function detectLocation() {
    setLocationLoading(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
        const data = await res.json();
        const address = data.results?.[0]?.formatted_address || `${latitude.toFixed(3)},${longitude.toFixed(3)}`;
        setLocation(address);
      } catch (e) {
        setLocationError("Failed to fetch address.");
      }
      setLocationLoading(false);
    }, (err) => {
      setLocationError("Location permission denied.");
      setLocationLoading(false);
    });
  }

  function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang === 'English' ? 'en-US' : 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      // Auto-search after voice input
      setTimeout(() => {
        handleSearch();
      }, 500);
    };
    recognitionRef.current = recognition;
    recognition.start();
  }

  function stopVoiceSearch() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/shop?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLanguageChange = (langName: string) => {
    setSelectedLang(langName);
    setShowLang(false);
    if (languageMap[langName]) {
      setLang(languageMap[langName]);
      // Apply language change to the entire website
      document.documentElement.lang = languageMap[langName];
      // You can add more language-specific logic here
      toast.success(`Language changed to ${langName}`);
    }
  };

  return (
    <header className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 sticky top-0 z-50 w-full border-b border-purple-500/30 backdrop-blur-xl">
      <Toaster position="top-right" />
      
      {/* Top Promotional Bar */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-2 animate-pulse">
                <Zap className="size-4" />
                <span className="font-semibold">FLASH SALE: Up to 80% OFF</span>
              </span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Free Delivery on Orders Above ₹499</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline cursor-pointer hover:text-yellow-200 transition-colors">Track Order</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline cursor-pointer hover:text-yellow-200 transition-colors">Help & Support</span>
            </div>
          </div>
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Section - Logo and Categories */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
                 onClick={() => router.push("/")}>
              <NexoraLogo />
            </div>

            {/* Categories Menu */}
            <div className="hidden lg:block relative">
              <button
                className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                onMouseEnter={() => setShowCategoryMenu(true)}
              >
                <Grid className="size-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-medium">Categories</span>
                <ChevronDown className={`size-4 transition-transform duration-200 ${showCategoryMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Categories Dropdown */}
              {showCategoryMenu && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white text-gray-900 rounded-2xl shadow-2xl z-50 border border-gray-200"
                  onMouseLeave={() => setShowCategoryMenu(false)}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Grid className="size-5 text-purple-600" />
                      All Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <div key={cat.name} className="group">
                          <button 
                            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
                            onClick={() => {
                              setShowCategoryMenu(false);
                              router.push(`/product/${cat.slug}`);
                            }}
                          >
                            <cat.icon className="size-5 text-purple-600 group-hover:scale-110 transition-transform" />
                            <div>
                              <div className="font-medium text-gray-900">{cat.name}</div>
                              <div className="text-xs text-gray-500">{cat.subcategories.length} subcategories</div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Search (Refactored for better grouping) */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className={`flex w-full rounded-2xl overflow-hidden transition-all duration-300 bg-white shadow-lg ${isSearchFocused ? 'ring-4 ring-purple-400 shadow-2xl' : ''}`}> 
              {/* Category Dropdown */}
              <select
                className="h-14 px-4 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm border-r border-gray-300 focus:outline-none focus:ring-0 cursor-pointer hover:bg-gray-200 transition-colors font-medium rounded-l-2xl"
                value={category}
                onChange={e => {
                  const selectedCat = e.target.value;
                  setCategory(selectedCat);
                  if (selectedCat !== "All Categories") {
                    const categoryMap: Record<string, string> = {
                      "Electronics": "electronics",
                      "Fashion": "fashion", 
                      "Home & Kitchen": "home-kitchen",
                      "Sports & Outdoors": "sports-outdoors",
                      "Books": "books",
                      "Beauty & Personal Care": "beauty-personal-care",
                      "Toys & Games": "toys-games",
                      "Automotive": "automotive"
                    };
                    const categorySlug = categoryMap[selectedCat] || selectedCat.toLowerCase().replace(/\s+/g, '-');
                    router.push(`/product/${categorySlug}`);
                  }
                }}
              >
                <option value="All Categories">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="Books">Books</option>
                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                <option value="Toys & Games">Toys & Games</option>
                <option value="Automotive">Automotive</option>
              </select>
              {/* Search Input */}
              <input
                ref={searchInputRef}
                className="w-full h-14 px-6 text-gray-900 text-base focus:outline-none bg-white"
                placeholder="Search for products, brands and more..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyPress={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
              />
              {/* Mic Button (inline, not absolute) */}
              <button
                className={`h-14 px-5 flex items-center justify-center border-l border-r border-gray-200 transition-all duration-200 focus:outline-none ${listening ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse' : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700'}`}
                title="Voice Search"
                onClick={listening ? stopVoiceSearch : startVoiceSearch}
                tabIndex={0}
                style={{ borderRadius: 0 }}
              >
                <Mic className="size-5" />
              </button>
              {/* Search Button */}
              <button
                className="h-14 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-200 flex items-center justify-center group rounded-r-2xl"
                onClick={handleSearch}
              >
                <Search className="size-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Section - User Actions (even spacing, vertical centering) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button 
                className="flex items-center px-4 py-2 text-white text-sm font-medium hover:bg-white/10 rounded-xl transition-colors duration-200"
                onClick={() => setShowLang(!showLang)}
              >
                <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                  {selectedLang.slice(0, 2).toUpperCase()}
                </span>
                {selectedLang.slice(0, 2).toUpperCase()}
                <ChevronDown className="ml-1 size-4" />
              </button>
              {showLang && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto border border-gray-200">
                  {languageOptions.map(langName => (
                    <div
                      key={langName}
                      className={`px-4 py-3 cursor-pointer hover:bg-purple-50 transition-colors ${
                        selectedLang === langName ? 'font-bold bg-purple-100 text-purple-700' : ''
                      }`}
                      onClick={() => handleLanguageChange(langName)}
                    >
                      {langName}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Notifications */}
            <div className="relative">
              <button 
                className="relative p-3 text-white hover:bg-white/10 rounded-xl transition-colors duration-200 group"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="size-6 group-hover:scale-110 transition-transform" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-xl shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button 
                        className="text-sm text-purple-600 hover:text-purple-700"
                        onClick={markAllAsRead}
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Bell className="size-12 mx-auto mb-2 text-gray-300" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            notification.read ? 'bg-gray-50' : 'bg-purple-50'
                          } hover:bg-purple-100`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'success' ? 'bg-green-500' :
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{notification.title}</div>
                              <div className="text-sm text-gray-600">{notification.message}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                {new Date(notification.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Wishlist */}
            <div className="relative">
              <button 
                className="p-3 text-white hover:bg-white/10 rounded-xl transition-colors duration-200 group"
                onClick={() => setShowWishlist(!showWishlist)}
              >
                <Heart className="size-6 group-hover:scale-110 transition-transform" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              
              {/* Wishlist Dropdown */}
              {showWishlist && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-xl shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Wishlist</h3>
                  </div>
                  <div className="p-2">
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Heart className="size-12 mx-auto mb-2 text-gray-300" />
                        <p>Your wishlist is empty</p>
                      </div>
                    ) : (
                      wishlistItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-600">₹{item.price}</div>
                          </div>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account */}
            <div className="relative group">
              {session && session.user ? (
                <div className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200 cursor-pointer"
                     onClick={() => setShowUserMenu(!showUserMenu)}>
                  {session.user.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile" 
                      width={40}
                      height={40}
                      className="size-10 rounded-full border-2 border-purple-400 object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm opacity-90">Hello, {session.user.name?.split(' ')[0] || 'User'}</span>
                    <span className="text-sm font-medium">Account</span>
                  </div>
                  <ChevronDown className="size-4" />
                </div>
              ) : (
                <div className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200 cursor-pointer"
                     onClick={() => router.push("/login")}>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm opacity-90">Hello, sign in</span>
                    <span className="text-sm font-medium">Account</span>
                  </div>
                </div>
              )}
              
              {/* User Menu Dropdown */}
              {showUserMenu && session && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-xl shadow-xl z-50 border border-gray-200">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{session.user.name}</div>
                        <div className="text-sm text-gray-500">{session.user.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/profile');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/orders');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Package className="w-5 h-5" />
                      <span>Orders</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/wishlist');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>Wishlist</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push('/settings');
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button 
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => {
                        localStorage.removeItem('userSession');
                        setSession(null);
                        setShowUserMenu(false);
                        // Dispatch custom event to update navbar
                        window.dispatchEvent(new CustomEvent('sessionChange', { detail: null }));
                        router.push('/');
                      }}
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative group">
              <Link href="/cart" className="flex items-center space-x-3 px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-colors duration-200">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm opacity-90">Cart</span>
                  <span className="text-sm font-medium">{cartCount} items</span>
                </div>
              </Link>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="text-white hover:bg-white/10 p-3 rounded-xl transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="flex rounded-xl overflow-hidden shadow-lg">
            <select
              className="h-14 px-4 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm border-r border-gray-300 focus:outline-none"
              value={category}
              onChange={e => {
                const selectedCat = e.target.value;
                setCategory(selectedCat);
                if (selectedCat !== "All Categories") {
                  const categoryMap: { [key: string]: string } = {
                    "Electronics": "electronics",
                    "Fashion": "fashion", 
                    "Home & Kitchen": "home-kitchen",
                    "Sports & Outdoors": "sports-outdoors",
                    "Books": "books",
                    "Beauty & Personal Care": "beauty-personal-care",
                    "Toys & Games": "toys-games",
                    "Automotive": "automotive"
                  };
                  const categorySlug = categoryMap[selectedCat] || selectedCat.toLowerCase().replace(/\s+/g, '-');
                  router.push(`/product/${categorySlug}`);
                }
              }}
            >
              <option value="All Categories">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Books">Books</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Automotive">Automotive</option>
            </select>
            <input
              className="flex-1 h-14 px-4 text-gray-900 text-base focus:outline-none"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              className="h-14 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-200"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-slate-800 to-slate-900 border-t border-purple-500/20">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile User Section */}
            <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">Sign in to your account</div>
                <div className="text-gray-300 text-sm">Get personalized recommendations</div>
              </div>
              <button 
                onClick={() => router.push("/login")}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
              >
                Sign In
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/cart"
                className="flex flex-col items-center p-4 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <ShoppingCart className="w-6 h-6 mb-2" />
                <span className="text-sm">Cart ({cartCount})</span>
              </Link>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/wishlist');
                }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm">Wishlist</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/orders');
                }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <Package className="w-6 h-6 mb-2" />
                <span className="text-sm">Orders</span>
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push('/profile');
                }}
                className="flex flex-col items-center p-4 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                <UserCheck className="w-6 h-6 mb-2" />
                <span className="text-sm">Profile</span>
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h3 className="text-white font-medium mb-3">Categories</h3>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.name}
                  className="w-full flex items-center space-x-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push(`/product/${cat.slug}`);
                  }}
                >
                  <cat.icon className="w-5 h-5" />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 