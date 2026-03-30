"use client";

import { motion } from "framer-motion";
import { Zap, Activity, HardDrive, Share2, ChevronRight } from "lucide-react";

interface CapabilityProps {
  content?: {
    title?: string;
    description?: string;
  };
}

export default function AutomationCapabilities({ content }: CapabilityProps) {
  const {
    title = "High-Performance Manufacturing Infrastructure",
    description = "Our facilities include fully electric injection moulding machines with integrated dosing systems and high-speed stamping lines with automated feeding. With continuous process monitoring and UPS-supported operations, we maintain uninterrupted production.",
  } = content || {};

  const capabilities = [
    {
      title: "Electric Injection Moulding",
      desc: "Fully electric machines with integrated dosing for precision and energy efficiency.",
      icon: Zap,
      color: "#ffffff"
    },
    {
      title: "High-Speed Stamping",
      desc: "Advanced stamping lines with automated feeding systems for high-volume accuracy.",
      icon: Activity,
      color: "#ffffff"
    },
    {
      title: "UPS-Supported Operations",
      desc: "Uninterrupted power supply ensuring continuous production and data integrity.",
      icon: HardDrive,
      color: "#ffffff"
    },
    {
      title: "Real-time Monitoring",
      desc: "Continuous process monitoring for proactive quality control and maintenance.",
      icon: Share2,
      color: "#ffffff"
    },
  ];

  return (
    <section className="w-full relative overflow-hidden bg-white">
      {/* Unified Background Layer (Gradient + Blueprint) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The Gradient Background - Using the precise theme color */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-[#284b8c]" />
        
        {/* The Blueprint Schematic - Spanning Full Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.25 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img 
            src="/blueprint-bg.png" 
            alt="Infrastructure Blueprint" 
            className="w-full h-full object-cover grayscale invert opacity-30 mix-blend-multiply"
          />
        </motion.div>
        
        {/* Softening radial for light section */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8)_0%,transparent_100%)]" />
      </div>

      <div className="relative z-10 w-full">
        {/* SECTION 1: Header/Intro (Compact Typographic Layout) */}
        <div className="pt-24 pb-6 overflow-hidden text-center">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#284b8c] tracking-tighter leading-[1.1] mb-6 uppercase"
            >
              {title}
            </motion.h2>
            
            <div className="max-w-[1000px] mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-xl lg:text-xl text-slate-700/80 font-medium leading-[1.6] text-center"
              >
                Our facilities include fully electric injection moulding machines with integrated dosing systems and high-speed stamping lines with automated feeding. With continuous process monitoring and UPS-supported operations, we maintain uninterrupted production.
              </motion.p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Infrastructure Grid (Theme Blue Theme) */}
        <div className="pb-32 overflow-hidden">
          <div className="container mx-auto px-6 max-w-[1250px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group relative p-8 rounded-2xl bg-[#284b8c]/90 backdrop-blur-2xl border border-white/10 hover:bg-[#284b8c]/100 hover:border-white/20 transition-all duration-500 flex flex-col h-full overflow-hidden shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mb-8 ring-1 ring-white/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20">
                    <cap.icon size={30} className="text-white" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                    {cap.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm leading-relaxed mb-6 flex-grow font-medium">
                    {cap.desc}
                  </p>
                  
                  <div className="absolute top-4 right-6 text-4xl font-black text-white/10 select-none transition-all duration-500 group-hover:text-white/20">
                    0{i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
