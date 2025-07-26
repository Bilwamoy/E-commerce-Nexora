import Link from "next/link";
import { usePathname } from "next/navigation";
import { products } from "@/data/products";

const allCategories = Array.from(new Set(products.map(p => p.category)));

interface CategoryNavProps {
  activeCategory?: string;
}

export default function CategoryNav({ activeCategory }: CategoryNavProps) {
  return (
    <nav className="flex gap-2 px-2 py-1 overflow-x-auto scrollbar-hide min-h-[36px] text-sm bg-white shadow mb-6">
      {allCategories.map((cat) => {
        const slug = cat.toLowerCase().replace(/\s+/g, '-');
        const isActive = activeCategory && (activeCategory.toLowerCase() === slug);
        return (
          <Link
            key={cat}
            href={`/product/${slug}`}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${isActive ? 'bg-amazon-blue text-white' : 'bg-gray-200 text-gray-800 hover:bg-amazon-blue/80 hover:text-white'}`}
          >
            {cat}
          </Link>
        );
      })}
    </nav>
  );
} 