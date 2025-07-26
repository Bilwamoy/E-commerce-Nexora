export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  features: string[];
  offers: {
    cashback?: string;
    bank?: string;
    emi?: string;
  };
  specs: {
    os?: string;
    brand?: string;
    cpu?: string;
    cpuSpeed?: string;
    ram?: string;
    storage?: string;
    display?: string;
    camera?: string;
  };
  relatedSlugs: string[];
  description?: string;
} 