"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Layers, Droplets, FlaskConical, Database, Edit2 } from "lucide-react";

interface PlatingProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function AutomationPlatingLines({ content }: PlatingProps) {
  const {
    title = "Automated Plating Excellence",
    description = "In addition, we use automated reel-to-reel and barrel plating lines to ensure uniform output and better surface quality. We focus on adopting the latest technologies to improve productivity and reliability.",
    image = "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=1200&auto=format&fit=crop"
  } = content || {};

  const lines = [
    {
      title: "Reel-to-Reel Plating",
      desc: "High-volume, automated reel-to-reel processing for consistent surface treatment.",
      icon: Layers,
    },
    {
      title: "Barrel Plating Lines",
      desc: "Precision barrel plating for uniform coverage on complex components.",
      icon: Droplets,
    },
    {
      title: "Uniform Output",
      desc: "Automated controls ensure exact thickness and surface quality across all batches.",
      icon: FlaskConical,
    },
    {
      title: "Advanced Surface Quality",
      desc: "Enhanced corrosion resistance and electrical conductivity through superior plating.",
      icon: Database,
    },
  ];

  return (
    <section className="pt-12 pb-0 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* PART 1: Top Hero-style Intro */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 lg:mb-24 items-center">
          {/* Left: High Impact Image */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
              className="relative h-[250px] sm:h-[400px] rounded-[10px] overflow-hidden shadow-2xl group/img"
            >
              <Image 
                src={image} 
                alt="Plating Lines" 
                fill 
                priority
                className="object-cover transition-transform duration-1000 group-hover/img:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* Right: Content Block */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.1 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#284b8c] mb-6 md:mb-8 tracking-tighter leading-[1.1] uppercase">
                {title}
              </h2>
              <p className="text-base md:text-xl lg:text-[1.35rem] text-slate-700/80 font-medium leading-relaxed md:leading-[1.6]">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* PART 2: Full-Width Distinct Capability Grid Section */}
      <div className="bg-[#284b8c] py-16 lg:py-24 relative overflow-hidden">
        {/* Subtle technical background accent */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image 
            src="/blueprint-bg.png" 
            alt="Technical Bg" 
            fill 
            className="object-cover" 
          />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-white/95 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-500 flex flex-col h-full overflow-hidden shadow-xl hover:-translate-y-2"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
                
                <div className="mb-8 w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-primary border border-slate-100 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <line.icon size={26} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                  {line.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-medium">
                  {line.desc}
                </p>
                
                {/* Animated indicator */}
                <div className="h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 transition-all duration-500" />
                
                {/* Number index accent */}
                <div className="absolute bottom-4 right-6 text-4xl font-black text-slate-900/5 select-none transition-all duration-500 group-hover:text-slate-900/10">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
