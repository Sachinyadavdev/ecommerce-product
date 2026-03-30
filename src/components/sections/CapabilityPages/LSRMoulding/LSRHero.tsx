"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LSRHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    bgImage?: string;
  };
}

export default function LSRHero({ content }: LSRHeroProps) {
  const {
    title = "Liquid Silicone Rubber (LSR) Moulding",
    subtitle = "ADVANCED | PRECISION | PERFORMANCE",
    bgImage = "/images/lsr-moulding-facility.png",
  } = content || {};

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-900">
      {/* Background with Zoom Effect */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Dark High-Performance Overlay - Reduced Left Shade */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-slate-900/10 z-10" />
      </motion.div>

      <div className="container relative z-20 px-6 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          {/* Badge & Subtitle with Perfectly Aligned Attached Light Sheet */}
          <div className="flex items-stretch mb-10">
            <div className="w-1 bg-white" />
            <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-r-xl border border-white/10 border-l-0 shadow-2xl flex items-center">
              <span className="text-white font-black tracking-[0.15em] lg:tracking-[0.25em] text-[10px] uppercase whitespace-normal leading-relaxed">
                {subtitle}
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1.02] mb-8">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Decorative Side Element */}
      <div className="absolute right-0 top-0 bottom-0 w-32 border-l border-white/10 hidden xl:flex flex-col items-center justify-center gap-8 py-20 z-20">
        <div className="h-px w-10 bg-white/20" />
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[1em] rotate-90 whitespace-nowrap">
          Precision Engineering
        </span>
        <div className="h-px w-10 bg-white/20" />
      </div>

      {/* HUD-style corners */}
      <div className="absolute top-24 left-8 w-8 h-8 border-t-2 border-l-2 border-white/20 z-20" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-white/20 z-20" />
    </section>
  );
}
