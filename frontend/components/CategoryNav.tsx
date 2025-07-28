import Link from "next/link";
import { usePathname } from "next/navigation";

// Define main categories for navigation
const mainCategories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Fashion", slug: "fashion" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Sports & Outdoors", slug: "sports-outdoors" },
  { name: "Books", slug: "books" },
  { name: "Beauty & Personal Care", slug: "beauty-personal-care" },
  { name: "Toys & Games", slug: "toys-games" },
  { name: "Automotive", slug: "automotive" }
];

interface CategoryNavProps {
  activeCategory?: string;
}

export default function CategoryNav({ activeCategory }: CategoryNavProps) {
  return (
    <nav className="flex gap-2 px-2 py-1 overflow-x-auto scrollbar-hide min-h-[36px] text-sm bg-white shadow mb-6">
      {mainCategories.map((cat) => {
        const isActive = activeCategory && (activeCategory.toLowerCase() === cat.slug);
        return (
          <Link
            key={cat.slug}
            href={`/product/${cat.slug}`}
            className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-colors ${isActive ? 'bg-amazon-blue text-white' : 'bg-gray-200 text-gray-800 hover:bg-amazon-blue/80 hover:text-white'}`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
} 