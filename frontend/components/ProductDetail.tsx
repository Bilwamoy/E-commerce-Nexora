import { Product } from "@/types";
import Image from "next/image";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { toast } from "react-hot-toast";
import { Star, Heart } from "lucide-react";

// Same image mapping function as ProductCard
function getLocalImage(product: Product): string {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  const desc = (product.description || '').toLowerCase();
  
  // Specific product mappings
  if (name.includes('auraglow')) return '/Auraglow.png';
  if (name.includes('soundcore') || name.includes('liberty air')) return '/earpods.png';
  if (name.includes('instapot') || name.includes('cooker')) return '/cooking.png';
  if (name.includes('kindle')) return '/kindel books.png';
  if (name.includes('sony') && name.includes('headphone')) return '/bluetooth headset.png';
  if (name.includes('alexa') || name.includes('echo')) return '/amazon echo.png';
  if (name.includes('galaxy s24')) return '/galaxys-24.png';
  if (name.includes('pixel')) return '/google pixel.png';
  if (name.includes('oneplus')) return '/oneplus.png';
  if (name.includes('gaming mouse')) return '/gaming mouse.png';
  if (name.includes('vacuum') || name.includes('cleaner')) return '/vaccuam cleaner.png';
  if (name.includes('coffee')) return '/coffeeMaker.png';
  if (name.includes('speaker')) return '/bluetooth speaker.png';
  if (name.includes('ipad') || name.includes('tablet')) return '/tab,ipad.png';
  if (name.includes('mx player')) return '/mx player.png';
  if (name.includes('handbag')) return '/handbags.png';
  if (name.includes('t-shirt') || name.includes('tshirt')) return '/Tshirt.png';
  if (name.includes('jeans')) return '/geans.png';
  if (name.includes('sports shoe')) return '/sports shoe.png';
  if (name.includes('lenovo laptop')) return '/lenovo laptop.png';
  if (name.includes('foldable laptop')) return '/foldable laptop.png';
  if (name.includes('laptop')) return '/laptop.png';
  if (name.includes('artwork')) return '/Artwork.png';
  if (name.includes('prime')) return '/amazon prime.png';
  if (name.includes('smart tv')) return '/SmartTv.png';
  if (name.includes('herbal tea')) return '/herbaltee.png';
  if (name.includes('alchemist')) return '/the alchemiest book.png';
  if (name.includes('webcam')) return '/web cam.png';
  if (name.includes('makeup')) return '/makeup.png';
  if (name.includes('facial')) return '/faciallotion.png';
  if (name.includes('hair dryer')) return '/hairdryer.png';
  if (name.includes('backpack')) return '/bagpack.png';
  if (name.includes('drinks')) return '/drinks.png';
  if (name.includes('car washer')) return '/carwasher.png';
  if (name.includes('tyre')) return '/tyre.png';
  if (name.includes('wiper')) return '/wiper.png';
  if (name.includes('card game')) return '/cardgame.png';
  if (name.includes('spacecraft')) return '/spacecrafttoy.png';
  if (name.includes('fridge')) return '/fridge.png';
  if (name.includes('dish')) return '/dishtub.png';

  // Category-based mappings
  if (category.includes('ladies') || category.includes('women')) {
    if (name.includes('fashion')) return '/ladiesfashion.png';
    return '/LADIES WEAR.png';
  }

  // Generic category fallbacks
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: getLocalImage(product), 
      category: product.category, 
      slug: product.slug 
    });
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = () => {
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
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
      <div className="shrink-0 flex flex-col items-center md:items-start">
        <Image 
          src={getLocalImage(product)} 
          alt={product.name} 
          width={256}
          height={256}
          className="size-64 object-contain mb-4 rounded-lg" 
        />
        <div className="flex gap-3 w-full mt-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-amazon-yellow hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleWishlistToggle}
            className={`p-3 rounded-lg border-2 transition-colors ${
              isInWishlist(product.id.toString()) 
                ? 'border-red-500 bg-red-50 text-red-600' 
                : 'border-gray-300 hover:border-red-500 text-gray-600 hover:text-red-600'
            }`}
            title={isInWishlist(product.id.toString()) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isInWishlist(product.id.toString()) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-yellow-500 font-bold flex items-center">
            <Star className="w-5 h-5 mr-1" fill="currentColor" />
            {product.rating}
          </span>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl font-bold text-amazon-blue">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-gray-400 line-through text-xl">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="text-green-600 text-lg font-semibold">{discount}% off</span>
        </div>

        {product.description && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {product.features.map((feature, i) => (
              <li key={i} className="text-sm">{feature}</li>
            ))}
          </ul>
        </div>

        {product.offers && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Offers</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.offers.cashback && <li className="text-sm">{product.offers.cashback}</li>}
              {product.offers.bank && <li className="text-sm">{product.offers.bank}</li>}
              {product.offers.emi && <li className="text-sm">{product.offers.emi}</li>}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">Specifications</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm text-gray-700">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => value && (
                  <tr key={key} className="border-b border-gray-200 last:border-b-0">
                    <td className="pr-4 py-2 font-medium capitalize text-gray-900">{key.replace(/_/g, ' ')}</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p className="font-medium">Category: {product.category}</p>
          <p className="font-medium">Product ID: {product.id}</p>
        </div>
      </div>
    </div>
  );
} 