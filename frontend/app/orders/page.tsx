'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const mockOrders = [
  {
    id: 1,
    product: 'SAMSUNG Galaxy S24 Ultra',
    status: 'Delivered',
    canReturn: true,
    category: 'Mobiles',
    slug: 'samsung-galaxy-s24-ultra',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bztqins/gallery/in-galaxy-s24-ultra-sm-s928-478978-sm-s928bztqins-thumb-538642237',
    description: 'SAMSUNG Galaxy S24 Ultra Cell Phone, 512GB AI Smartphone, Unlocked Android, 50MP Zoom Camera, Long Battery Life, S Pen, US Version, 2024, Titanium Gray. The ultimate flagship with advanced AI features, pro-grade camera, and all-day battery.'
  },
  {
    id: 2,
    product: 'SAMSUNG Galaxy S24',
    status: 'Shipped',
    canReturn: false,
    category: 'Mobiles',
    slug: 'samsung-galaxy-s24',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-s921bzvdins/gallery/in-galaxy-s24-sm-s921-478978-sm-s921bzvdins-thumb-538642237',
    description: 'SAMSUNG Galaxy S24 Cell Phone, 128GB AI Smartphone, Unlocked Android, 50MP Camera, Fastest Processor, Long Battery Life, US Version, 2024, Onyx Black. Experience next-gen performance and camera in a sleek, durable design.'
  },
  {
    id: 3,
    product: 'Sony WH-1000XM5 Wireless Headphones',
    status: 'Delivered',
    canReturn: true,
    category: 'Headphones',
    slug: 'sony-wh-1000xm5',
    image: 'https://m.media-amazon.com/images/I/61v6lGqHq+L._AC_SL1500_.jpg',
    description: 'Sony WH-1000XM5 Wireless Industry Leading Headphones with Auto Noise Canceling Optimizer, Crystal Clear Hands-Free Calling, and Alexa Voice Control. Midnight Blue. The best-in-class noise cancellation and all-day comfort.'
  },
];

