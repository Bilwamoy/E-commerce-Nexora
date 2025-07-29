'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NexoraSplashProps {
  onComplete: () => void;
}

const NexoraSplash: React.FC<NexoraSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 5000); // Reduced to 5 seconds

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  // Pre-defined positions for matrix characters to avoid hydration issues
  const matrixPositions = [
    { left: "10%", fontSize: "12px" },
    { left: "20%", fontSize: "10px" },
    { left: "30%", fontSize: "14px" },
    { left: "40%", fontSize: "11px" },
    { left: "50%", fontSize: "13px" },
    { left: "60%", fontSize: "9px" },
    { left: "70%", fontSize: "15px" },
    { left: "80%", fontSize: "12px" },
    { left: "90%", fontSize: "10px" },
    { left: "15%", fontSize: "13px" },
    { left: "25%", fontSize: "11px" },
    { left: "35%", fontSize: "14px" },
    { left: "45%", fontSize: "12px" },
    { left: "55%", fontSize: "10px" },
    { left: "65%", fontSize: "15px" },
    { left: "75%", fontSize: "11px" },
    { left: "85%", fontSize: "13px" },
    { left: "95%", fontSize: "12px" },
    { left: "5%", fontSize: "14px" },
    { left: "100%", fontSize: "10px" }
  ];

  // Pre-defined characters to avoid hydration issues
  const matrixChars = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト'];

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden cyberpunk-grid"
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
            <div className="absolute inset-0 cyberpunk-grid" />
          </div>

          {/* Corner frames */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-400 opacity-60 cyberpunk-pulse" />
          <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-400 opacity-60 cyberpunk-pulse" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyan-400 opacity-60 cyberpunk-pulse" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-400 opacity-60 cyberpunk-pulse" />

          {/* Main content container */}
          <div className="relative z-10 text-center">
            {/* Logo and Brand Name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-4">
                {/* Hexagon Logo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative w-16 h-16 mr-4"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                  >
                    <polygon
                      points="50,10 90,30 90,70 50,90 10,70 10,30"
                      fill="none"
                      stroke="#00ffff"
                      strokeWidth="3"
                      className="cyberpunk-pulse"
                    />
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      fill="#00ffff"
                      fontSize="24"
                      fontWeight="bold"
                      className="font-mono"
                    >
                      N
                    </text>
                  </svg>
                </motion.div>
                
                {/* Brand Name */}
                <motion.h1
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`text-6xl font-bold text-cyan-400 font-mono tracking-wider cyberpunk-neon ${
                    glitchActive ? 'cyberpunk-glitch' : ''
                  }`}
                >
                  NEXORA
                </motion.h1>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-mono text-cyan-300 tracking-wide cyberpunk-text">
                THE FUTURE OF
              </h2>
              <h2 className="text-2xl font-mono text-cyan-300 tracking-wide cyberpunk-text">
                MODERN E-COMMERCE
              </h2>
            </motion.div>

            {/* Animated wireframe globe */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96"
            >
              <div className="relative w-full h-full">
                {/* Globe wireframe */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/30 cyberpunk-flicker" />
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 cyberpunk-flicker" style={{ transform: 'rotate(45deg)' }} />
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 cyberpunk-flicker" style={{ transform: 'rotate(-45deg)' }} />
                
                {/* Animated dots */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      left: `${50 + 40 * Math.cos(i * 30 * Math.PI / 180)}%`,
                      top: `${50 + 40 * Math.sin(i * 30 * Math.PI / 180)}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, delay: 1 }}
              className="w-64 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-cyan-300 data-stream"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Data stream effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: '-100%',
                    width: '200%',
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            {/* Glitch effect overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
                transform: "skewX(-15deg)",
              }}
            />
          </div>

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none cyberpunk-scan"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.1) 50%, transparent 100%)",
              height: "2px",
            }}
          />

          {/* Matrix-style falling characters */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {matrixPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute text-cyan-400 text-xs font-mono"
                style={{
                  left: pos.left,
                  fontSize: pos.fontSize,
                }}
                animate={{
                  y: ['-100vh', '100vh'],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'linear',
                }}
              >
                {matrixChars[i % matrixChars.length]}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NexoraSplash;