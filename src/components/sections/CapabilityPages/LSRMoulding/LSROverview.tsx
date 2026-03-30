"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Microscope, Settings, Shield, Target } from "lucide-react";

interface LSROverviewProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
    tagline?: string;
  };
}

export default function LSROverview({ content }: LSROverviewProps) {
  const {
    title = "Strengthening Precision Manufacturing",
    description = "At Besmak Components Pvt. Ltd., we are introducing our Liquid Silicone Rubber (LSR) and Liquid Injection Moulding (LIM) capabilities as an important step in strengthening our precision manufacturing in India. Our facility is equipped with a vertical injection moulding machine, dosing system, and robotic support.",
    image = "/images/lsr-moulding-facility.png",
    tagline = "Strategic Capability"
  } = content || {};

  const features = [
    { icon: Microscope, label: "Precision Control", desc: "Micron-level accuracy" },
    { icon: Settings, label: "LIM Technology", desc: "Automated injection systems" },
    { icon: Shield, label: "High Durability", desc: "Chemical & thermal resistance" },
    { icon: Target, label: "Vertical Moulding", desc: "Specialised vertical integration" },
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
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#284b8c]/5 rounded-[10px] border border-[#284b8c]/10 mb-6">
                <span className="text-[#284b8c] font-black tracking-[0.2em] text-[10px] uppercase">{tagline}</span>
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
                    className="flex items-start gap-4 p-4 rounded-[10px] bg-slate-50 border border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center text-[#284b8c] shadow-sm border border-slate-100">
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
              className="relative aspect-square rounded-[10px] overflow-hidden shadow-2xl"
            >
              <Image 
                src={image} 
                alt={title} 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#284b8c]/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
