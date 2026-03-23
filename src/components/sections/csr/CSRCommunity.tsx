"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Users, HandHelping, Heart, ShieldAlert, Waves, MapPin, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Building2 } from "lucide-react";

interface CSRCommunityProps {
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
    closingStatement?: string;
    [key: string]: string | undefined;
  };
}

export default function CSRCommunity({ content }: CSRCommunityProps) {
  const {
    title = "Community Development",
    subtitle = "Empowering People, Building Livelihoods",
    description = "We are committed to supporting communities and creating inclusive growth opportunities. Our approach focuses on long-term resilience and empowerment.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CSR-images.jpg",
    stat1Value = "2015",
    stat1Label = "Chennai Floods",
    stat2Value = "2018",
    stat2Label = "Kerala Floods",
    stat3Value = "Relief",
    stat3Label = "Committed to",
    point1Title = "Support for Differently-Abled Individuals",
    point1Desc = "Providing platforms to promote and sell products made by intellectually challenged individuals, supporting their livelihood",
    point2Title = "Disaster Relief Initiatives",
    point2Desc = "Provided essential support during: Chennai Floods (2015), Kerala Floods (2018). Contributing to relief and rehabilitation efforts",
    closingStatement = "Serving the community with empathy and purpose, making a sustainable impact together.",
  } = content || {};

  const reliefImages = [
    { url: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Flood-relief.jpg", year: "2015", event: "Chennai Floods" },
    { url: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Flood-reliefs.jpg", year: "2018", event: "Kerala Floods" },
    { url: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/floodreliefs.jpg", year: "CSR", event: "Ongoing Support" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reliefImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reliefImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reliefImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reliefImages.length) % reliefImages.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const focusAreas = [
    point1Title,
    "Inclusive Growth Opportunities",
    "Livelihood Support Programs",
    "Disaster Management & Recovery"
  ];

  return (
    <section ref={containerRef} className="py-12 md:py-20 relative overflow-hidden bg-slate-900 border-y border-slate-800 font-sans">
      {/* Parallax Background */}
      <motion.div
        style={{ y, backgroundImage: `url(${image})` }}
        className="absolute inset-x-0 -top-[20%] h-[140%] w-full bg-cover bg-center brightness-[0.25] contrast-125 grayscale-[0.5]"
      />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-transparent to-slate-900/80 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left — Glass Card Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* Background Light Effect */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#009966]/20 text-[#009966] border border-[#009966]/30 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Users size={14} />
                Besmak Impact
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                {title.split(' ')[0]} <br/> 
                <span className="text-[#009966]">{title.split(' ')[1]}</span>
              </h2>
              
              <p className="text-xl text-white/70 leading-relaxed mb-10 font-light max-w-lg">
                {description}
              </p>

              <ul className="space-y-6 mb-12">
                {focusAreas.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-[#009966]/20 flex items-center justify-center border border-[#009966]/30">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#009966]" />
                    </span>
                    <span className="text-white/90 text-lg leading-relaxed font-light">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/5 border-l-4 border-[#009966] rounded-r-2xl p-6"
              >
                <p className="text-lg text-white/80 italic leading-relaxed font-light">
                  "{closingStatement}"
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Cinematic Slider & Stats */}
          <div className="space-y-12 h-full">
            {/* Cinematic Slider Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group/slider w-full aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-800"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: "anticipate" }}
                  className="w-full h-full relative"
                >
                  <img
                    src={reliefImages[currentSlide].url}
                    className="w-full h-full object-cover brightness-[0.7] contrast-125"
                    alt="Relief Story"
                  />
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-x-0 bottom-0 p-10 bg-linear-to-t from-black/80 via-black/20 to-transparent">
                     <motion.div
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.4 }}
                     >
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em] mb-2">{point2Title}</p>
                        <h5 className="text-white text-3xl font-black tracking-tight flex items-center gap-4">
                          <span className="text-[#009966]">{reliefImages[currentSlide].year}</span>
                          <span className="opacity-90">{reliefImages[currentSlide].event}</span>
                        </h5>
                     </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-20">
                 <motion.div 
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-[#009966]" 
                 />
              </div>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
                <button 
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all transform hover:scale-110"
                >
                  <ChevronLeft size={28} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all transform hover:scale-110"
                >
                  <ChevronRight size={28} />
                </button>
              </div>
            </motion.div>

            {/* Impact Grid Styling (Dark Mode) */}
            <div className="grid grid-cols-2 gap-8">
               {[
                 { val: stat1Value, lab: stat1Label, icon: <Waves size={24}/> },
                 { val: stat2Value, lab: stat2Label, icon: <Building2 size={24}/> },
               ].map((s, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    whileHover={{ y: -5, borderColor: "rgba(0,153,102,0.5)" }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center group cursor-default shadow-xl"
                 >
                    <div className="w-12 h-12 bg-[#009966]/20 text-[#009966] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                       {s.icon}
                    </div>
                    <p className="text-5xl font-black text-white mb-2 tracking-tighter">{s.val}</p>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50 leading-tight">{s.lab}</p>
                 </motion.div>
               ))}
               
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="col-span-2 bg-linear-to-r from-[#009966] to-emerald-800 p-10 rounded-[3rem] text-white flex items-center justify-between shadow-2xl shadow-emerald-900/40 relative overflow-hidden group"
               >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 space-y-2">
                     <p className="text-sm font-black uppercase tracking-widest opacity-80">Foundation Reach</p>
                     <p className="text-4xl font-black tracking-tighter">{stat3Value} {stat3Label}</p>
                  </div>
                  <Sparkles size={64} strokeWidth={1} className="opacity-20 transform -rotate-12 group-hover:rotate-12 transition-transform duration-700" />
               </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
