"use client";
import React, { createContext, useContext, useState } from "react";

const translations: Record<string, Record<string, string>> = {
  en: {
    searchPlaceholder: "Search Amazon.in",
    helloSignIn: "Hello, sign in",
    accountLists: "Account & Lists",
    returns: "Returns",
    orders: "& Orders",
    cart: "Cart",
    deliveringTo: "Delivering to",
    update: "Update",
    detectLocation: "Detect Location",
    search: "Search",
  },
  hi: {
    searchPlaceholder: "Amazon.in पर खोजें",
    helloSignIn: "नमस्ते, साइन इन करें",
    accountLists: "खाता और सूचियाँ",
    returns: "रिटर्न",
    orders: "और ऑर्डर",
    cart: "कार्ट",
    deliveringTo: "डिलीवर किया जा रहा है",
    update: "अपडेट करें",
    detectLocation: "स्थान पता करें",
    search: "खोजें",
  },
  bn: {
    searchPlaceholder: "Amazon.in এ অনুসন্ধান করুন",
    helloSignIn: "হ্যালো, সাইন ইন করুন",
    accountLists: "অ্যাকাউন্ট ও তালিকা",
    returns: "রিটার্ন",
    orders: "এবং অর্ডার",
    cart: "কার্ট",
    deliveringTo: "ডেলিভারি হচ্ছে",
    update: "আপডেট",
    detectLocation: "অবস্থান নির্ধারণ করুন",
    search: "অনুসন্ধান",
  },
  // Add more languages as needed
};

const LanguageContext = createContext<any>(null);

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");
  const t = (key: string) => translations[lang]?.[key] || translations["en"][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 