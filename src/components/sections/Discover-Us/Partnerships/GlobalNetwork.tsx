"use client";

import { motion } from "framer-motion";

interface NetworkArea {
  title: string;
  icon: string;
}

interface GlobalNetworkProps {
  content?: {
    title?: string;
    description?: string;
    areas?: NetworkArea[];
  };
}

const DEFAULT_AREAS: NetworkArea[] = [
  { title: "Two-wheeler and four-wheeler segments", icon: "🚗" },
  { title: "Electric vehicle (EV) applications", icon: "⚡" },
  { title: "Advanced automotive electronics and connectivity systems", icon: "📡" }
];

export default function GlobalNetwork({ content }: GlobalNetworkProps) {
  const {
    title = "Global & Domestic Network",
    description = "With a growing footprint across India and expanding global reach, Besmak supports customers across diverse segments and regions.",
    areas = DEFAULT_AREAS
  } = content || {};

  return (
    <section className="py-12 bg-[#0a192f] text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-blue-100/80 mb-10 leading-relaxed">
              {description}
              <br /><br />
              Our partnerships extend across domestic and international markets, enabling us to deliver consistent quality and reliability worldwide.
            </p>
            
            <div className="flex flex-col gap-6">
              {areas.map((area, idx) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl">
                    {area.icon}
                  </div>
                  <span className="text-lg font-medium text-blue-50">{area.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-full border-2 border-white/10 flex items-center justify-center p-8 animate-[spin_60s_linear_infinite]">
              <div className="w-full h-full rounded-full border-2 border-primary/20 flex items-center justify-center p-8 animate-[spin_40s_linear_infinite_reverse]">
                <div className="w-full h-full rounded-full bg-linear-to-br from-primary/30 to-blue-600/30 backdrop-blur-3xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-white/90" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
