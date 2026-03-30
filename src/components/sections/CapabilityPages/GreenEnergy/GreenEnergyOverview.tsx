"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";

interface GreenEnergyOverviewProps {
  content?: {
    title?: string;
    description1?: string;
    description2?: string;
    image?: string;
    tagline?: string;
  };
}

export default function GreenEnergyOverview({ content }: GreenEnergyOverviewProps) {
  const {
    title = "Powering Progress Sustainably",
    description1 = "Besmak Components is committed to reducing its environmental impact by adopting green energy solutions. By using cleaner energy sources, we aim to lower carbon emissions and support sustainable manufacturing practices.",
    description2 = "Our focus on energy efficiency and responsible resource usage helps us operate in an eco-friendly manner while maintaining high production standards.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/green-energy-industrial.png",
    tagline = "Our Commitment"
  } = content || {};

  return (
    <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-black tracking-[0.3em] text-xs uppercase">{tagline}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-10 tracking-tighter leading-[1.1]">
              {title}
            </h2>

            <div className="space-y-6">
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {description1}
              </p>
              <p className="text-xl text-slate-600 font-light leading-relaxed">
                {description2}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-[4/3] rounded-[10px] overflow-hidden shadow-2xl group"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            {/* Floating Info Card */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-[10px] shadow-xl flex items-center gap-4 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Our Status</p>
                <p className="text-sm font-black text-slate-900 leading-tight">100% Committed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
