"use client";

import { motion } from "framer-motion";
import { Layers, Box, Zap, Settings, ShieldCheck } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: string;
}

interface CNHMouldsCapabilitiesProps {
  content?: {
    title?: string;
    capabilities?: Capability[];
  };
}

const defaultCapabilities: Capability[] = [
  { title: "High-Volume Production", description: "Producing molds weighing up to 450 tons with an annual capacity of 150 tools.", icon: "Settings" },
  { title: "Cavity Versatility", description: "Providing single-cavity to 64-cavity molds with family mold expertise (up to 70% weight difference).", icon: "Layers" },
  { title: "Material Integration", description: "Significant experience in 65% glass-filled (GF) molds and over-molding technologies.", icon: "Box" },
  { title: "Specialized Engineering", description: "Expertise in insert-molding and complex threaded component manufacturing.", icon: "ShieldCheck" }
];

const iconMap: any = { Layers, Box, Zap, Settings, ShieldCheck };

export default function CNHMouldsCapabilities({ content }: CNHMouldsCapabilitiesProps) {
  const {
    title = "Our Core Capabilities",
    capabilities = defaultCapabilities
  } = content || {};

  return (
    <section className="py-24 bg-white site-content">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-slate-900 mb-4"
          >
            {title}
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, idx) => {
            const Icon = iconMap[cap.icon] || Settings;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex items-start gap-8"
              >
                <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
