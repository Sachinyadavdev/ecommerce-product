"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

interface GreenEnergyCommitmentProps {
  content?: {
    title?: string;
    tagline?: string;
    description?: string;
    mainImage?: string;
    secondaryImage?: string;
  };
}

export default function GreenEnergyCommitment({ content }: GreenEnergyCommitmentProps) {
  const {
    title = "Our Sustainability Commitment",
    tagline = "ESG & Social Responsibility",
    description = "At Besmak, we believe that sustainable manufacturing is the foundation of a better future. Our commitment to environmental, social, and governance (ESG) standards drives every decision we make.",
    mainImage = "/images/sustainability_commitment.png",
    secondaryImage = "/images/engineering_infrastructure_premium.png"
  } = content || {};

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Overlapping Layout Like Image 4 */}
          <div className="relative">
            {/* Main Image (Large) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" as const }}
              className="relative aspect-[4/5] md:aspect-[4/3] rounded-[4rem] overflow-hidden shadow-2xl z-10"
            >
              <Image 
                src={mainImage} 
                alt="Main Sustainability Image" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </motion.div>

            {/* Overlapping Image (Small) - Positioned bottom-left like reference */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" as const }}
              className="absolute -bottom-10 -left-10 w-2/3 aspect-square rounded-[3rem] overflow-hidden shadow-2xl z-20 border-[12px] border-white hidden md:block"
            >
              <Image 
                src={secondaryImage} 
                alt="Secondary Sustainability Image" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              className="absolute top-10 right-10 z-30 bg-primary/95 backdrop-blur-md text-white p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl border border-white/20"
            >
              <Leaf className="w-8 h-8 mb-1" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Eco Focus</span>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-primary" />
                <span className="text-primary font-black tracking-[0.3em] text-xs uppercase">{tagline}</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-10 tracking-tighter leading-[1.1]">
                {title}
              </h2>

              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 whitespace-pre-line">
                {description}
              </p>


              <div className="mt-8 flex flex-wrap gap-6" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
