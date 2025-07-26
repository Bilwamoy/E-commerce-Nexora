import { Product } from "@/types";
import { useCart } from "./CartContext";
import { toast } from "react-hot-toast";
import { Star } from "lucide-react";

// Same image mapping function as ProductCard
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
    "/Gemini_Generated_Image_y0r1f1y0r1f1y0r1.png", "/Gemini_Generated_Image_kf0f2zkf0f2zkf0f.png",
    "/Gemini_Generated_Image_q9z852q9z852q9z8.png", "/Gemini_Generated_Image_dr1x34dr1x34dr1x.png",
    "/Gemini_Generated_Image_waho6iwaho6iwaho.png", "/Gemini_Generated_Image_31vpgx31vpgx31vp.png",
    "/Gemini_Generated_Image_qe0n8dqe0n8dqe0n.png", "/Gemini_Generated_Image_l70zael70zael70z.png",
    "/Gemini_Generated_Image_xhjznaxhjznaxhjz.png", "/Gemini_Generated_Image_gv204ggv204ggv20.png",
    "/Gemini_Generated_Image_1r21ky1r21ky1r21.png", "/Gemini_Generated_Image_sb4jpysb4jpysb4j.png",
    "/Gemini_Generated_Image_5aa4ub5aa4ub5aa4.png", "/Gemini_Generated_Image_ntq58ontq58ontq5.png",
    "/Gemini_Generated_Image_fgpburfgpburfgpb.png", "/Gemini_Generated_Image_92r3lz92r3lz92r3.png",
    "/Gemini_Generated_Image_hpo2ihpo2ihpo2ih.png", "/Gemini_Generated_Image_kz3u3nkz3u3nkz3u.png",
    "/Gemini_Generated_Image_ml1r2dml1r2dml1r.png", "/Gemini_Generated_Image_s818qgs818qgs818.png",
    "/Gemini_Generated_Image_qebue5qebue5qebu.png", "/Gemini_Generated_Image_nnihpvnnihpvnnih.png",
    "/Gemini_Generated_Image_k4aveak4aveak4av.png", "/Gemini_Generated_Image_fitz5qfitz5qfitz.png",
    "/Gemini_Generated_Image_5j4kuq5j4kuq5j4k.png", "/Gemini_Generated_Image_vh3ocxvh3ocxvh3o.png",
    "/Gemini_Generated_Image_rrxz6nrrxz6nrrxz.png", "/Gemini_Generated_Image_woyy91woyy91woyy.png",
    "/Gemini_Generated_Image_h55mqrh55mqrh55m.png", "/Gemini_Generated_Image_uy66y7uy66y7uy66.png",
    "/Gemini_Generated_Image_oivmr2oivmr2oivm.png", "/Gemini_Generated_Image_jigal0jigal0jiga.png",
    "/Gemini_Generated_Image_95zjtp95zjtp95zj.png", "/Gemini_Generated_Image_y96swhy96swhy96s.png",
    "/Gemini_Generated_Image_se2u1rse2u1rse2u.png", "/Gemini_Generated_Image_q9dc3eq9dc3eq9dc.png",
    "/Gemini_Generated_Image_9taf2l9taf2l9taf.png", "/Gemini_Generated_Image_k6p9ckk6p9ckk6p9.png"
  ];

  // Smart category-based image selection
  let selectedImage = "";
  
  // Laptops and Computers
  if (category.includes('laptop') || name.includes('laptop') || name.includes('macbook') || name.includes('dell') || name.includes('hp')) {
    const laptopImages = ["/laptops.jpg", "/pcs.jpg", "/electronis.jpg"];
    selectedImage = laptopImages[productId % laptopImages.length];
  }
  // Mobile Phones
  else if (category.includes('mobile') || name.includes('phone') || name.includes('pixel') || name.includes('galaxy') || name.includes('oneplus') || name.includes('iphone')) {
    const mobileImages = ["/smart watches.jpg", "/hero3.jpg", "/hero2.jpg"];
    selectedImage = mobileImages[productId % mobileImages.length];
  }
  // Fashion and Clothing
  else if (category.includes('fashion') || name.includes('jeans') || name.includes('shirt') || name.includes('dress') || name.includes('t-shirt')) {
    const fashionImages = ["/fashion.jpg", "/fashion trending.png", "/fashion trending - Copy.png", "/trendig fashions.jpg", "/clothings.png"];
    selectedImage = fashionImages[productId % fashionImages.length];
  }
  // Gaming
  else if (category.includes('game') || name.includes('game') || desc.includes('game')) {
    const gamingImages = ["/game.jpg", "/gaming tools.png", "/best selling games.png", "/gaming accessories.png", "/more of games.jpg", "/most wished gaimg.jpg"];
    selectedImage = gamingImages[productId % gamingImages.length];
  }
  // Beauty and Personal Care
  else if (category.includes('beauty') || name.includes('beauty') || name.includes('care') || name.includes('cream') || name.includes('lotion')) {
    const beautyImages = ["/beauty products.png", "/beauty.jpeg", "/personal care.jpg"];
    selectedImage = beautyImages[productId % beautyImages.length];
  }
  // Home and Furniture
  else if (category.includes('home') || name.includes('furniture') || name.includes('chair') || name.includes('table') || name.includes('sofa')) {
    const homeImages = ["/homes.jpg", "/furniture.jpg", "/home accessories.png", "/decoration.png"];
    selectedImage = homeImages[productId % homeImages.length];
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 flex flex-col items-center md:items-start">
        <img 
          src={getLocalImage(product)} 
          alt={product.name} 
          className="w-64 h-64 object-contain mb-4 rounded-lg" 
        />
        <button 
          onClick={handleAddToCart}
          className="bg-amazon-yellow hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg w-full mt-4 transition-colors"
        >
          Add to Cart
        </button>
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
          <span className="text-3xl font-bold text-amazon-blue">₹{product.price.toLocaleString()}</span>
          <span className="text-gray-400 line-through text-xl">₹{product.originalPrice.toLocaleString()}</span>
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