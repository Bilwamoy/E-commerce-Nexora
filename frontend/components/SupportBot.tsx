'use client';
import { useState, useRef } from 'react';
import { SupportLogo, BotContainerLogo } from './BotLogos';

interface SupportBotProps {
  embedMode?: boolean;
}

const SupportBot = ({ embedMode = false }: SupportBotProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'support', text: 'Hi! I am your customer support assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [escalated, setEscalated] = useState(false);
  const [showEscalateForm, setShowEscalateForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [escalateMsg, setEscalateMsg] = useState('');

  function isSmallIssue(text: string) {
    const smallIssues = [
      'cannot find', 'can’t find', 'can not find', 'search', 'product', 'item', 'where is', 'how to buy', 'add to cart', 'remove from cart', 'order status', 'track order', 'return', 'refund', 'cancel order'
    ];
    return smallIssues.some(issue => text.toLowerCase().includes(issue));
  }

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setLoading(true);
    setInput('');
    // Try to solve small issues or redirect to Joy
    if (isSmallIssue(input)) {
      setMessages((msgs) => [
        ...msgs,
        { from: 'support', text: 'This looks like something Joy can help you with! Redirecting you to Joy...' }
      ]);
      setLoading(false);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-joy-chatbot'));
      }, 1200);
      return;
    }
    // For big issues, show escalation form
    setEscalateMsg(input);
    setShowEscalateForm(true);
    setLoading(false);
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  async function handleEscalate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setShowEscalateForm(false);
    setMessages((msgs) => [
      ...msgs,
      { from: 'support', text: 'We have escalated your issue to our support team. You will be contacted soon.' }
    ]);
    setEscalated(true);
    try {
      await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: userName, 
          email: userEmail, 
          subject: 'Support Request from ' + userName,
          message: escalateMsg 
        })
      });
    } catch (err) {
      // Optionally show error
    }
    setUserName('');
    setUserEmail('');
    setEscalateMsg('');
    setLoading(false);
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  // Listen for redirect from Joy
  if (typeof window !== 'undefined') {
    window.addEventListener('open-support-bot', () => setOpen(true));
  }

  if (embedMode) {
    return (
      <div className="w-full max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-green-400 animate-fade-in">
        {/* Container logo at top */}
        <div className="flex justify-center items-center pt-2 pb-1 bg-white">
          <BotContainerLogo size={48} />
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 font-bold flex items-center justify-between">
          <span className="flex items-center gap-2"><SupportLogo size={24} /> Support <span className="text-xs font-normal">(Customer Service)</span></span>
        </div>
        <div className="relative flex-1 p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: 350 }}>
          {/* Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-10 select-none">
            <BotContainerLogo size={120} />
          </div>
          <div className="relative z-10">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.from === 'user' ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'}`}>{msg.text}</div>
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Support is typing...</div>}
            {escalated && <div className="text-xs text-green-700 mt-2">(Your issue has been escalated. Please wait for a response.)</div>}
            {showEscalateForm && (
              <form className="mt-4 space-y-2" onSubmit={handleEscalate}>
                <input
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Your Name"
                  value={userName}
                  onChange={e => setUserName(e.target.value)}
                  required
                />
                <input
                  className="w-full px-2 py-1 border rounded"
                  placeholder="Your Email"
                  type="email"
                  value={userEmail}
                  onChange={e => setUserEmail(e.target.value)}
                  required
                />
                <button type="submit" className="w-full bg-green-600 text-white py-1 rounded font-bold">Escalate to Support</button>
              </form>
            )}
          </div>
        </div>
        <form className="flex border-t border-gray-200" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
          <input
            className="flex-1 px-3 py-2 outline-none"
            placeholder="Type your issue..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading || showEscalateForm}
          />
          <button type="submit" className="px-4 text-green-600 font-bold" disabled={loading || !input.trim() || showEscalateForm}>Send</button>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* Floating button */}
      <button
        className="fixed bottom-6 right-24 z-50 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition"
        onClick={() => setOpen((v) => !v)}
        title="Customer Support"
      >
        <SupportLogo size={40} />
      </button>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-24 z-50 w-80 max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-green-400 animate-fade-in">
          {/* Container logo at top */}
          <div className="flex justify-center items-center pt-2 pb-1 bg-white">
            <BotContainerLogo size={48} />
          </div>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 font-bold flex items-center justify-between">
            <span className="flex items-center gap-2"><SupportLogo size={24} /> Support <span className="text-xs font-normal">(Customer Service)</span></span>
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
                  <div className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.from === 'user' ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'}`}>{msg.text}</div>
                </div>
              ))}
              {loading && <div className="text-xs text-gray-400">Support is typing...</div>}
              {escalated && <div className="text-xs text-green-700 mt-2">(Your issue has been escalated. Please wait for a response.)</div>}
              {showEscalateForm && (
                <form className="mt-4 space-y-2" onSubmit={handleEscalate}>
                  <input
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Your Name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                  <input
                    className="w-full px-2 py-1 border rounded"
                    placeholder="Your Email"
                    type="email"
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="w-full bg-green-600 text-white py-1 rounded font-bold">Escalate to Support</button>
                </form>
              )}
            </div>
          </div>
          <form className="flex border-t border-gray-200" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
            <input
              className="flex-1 px-3 py-2 outline-none"
              placeholder="Type your issue..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading || showEscalateForm}
            />
            <button type="submit" className="px-4 text-green-600 font-bold" disabled={loading || !input.trim() || showEscalateForm}>Send</button>
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

export default SupportBot; 