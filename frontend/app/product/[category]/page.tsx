'use client';

import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import CategoryNav from "@/components/CategoryNav";
import { notFound } from "next/navigation";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import Image from "next/image";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const categoryName = products.find(p => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug)?.category;
  const allProducts = products.filter(p => p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug);
  
  if (!categoryName || allProducts.length === 0) {
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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");

  let filtered = allProducts.filter(p =>
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.specs.brand?.toLowerCase().includes(search.toLowerCase())) &&
    p.price >= minPrice &&
    p.price <= maxPrice &&
    p.rating >= minRating
  );

  // Sorting
  if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);
  else if (sort === "rating-desc") filtered = filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === "newest") filtered = filtered.sort((a, b) => b.id - a.id);

  // Filter chips
  const filterChips = [];
  if (search) filterChips.push({ label: `Search: ${search}`, onRemove: () => setSearch("") });
  if (minPrice > 0) filterChips.push({ label: `Min Price: ₹${minPrice}`, onRemove: () => setMinPrice(0) });
  if (maxPrice < 50000) filterChips.push({ label: `Max Price: ₹${maxPrice}`, onRemove: () => setMaxPrice(50000) });
  if (minRating > 0) filterChips.push({ label: `Min Rating: ${minRating}`, onRemove: () => setMinRating(0) });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CategoryNav activeCategory={categorySlug} />
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
      <SearchBar
        search={search}
        setSearch={setSearch}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minRating={minRating}
        setMinRating={setMinRating}
        sort={sort}
        setSort={setSort}
        showCategory={false}
        filterChips={filterChips}
      />
      <ProductList products={filtered} page={page} onPageChange={setPage} />
    </div>
  );
} 