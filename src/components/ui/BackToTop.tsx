"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Use spring for smooth progress updates
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-9999 cursor-pointer group"
          role="button"
          aria-label="Back to top"
        >
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            {/* SVG Progress Circle */}
            <svg 
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" 
              viewBox="0 0 100 100"
            >
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-gray-100"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#284b8c"
                strokeWidth="6"
                strokeLinecap="round"
                style={{
                  pathLength: progress
                }}
              />
            </svg>

            {/* Icon */}
            <div className="relative z-10 text-[#284b8c] group-hover:-translate-y-1 transition-transform duration-300">
              <ChevronUp size={28} strokeWidth={3} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
