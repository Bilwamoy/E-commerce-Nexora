import { useState, useEffect } from 'react';

interface ChatPosition {
  bottom: string;
  right: string;
  left?: string;
}

export const useResponsiveChat = () => {
  const [position, setPosition] = useState<ChatPosition>({ bottom: '1.5rem', right: '1.5rem' });

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile: center bottom
        setPosition({ bottom: '1rem', left: '50%', right: 'auto' });
      } else if (width < 1024) {
        // Tablet: bottom right with smaller margin
        setPosition({ bottom: '1rem', right: '1rem' });
      } else {
        // Desktop: bottom right with normal margin
        setPosition({ bottom: '1.5rem', right: '1.5rem' });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return position;
}; 