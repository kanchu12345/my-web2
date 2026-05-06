"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isClient, setIsClient] = useState(false);
  const text = "INFINITE";

  useEffect(() => {
    setIsClient(true);
    // Auto-complete the loading screen after animation completes
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isClient) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="flex space-x-2 text-4xl md:text-7xl font-bold tracking-[0.2em] text-white">
        {text.split("").map((letter, i) => (
          <motion.span 
            key={i} 
            variants={item}
            className="text-glow"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
