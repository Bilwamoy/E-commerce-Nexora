import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useState } from "react";

interface ProductListProps {
  products: Product[];
  page?: number;
  onPageChange?: (page: number) => void;
}

export default function ProductList({ products, page = 1, onPageChange }: ProductListProps) {
  const pageSize = 24;
  const totalPages = Math.ceil(products.length / pageSize);
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange && onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => onPageChange && onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 