"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Settings2, BarChart3, Zap, Edit2 } from "lucide-react";

interface OverviewProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function AutomationOverview({ content }: OverviewProps) {
  const {
    title = "Advanced Integration across Manufacturing",
    description = "At Besmak, advanced automation is integrated across all manufacturing processes to ensure consistent quality and efficient production. We use high-speed, precision machinery along with robotic systems to reduce manual intervention and improve accuracy.",
    image = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
  } = content || {};

  const features = [
    { icon: Cpu, label: "Robotic Systems", desc: "Precision robot integration" },
    { icon: Settings2, label: "Process Control", desc: "Automated parameter monitoring" },
    { icon: BarChart3, label: "Efficiency", desc: "Optimised cycle times" },
    { icon: Zap, label: "Fast Response", desc: "Rapid technological adaptation" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-[10px] border border-primary/10 mb-6">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Smart Transformation</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] mb-6 tracking-tight leading-tight">
                {title}
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
                {description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-[10px] bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center text-primary shadow-sm border border-slate-100">
                      <f.icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm mb-1">{f.label}</h3>
                      <p className="text-xs text-slate-500 leading-snug">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-video lg:aspect-square rounded-[10px] overflow-hidden shadow-2xl"
            >
              <Image 
                src={image} 
                alt="Automation Technology" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              
            </motion.div>

            {/* Decorative Ring */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-4 border-dashed border-primary/10 animate-spin-slow pointer-events-none" />
          </div>
        </div>
      </div>

    </section>
  );
}
