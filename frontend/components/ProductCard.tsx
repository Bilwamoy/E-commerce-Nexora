import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Star } from "lucide-react";
import { useCart } from "./CartContext";
import { toast } from "react-hot-toast";

// Enhanced image mapping function using all available images
function getLocalImage(product: Product): string {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const desc = (product.description || '').toLowerCase();
  const productId = product.id;
  
  // Create an array of all available images
  const allImages = [
    // Category-specific images
    "/gaming tools.png", "/home accessories.png", "/fashion trending.png", "/fashion trending - Copy.png",
    "/best selling games.png", "/covers.png", "/clothings.png", "/Untitled design (1).png",
    "/movies.png", "/decoration.png", "/daily life .png", "/seasons best.png",
    "/beauty products.png", "/sports accessories.png", "/gaming accessories.png",
    "/usa.jpeg", "/beauty.jpeg", "/personal care.jpg", "/furniture.jpg",
    "/laptops.jpg", "/family.jpg", "/homes.jpg", "/more of games.jpg",
    "/this season.jpg", "/most wished gaimg.jpg", "/shoes.jpg", "/welcoming.jpg",
    "/marchendise.jpg", "/smart watches.jpg", "/hero3.jpg", "/hero2.jpg",
    "/trendig fashions.jpg", "/toys.jpg", "/electronis.jpg", "/pcs.jpg",
    "/fashion.jpg", "/refresh.jpg", "/game.jpg", "/hero.jpg",
    // Gemini generated images for variety
    "/Gemini_Generated_Image_swef9xswef9xswef.png", "/Gemini_Generated_Image_ndx101ndx101ndx1.png",
    "/Gemini_Generated_Image_3rmejm3rmejm3rme.png", "/Gemini_Generated_Image_fyku0ufyku0ufyku.png",
    "/Gemini_Generated_Image_nhvkefnhvkefnhvk.png", "/Gemini_Generated_Image_pkkcr4pkkcr4pkkc.png",
    "/Gemini_Generated_Image_ql2bqjql2bqjql2b.png", "/Gemini_Generated_Image_1h26q91h26q91h26.png",
    "/Gemini_Generated_Image_nc8pmsnc8pmsnc8p.png", "/Gemini_Generated_Image_g19ilbg19ilbg19i.png",
    "/Gemini_Generated_Image_y0r1f1y0r1f1y0r1.png"
  ];

  let selectedImage = "/hero.jpg"; // Default image

  // Mobile phones
  if (category.includes('mobile') || name.includes('phone') || name.includes('iphone') || name.includes('samsung')) {
    selectedImage = "/smart watches.jpg";
  }
  // Laptops and computers
  else if (category.includes('laptop') || category.includes('computer') || name.includes('laptop') || name.includes('macbook') || name.includes('dell')) {
    selectedImage = "/laptops.jpg";
  }
  // Gaming
  else if (category.includes('gaming') || name.includes('game') || name.includes('playstation') || name.includes('xbox')) {
    selectedImage = "/game.jpg";
  }
  // Fashion and clothing
  else if (category.includes('fashion') || category.includes('clothing') || name.includes('shirt') || name.includes('dress') || name.includes('jeans')) {
    selectedImage = "/fashion.jpg";
  }
  // Home and furniture
  else if (category.includes('home') || category.includes('furniture') || name.includes('chair') || name.includes('table') || name.includes('sofa')) {
    selectedImage = "/furniture.jpg";
  }
  // Electronics
  else if (category.includes('electronic') || name.includes('tv') || name.includes('headphone') || name.includes('speaker')) {
    selectedImage = "/electronis.jpg";
  }
  // Beauty and personal care
  else if (category.includes('beauty') || category.includes('personal') || name.includes('cream') || name.includes('lotion') || name.includes('perfume')) {
    selectedImage = "/personal care.jpg";
  }
  // Smart watches
  else if (name.includes('watch') || name.includes('smartwatch')) {
    selectedImage = "/smart watches.jpg";
  }
  // PCs and desktops
  else if (name.includes('pc') || name.includes('desktop') || name.includes('computer')) {
    selectedImage = "/pcs.jpg";
  }
  // Toys
  else if (category.includes('toy') || name.includes('toy')) {
    selectedImage = "/toys.jpg";
  }
  // Sports
  else if (category.includes('sport') || name.includes('sport')) {
    selectedImage = "/sports accessories.png";
  }
  // Shoes
  else if (name.includes('shoe') || name.includes('sneaker')) {
    selectedImage = "/shoes.jpg";
  }
  // TV and Electronics
  else if (category.includes('tv') || name.includes('tv') || name.includes('television')) {
    selectedImage = "/hero3.jpg";
  }
  // Books
  else if (category.includes('book') || name.includes('book')) {
    selectedImage = "/covers.png";
  }
  // Movies and Entertainment
  else if (category.includes('movie') || name.includes('movie') || name.includes('dvd')) {
    selectedImage = "/movies.png";
  }
  // Kitchen and Appliances
  else if (category.includes('kitchen') || name.includes('cook') || name.includes('coffee') || name.includes('blender')) {
    selectedImage = "/home accessories.png";
  }
  // Seasonal and Trending
  else if (name.includes('season') || name.includes('trend')) {
    const seasonalImages = ["/seasons best.png", "/this season.jpg", "/daily life .png"];
    selectedImage = seasonalImages[productId % seasonalImages.length];
  }
  // Family and Lifestyle
  else if (name.includes('family') || name.includes('life')) {
    selectedImage = "/family.jpg";
  }
  // Welcome and General
  else if (name.includes('welcome') || name.includes('new')) {
    selectedImage = "/welcoming.jpg";
  }
  // Default: Use product ID to cycle through all images
  else {
    selectedImage = allImages[productId % allImages.length];
  }

  return selectedImage;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.price, image: getLocalImage(product), category: product.category, slug: product.slug });
    toast.success("Added to cart!");
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition group">
      <Link href={`/product/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.slug}`}>
        <Image
          src={getLocalImage(product)}
          alt={product.name}
          width={128}
          height={128}
          className="size-32 object-contain mx-auto mb-2 group-hover:scale-105 transition"
        />
        <div className="font-bold text-gray-800">{product.name.split(' ')[0]}</div>
        <div className="font-semibold text-lg text-black mb-1">{product.name.replace(product.name.split(' ')[0], '').trim()}</div>
        <div className="flex items-center gap-1 mb-1">
          <span className="text-yellow-500 flex items-center">
            <Star className="size-4 inline" fill="currentColor" />
            {product.rating}
          </span>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-bold text-amazon-blue">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-gray-400 line-through text-sm">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="text-green-600 text-sm font-semibold">{discount}% off</span>
        </div>
        <div className="text-xs text-green-700 mb-1">FREE delivery {product.features[0]}</div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-amazon-blue text-white py-2 px-4 rounded-md hover:bg-gray-800 transition font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
} 