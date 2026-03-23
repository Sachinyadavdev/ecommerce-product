"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Trophy, Globe, Zap, CheckCircle2 } from "lucide-react";

interface PartnershipsIntroProps {
  content?: {
    tagline?: string;
    description?: string;
    image?: string;
    stats?: Array<{ label: string; value: string; icon?: string }>;
  };
}

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 50,
    damping: 30,
  } as const);
  
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
  );

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const DEFAULT_STATS = [
  { label: "Years of Excellence", value: "35+", icon: "Trophy" },
  { label: "Global Partners", value: "100+", icon: "Globe" },
  { label: "Precision Components", value: "5000+", icon: "Zap" }
];

const ICON_MAP = {
  Trophy: Trophy,
  Globe: Globe,
  Zap: Zap,
  CheckCircle2: CheckCircle2
};

export default function PartnershipsIntro({ content }: PartnershipsIntroProps) {
  const {
    tagline = "At Besmak Components Pvt. Ltd., partnerships are at the core of our growth and innovation.",
    description = "Over the years, we have built strong, long-term relationships with leading automotive OEMs, Tier-1 suppliers, and industry partners, enabling us to deliver high-quality, precision-engineered solutions across the automotive ecosystem.",
    image = "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    stats = DEFAULT_STATS
  } = content || {};

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-10 skew-x-12 translate-x-1/2" />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold tracking-wide uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Collaborative Growth
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.15] tracking-tight">
              {tagline}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-6">
              {description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-0">
              {stats.map((stat, idx) => {
                const IconComponent = ICON_MAP[stat.icon as keyof typeof ICON_MAP] || CheckCircle2;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="p-6 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/10 transition-all duration-500 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <IconComponent size={20} strokeWidth={2.5} />
                    </div>
                    <p className="text-3xl font-black text-slate-900 mb-1">
                      <Counter value={stat.value} />
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-primary/20 rounded-tl-3xl" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-primary/20 rounded-br-3xl" />
            
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <Image
                src={image}
                alt="Partnership and Innovation"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-transparent mix-blend-overlay" />
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-black text-slate-900 leading-none">Global</p>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Standard</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Soft Shadow Glow */}
            <div className="absolute -z-10 inset-0 bg-primary/20 blur-[100px] rounded-full opacity-30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
