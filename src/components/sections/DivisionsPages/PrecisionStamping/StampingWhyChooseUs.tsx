"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Target } from "lucide-react";
import Link from "next/link";

interface USP {
  title: string;
}

interface StampingWhyChooseUsProps {
  content?: {
    title?: string;
    description?: string;
    summary?: string;
    visionTitle?: string;
    
    // Flat CMS mapping
    usp1Title?: string;
    usp2Title?: string;
    usp3Title?: string;
    usp4Title?: string;
    usp5Title?: string;
    usp6Title?: string;

    // Old Fallback
    usps?: USP[];
  };
}

const defaultUSPs = [
  { title: "Exclusive focus on precision stamping ensures deep domain expertise." },
  { title: "State-of-the-art progressive tooling minimizes operational downtime." },
  { title: "Uncompromised accuracy of 0.01 MM for reliable parts." },
  { title: "High-speed production supporting mass manufacturing with precision." },
  { title: "Equipped with advanced CMM, VMS, and Profile Projectors for QA." }
];

export default function StampingWhyChooseUs({ content }: StampingWhyChooseUsProps) {
  // Map flat CMS fields
  const cmsUsps: USP[] = [
    { title: content?.usp1Title || defaultUSPs[0].title },
    { title: content?.usp2Title || defaultUSPs[1].title },
    { title: content?.usp3Title || defaultUSPs[2].title },
    { title: content?.usp4Title || defaultUSPs[3].title },
    { title: content?.usp5Title || defaultUSPs[4].title },
    content?.usp6Title ? { title: content.usp6Title } : null
  ].filter(Boolean) as USP[];

  const hasCmsData = !!(content?.usp1Title || content?.usp2Title);

  const {
    title = "Why Choose PPM Stamping?",
    description = "Driving efficiency and quality through advanced tooling and cutting-edge technology.",
    visionTitle = "Our Vision",
    summary = "By continually upgrading our infrastructure and embracing new technologies, we remain committed to delivering superior stamping solutions that meet the evolving demands of various industries."
  } = content || {};

  // Explicit assignment to override old arrays if flat fields exist
  const displayUsps = hasCmsData ? cmsUsps : (content?.usps || defaultUSPs);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const as any } }
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 site-content relative overflow-hidden">
      {/* Premium Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary-rgb),0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(slate-600 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Flowing Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold tracking-widest uppercase text-sm">PPM STAMPING</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-12">
              {description}
            </p>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4 mb-16"
            >
              {displayUsps.map((usp, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 size={18} strokeWidth={2} />
                  </div>
                  <p className="text-slate-700 font-medium text-lg pt-0.5 leading-snug group-hover:text-slate-900 transition-colors">
                    {usp.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            
            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-[20px] transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group">
              Partner with Besmak 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Column: Premium Vision Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative"
          >
            {/* Background Glow behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="p-10 md:p-14 lg:p-16 rounded-[3rem] bg-primary text-white relative overflow-hidden shadow-[0_20px_80px_-15px_rgba(var(--color-primary-rgb),0.5)] border border-white/10 group hover:border-white/30 transition-colors duration-500">
              
              {/* Subtle top glare effect */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <Target size={48} className="text-white mb-8 opacity-90 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                
                <h3 className="text-3xl font-extrabold mb-8 tracking-tight flex items-center gap-4">
                  {visionTitle}
                  <span className="h-px bg-white/20 flex-1" />
                </h3>
                
                <p className="text-xl md:text-2xl text-blue-50 font-light leading-relaxed italic relative">
                  <span className="text-6xl text-white/20 absolute -top-4 -left-6 font-serif">"</span>
                  {summary}
                  <span className="text-6xl text-white/20 absolute -bottom-8 -ml-2 font-serif">"</span>
                </p>
                
                <div className="mt-12 w-24 h-1.5 bg-linear-to-r from-white/50 to-white/90 rounded-full group-hover:w-full transition-all duration-700 ease-out" />
              </div>

              {/* Huge Watermark */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 select-none pointer-events-none opacity-5 transition-opacity duration-500 group-hover:opacity-10">
                <Target size={300} strokeWidth={0.5} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