const mockDeliveries = [
  {
    id: 101,
    product: 'Sonos Ace Wireless Over Ear Headphones',
    status: 'Out for Delivery',
    eta: 'Today, 5:00 PM',
    lat: 22.57,
    lng: 88.36,
    category: 'Headphones',
    slug: 'sonos-ace-wireless',
    image: 'https://m.media-amazon.com/images/I/31vrL5EimQL._AC_SL1500_.jpg',
    description: 'Sonos Ace - Wireless Over Ear Headphones with Noise Cancellation, Bluetooth, 30-Hour Battery Life, Spatial Audio, Dolby Atmos, Dynamic Head Tracking. Black. Premium sound and comfort for music lovers.'
  },
  {
    id: 102,
    product: 'Bose QuietComfort Ultra Wireless Headphones',
    status: 'In Transit',
    eta: 'Tomorrow, 11:00 AM',
    lat: 22.58,
    lng: 88.37,
    category: 'Headphones',
    slug: 'bose-quietcomfort-ultra',
    image: 'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/quietcomfort_ultra_headphones/product_silo_images/qc_ultra_hp_blk_EC_hero.psd/jcr:content/renditions/cq5dam.web.320.320.png',
    description: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones with Spatial Audio, Over-The-Ear Headphones with Mic, Up to 24 Hours of Battery Life. Black. Legendary comfort and immersive sound.'
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [returnRequested, setReturnRequested] = useState(false);
  const [tracking, setTracking] = useState({ lat: 22.57, lng: 88.36 });
  const [trackingActive, setTrackingActive] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<number | null>(null);
  const [deliveryTracking, setDeliveryTracking] = useState({ lat: 22.57, lng: 88.36 });
  const [deliveryActive, setDeliveryActive] = useState(false);

  // Mock live tracking: move marker every second
  useEffect(() => {
    if (!trackingActive) return;
    const interval = setInterval(() => {
      setTracking((t) => ({ lat: t.lat + 0.001, lng: t.lng + 0.001 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [trackingActive]);

  // Mock live tracking for delivery
  useEffect(() => {
    if (!deliveryActive) return;
    const interval = setInterval(() => {
      setDeliveryTracking((t) => ({ lat: t.lat + 0.0005, lng: t.lng + 0.0005 }));
    }, 1000);
    return () => clearInterval(interval);
  }, [deliveryActive]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <ul className="mb-8">
        {mockOrders.map(order => (
          <li key={order.id} className="mb-4 p-4 bg-white rounded shadow flex justify-between items-center">
            <Link href={`/product/${encodeURIComponent(order.category)}/${order.slug}`} className="flex items-center gap-3">
              <img src={order.image} alt={order.product} className="w-16 h-16 object-contain rounded" />
              <div className="font-semibold text-amazon-blue hover:underline">{order.product}</div>
            </Link>
            <div className="flex gap-2">
              {order.canReturn && (
                <button
                  className="bg-amazon-yellow text-black px-3 py-1 rounded font-bold"
                  onClick={() => { setSelectedOrder(order.id); setReturnRequested(false); }}
                >
                  Return Product
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded font-bold"
                onClick={() => { setSelectedOrder(order.id); setTrackingActive(true); }}
              >
                Track Order
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div className="mb-8 p-6 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Order #{selectedOrder}</h2>
          {!returnRequested ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded font-bold mb-4"
              onClick={() => setReturnRequested(true)}
            >
              Confirm Return
            </button>
          ) : (
            <div className="text-green-600 font-bold mb-4">Return Requested!</div>
          )}
          {trackingActive && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Live Tracking (Mocked)</h3>
              <div className="w-full h-64 bg-gray-300 rounded flex items-center justify-center relative">
                <div
                  className="absolute"
                  style={{ left: `${50 + (tracking.lng - 88.36) * 1000}px`, top: `${50 + (tracking.lat - 22.57) * 1000}px` }}
                >
                  <span className="inline-block w-6 h-6 bg-blue-600 rounded-full border-4 border-white animate-pulse"></span>
                  <div className="text-xs text-center mt-1">Product</div>
                </div>
                <span className="text-gray-700">Map Placeholder</span>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Delivery Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Active Deliveries</h2>
        <ul>
          {mockDeliveries.map(delivery => (
            <li key={delivery.id} className="mb-4 p-4 bg-white rounded shadow flex justify-between items-center">
              <Link href={`/product/${encodeURIComponent(delivery.category)}/${delivery.slug}`} className="flex items-center gap-3">
                <img src={delivery.image} alt={delivery.product} className="w-16 h-16 object-contain rounded" />
                <div className="font-semibold text-amazon-blue hover:underline">{delivery.product}</div>
              </Link>
              <div>
                <div className="text-xs text-gray-500">Status: {delivery.status}</div>
                <div className="text-xs text-gray-500">ETA: {delivery.eta}</div>
              </div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded font-bold"
                onClick={() => { setSelectedDelivery(delivery.id); setDeliveryActive(true); setDeliveryTracking({ lat: delivery.lat, lng: delivery.lng }); }}
              >
                Track Delivery
              </button>
            </li>
          ))}
        </ul>
        {selectedDelivery && deliveryActive && (
          <div className="mt-4 mb-8 p-6 bg-gray-100 rounded shadow">
            <h3 className="font-semibold mb-2">Live Delivery Tracking (Mocked)</h3>
            <div className="w-full h-64 bg-gray-300 rounded flex items-center justify-center relative">
              <div
                className="absolute"
                style={{ left: `${50 + (deliveryTracking.lng - 88.36) * 1000}px`, top: `${50 + (deliveryTracking.lat - 22.57) * 1000}px` }}
              >
                <span className="inline-block w-6 h-6 bg-green-600 rounded-full border-4 border-white animate-pulse"></span>
                <div className="text-xs text-center mt-1">Delivery</div>
              </div>
              <span className="text-gray-700">Map Placeholder</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 