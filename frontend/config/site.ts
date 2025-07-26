export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Nexora - Premium Electronics & Lifestyle Store",
  description: "Discover premium electronics, smartphones, gaming accessories, and lifestyle products at Nexora. Shop the latest tech trends with competitive prices and fast delivery across India.",
  url: "https://nexora.vercel.app",
  ogImage: "https://nexora.vercel.app/og-image.jpg",
  keywords: [
    "electronics",
    "smartphones",
    "gaming accessories",
    "lifestyle products",
    "tech gadgets",
    "online shopping",
    "premium electronics",
    "gaming laptops",
    "smart devices",
    "home accessories"
  ],
  authors: [
    {
      name: "Nexora Team",
      url: "https://nexora.vercel.app",
    },
  ],
  creator: "Nexora",
  publisher: "Nexora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nexora.vercel.app"),
  alternates: {
    canonical: "/",
  },
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/product",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/support",
    },
  ],
  links: {
    twitter: "https://twitter.com/nexora",
    github: "https://github.com/nexora",
    docs: "https://nexora.vercel.app",
  },
}
