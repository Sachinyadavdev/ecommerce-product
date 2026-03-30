"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface EngineeringHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    tagline?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function EngineeringHero({ content }: EngineeringHeroProps) {
  const {
    title = "Engineering Products",
    subtitle,
    tagline,
    backgroundImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Engineering-products-division-verticals.png",
    backgroundVideo,
    ctaText = "Explore Our Products",
    ctaLink = "/products"
  } = content || {};

  const displaySubtitle = subtitle || tagline || "Precision. Performance. Innovation.";

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

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
      className="relative h-[85vh] md:h-screen flex items-center overflow-hidden bg-slate-950 mt-16 md:mt-20 lg:mt-[85px]"
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
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 2, ease: "easeOut" as const }}
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
          </motion.div>
        )}
        
        {/* Subtle vignette and color grade */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/10 via-transparent to-slate-900/30 z-10" />
        <div className="absolute inset-0 bg-slate-900/10 z-10 backdrop-contrast-[1.05] backdrop-saturate-[1.05]" />
        
        {/* Tech-inspired grid overlay */}
        <div className="absolute inset-0 opacity-15 z-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-6 mb-8">
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
                className="h-[2px] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" 
            />
            <span className="text-white font-black tracking-[0.5em] text-xs md:text-sm uppercase bg-white/5 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/10">
              Engineering Products
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]">
            {title}
          </h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-blue-50 font-extralight leading-relaxed mb-12 max-w-2xl drop-shadow-xl opacity-90"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link href={ctaLink}>
              <button className="group relative flex items-center bg-primary text-white px-10 py-5 rounded-[20px] font-black transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(var(--primary-rgb),0.5)] active:scale-95 overflow-hidden">
                <span className="relative z-10 text-lg uppercase tracking-widest">{ctaText}</span>
                <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover:translate-x-2" />
                <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-transparent z-30" 
      />

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
