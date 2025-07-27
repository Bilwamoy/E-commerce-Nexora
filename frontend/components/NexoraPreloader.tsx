"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Stars, Grid } from '@react-three/drei';

// Helper component for the animated stats
interface AnimatedStatProps {
  label: string;
  value: string;
  delay: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ label, value, delay }) => (
  <motion.div
    className="text-cyan-400 font-mono text-sm"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1 + delay }}
  >
    <span className="font-bold">{value}</span>
    <p className="text-xs text-blue-400">{label}</p>
  </motion.div>
);

const NexoraPreloader = () => {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Data extracted from your provided code
  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products Sold', value: '1M+' },
    { label: 'Cities Served', value: '500+' },
    { label: 'Years Experience', value: '5+' },
  ];

  // GSAP animation for the typewriter effect
  useGSAP(() => {
    gsap.to('#nexora-title', {
      text: "NEXORA",
      duration: 1,
      delay: 1,
      ease: 'none',
    });
    
    const keywords = ["QUALITY", "SPEED", "SUPPORT", "INNOVATION"];
    const keywordTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    
    keywords.forEach(word => {
        keywordTimeline
            .to('#keyword', { text: word, duration: 0.3, ease: 'power1.in' })
            .to('#keyword', { opacity: 1, duration: 0.2 })
            .to('#keyword', { opacity: 0, duration: 0.2, delay: 0.5 });
    });

  }, []);

  // Timer to navigate to the homepage after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => router.push('/'), 500); // Wait for exit animation
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050816] overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* 3D Background using React Three Fiber */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <color attach="background" args={['#050816']} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <Grid
                infiniteGrid
                args={[100, 100]}
                cellColor="#2a9d8f"
                sectionColor="#0077b6"
                fadeDistance={50}
              />
            </Canvas>
          </div>

          {/* Glitch Effect Layers */}
          <motion.div
            className="absolute inset-0 z-10"
            animate={{
              clipPath: [
                'inset(0% 0% 95% 0%)',
                'inset(40% 0% 40% 0%)',
                'inset(95% 0% 0% 0%)',
                'inset(0% 0% 0% 0%)',
              ],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'loop', ease: [0, 0, 1, 1] }}
            style={{
              background: 'rgba(72, 190, 214, 0.1)',
              backdropFilter: 'blur(1px)',
            }}
          />

          {/* Main UI Content */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-4">
            {/* Corner Stats */}
            <div className="absolute top-5 left-5">
              <AnimatedStat label={stats[0].label} value={stats[0].value} delay={0.2} />
            </div>
            <div className="absolute top-5 right-5 text-right">
              <AnimatedStat label={stats[1].label} value={stats[1].value} delay={0.4} />
            </div>
            <div className="absolute bottom-5 left-5">
              <AnimatedStat label={stats[2].label} value={stats[2].value} delay={0.6} />
            </div>
            <div className="absolute bottom-5 right-5 text-right">
              <AnimatedStat label={stats[3].label} value={stats[3].value} delay={0.8} />
            </div>

            {/* Central Logo and Title */}
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-16 h-16 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold text-4xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              >
                N
              </motion.div>
              <h1 id="nexora-title" className="text-6xl font-bold text-white tracking-widest font-mono"></h1>
            </div>

            {/* Subtitle */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <p className="text-xl text-cyan-300 tracking-[0.2em]">THE FUTURE OF E-COMMERCE</p>
              <div className="h-8 mt-2 text-lg text-purple-400 font-semibold" id="keyword-container">
                <span id="keyword" className="opacity-0"></span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NexoraPreloader;