'use client';

import React, { useState, useRef } from 'react';
import { BotContainerLogo } from './BotLogos';
import JoyChatbot from './JoyChatbot';
import SupportBot from './SupportBot';

const BotHub = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'joy' | 'support'>('joy');
  const [pos, setPos] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Mouse events for drag
  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setHasMoved(true);
    dragOffset.current = {
      x: e.clientX - (pos.x ?? window.innerWidth - 112 - 24),
      y: e.clientY - (pos.y ?? window.innerHeight - 112 - 24),
    };
    document.body.style.userSelect = 'none';
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };
  const onMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };
  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  // Touch events for drag (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    setHasMoved(true);
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - (pos.x ?? window.innerWidth - 112 - 24),
      y: touch.clientY - (pos.y ?? window.innerHeight - 112 - 24),
    };
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    const touch = e.touches[0];
    setPos({
      x: touch.clientX - dragOffset.current.x,
      y: touch.clientY - dragOffset.current.y,
    });
  };
  const onTouchEnd = () => setDragging(false);
  React.useEffect(() => {
    if (dragging) {
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
    } else {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    }
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging]);

  // Keep the button and window together
  let buttonStyle: React.CSSProperties;
  let windowStyle: React.CSSProperties;
  if (hasMoved && pos.x !== null && pos.y !== null) {
    buttonStyle = {
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      zIndex: 40,
      cursor: dragging ? 'grabbing' : 'grab',
      transition: dragging ? 'none' : 'box-shadow 0.2s',
    };
    windowStyle = {
      position: 'fixed',
      left: pos.x,
      top: pos.y - 340,
      zIndex: 40,
      width: '24rem',
      maxWidth: '100vw',
    };
  } else {
    // Default: bottom right
    buttonStyle = {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 40,
      cursor: dragging ? 'grabbing' : 'grab',
      transition: dragging ? 'none' : 'box-shadow 0.2s',
    };
    windowStyle = {
      position: 'fixed',
      right: 24,
      bottom: 112 + 24, // 112px button height + 24px gap
      zIndex: 40,
      width: '24rem',
      maxWidth: '100vw',
    };
  }

  return (
    <>
      {/* Floating Bot Hub button (draggable) */}
      <button
        style={buttonStyle}
        className="bg-gradient-to-r from-slate-700 to-purple-700 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-2xl hover:scale-110 transition"
        onClick={() => setOpen(v => !v)}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        title="Open Bot Hub"
      >
        <BotContainerLogo size={56} />
      </button>
      {/* Modal/Chat window (draggable with button) */}
      {open && (
        <div style={windowStyle} className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-400 animate-fade-in">
          {/* Container logo at top */}
          <div className="flex justify-center items-center pt-3 pb-1 bg-white cursor-move" onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
            <BotContainerLogo size={64} />
          </div>
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              className={`flex-1 py-2 font-bold ${activeTab === 'joy' ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-600'}`}
              onClick={() => setActiveTab('joy')}
            >
              Joy
            </button>
            <button
              className={`flex-1 py-2 font-bold ${activeTab === 'support' ? 'bg-green-100 text-green-700' : 'hover:bg-green-50 text-gray-600'}`}
              onClick={() => setActiveTab('support')}
            >
              Support
            </button>
            <button onClick={() => setOpen(false)} className="px-4 text-xl text-gray-400 hover:text-red-500">×</button>
          </div>
          {/* Tab content */}
          <div className="flex-1 relative bg-gray-50">
            {activeTab === 'joy' && <JoyChatbot embedMode={true} />}
            {activeTab === 'support' && <SupportBot embedMode={true} />}
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

export default BotHub; 