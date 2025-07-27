'use client';

import { useState } from "react";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import { Product } from "@/types";

interface CategoryPageClientProps {
  allProducts: Product[];
  categoryName: string;
  categorySlug: string;
}

export default function CategoryPageClient({ allProducts, categoryName, categorySlug }: CategoryPageClientProps) {
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