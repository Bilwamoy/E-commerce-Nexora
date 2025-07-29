'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import NexoraSplash from './NexoraSplash';

interface SplashWrapperProps {
  children: React.ReactNode;
}

const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if splash has been shown before in this session
    const splashShown = sessionStorage.getItem('nexora-splash-shown');
    
    if (splashShown) {
      // Splash already shown, show content directly
      setShowContent(true);
    } else {
      // First visit, show splash
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Mark splash as shown for this session
    sessionStorage.setItem('nexora-splash-shown', 'true');
    
    // Use window.location.href for more reliable navigation
    setTimeout(() => {
      window.location.href = '/welcome';
    }, 500);
  };

  // Don't render anything until we determine what to show
  if (!showSplash && !showContent) {
    return null;
  }

  return (
    <>
      {showSplash && <NexoraSplash onComplete={handleSplashComplete} />}
      {showContent && children}
    </>
  );
};

export default SplashWrapper;