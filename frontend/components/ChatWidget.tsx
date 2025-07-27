import React, { useState, useRef, useEffect } from 'react';
import { useResponsiveChat } from '../hooks/useResponsiveChat';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to Nexora. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const position = useResponsiveChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now() + 1,
          text: getBotResponse(inputValue),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with your shopping today?";
    } else if (input.includes('product') || input.includes('item')) {
      return "We have a wide range of electronics, gaming, fashion, and lifestyle products. You can browse our categories or use the search function to find specific items.";
    } else if (input.includes('price') || input.includes('cost')) {
      return "Our prices are competitive and we offer regular discounts. You can check current prices on our product pages. We also have special deals running!";
    } else if (input.includes('shipping') || input.includes('delivery')) {
      return "We offer free shipping on orders above ₹499. Standard delivery takes 3-5 days, and express delivery is available for faster shipping.";
    } else if (input.includes('return') || input.includes('refund')) {
      return "We have a 30-day return policy. If you're not satisfied with your purchase, you can return it for a full refund or exchange.";
    } else if (input.includes('support') || input.includes('help')) {
      return "Our customer support team is available 24/7. You can also email us at support@nexora.com or call us at 1800-NEXORA.";
    } else if (input.includes('order') || input.includes('track')) {
      return "You can track your order by logging into your account or using the order tracking number sent to your email.";
    } else {
      return "Thank you for your message! Our team will get back to you soon. In the meantime, feel free to browse our products or check our FAQ section.";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div 
      className="fixed z-50"
      style={{
        bottom: position.bottom,
        right: position.right,
        left: position.left,
        transform: position.left ? 'translateX(-50%)' : 'none'
      }}
    >
      {/* Chat Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Open chat"
      >
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          <span className="text-sm font-medium">NEXORA</span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
                 <div 
           ref={chatContainerRef}
           className="absolute bottom-20 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
           style={{
             right: position.left ? '50%' : '0',
             transform: position.left ? 'translateX(50%)' : 'none'
           }}
         >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Nexora Support</h3>
                  <p className="text-xs text-purple-100">Online • 24/7 Available</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-purple-200 transition"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 