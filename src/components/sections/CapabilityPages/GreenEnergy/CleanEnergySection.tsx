"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sun, Wind, Zap } from "lucide-react";

interface CleanEnergySectionProps {
  content?: { image?: string };
}

const energyItems = [
  {
    icon: Sun,
    title: "Solar Power Adoption",
    highlight: "1MW solar power plant",
    body: "We are proud to have commissioned a 1MW solar power plant, significantly enhancing our renewable energy capacity. In addition to this, rooftop solar installations across our manufacturing facilities contribute to reducing dependence on conventional power sources. Solar energy plays a critical role in powering our operations efficiently while minimizing environmental impact.",
    color: "#00A758",
    bg: "bg-[#00A758]/8",
  },
  {
    icon: Wind,
    title: "Wind Energy Integration",
    highlight: "Long-term power purchase agreements",
    body: "To further strengthen our clean energy mix, we have entered into long-term power purchase agreements for wind energy. This enables us to tap into sustainable energy sources and ensures a stable and environmentally friendly power supply.",
    color: "#284b8c",
    bg: "bg-[#284b8c]/8",
  },
  {
    icon: Zap,
    title: "Optimised Energy Strategy",
    highlight: "Maximising renewable energy utilisation",
    body: "Our focus is on maximizing renewable energy utilisation across all units. By combining solar and wind energy solutions, we are steadily reducing our reliance on fossil fuels and moving towards a cleaner, more sustainable energy model.",
    color: "#00A758",
    bg: "bg-[#00A758]/8",
  },
];

export default function CleanEnergySection({ content }: CleanEnergySectionProps) {
  const { image = "/images/sustainable_manufacturing_hero.png" } = content || {};

  return (
    <section className="py-24 bg-white relative overflow-hidden">

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-1.5 bg-[#00A758]/10 text-[#00A758] rounded-[10px] text-xs font-black uppercase tracking-[0.5em] mb-4 shadow-sm border border-[#00A758]/10">
            <Sun className="w-3.5 h-3.5" /> Clean Energy Initiatives
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight">
            Clean Energy Initiatives
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl leading-relaxed">
            Our transition towards clean energy is a key pillar of our sustainability strategy. We have made significant investments to ensure that a growing share of our energy consumption comes from renewable sources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: 3 Energy cards stacked */}
          <div className="flex flex-col gap-6">
            {energyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="bg-white rounded-[10px] p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Accent border line */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-1.5 z-10" 
                  style={{ backgroundColor: item.color }}
                />
                
                <div className="flex items-start gap-5 pl-2">
                  <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0 ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.body.split(item.highlight).map((part, pi) => (
                        <span key={pi}>
                          {pi > 0 && <strong style={{ color: item.color }}>{item.highlight}</strong>}
                          {part}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
 
          {/* Right: Image with badge */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-full min-h-[400px] lg:min-h-0"
          >
            <div className="relative h-full w-full rounded-[10px] overflow-hidden">
              <Image src={image} alt="Solar energy at Besmak" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
