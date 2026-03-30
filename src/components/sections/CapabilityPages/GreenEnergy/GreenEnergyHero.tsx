"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface GreenEnergyHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    bgImage?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function GreenEnergyHero({ content }: GreenEnergyHeroProps) {
  const {
    title = "Driving Sustainability Through Green Energy",
    subtitle = "RENEWABLE | SUSTAINABLE | RESPONSIBLE",
    bgImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/green-energy-industrial.png",
    ctaText = "Our Sustainability Goals",
    ctaLink = "/contact-us"
  } = content || {};

  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center overflow-hidden bg-white mt-[85px]"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" as const }}
        >
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
        
        {/* Premium Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />
        
        {/* Tech-inspired grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-primary uppercase border-l-4 border-primary bg-primary/5">
              {subtitle}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black text-primary mb-8 tracking-tighter leading-[0.9] drop-shadow-sm"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="group relative flex items-center bg-primary text-white px-10 py-5 rounded-[10px] font-black transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)] active:scale-95 overflow-hidden">
              <span className="relative z-10 text-lg uppercase tracking-widest">{ctaText}</span>
              <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-transparent z-30" 
      />
    </section>
  );
}
