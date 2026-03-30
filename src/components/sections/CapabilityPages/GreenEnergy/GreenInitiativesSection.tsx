"use client";

import { motion } from "framer-motion";
import { Recycle, Wind, Droplets, ShieldCheck, Factory, Globe } from "lucide-react";

interface GreenInitiativesSectionProps {
  content?: {
    title?: string;
    description?: string;
  };
}

const initiatives = [
  {
    icon: Recycle,
    title: "Waste Reduction",
    description: "Systematic identification and elimination of manufacturing waste through lean principles and process optimisation at every stage of production.",
    color: "#00A758",
    number: "01",
  },
  {
    icon: Wind,
    title: "Clean Energy Transition",
    description: "Installed 500 KW solar power plant across manufacturing units, significantly reducing dependency on conventional grid electricity.",
    color: "#284b8c",
    number: "02",
  },
  {
    icon: Droplets,
    title: "Water Conservation",
    description: "Water-efficient processes and rainwater harvesting systems implemented to reduce freshwater usage across all facilities.",
    color: "#00A758",
    number: "03",
  },
  {
    icon: ShieldCheck,
    title: "EMS Compliance",
    description: "Certified to ISO 14001 Environmental Management System — ensuring all operations follow internationally recognised environmental standards.",
    color: "#284b8c",
    number: "04",
  },
  {
    icon: Factory,
    title: "Emission Monitoring",
    description: "Continuous monitoring of emissions at all production lines to ensure compliance with regulatory limits and our internal targets.",
    color: "#00A758",
    number: "05",
  },
  {
    icon: Globe,
    title: "Community Greenery",
    description: "Annual tree plantation drives with employee participation, planting 2000+ saplings across facilities and surrounding communities.",
    color: "#284b8c",
    number: "06",
  },
];

export default function GreenInitiativesSection({ content }: GreenInitiativesSectionProps) {
  const {
    title = "Our Environmental Initiatives",
    description = "Besmak is committed to a comprehensive approach to sustainability — integrating environmental responsibility into every aspect of our operations.",
  } = content || {};

  return (
    <section className="py-24 bg-[#f0f7ff] relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute -bottom-20 -right-20 w-[35vw] h-[35vw] rounded-full bg-[#00A758]/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[25vw] h-[25vw] rounded-full bg-[#284b8c]/6 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#284b8c]/10 text-[#284b8c] rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Globe className="w-3.5 h-3.5" /> Environmental Responsibility
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group bg-white rounded-3xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#00A758]/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute -bottom-2 -right-2 text-[80px] font-black text-slate-900/[0.03] leading-none select-none pointer-events-none">
                {item.number}
              </span>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                style={{ background: item.color + "15" }}
              >
                <item.icon className="w-7 h-7" style={{ color: item.color }} />
              </div>

              {/* Line accent */}
              <div className="h-[2px] w-10 rounded-full mb-4" style={{ background: item.color }} />

              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
