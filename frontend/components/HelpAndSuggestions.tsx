'use client';
import { useState } from 'react';
import JoyChatbot from './JoyChatbot';
import SupportBot from './SupportBot';

const HelpAndSuggestions = () => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'joy' | 'support'>('joy');

  return (
    <>
      {/* Floating Help & Suggestions button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition"
        onClick={() => setOpen((v) => !v)}
        title="Help & Suggestions"
      >
        <span className="text-3xl">❓</span>
      </button>
      {/* Panel with tabs for Joy and Support */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-full bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-blue-400 animate-fade-in">
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 font-bold">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${tab === 'joy' ? 'bg-white text-blue-600' : 'bg-transparent text-white'}`}
                onClick={() => setTab('joy')}
              >
                Joy
              </button>
              <button
                className={`px-3 py-1 rounded ${tab === 'support' ? 'bg-white text-green-600' : 'bg-transparent text-white'}`}
                onClick={() => setTab('support')}
              >
                Support
              </button>
            </div>
            <button onClick={() => setOpen(false)} className="text-white text-xl">×</button>
          </div>
          <div className="flex-1 bg-gray-50" style={{ minHeight: 400, maxHeight: 500, overflowY: 'auto' }}>
            {tab === 'joy' ? <JoyChatbot /> : <SupportBot />}
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in { animation: fadeIn 0.3s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      `}</style>
    </>
  );
};

export default HelpAndSuggestions; 