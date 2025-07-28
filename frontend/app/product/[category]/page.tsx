import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import CategoryNav from "@/components/CategoryNav";
import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import Image from "next/image";
import CategoryPageClient from "./CategoryPageClient";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  
  // Map navbar slugs to actual product categories
  const categoryMapping: { [key: string]: string[] } = {
    'electronics': ['Electronics', 'TV', 'Computers', 'Mobiles', 'Appliances'],
    'fashion': ['Fashion', "Men's Fashion", "Women's Fashion"],
    'home-kitchen': ['Home & Kitchen'],
    'sports-outdoors': ['Sports & Outdoors'],
    'books': ['Books', 'Kindle E-Readers & eBooks', 'Audible Audiobooks'],
    'beauty-personal-care': ['Beauty & Personal Care'],
    'toys-games': ['Toys & Games'],
    'automotive': ['Automotive']
  };
  
  const targetCategories = categoryMapping[categorySlug] || [categorySlug.replace(/-/g, ' ')];
  const allProducts = products.filter(p => targetCategories.includes(p.category));
  const categoryName = targetCategories[0] || categorySlug.replace(/-/g, ' ');
  
  if (allProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <Image 
            src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" 
            alt="Sorry" 
            width={128}
            height={128}
            className="mx-auto size-32 rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Sorry for the inconvenience!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We are sold out of this category already. We are trying to expand our stock.
        </p>
        <p className="text-gray-500 mb-8">
          Please check back later or explore other categories.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-amazon-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CategoryNav activeCategory={categorySlug} />
      <CategoryPageClient 
        allProducts={allProducts}
        categoryName={categoryName}
        categorySlug={categorySlug}
      />
    </div>
  );
} 