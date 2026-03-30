"use client";
// Comment 
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CNHMouldsCTAProps {
  content?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export default function CNHMouldsCTA({ content }: CNHMouldsCTAProps) {
  const {
    title = "Discover the Full Potential of CNH Moulds",
    description = "Explore our dedicated platform to dive deeper into our specialized mould-making capabilities, expansive portfolio, and cutting-edge engineering solutions.",
    buttonText = "Visit CNH Moulds Website",
    buttonLink = "https://cnhmoulds.com" // Default placeholder link
  } = content || {};

  return (
    <section className="py-10 md:py-16 relative overflow-hidden bg-linear-to-br from-[#284B8C] to-[#1a3668] site-content">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[130px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: "easeOut" as const }}
           className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden group"
        >
          {/* Subtle grid pattern inside card */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
          >
            <Link href={buttonLink} target="_blank" rel="noopener noreferrer">
               <button className="group/btn relative inline-flex items-center justify-center gap-3 bg-white text-primary hover:bg-slate-50 text-lg md:text-xl font-bold py-5 px-10 rounded-[20px] transition-all duration-300 overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] hover:-translate-y-1">
                 {/* Shine effect */}
                 <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                 
                 <span className="relative z-10">{buttonText}</span>
                 <ExternalLink className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
               </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
