"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { useRef } from "react";

interface CNHMouldsHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function CNHMouldsHero({ content }: CNHMouldsHeroProps) {
  const {
    title = "CNH Moulds – Precision, Innovation, & Excellence",
    subtitle = "Advanced Mould Design & Scientific Injection Tooling Solutions.",
    backgroundImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/hero-bg-blueprint.jpg",
    backgroundVideo,
    ctaText = "Design Solutions",
    ctaLink = "/products"
  } = content || {};

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateBox = useTransform(scrollY, [0, 1000], [12, 180]); // Rotate box on scroll

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
            animate={{ scale: 1.1, opacity: 0.5 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </motion.div>
        )}
        
        {/* Blueprint Cyan Overlay & Vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-slate-950/30 z-10 backdrop-contrast-[1.1] backdrop-saturate-[1.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.15),transparent_60%)] z-10" />
        
        {/* CAD Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20 z-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        />

        {/* Floating Design Elements - Unique to CNH Moulds */}
        <motion.div 
          style={{ rotate: rotateBox }}
          className="absolute top-1/4 right-1/4 opacity-15 pointer-events-none hidden md:block z-10"
        >
           <Box size={500} strokeWidth={0.5} className="text-primary" />
        </motion.div>
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
            <span className="text-white font-black tracking-[0.5em] text-sm md:text-base uppercase bg-white/5 backdrop-blur-md px-5 py-1.5 rounded-full border border-primary/20">
               Design & Precision
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-[9rem] xl:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.85] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            {title.split(" ").map((word, i) => {
              const cleanedWord = word.replace(/[.,]/g, "").toLowerCase();
              const isCyan = cleanedWord === 'innovation' || cleanedWord === 'moulds' || cleanedWord === 'cnh';
              
              return (
                <motion.span 
                  key={i} 
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={`inline-block mr-6 ${isCyan ? 'text-primary' : ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-4xl text-blue-50 font-extralight leading-tight mb-16 max-w-2xl drop-shadow-xl opacity-90"
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
              <button className="group relative flex items-center bg-primary text-white pl-10 pr-14 py-5 rounded-full font-black uppercase tracking-widest transition-all duration-500 hover:pr-16 hover:bg-primary/90 active:scale-95 shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)] overflow-hidden border border-primary/30">
                <span className="relative z-10 text-xl">{ctaText}</span>
                <span className="absolute right-6 transition-all duration-500 group-hover:right-5">
                  <ArrowRight className="w-7 h-7" strokeWidth={3} />
                </span>
                {/* Advanced Blueprint scanner effect */}
                <div className="absolute inset-0 w-2 h-full bg-white/30 blur-[2px] -translate-x-full group-hover:animate-[scan_2s_infinite_ease-in-out]" />
                {/* Pulsing Glow */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-100 transition-all duration-700 group-hover:scale-150 group-hover:opacity-0" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(1000%); }
        }
      `}</style>
    </section>
  );
}
