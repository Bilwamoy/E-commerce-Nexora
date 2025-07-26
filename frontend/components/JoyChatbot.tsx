'use client';
import { useState, useRef, useEffect } from 'react';
import { useCart } from './CartContext';
import { JoyLogo, BotContainerLogo } from './BotLogos';

interface JoyChatbotProps {
  embedMode?: boolean;
}

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Fetch products from local data
import { products } from '@/data/products';

async function fetchProducts() {
  return products;
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

  // Order status Q&A
  function answerOrderStatus(query: string) {
    const q = query.toLowerCase();
    if (q.includes('order') && (q.includes('status') || q.includes('where'))) {
      return mockOrders.map(o => `Order #${o.id}: ${o.product} - ${o.status}`).join('\n');
    }
    return null;
  }

  // Cart actions
  function handleCartActions(query: string) {
    const q = query.toLowerCase();
    if (q.startsWith('add ')) {
      const name = q.replace('add ', '').trim();
      const found = products.find(p => p.name.toLowerCase().includes(name));
      if (found) {
        addToCart({ id: found.id, name: found.name, price: found.price, image: found.image, category: found.category, slug: found.slug });
        return `Added ${found.name} to your cart.`;
      }
      return `Sorry, I couldn't find ${name} to add to your cart.`;
    }
    if (q.startsWith('remove ')) {
      const name = q.replace('remove ', '').trim();
      const found = products.find(p => p.name.toLowerCase().includes(name));
      if (found) {
        removeFromCart(found.id);
        return `Removed ${found.name} from your cart.`;
      }
      return `Sorry, I couldn't find ${name} in your cart.`;
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
      const greetings = [
        "Hello! I'm Joy, your shopping assistant. How can I help you today?",
        "Hi there! Welcome to Nexora. I can help you find products, manage your cart, or answer questions.",
        "Hey! I'm here to make your shopping experience better. What would you like to do?",
        "Hello! I can help you with product searches, cart management, and order tracking. What do you need?"
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages((msgs) => [...msgs, { from: 'joy', text: randomGreeting }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Product suggestions
    const found = suggestProducts(input);
    if (found.length > 0) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'joy', text: `Here are some products you might like:` },
        ...found.slice(0, 3).map(p => ({ from: 'joy', text: `${p.name} - $${p.price}` }))
      ]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    // Fallback to Gemini or provide a helpful response
    if (!GEMINI_API_KEY) {
      const responses = [
        "I can help you with product searches, cart management, and order status! Try asking me about specific products or use commands like 'add [product name]' or 'show my cart'.",
        "Hi there! I'm Joy, your shopping assistant. I can help you find products, manage your cart, and check order status. What would you like to do?",
        "Welcome! I can help you with shopping. Try asking me to 'show products', 'add items to cart', or 'check order status'.",
        "Hello! I'm here to help with your shopping needs. You can ask me about products, cart management, or order tracking."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((msgs) => [...msgs, { from: 'joy', text: randomResponse }]);
      setLoading(false);
      setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
      return;
    }

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] })
      });
      const data = await res.json();
      let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (reply.toLowerCase().includes('cannot find') || reply.toLowerCase().includes('not available')) {
        reply += '\nIf you need more help, try our support bot.';
      }
      setMessages((msgs) => [...msgs, { from: 'joy', text: reply }]);
    } catch (e) {
      console.error('Gemini API error:', e);
      const fallbackResponses = [
        "I'm here to help with your shopping! Try asking me about products, cart management, or order status.",
        "I can assist you with finding products, managing your cart, and tracking orders. What would you like to know?",
        "Let me help you with your shopping needs. You can ask about products, add items to cart, or check order status.",
        "I'm your shopping assistant! I can help you find products, manage your cart, and track orders."
      ];
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      setMessages((msgs) => [...msgs, { from: 'joy', text: randomResponse }]);
    }
    setLoading(false);
    setTimeout(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }); }, 100);
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
    // eslint-disable-next-line
  }, [messages.length, open]);

  // Listen for support bot redirect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setOpen(true);
    window.addEventListener('open-joy-chatbot', handler);
    return () => window.removeEventListener('open-joy-chatbot', handler);
  }, []);

  if (embedMode) {
    return (
      <div className="w-full max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-blue-400 animate-fade-in">
        {/* Container logo at top */}
        <div className="flex justify-center items-center pt-2 pb-1 bg-white">
          <BotContainerLogo size={48} />
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 font-bold flex items-center justify-between">
          <span className="flex items-center gap-2"><JoyLogo size={24} /> Joy</span>
        </div>
        <div className="relative flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: 350 }}>
          {/* Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10 select-none">
            <BotContainerLogo size={120} />
          </div>
          <div className="relative z-10">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.from === 'user' ? 'bg-blue-100 text-blue-900 text-right' : 'bg-purple-100 text-purple-900 text-left'}`}>{msg.text}</div>
              </div>
            ))}
            {suggested.length > 0 && (
              <div className="mb-2">
                <div className="font-bold text-xs mb-1 text-purple-700">Suggestions:</div>
                {suggested.map((p, i) => (
                  <div key={i} className="text-xs text-blue-700 mb-1">{p.name} - ${p.price}</div>
                ))}
              </div>
            )}
            {loading && <div className="text-xs text-gray-400">Joy is typing...</div>}
          </div>
        </div>
                  <form className="flex border-t border-gray-200" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
            <input
              className="flex-1 px-3 py-2 outline-none text-gray-900 placeholder-gray-500"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="px-4 text-blue-600 font-bold hover:text-blue-800" disabled={loading || !input.trim()}>Send</button>
          </form>
      </div>
    );
  }

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition"
        onClick={() => setOpen((v) => !v)}
        title="Chat with Joy"
      >
        <JoyLogo size={40} />
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-blue-400 animate-fade-in">
          {/* Container logo at top */}
          <div className="flex justify-center items-center pt-2 pb-1 bg-white">
            <BotContainerLogo size={48} />
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 font-bold flex items-center justify-between">
            <span className="flex items-center gap-2"><JoyLogo size={24} /> Joy</span>
            <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
          </div>
          <div className="relative flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: 350 }}>
            {/* Watermark */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10 select-none">
              <BotContainerLogo size={120} />
            </div>
            <div className="relative z-10">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.from === 'user' ? 'bg-blue-100 text-blue-900 text-right' : 'bg-purple-100 text-purple-900 text-left'}`}>{msg.text}</div>
                </div>
              ))}
              {suggested.length > 0 && (
                <div className="mb-2">
                  <div className="font-bold text-xs mb-1 text-purple-700">Suggestions:</div>
                  {suggested.map((p, i) => (
                    <div key={i} className="text-xs text-blue-700 mb-1">{p.name} - ${p.price}</div>
                  ))}
                </div>
              )}
              {loading && <div className="text-xs text-gray-400">Joy is typing...</div>}
            </div>
          </div>
          <form className="flex border-t border-gray-200" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
            <input
              className="flex-1 px-3 py-2 outline-none text-gray-900 placeholder-gray-500"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="px-4 text-blue-600 font-bold hover:text-blue-800" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
};

export default JoyChatbot; 