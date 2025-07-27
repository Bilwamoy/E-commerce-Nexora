import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
  category?: string;
  setCategory?: (v: string) => void;
  categories?: string[];
  minPrice: number;
  setMinPrice: (v: number) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
  sort: string;
  setSort: (v: string) => void;
  showCategory?: boolean;
  filterChips?: { label: string; onRemove: () => void }[];
}

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "newest", label: "Newest" },
];

export default function SearchBar({
  search,
  setSearch,
  category,
  setCategory,
  categories = [],
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  sort,
  setSort,
  showCategory = true,
  filterChips = [],
}: SearchBarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <input
        type="text"
                        placeholder="Search in Nexora by name or brand"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-56"
      />
      {showCategory && setCategory && (
        <div>
          <label className="block text-xs font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded px-2 py-1 w-48"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block text-xs font-semibold mb-1">Min Price</label>
        <input
          type="number"
          min={0}
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Max Price</label>
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Min Rating</label>
        <input
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={minRating}
          onChange={e => setMinRating(Number(e.target.value))}
          className="border rounded px-2 py-1 w-20"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Sort By</label>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border rounded px-2 py-1 w-40"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {filterChips.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {filterChips.map((chip, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
              {chip.label}
              <button onClick={chip.onRemove} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
} 