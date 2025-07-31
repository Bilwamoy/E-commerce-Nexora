import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Star, Heart } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { toast } from "react-hot-toast";

// Enhanced image mapping function using specific product images
function getLocalImage(product: Product): string {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  
  // Specific phone models
  if (name.includes('iphone 15 pro max')) return '/oneplus.png';  // Using unique phone image
  if (name.includes('galaxy s24')) return '/galaxys-24.png';
  if (name.includes('pixel 8')) return '/google pixel.png';
  if (name.includes('oneplus')) return '/oneplus.png';

  // Specific laptop models
  if (name.includes('macbook pro m3')) return '/foldable laptop.png';
  if (name.includes('lenovo laptop')) return '/lenovo laptop.png';
  if (name.includes('foldable laptop')) return '/foldable laptop.png';
  if (name.includes('laptop')) return '/laptop.png';

  // Audio devices
  if (name.includes('sony') && name.includes('headphone')) return '/bluetooth headset.png';
  if (name.includes('soundcore') || name.includes('liberty air')) return '/earpods.png';
  if (name.includes('speaker')) return '/bluetooth speaker.png';

  // Smart home and electronics
  if (name.includes('auraglow')) return '/Auraglow.png';
  if (name.includes('alexa') || name.includes('echo')) return '/amazon echo.png';
  if (name.includes('smart tv')) return '/SmartTv.png';
  if (name.includes('webcam')) return '/web cam.png';

  // Kitchen and home appliances
  if (name.includes('instapot') || name.includes('cooker')) return '/cooking.png';
  if (name.includes('coffee')) return '/coffeeMaker.png';
  if (name.includes('vacuum') || name.includes('cleaner')) return '/vaccuam cleaner.png';
  if (name.includes('fridge')) return '/fridge.png';
  if (name.includes('dish')) return '/dishtub.png';

  // Fashion and accessories
  if (name.includes('handbag')) return '/handbags.png';
  if (name.includes('t-shirt') || name.includes('tshirt')) return '/Tshirt.png';
  if (name.includes('jeans')) return '/geans.png';
  if (name.includes('sports shoe')) return '/sports shoe.png';
  if (name.includes('backpack')) return '/bagpack.png';

  // Entertainment and gaming
  if (name.includes('gaming mouse')) return '/gaming mouse.png';
  if (name.includes('mx player')) return '/mx player.png';
  if (name.includes('prime')) return '/amazon prime.png';

  // Books and media
  if (name.includes('kindle')) return '/kindel books.png';
  if (name.includes('alchemist')) return '/the alchemiest book.png';

  // Personal care
  if (name.includes('makeup')) return '/makeup.png';
  if (name.includes('facial')) return '/faciallotion.png';
  if (name.includes('hair dryer')) return '/hairdryer.png';

  // Automotive
  if (name.includes('car washer')) return '/carwasher.png';
  if (name.includes('tyre')) return '/tyre.png';
  if (name.includes('wiper')) return '/wiper.png';

  // Miscellaneous
  if (name.includes('drinks')) return '/drinks.png';
  if (name.includes('card game')) return '/cardgame.png';
  if (name.includes('spacecraft')) return '/spacecrafttoy.png';
  if (name.includes('herbal tea')) return '/herbaltee.png';

  // Category-based mappings (only used if no specific product match)
  if (category.includes('ladies') || category.includes('women')) {
    if (name.includes('fashion')) return '/ladiesfashion.png';
    return '/LADIES WEAR.png';
  }

  if (category.includes('gaming')) return '/gaming accessories.png';
  if (category.includes('electronics')) return '/electronis.jpg';
  if (category.includes('fashion')) return '/fashion trending.png';
  if (category.includes('books')) return '/kindel books.png';
  if (category.includes('home')) return '/home accessories.png';
  if (category.includes('beauty')) return '/beauty products.png';
  if (category.includes('sports')) return '/sports accessories.png';
  if (category.includes('toys')) return '/toys.jpg';
  if (category.includes('kitchen')) return '/cooking.png';
  if (category.includes('mobile')) return '/smart watches.jpg';
  if (category.includes('laptop')) return '/laptops.jpg';
  if (category.includes('accessories')) return '/home accessories.png';

  // Default fallback images based on product ID
  const defaultImages = [
    '/hero.jpg',
    '/hero2.jpg',
    '/hero3.jpg',
    '/electronis.jpg',
    '/fashion.jpg'
  ];
  return defaultImages[product.id % defaultImages.length];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.price, image: getLocalImage(product), category: product.category, slug: product.slug });
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const productIdString = product.id.toString();
    if (isInWishlist(productIdString)) {
      removeFromWishlist(productIdString);
    } else {
      addToWishlist({
        id: productIdString,
        name: product.name,
        price: product.price,
        image: getLocalImage(product),
        category: product.category
      });
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-xl transition group relative">
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2 right-2 p-2 rounded-full transition-colors z-10 ${
          isInWishlist(product.id.toString()) 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 hover:bg-red-500 hover:text-white text-gray-600'
        }`}
        title={isInWishlist(product.id.toString()) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className={`w-4 h-4 ${isInWishlist(product.id.toString()) ? 'fill-current' : ''}`} />
      </button>
      <Link href={`/product/id/${product.id}`}>
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