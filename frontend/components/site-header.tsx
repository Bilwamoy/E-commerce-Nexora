"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/components/CartContext";
import { useState, useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useRouter } from "next/navigation";
import NexoraLogo from "@/components/NexoraLogo";
import { useSession, signOut } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { Search, User } from "lucide-react";

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
  const categories = [
    "All Categories", "Fresh", "MX Player", "Sell", "Bestsellers", "Today's Deals", "Mobiles", "Prime", "Customer Service", "Fashion", "New Releases", "Home & Kitchen", "Electronics", "Amazon Pay", "Computers", "Toys", "Books", "Sports", "Beauty", "Automotive", "Grocery", "Pet Supplies", "Garden", "Tools", "Office Products", "Baby", "Health & Personal Care"
  ];
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { lang, setLang, t } = useLanguage();
  const languageMap: Record<string, string> = {
    English: "en",
    हिन्दी: "hi",
    বাংলা: "bn",
    // Add more mappings as needed
  };
  const router = useRouter();
  const { data: session } = useSession();

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
        // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
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
    recognition.lang = selectedLang === 'English' ? 'en-US' : 'hi-IN'; // basic demo, can map more
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

  return (
    <header className="bg-amazon-blue sticky top-0 z-40 w-full border-b">
      <div className="flex items-center px-4 py-2 gap-4 text-white relative">
        {/* Nexora custom logo */}
        <div className="mr-2" onClick={() => router.push("/")}><NexoraLogo /></div>
        {/* All + All Categories dropdown */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-full text-black dark:text-white h-10 mr-2">
          <button className="px-3 h-full font-semibold border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-l-full">All</button>
          <select
            className="px-2 h-full bg-white dark:bg-gray-800 text-black dark:text-white outline-none rounded-r-full"
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
              <option key={cat} value={cat} className="bg-white dark:bg-gray-800 text-black dark:text-white">{cat}</option>
            ))}
          </select>
        </div>
        {/* Search bar with dynamic/voice UI */}
        <div className="flex items-center flex-1 bg-white dark:bg-gray-800 h-10 rounded-full overflow-hidden shadow focus-within:ring-2 ring-amazon-blue transition-all">
          <span className="pl-3 pr-1 text-gray-400 dark:text-gray-300">
            <Search className="w-5 h-5" />
          </span>
          <input
            ref={searchInputRef}
            className="flex-1 px-2 h-full text-black dark:text-white outline-none bg-transparent"
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ fontSize: "1rem" }}
          />
          <button 
            className="px-4 h-full bg-amazon-yellow dark:bg-yellow-500 text-black font-bold rounded-r-full hover:bg-yellow-400 dark:hover:bg-yellow-600 transition-colors"
            onClick={() => {
              if (search.trim()) {
                router.push(`/product?search=${encodeURIComponent(search.trim())}`);
              }
            }}
          >
            Search
          </button>
        </div>
        {/* Microphone button outside search bar */}
        <button
          className={`ml-2 flex items-center justify-center w-10 h-10 rounded-full ${listening ? 'bg-amazon-yellow text-black' : 'bg-gray-800 hover:bg-gray-700 text-white'} shadow transition`}
          title="Voice Search"
          onClick={listening ? stopVoiceSearch : startVoiceSearch}
        >
          <span role="img" aria-label="mic">🎤</span>
        </button>
        {/* EN (Language) toggle */}
        <div className="ml-4 relative">
          <button className="px-2 py-1 rounded bg-gray-800 dark:bg-gray-700 text-white text-xs font-semibold" onClick={() => setShowLang(v => !v)}>{selectedLang.slice(0,2).toUpperCase()}</button>
          {showLang && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow z-50 max-h-64 overflow-y-auto">
              {languageOptions.map(langName => (
                <div
                  key={langName}
                  className={`px-4 py-2 cursor-pointer hover:bg-amazon-yellow dark:hover:bg-yellow-600 ${selectedLang === langName ? 'font-bold' : ''}`}
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
        {/* Hello, sign in / Account & Lists */}
        <div className="ml-4 flex flex-col items-start relative cursor-pointer">
          {session && session.user ? (
            <div className="flex items-center gap-2" onClick={() => signOut()} title="Sign out">
              {session.user.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  onError={(e) => {
                    // Fallback to user icon if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-white ${session.user.image ? 'hidden' : ''}`}>
                <User className="w-6 h-6 text-amazon-blue" />
              </span>
              <span className="font-semibold text-sm">{session.user.name || session.user.email}</span>
            </div>
          ) : (
            <div onClick={() => router.push("/login")}> 
              <span className="text-xs">{t("helloSignIn")}</span>
              <span className="font-semibold text-sm">{t("accountLists")}</span>
            </div>
          )}
        </div>
        {/* Returns & Orders with location */}
        <div className="ml-4 flex flex-col items-start relative">
          <span className="text-xs">{t("returns")}</span>
          <span className="font-semibold text-sm">{t("orders")}</span>
          <div className="flex flex-col items-start mt-1">
            <span className="text-xs leading-none">{t("deliveringTo")}</span>
            <button
              className="text-xs font-semibold hover:underline flex items-center gap-1"
              onClick={() => setShowLocationInput((v) => !v)}
            >
              {location} <span className="underline text-xs">{t("update")}</span>
            </button>
            {showLocationInput && (
              <input
                className="mt-1 px-2 py-1 rounded text-black text-xs"
                value={location}
                onChange={e => setLocation(e.target.value)}
                onBlur={() => setShowLocationInput(false)}
                autoFocus
              />
            )}
            <button
              className="mt-1 px-2 py-1 rounded bg-amazon-yellow text-black text-xs font-semibold"
              onClick={detectLocation}
              disabled={locationLoading}
            >
              {locationLoading ? t("detectLocation") + "..." : t("detectLocation")}
            </button>
            {locationError && <span className="text-xs text-red-500">{locationError}</span>}
          </div>
        </div>
        {/* Cart with quick view */}
        <div className="ml-4 relative">
          <Link href="/cart" className="relative flex items-center" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
            <span className="font-semibold text-sm">{t("cart")}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-amazon-yellow text-black text-xs font-bold rounded-full px-2 py-0.5 border border-white">
                {cartCount}
              </span>
            )}
          </Link>
          {showCart && cartItems.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow z-50 p-4" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
              <h3 className="font-bold mb-2">Cart Items</h3>
              <ul className="max-h-40 overflow-y-auto">
                {cartItems.map(item => (
                  <li key={item.id} className="flex justify-between items-center mb-2">
                    <span>{item.name}</span>
                    <span className="text-xs">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
              <Link href="/cart" className="block mt-2 text-amazon-blue dark:text-blue-400 underline">View Cart</Link>
            </div>
          )}
        </div>
        {/* Theme toggle */}
        <ThemeToggle />
      </div>
      <Toaster position="top-right" />
    </header>
  );
}
