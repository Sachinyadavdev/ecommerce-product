"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SustainableHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    bgImage?: string;
  };
}

export default function SustainableHero({ content }: SustainableHeroProps) {
  const {
    title = "Sustainable Manufacturing at Besmak",
    subtitle = "RENEWABLE · RESPONSIBLE · RESILIENT",
    bgImage = "/images/sustainable_manufacturing_hero.png",
  } = content || {};

  return (
    <div className="w-full h-screen min-h-[calc(100vh-85px)] flex items-center relative overflow-hidden mt-[85px]">
      {/* Animated Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" as const }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />

      </motion.div>

      <div className="container relative z-20 px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-[#00A758] uppercase border-l-4 border-[#00A758] bg-[#00A758]/10">
            {subtitle}
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00A758] to-transparent z-30"
      />
    </div>
  );
}
