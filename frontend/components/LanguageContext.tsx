"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type TranslationKey = 'searchPlaceholder' | 'helloSignIn' | 'accountLists' | 'returns' | 'orders' | 'deliveringTo' | 'update' | 'detectLocation' | 'cart';

type LanguageCode = 'en' | 'hi' | 'bn';

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    searchPlaceholder: "Search in Nexora",
    helloSignIn: "Hello, sign in",
    accountLists: "Account & Lists",
    returns: "Returns",
    orders: "& Orders",
    deliveringTo: "Delivering to",
    update: "Update",
    detectLocation: "Detect Location",
    cart: "Cart",
  },
  hi: {
    searchPlaceholder: "Nexora में खोजें",
    helloSignIn: "नमस्ते, साइन इन करें",
    accountLists: "खाता और सूची",
    returns: "वापसी",
    orders: "और ऑर्डर",
    deliveringTo: "डिलीवरी कर रहे हैं",
    update: "अपडेट करें",
    detectLocation: "स्थान का पता लगाएं",
    cart: "कार्ट",
  },
  bn: {
    searchPlaceholder: "Nexora তে অনুসন্ধান করুন",
    helloSignIn: "হ্যালো, সাইন ইন করুন",
    accountLists: "অ্যাকাউন্ট এবং তালিকা",
    returns: "ফেরত",
    orders: "এবং অর্ডার",
    deliveringTo: "ডেলিভারি করছি",
    update: "আপডেট করুন",
    detectLocation: "অবস্থান সনাক্ত করুন",
    cart: "কার্ট",
  },
};

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>("en");
  const t = (key: TranslationKey) => translations[lang]?.[key] || translations["en"][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 