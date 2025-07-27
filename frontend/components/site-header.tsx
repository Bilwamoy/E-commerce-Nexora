"use client";
import Link from "next/link";
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
import { Search, User, MapPin, ShoppingCart, Mic, ChevronDown, Menu, X, Bell, Heart, Package, Zap } from "lucide-react";

const languageOptions = [
  "English", "हिन्दी", "বাংলা", "தமிழ்", "తెలుగు", "మరాఠీ", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ", "Français", "Deutsch", "Español", "Italiano", "Português", "中文", "日本語", "한국어", "Русский", "العربية"
];

export function SiteHeader() {
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
  const categories = [
    "All Categories", "Fresh", "MX Player", "Sell", "Bestsellers", "Today's Deals", "Mobiles", "Prime", "Customer Service", "Fashion", "New Releases", "Home & Kitchen", "Electronics", "Amazon Pay", "Computers", "Toys", "Books", "Sports", "Beauty", "Automotive", "Grocery", "Pet Supplies", "Garden", "Tools", "Office Products", "Baby", "Health & Personal Care"
  ];
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { lang, setLang, t } = useLanguage();
  const languageMap: Record<string, 'en' | 'hi' | 'bn'> = {
    English: "en",
    हिन्दी: "hi",
    বাংলা: "bn",
    // Add more mappings as needed
  };
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  // Check for session in localStorage on component mount
  useEffect(() => {
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        setSession(JSON.parse(userSession));
      } catch (error) {
        console.error('Error parsing session:', error);
      }
    }
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

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 sticky top-0 z-50 w-full border-b border-purple-500/20 backdrop-blur-md">
      <Toaster position="top-right" />
      
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Flash Sale: Up to 70% off on Electronics
              </span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Free Delivery on Orders Above ₹499</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:inline">Track Order</span>
              <span className="hidden md:inline">|</span>
              <span className="hidden md:inline">Help & Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => router.push("/")}>
            <NexoraLogo />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className={`flex w-full rounded-2xl overflow-hidden transition-all duration-300 ${
              isSearchFocused ? 'ring-2 ring-purple-400 shadow-lg' : 'shadow-md'
            }`}>
              {/* Category Dropdown */}
              <div className="relative">
                <select
                  className="h-12 px-4 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm border-r border-gray-300 focus:outline-none focus:ring-0 cursor-pointer hover:bg-gray-200 transition-colors"
                  value={category}
                  onChange={e => {
                    const selectedCat = e.target.value;
                    setCategory(selectedCat);
                    if (selectedCat !== "All Categories") {
                      const categorySlug = selectedCat.toLowerCase().replace(/\s+/g, '-');
                      router.push(`/product/${categorySlug}`);
                    }
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  className="w-full h-12 px-4 text-gray-900 text-sm focus:outline-none bg-white"
                  placeholder="Search for products, brands and more..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>

              {/* Search Button */}
              <button
                className="h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 flex items-center justify-center group"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Voice Search Button */}
            <button
              className={`ml-3 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                listening 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg'
              }`}
              title="Voice Search"
              onClick={listening ? stopVoiceSearch : startVoiceSearch}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button 
                className="flex items-center px-3 py-2 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setShowLang(!showLang)}
              >
                {selectedLang.slice(0, 2).toUpperCase()}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {showLang && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto border border-gray-200">
                  {languageOptions.map(langName => (
                    <div
                      key={langName}
                      className={`px-4 py-2 cursor-pointer hover:bg-purple-50 transition-colors ${
                        selectedLang === langName ? 'font-bold bg-purple-100 text-purple-700' : ''
                      }`}
                      onClick={() => {
                        setSelectedLang(langName);
                        setShowLang(false);
                        if (languageMap[langName]) setLang(languageMap[langName]);
                      }}
                    >
                      {langName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative group">
              {session && session.user ? (
                <div className="flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
                     onClick={() => {
                       localStorage.removeItem('userSession');
                       setSession(null);
                       router.push('/');
                     }}>
                  {session.user.image ? (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-purple-400 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs opacity-90">Hello, {session.user.name?.split(' ')[0] || 'User'}</span>
                    <span className="text-sm font-medium">Account & Lists</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
                     onClick={() => router.push("/login")}>
                  <span className="text-xs opacity-90">Hello, sign in</span>
                  <span className="text-sm font-medium">Account & Lists</span>
                </div>
              )}
            </div>

            {/* Returns & Orders */}
            <Link href="/returns-orders" className="flex flex-col px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer">
              <span className="text-xs opacity-90">Returns</span>
              <span className="text-sm font-medium">& Orders</span>
            </Link>

            {/* Location */}
            <div className="relative group">
              <div className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer"
                   onClick={() => setShowLocationInput(!showLocationInput)}>
                <MapPin className="w-5 h-5 mr-1" />
                <div className="flex flex-col">
                  <span className="text-xs opacity-90">Deliver to</span>
                  <span className="text-sm font-medium">{location}</span>
                </div>
              </div>
              {showLocationInput && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-xl z-50 p-4 border border-gray-200">
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    onBlur={() => setShowLocationInput(false)}
                    autoFocus
                    placeholder="Enter your location"
                  />
                  <button
                    className="mt-2 w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200"
                    onClick={detectLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? "Detecting..." : "Detect Location"}
                  </button>
                  {locationError && <p className="mt-2 text-xs text-red-500">{locationError}</p>}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="flex flex-col items-center px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs">Wishlist</span>
            </button>

            {/* Cart */}
            <div className="relative group">
              <Link href="/cart" className="flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="ml-1 text-sm font-medium">Cart</span>
              </Link>
              {showCart && cartItems.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-xl z-50 p-4 border border-gray-200"
                     onMouseEnter={() => setShowCart(true)} 
                     onMouseLeave={() => setShowCart(false)}>
                  <h3 className="font-bold mb-2 text-purple-700">Cart Items</h3>
                  <ul className="max-h-40 overflow-y-auto">
                    {cartItems.map(item => (
                      <li key={item.id} className="flex justify-between items-center mb-2 text-sm">
                        <span className="truncate">{item.name}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/cart" className="block mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium">
                    View Cart
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="flex rounded-lg overflow-hidden shadow-md">
            <select
              className="h-12 px-3 bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700 text-sm border-r border-gray-300 focus:outline-none"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.slice(0, 10).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              className="flex-1 h-12 px-4 text-gray-900 text-sm focus:outline-none"
              placeholder="Search for products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button
              className="h-12 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-800 to-slate-900 border-t border-purple-500/20">
          <div className="px-4 py-2 space-y-2">
            <div className="flex items-center justify-between py-2 text-white">
              <span className="text-sm">Language</span>
              <button 
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg"
                onClick={() => setShowLang(!showLang)}
              >
                {selectedLang.slice(0, 2).toUpperCase()}
              </button>
            </div>
            {showLang && (
              <div className="bg-slate-700 rounded-lg p-2 max-h-32 overflow-y-auto">
                {languageOptions.map(langName => (
                  <div
                    key={langName}
                    className={`px-2 py-1 text-sm cursor-pointer rounded ${
                      selectedLang === langName ? 'bg-purple-600 text-white' : 'text-white hover:bg-slate-600'
                    }`}
                    onClick={() => {
                      setSelectedLang(langName);
                      setShowLang(false);
                      if (languageMap[langName]) setLang(languageMap[langName]);
                    }}
                  >
                    {langName}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between py-2 text-white">
              <span className="text-sm">Location</span>
              <button 
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg"
                onClick={() => setShowLocationInput(!showLocationInput)}
              >
                {location}
              </button>
            </div>
            {showLocationInput && (
              <div className="bg-slate-700 rounded-lg p-2">
                <input
                  className="w-full px-3 py-2 bg-white text-gray-900 text-sm rounded-lg focus:outline-none"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Enter location"
                />
                <button
                  className="mt-2 w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg"
                  onClick={detectLocation}
                  disabled={locationLoading}
                >
                  {locationLoading ? "Detecting..." : "Detect Location"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
