import { products } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  product: Product;
}

export default function RelatedProducts({ product }: RelatedProductsProps) {
  const related = products.filter(
    p => product.relatedSlugs.includes(p.slug)
  ).slice(0, 4);
  if (related.length === 0) return null;
  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {related.map(rp => (
          <ProductCard key={rp.id} product={rp} />
        ))}
      </div>
    </div>
  );
} 