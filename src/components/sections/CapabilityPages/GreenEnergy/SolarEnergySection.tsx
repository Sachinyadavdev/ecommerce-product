"use client";

import { motion } from "framer-motion";
import { Sun, Zap, Leaf, TrendingDown } from "lucide-react";
import Image from "next/image";

interface SolarEnergySectionProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const stats = [
  { icon: Sun, value: "500 KW", label: "Solar Power Installed", color: "text-[#00A758]", bg: "bg-[#00A758]/10" },
  { icon: Zap, value: "2", label: "Manufacturing Units", color: "text-[#284b8c]", bg: "bg-[#284b8c]/10" },
  { icon: Leaf, value: "2000+", label: "Trees Planted", color: "text-[#00A758]", bg: "bg-[#00A758]/10" },
  { icon: TrendingDown, value: "40%", label: "CO₂ Reduction Goal", color: "text-[#284b8c]", bg: "bg-[#284b8c]/10" },
];

export default function SolarEnergySection({ content }: SolarEnergySectionProps) {
  const {
    title = "Solar Power at Our Manufacturing Units",
    description = "Besmak has installed a 500 KW solar power plant across its manufacturing facilities. This initiative is a significant step towards reducing dependency on conventional energy and lowering carbon emissions in our operations.",
    image = "/images/sustainable_manufacturing_hero.png",
  } = content || {};

  return (
    <section className="py-20 bg-[#f0f7ff] relative overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[#284b8c]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[#00A758]/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00A758]/10 text-[#00A758] rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Sun className="w-3.5 h-3.5" /> Renewable Energy
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight">
            {title}
          </h2>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-[10px] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={image}
                alt="Solar panels at Besmak"
                fill
                className="object-cover"
              />
              {/* Colour tint badge */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-[10px] px-5 py-3 shadow-lg border border-[#00A758]/20">
                <p className="text-[10px] font-black text-[#00A758] uppercase tracking-widest">Live & Active</p>
                <p className="text-xl font-black text-[#284b8c] tracking-tight">500 KW Solar</p>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-[3px] border-dashed border-[#00A758]/30 pointer-events-none" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-10 bg-[#00A758]" />
              <span className="text-[#00A758] font-black text-xs uppercase tracking-[0.25em]">Our Energy Initiative</span>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 font-light">
              {description}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-[10px] p-5 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${stat.bg} mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
