'use client';

import { useState } from "react";
import { products } from "@/data/products";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import Stats from "@/components/Stats";
import Newsletter from "@/components/Newsletter";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);

  // Use a Set to ensure unique categories (no duplicate 'All')
  const categories = Array.from(new Set(["All", ...products.map(p => p.category)]));

  let filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.specs.brand?.toLowerCase().includes(search.toLowerCase())) &&
    p.price >= minPrice &&
    p.price <= maxPrice &&
    p.rating >= minRating
  );

  // Show only the first 100 products
  filtered = filtered.slice(0, 100);

  // Sorting
  if (sort === "price-asc") filtered = filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = filtered.sort((a, b) => b.price - a.price);
  else if (sort === "rating-desc") filtered = filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === "newest") filtered = filtered.sort((a, b) => b.id - a.id);

  // Filter chips
  const filterChips = [];
  if (category !== "All") filterChips.push({ label: `Category: ${category}`, onRemove: () => setCategory("All") });
  if (search) filterChips.push({ label: `Search: ${search}`, onRemove: () => setSearch("") });
  if (minPrice > 0) filterChips.push({ label: `Min Price: ₹${minPrice}`, onRemove: () => setMinPrice(0) });
  if (maxPrice < 50000) filterChips.push({ label: `Max Price: ₹${maxPrice}`, onRemove: () => setMaxPrice(50000) });
  if (minRating > 0) filterChips.push({ label: `Min Rating: ${minRating}`, onRemove: () => setMinRating(0) });

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Categories Section */}
      <FeaturedCategories />
      
      {/* Stats Section */}
      <Stats />
      
      {/* Newsletter Section */}
      <Newsletter />
      
      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          sort={sort}
          setSort={setSort}
          showCategory={true}
          filterChips={filterChips}
        />
        <ProductList products={filtered} page={page} onPageChange={setPage} />
      </div>
    </div>
  );
}
