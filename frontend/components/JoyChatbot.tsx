'use client';
import { useState, useRef, useEffect } from 'react';
import { useCart } from './CartContext';
import { JoyLogo, BotContainerLogo } from './BotLogos';

interface JoyChatbotProps {
  embedMode?: boolean;
}

// Mock: fetch products
async function fetchProducts() {
  return [
    { id: 1, name: 'iPhone 15 Pro', price: 999, description: 'Latest smartphone with advanced features' },
    { id: 2, name: 'MacBook Pro', price: 1999, description: 'Professional laptop for creators' },
    { id: 3, name: 'AirPods Pro', price: 249, description: 'Wireless earbuds with noise cancellation' },
  ];
}

// Mock: fetch orders for the user
const mockOrders = [
  { id: 1, product: 'Product 1', status: 'Delivered' },
  { id: 2, product: 'Product 2', status: 'Shipped' },
  { id: 3, product: 'Product 3', status: 'Delivered' },
];

const JoyChatbot = ({ embedMode = false }: JoyChatbotProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'joy', text: 'Hi! I am Joy, your shopping assistant. What are you in the mood to buy today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [suggested, setSuggested] = useState<any[]>([]);
  const [sessionMemory, setSessionMemory] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const { cartItems, addToCart, removeFromCart } = useCart();

  // Fetch products on open
  useEffect(() => {
    if (open && products.length === 0) {
      fetchProducts().then(setProducts);
    }
  }, [open, products.length]);

  // Suggest products based on user input
  function suggestProducts(query: string) {
    const q = query.toLowerCase();
    const found = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    setSuggested(found.slice(0, 3));
    return found;
  }

  // Product-specific Q&A
  function answerProductQuestion(query: string) {
    const q = query.toLowerCase();
    const found = products.find(p => q.includes(p.name.toLowerCase()));
    if (found) {
      return `Here are the details for ${found.name}:\nPrice: $${found.price}\nDescription: ${found.description}`;
    }
    return null;
  }

  // Handle cart actions
  function handleCartActions(text: string) {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('add') && lowerText.includes('cart')) {
      const productName = text.match(/add (.+?) to cart/i)?.[1];
      if (productName) {
        const product = products.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
        if (product) {
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: '/product-image.jpg',
            category: 'electronics',
            slug: product.name.toLowerCase().replace(/\s+/g, '-')
          });
          return `Added ${product.name} to your cart!`;
        }
      }
    }
    
    if (lowerText.includes('remove') && lowerText.includes('cart')) {
      const productName = text.match(/remove (.+?) from cart/i)?.[1];
      if (productName) {
        const cartItem = cartItems.find(item => item.name.toLowerCase().includes(productName.toLowerCase()));
        if (cartItem) {
          removeFromCart(cartItem.id);
          return `Removed ${cartItem.name} from your cart!`;
        }
      }
    }
    
    if (lowerText.includes('show cart') || lowerText.includes('what&apos;s in cart')) {
      if (cartItems.length === 0) {
        return 'Your cart is empty. Would you like me to suggest some products?';
      }
      return `You have ${cartItems.length} items in your cart:\n${cartItems.map(item => `- ${item.name} x${item.quantity}`).join('\n')}`;
    }
    
    return null;
  }

  // Answer order status questions
  function answerOrderStatus(text: string) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('order status') || lowerText.includes('track order')) {
      return `Here are your recent orders:\n${mockOrders.map(order => `- ${order.product}: ${order.status}`).join('\n')}`;
    }
    return null;
  }

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setSessionMemory((mem) => [...mem, input]);
    setLoading(true);
    setInput('');

    // Cart actions
    const cartAction = handleCartActions(input);
    if (cartAction) {
      setMessages((msgs) => [...msgs, { from: 'joy', text: cartAction }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Product-specific Q&A
    const productAnswer = answerProductQuestion(input);
    if (productAnswer) {
      setMessages((msgs) => [...msgs, { from: 'joy', text: productAnswer }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Order status
    const orderStatus = answerOrderStatus(input);
    if (orderStatus) {
      setMessages((msgs) => [...msgs, { from: 'joy', text: orderStatus }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Handle greetings
    const greetingWords = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    if (greetingWords.some(word => input.toLowerCase().includes(word))) {
      setMessages((msgs) => [...msgs, { from: 'joy', text: 'Hello! How can I help you with your shopping today?' }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Handle product searches
    if (input.toLowerCase().includes('find') || input.toLowerCase().includes('search') || input.toLowerCase().includes('show')) {
      const found = suggestProducts(input);
      if (found.length > 0) {
        const suggestions = found.slice(0, 3).map(p => `- ${p.name}: $${p.price}`).join('\n');
        setMessages((msgs) => [...msgs, { from: 'joy', text: `I found these products for you:\n${suggestions}\n\nWould you like me to add any of these to your cart?` }]);
      } else {
        setMessages((msgs) => [...msgs, { from: 'joy', text: 'I couldn&apos;t find any products matching your search. Could you try a different keyword?' }]);
      }
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Default response
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'joy', text: 'I&apos;m here to help you with shopping! You can ask me to find products, add items to cart, check order status, or just chat about what you&apos;re looking for.' }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
    }, 1000);
  }

  // Show cart items if user asks
  useEffect(() => {
    if (!open) return;
    const lastMsg = messages[messages.length - 1]?.text.toLowerCase();
    if (lastMsg && lastMsg.includes('cart')) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'joy', text: `You have ${cartItems.length} items in your cart.` },
        ...cartItems.map(item => ({ from: 'joy', text: `${item.name} x${item.quantity}` }))
      ]);
    }
  }, [messages, open, cartItems]);

  // Listen for support bot redirect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setOpen(true);
    window.addEventListener('open-joy-chatbot', handler);
    return () => window.removeEventListener('open-joy-chatbot', handler);
  }, []);

  if (embedMode) {
    return (
      <div className="size-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 p-4 border-b">
            <JoyLogo />
            <span className="font-semibold">Joy</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.from === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 max-w-xs p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open Joy Chatbot"
      >
        <JoyLogo />
      </button>

      {/* Chat Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)}></div>
          <div className="relative bg-white rounded-t-2xl shadow-2xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <JoyLogo />
                <span className="font-semibold text-gray-800">Joy</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    msg.from === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 max-w-xs p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoyChatbot; 