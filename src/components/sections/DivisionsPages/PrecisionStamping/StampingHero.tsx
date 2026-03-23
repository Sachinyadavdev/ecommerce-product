"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Settings } from "lucide-react";
import { useRef } from "react";

interface StampingHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function StampingHero({ content }: StampingHeroProps) {
  const {
    title = "Precision Stamping Manufacturing",
    subtitle = "Excellence in Metal Engineering. Precision in Every Dimension.",
    backgroundImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Precision-stamping-division-verticals.png",
    backgroundVideo,
    ctaText = "Explore Capabilities",
    ctaLink = "/products",
  } = content || {};

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-[85vh] md:h-[95vh] flex items-center overflow-hidden bg-slate-950 mt-16 md:mt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover scale-105 opacity-60"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        ) : (
          <motion.div 
            style={{ y: y1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </motion.div>
        )}
        
        {/* Subtle vignette and color grade */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-slate-950/30 z-10 backdrop-contrast-[1.1] backdrop-saturate-[1.1]" />
        
        {/* Industrial unique element: Rotating Mechanical Gear background */}
        <motion.div 
          style={{ rotate }}
          className="absolute -top-32 -right-32 opacity-10 z-10 text-white pointer-events-none"
        >
          <Settings size={800} strokeWidth={0.5} />
        </motion.div>

        {/* Technical hex pattern overlay - kept from orginal stamping hero for uniqueness */}
        <div className="absolute inset-0 opacity-15 z-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
              className="h-[2px] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" 
            />
            <span className="text-white font-black tracking-[0.5em] text-sm md:text-base uppercase bg-white/5 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/10">
              Industrial Excellence
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.85] uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            {title.split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-6 text-white"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-4xl text-blue-50 font-extralight leading-tight mb-16 max-w-2xl drop-shadow-xl opacity-90 border-l-4 border-primary/40 pl-6 py-2"
          >
            {subtitle}
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap items-center gap-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link href={ctaLink}>
              <button className="group relative flex items-center bg-white text-slate-950 pl-10 pr-14 py-5 rounded-full font-black uppercase tracking-widest transition-all duration-500 hover:pr-16 hover:bg-primary hover:text-white active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)] overflow-hidden">
                <span className="relative z-10 text-xl">{ctaText}</span>
                <span className="absolute right-6 transition-all duration-500 group-hover:right-5">
                  <ArrowRight className="w-7 h-7" strokeWidth={3} />
                </span>
                {/* Advanced Metallic shimmer effect */}
                <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                {/* Pulsing Glow that matches button state */}
                <div className="absolute inset-0 rounded-full border-2 border-slate-950/20 group-hover:border-white/30 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:opacity-0" />
              </button>
            </Link>
            
            {/* Secondary technical indicator - Unique to stamping */}
            {/* <motion.div 
              variants={itemVariants}
              className="hidden md:flex items-center gap-4 px-6 py-4 border border-white/10 rounded-full backdrop-blur-md bg-white/5"
            >
              <div className="flex gap-1.5">
                {[1,2,3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="w-2 h-2 rounded-full bg-primary" 
                  />
                ))}
              </div>
              <span className="text-xs text-white/60 uppercase font-black tracking-[0.2em]">System Status: Active</span>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
