'use client';

import React, { useState, useRef } from 'react';
import { BotContainerLogo } from './BotLogos';

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
      'cannot find', 'can&apos;t find', 'can not find', 'search', 'product', 'item', 'where is', 'how to buy', 'add to cart', 'remove from cart', 'order status', 'track order', 'return', 'refund', 'cancel order'
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

  function handleEscalate() {
    if (!userName.trim() || !userEmail.trim() || !escalateMsg.trim()) {
      alert('Please fill in all fields');
      return;
    }
    setEscalated(true);
    setMessages((msgs) => [
      ...msgs,
      { from: 'support', text: `Thank you ${userName}! Your issue has been escalated. We&apos;ll contact you at ${userEmail} within 24 hours.` }
    ]);
    setShowEscalateForm(false);
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }

  if (embedMode) {
    return (
      <div className="w-full h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 p-4 border-b">
            <BotContainerLogo />
            <span className="font-semibold">Support</span>
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
            {showEscalateForm && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Escalate Issue</h4>
                <input
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                />
                <textarea
                  placeholder="Describe your issue"
                  value={escalateMsg}
                  onChange={(e) => setEscalateMsg(e.target.value)}
                  className="w-full mb-2 p-2 border rounded"
                  rows={3}
                />
                <button
                  onClick={handleEscalate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
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
      {/* Support Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-24 z-50 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open Support Bot"
      >
        <BotContainerLogo />
      </button>

      {/* Support Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)}></div>
          <div className="relative bg-white rounded-t-2xl shadow-2xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <BotContainerLogo />
                <span className="font-semibold text-gray-800">Support</span>
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
              {showEscalateForm && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Escalate Issue</h4>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    placeholder="Describe your issue"
                    value={escalateMsg}
                    onChange={(e) => setEscalateMsg(e.target.value)}
                    className="w-full mb-2 p-2 border rounded"
                    rows={3}
                  />
                  <button
                    onClick={handleEscalate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
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

export default SupportBot; 