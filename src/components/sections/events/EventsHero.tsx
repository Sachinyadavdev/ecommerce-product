"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useRef } from "react";

interface EventsHeroProps {
  totalEvents?: number;
  upcomingCount?: number;
  content?: {
    backgroundImage?: string;
  };
}

export default function EventsHero({ totalEvents = 0, upcomingCount = 0, content }: EventsHeroProps) {
  const { backgroundImage } = content || {};
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax subtle effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="bg-slate-950 text-white mt-[85px] py-20 md:py-24 relative overflow-hidden flex items-center min-h-[75vh] group"
    >
      {/* Parallax Background Image Layer */}
      {backgroundImage ? (
        <motion.div style={{ y: yBg }} className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0">
          <img 
            src={backgroundImage} 
            alt="Events Banner Background" 
            className="w-full h-full object-cover opacity-50 filter saturate-[1.1] transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Advanced overlay gradient for text contrast */}
          <div className="absolute inset-0 bg-linear-to-tr from-slate-950/90 via-slate-950/60 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/40 to-slate-950/95" />
        </motion.div>
      ) : (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#61a0b3]/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#284b8c]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      )}

      {/* Decorative tech grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} 
      />
      
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Animated Label */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-sky-400 mb-10 shadow-lg shadow-sky-500/10 backdrop-blur-md transition-all duration-500 group-hover:bg-sky-500/10 group-hover:border-sky-500/30 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] group-hover:-translate-y-1"
          >
            <CalendarDays className="w-4 h-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            Global Events & Exhibitions
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] mb-8 transition-transform duration-700 group-hover:translate-x-2"
          >
            Where Industry
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-[#61a0b3] to-[#284b8c] drop-shadow-sm transition-all duration-700 group-hover:brightness-125">
              Meets Innovation
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed max-w-2xl mb-12 border-l-2 border-sky-500/30 pl-6 py-1 transition-all duration-700 group-hover:border-sky-400 group-hover:text-white"
          >
            Join Besmak India at leading trade shows, exhibitions, and industry events across the globe as we showcase our latest technological advancements.
          </motion.p>

          {/* Interactive Stats Block */}
          {totalEvents > 0 && (
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-6 md:gap-10 p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md max-w-2xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-sky-500/5 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              
              <div className="text-center md:text-left relative z-10">
                <p className="text-4xl md:text-5xl font-black text-white drop-shadow-md">{upcomingCount}</p>
                <p className="text-xs text-sky-400/80 uppercase tracking-widest font-bold mt-2">Upcoming</p>
              </div>
              
              <div className="hidden md:block w-px h-16 bg-white/10 relative z-10" />
              
              <div className="text-center md:text-left relative z-10">
                <p className="text-4xl md:text-5xl font-black text-white opacity-80">{totalEvents}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-2">Total Events</p>
              </div>
              
              <div className="flex-1 min-w-[200px] flex justify-end relative z-10">
                <div className="flex items-center gap-3 px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-bold text-emerald-400 tracking-wide">Actively Participating</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Removed the bottom gradient fade to make it a plain, sharp cut transition as requested */}
    </section>
  );
}
