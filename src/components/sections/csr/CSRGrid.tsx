"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Target, Recycle, ArrowRight, ShieldCheck, HandHeart, Compass, BookOpen } from "lucide-react";

interface CSRGridProps {
  content?: {
    mainTitle?: string;
    subtitle?: string;
    body?: string;
    philosophyTitle?: string;
    philosophyBody?: string;
    image?: string;
    [key: string]: string | undefined;
  };
}

export default function CSRGrid({ content }: CSRGridProps) {
  const {
    mainTitle = "Corporate Social Responsibility (CSR)",
    subtitle = "“With a Smile, We Give Back to Society”",
    body = "At Besmak Components Pvt. Ltd., we believe that responsible growth goes beyond business success. Our Corporate Social Responsibility (CSR) initiatives reflect our commitment to creating a positive impact on society and the environment through sustainable and meaningful actions.",
    philosophyTitle = "Our CSR Philosophy",
    philosophyBody = "Our approach to CSR is rooted in the belief that businesses have a responsibility to contribute to the well-being of the communities they serve. We focus on initiatives that promote environmental sustainability, healthcare support, and community development, ensuring long-term value for society.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CSR-Besmak-Image.png",
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-12 md:py-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-200/40 select-none pointer-events-none -rotate-12 z-0 leading-none tracking-tighter mix-blend-multiply opacity-30">
        SOCIETY
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center">
          
          {/* Left Side: Modern Asymmetric Image Composition */}
          <div className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] md:aspect-[1/1] overflow-hidden rounded-[3rem] shadow-2xl border-8 border-white group"
            >
              <img 
                src={image} 
                alt="Besmak CSR" 
                className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a6b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Overlapping Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 rounded-3xl shadow-xl max-w-[280px] border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200">
                  <HandHeart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Empowering Lives</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Community Support</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic">
                “Giving back is not just our duty; it's our mission to see a smile on every face we serve.”
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -left-6 bg-[#1e2a6b] text-white py-4 px-6 rounded-2xl shadow-xl shadow-blue-900/20 hidden md:flex items-center gap-3"
            >
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase">Trusted Growth</span>
            </motion.div>
          </div>

          {/* Right Side: Content & Staggered Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 space-y-12"
          >
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="flex items-center gap-3 text-[#009966] font-bold text-xs uppercase tracking-[0.3em]">
                <div className="h-[2px] w-8 bg-[#009966] rounded-full" />
                Besmak Impact
              </motion.div>
              <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight">
                {mainTitle}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-2xl font-serif italic text-blue-900 leading-snug">
                {subtitle}
              </motion.p>
              <motion.p variants={itemVariants} className="text-xl text-slate-500 leading-relaxed font-light">
                {body}
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)", borderColor: "rgba(30,42,107,0.1)" }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
              className="relative p-10 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 group overflow-hidden cursor-default"
            >
              <div className="absolute top-0 right-0 p-8 text-slate-50 group-hover:text-blue-50 transition-colors pointer-events-none">
                <BookOpen size={120} strokeWidth={0.5} />
              </div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white shadow-md border border-slate-100 rounded-2xl flex items-center justify-center text-[#1e2a6b] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                    <Compass className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {philosophyTitle}
                  </h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {philosophyBody}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {["Sustainability", "Healthcare", "Development"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#1e2a6b]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
