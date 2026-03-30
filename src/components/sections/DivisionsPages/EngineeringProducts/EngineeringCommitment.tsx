"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface EngineeringCommitmentProps {
  content?: {
    title?: string;
    description?: string;
  };
}

export default function EngineeringCommitment({ content }: EngineeringCommitmentProps) {
  const {
    title = "Our Commitment",
    description = "With a strong technical foundation, modern infrastructure, and skilled workforce, the Engineering Products Division is focused on driving innovation, ensuring operational excellence, and supporting customer growth. We are committed to delivering high-quality, cost-effective solutions and building long-term partnerships in the auto components industry.",
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 site-content relative overflow-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative bg-white/80 backdrop-blur-xl px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/50 overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center relative z-10"
          >
            <motion.div variants={itemVariants} className="mb-6 text-primary/20">
              <Quote size={48} strokeWidth={1} className="rotate-180" />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl text-slate-900 font-extrabold mb-8 tracking-tight">
              {title}
            </motion.h2>

            <motion.div
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: { width: "80px", opacity: 1, transition: { duration: 0.8, delay: 0.4 } }
              }}
              className="h-1 bg-primary rounded-full mb-10"
            />

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 font-normal leading-relaxed max-w-4xl mx-auto italic">
              "{description}"
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Large Decorative Orbs */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-y-1/4 translate-x-1/2" 
      />
    </section>
  );
}
