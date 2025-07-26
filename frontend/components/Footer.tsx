"use client";

import React from "react";
import { motion } from "framer-motion";
import NexoraLogo from "./NexoraLogo";
import Link from "next/link";

const footerLinks = [
  {
    heading: "Get to Know Us",
    links: [
      { label: "About Nexora", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press Releases", href: "#" },
      { label: "Nexora Labs", href: "#" },
    ],
  },
  {
    heading: "Connect with Us",
    links: [
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    heading: "Make Money with Us",
    links: [
      { label: "Sell on Nexora", href: "/sell-on-nexora" },
      { label: "Become an Affiliate", href: "#" },
      { label: "Advertise Your Products", href: "#" },
      { label: "Nexora Business", href: "#" },
    ],
  },
  {
    heading: "Let Us Help You",
    links: [
      { label: "Your Account", href: "/account" },
      { label: "Returns Centre", href: "#" },
      { label: "24x7 Customer Support", href: "#" },
      { label: "Order Protection", href: "#" },
      { label: "Download Nexora App", href: "/download-app" },
    ],
  },
];

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "bn", label: "Bengali" },
  { code: "fr", label: "French" },
];

const countries = [
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "US", label: "United States", flag: "🇺🇸" },
  { code: "GB", label: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", label: "Germany", flag: "🇩🇪" },
];

export default function Footer() {
  const [lang, setLang] = React.useState("en");
  const [country, setCountry] = React.useState("IN");

  return (
    <footer className="bg-neutral-900 text-gray-300 pt-10 pb-4 mt-12 relative z-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-neutral-800 pb-8">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="font-semibold text-white mb-3 text-lg">{col.heading}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href === "#" ? (
                      <a
                        href={link.href}
                        className="hover:underline underline-offset-4 transition-colors duration-200 hover:text-amazon-yellow"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:underline underline-offset-4 transition-colors duration-200 hover:text-amazon-yellow"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Language & Region Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div className="flex items-center gap-4">
            <label htmlFor="footer-lang" className="text-sm">Language:</label>
            <select
              id="footer-lang"
              value={lang}
              onChange={e => setLang(e.target.value)}
              className="bg-neutral-800 text-gray-200 px-3 py-1 rounded border border-neutral-700 focus:outline-none"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
            <label htmlFor="footer-country" className="text-sm ml-6">Region:</label>
            <select
              id="footer-country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="bg-neutral-800 text-gray-200 px-3 py-1 rounded border border-neutral-700 focus:outline-none"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
              ))}
            </select>
          </div>
          {/* Branding */}
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <NexoraLogo />
            <span className="text-gray-400 text-xs mt-2">&copy; {new Date().getFullYear()} Nexora. All rights reserved.</span>
          </div>
        </div>
        {/* Footer Bottom Links */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-neutral-800 pt-4 mt-4 text-xs text-gray-400 gap-2">
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link href="/privacy-policy" className="hover:underline underline-offset-4">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:underline underline-offset-4">Terms of Use</Link>
            <Link href="/sitemap" className="hover:underline underline-offset-4">Sitemap</Link>
            <Link href="/debug" className="hover:underline underline-offset-4">Debug</Link>
            <Link href="/admin-test" className="hover:underline underline-offset-4">Admin Test</Link>
            <Link href="/bot-test" className="hover:underline underline-offset-4">Bot Test</Link>
          </div>
          <div className="mt-2 md:mt-0">Built with ❤️ by Nexora Team</div>
        </div>
      </motion.div>
    </footer>
  );
} 