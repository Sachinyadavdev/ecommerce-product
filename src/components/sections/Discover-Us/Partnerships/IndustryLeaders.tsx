"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Cpu, Car, Truck, Wrench, Settings, Zap, Globe, Gauge, Database, Layers, Component } from "lucide-react";

interface Partner {
  name: string;
  logo?: string;
  iconType?: string;
}

interface IndustryLeadersProps {
  content?: {
    title?: string;
    description?: string;
    partners?: Partner[];
  };
}

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Cpu: Cpu,
  Car: Car,
  Truck: Truck,
  Wrench: Wrench,
  Settings: Settings,
  Zap: Zap,
  Globe: Globe,
  Gauge: Gauge,
  Database: Database,
  Layers: Layers,
  Component: Component
};

const DEFAULT_PARTNERS: Partner[] = [
  { name: "Bosch", iconType: "Cpu" }, // Electronics/ECUs
  { name: "Aptiv", iconType: "Zap" }, // Signal/Power distribution
  { name: "Visteon", iconType: "Gauge" }, // Cockpit electronics
  { name: "Hella", iconType: "Zap" }, // Lighting/Electronics
  { name: "Danfoss", iconType: "Settings" }, // Power electronics
  { name: "Yazaki", iconType: "Component" }, // Wiring harnesses
  { name: "Motherson", iconType: "Layers" }, // Interior/Exterior modules
  { name: "Minda Group", iconType: "Settings" }, // Auto components
  { name: "Fujikura", iconType: "Component" }, // Wiring/Connectors
  { name: "TI Automotive", iconType: "Car" }, // Fluid handling
  { name: "WABCO", iconType: "Truck" }, // Braking/Control systems (Commercial)
  { name: "Kautex Textron", iconType: "Database" } // Fuel systems/Tanks
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as any,
      stiffness: 100,
      damping: 15
    }
  }
} as const;

export default function IndustryLeaders({ content }: IndustryLeadersProps) {
  const {
    title = "Collaborating with Industry Leaders",
    description = "We are proud to partner with globally recognized automotive and technology leaders, supporting their requirements in connectors, terminals, and precision components. Our key customers and partners include organizations such as:",
    partners = DEFAULT_PARTNERS
  } = content || {};

  return (
    <section className="py-12 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-bold tracking-wide uppercase mb-6"
          >
            <ShieldCheck size={16} />
            Trusted Globally
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
        >
          {partners.map((partner, idx) => {
            const IconComponent = ICON_MAP[partner.iconType as keyof typeof ICON_MAP] || Settings;

            return (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl px-4 py-4 flex items-center gap-4 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_35px_70px_-15px_rgba(25,76,154,0.15)] transition-all duration-500 border border-slate-100 relative overflow-hidden cursor-default"
              >
                <motion.div
                  variants={{
                    hover: {
                      rotate: 15,
                      backgroundColor: "#194c9a",
                      color: "#fff"
                    }
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-8 h-8 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shadow-sm relative z-10"
                >
                  <IconComponent size={16} />
                </motion.div>

                <motion.h3
                  variants={{
                    hover: { color: "#194c9a" }
                  }}
                  className="text-[10px] font-medium text-slate-900 tracking-tighter relative z-10 whitespace-nowrap"
                >
                  {partner.name}
                </motion.h3>

                {/* Subtle Hover Background Shine */}
                <motion.div
                  variants={{
                    hover: { opacity: 1 }
                  }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 bg-linear-to-tr from-[#194c9a]/5 via-transparent to-transparent pointer-events-none"
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-100 shadow-sm"
          >
            <p className="text-slate-500 font-bold italic text-lg leading-relaxed flex items-center justify-center gap-3">
              <Globe className="text-primary/40 shrink-0" size={24} />
              "These collaborations reflect our ability to meet global quality standards and complex engineering requirements."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
