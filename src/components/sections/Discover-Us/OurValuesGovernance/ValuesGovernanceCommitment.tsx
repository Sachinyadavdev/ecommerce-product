"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ValuesGovernanceCommitmentProps {
  content?: {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function ValuesGovernanceCommitment({ content }: ValuesGovernanceCommitmentProps) {
  const {
    title = "Commitment to Excellence",
    description = "At Besmak, our values and governance practices are not just principles—they are embedded in our everyday operations. They enable us to deliver precision, performance, and trust across every product and partnership.",
    ctaText = "Explore Our Divisions",
    ctaLink = "/divisions",
  } = content || {};

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] rounded-full bg-blue-400/5 blur-[100px]" />
        {/* Diagonal Line Texture overlay */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="diagonal-lines" width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" strokeWidth="1" className="text-slate-900" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <motion.div 
        className="container mx-auto px-4 max-w-4xl relative z-10 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15
            }
          }
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.5, rotate: -10 },
            visible: { opacity: 1, scale: 1, rotate: 0 }
          }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
          className="w-24 h-24 rounded-3xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-10 shadow-xl shadow-primary/10 border border-primary/10 relative group"
        >
          {/* Continuous floating animation */}
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-500" />
          </motion.div>
          {/* Decorative ping ring */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
        </motion.div>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto"
        >
          {description}
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative inline-block group"
        >
          {/* Subtle underlying glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-primary/40 to-blue-400/40 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
          
          <Link
            href={ctaLink}
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0"
          >
            <span className="text-lg">{ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Decorative grid of stats */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {[
            { value: "25+", label: "Years of Excellence" },
            { value: "IATF", label: "16949 Certified" },
            { value: "100%", label: "Ethical Operations" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-primary/20 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Decorative corner accent class */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
              
              <p className="text-4xl lg:text-5xl font-extrabold text-primary mb-3 tracking-tight group-hover:scale-105 transition-transform duration-500 origin-bottom-left">{stat.value}</p>
              <p className="text-base text-slate-500 font-medium group-hover:text-slate-700 transition-colors uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
