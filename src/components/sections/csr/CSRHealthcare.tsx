"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Activity, Crosshair, CheckCircle2, ArrowRight, HelpingHand, ShieldCheck, Stethoscope, Droplets, Laptop, Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface CSRHealthcareProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
    point1Title?: string;
    point1Desc?: string;
    point2Title?: string;
    point2Desc?: string;
    point3Title?: string;
    point3Desc?: string;
    [key: string]: string | undefined;
  };
}

export default function CSRHealthcare({ content }: CSRHealthcareProps) {
  const {
    title = "Healthcare & Social Support",
    subtitle = "Supporting Lives and Communities",
    description = "We actively contribute to healthcare and social welfare initiatives to improve the quality of life in our communities.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CSR-images.jpg",
    point1Title = "Blood Donation Camps",
    point1Desc = "Organized regularly in association with organizations like Lions Club, with active employee participation",
    point2Title = "Medical Support Initiatives",
    point2Desc = "Donation of a dialysis machine to hospitals through Rotary Club, helping provide affordable treatment to patients in need",
    point3Title = "Support for Medical Institutions",
    point3Desc = "Collaboration with philanthropic healthcare institutions offering free or subsidized treatment",
  } = content || {};

  const initiatives = [
    { title: point1Title, desc: point1Desc, icon: Droplets, color: "text-red-500", glow: "hover:shadow-red-500/20" },
    { title: point2Title, desc: point2Desc, icon: Activity, color: "text-blue-500", glow: "hover:shadow-blue-500/20" },
    { title: point3Title, desc: point3Desc, icon: HelpingHand, color: "text-[#009966]", glow: "hover:shadow-[#009966]/20" },
  ];

  const healthcareImages = [
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Medical-Camp-images.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Medical-Camp-image.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Medicalcamp-%20images.png"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % healthcareImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [healthcareImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % healthcareImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + healthcareImages.length) % healthcareImages.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-[#fafcff] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[100px] translate-y-1/2" />
        
        {/* Animated Molecular Mesh (SVG Placeholder feel) */}
        <svg className="absolute top-20 right-20 w-64 h-64 text-blue-100/30 opacity-50" viewBox="0 0 200 200">
           <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
           <motion.circle 
              animate={{ r: [60, 80, 60] }}
              transition={{ duration: 4, repeat: Infinity }}
              cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" 
           />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Sticky Header Area */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white shadow-sm rounded-2xl border border-slate-100">
                <div className="relative">
                   <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-20" />
                   <Heart className="text-red-500 relative" size={16} fill="currentColor" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                  CSR IMPACT REPORT
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-[#1e2a6b] tracking-tight leading-[0.95]">
                {title.split(' & ')[0]} <br/> 
                <span className="text-[#009966]">& {title.split(' & ')[1]}</span>
              </h2>

              <p className="text-2xl font-serif italic text-slate-400 italic font-medium leading-snug max-w-md">
                "{subtitle}"
              </p>

              <p className="text-lg text-slate-500 leading-relaxed font-light max-w-sm">
                {description}
              </p>

              {/* Branding Image Slider with Float */}
              <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative w-full max-w-[500px] mx-auto aspect-[5/7] rounded-3xl overflow-hidden shadow-2xl border-4 border-white mt-12 group/slider"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <img src={healthcareImages[currentSlide]} className="w-full h-full object-cover" alt={`Healthcare ${currentSlide + 1}`} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1e2a6b]/40 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all transform hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all transform hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <motion.div 
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-[#009966]" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Interactive Cards Area */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            {initiatives.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group relative bg-white border border-slate-100 p-10 md:p-14 rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] transition-all duration-500 ${item.glow}`}
              >
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                   {/* Animated Icon Segment */}
                   <div className="relative shrink-0">
                      <div className={`w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center ${item.color} group-hover:bg-white transition-all transform group-hover:rotate-[360deg] duration-700 shadow-sm border border-slate-50`}>
                        <item.icon size={44} strokeWidth={1} />
                      </div>
                      <div className={`absolute -inset-2 rounded-[3rem] border border-dashed border-slate-200 group-hover:rotate-180 transition-transform duration-[1.5s]`}></div>
                   </div>

                   {/* Text Content */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <h4 className="text-3xl font-black text-[#1e2a6b] tracking-tight">{item.title}</h4>
                         <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400">CSR-{2024+i}</div>
                      </div>
                      <p className="text-lg text-slate-500 font-light leading-relaxed">
                        {item.desc}
                      </p>
                      
                   </div>
                </div>

                {/* Background Shadow Ornament */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-slate-50/50 rounded-full blur-3xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}

            {/* Bottom Partners Marquee Feel */}
            <motion.div 
                variants={itemVariants} 
                className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10"
            >
               <div className="space-y-2">
                 <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-300">Philanthropic Network</p>
                 <div className="flex gap-8">
                    <span className="text-2xl font-serif text-slate-900 border-b-2 border-red-200">Lions Club</span>
                    <span className="text-2xl font-serif text-slate-900 border-b-2 border-blue-200">Rotary Club</span>
                 </div>
               </div>

               <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                     {[1,2,3].map(n => (
                        <div key={n} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
                     ))}
                  </div>
                  <p className="text-sm font-bold text-slate-400">Community <br/> Participation</p>
               </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
