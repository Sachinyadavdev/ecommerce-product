"use client";

import { motion } from "framer-motion";
import { Zap, Boxes, Settings, TrendingUp, Cpu } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon?: string;
}

interface ConnectionSystemsCapabilitiesProps {
  content?: {
    title?: string;
    subtitle?: string;
    capabilities?: Capability[];
  };
}

const defaultCapabilities: Capability[] = [
  {
    title: "Expertise in Precision Molding",
    description: "Our core strength lies in precision molding, including insert molding, over-molding, and plastic threaded parts molding.",
    icon: "Boxes"
  },
  {
    title: "Versatile Tooling Solutions",
    description: "Spanning from single-cavity to 64-cavity molds. We are adept at producing family molds with high precision.",
    icon: "Settings"
  },
  {
    title: "Engineering Materials",
    description: "Experienced in processing high-performance thermoplastics like PPS, PA66, LCP, and Glass Filled plastics.",
    icon: "Cpu"
  },
  {
    title: "High-Volume Production",
    description: "Built for massive scale - capable of producing up to 30 lakh connector parts daily without quality compromise.",
    icon: "TrendingUp"
  },
  {
    title: "Advanced Automation",
    description: "Integrated robotic part insertion, poke-yoke systems, and automated assembly ensure perfect consistency.",
    icon: "Zap"
  }
];

const iconMap: any = {
  Zap, Boxes, Settings, TrendingUp, Cpu
};

export default function ConnectionSystemsCapabilities({ content }: ConnectionSystemsCapabilitiesProps) {
  const {
    title = "Core Capabilities",
    subtitle = "Leveraging advanced manufacturing technologies and decades of engineering expertise to deliver superior precision components.",
    capabilities = defaultCapabilities,
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Technical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Manufacturing Powerhouse</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {capabilities.map((cap, idx) => {
            const Icon = iconMap[cap.icon || "Settings"] || Settings;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Modern Card */}
                <div className="h-full bg-white border border-slate-100 p-10 rounded-3xl shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20">
                  {/* Icon Container */}
                  <div className="relative mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform duration-500 group-hover:rotate-10 group-hover:scale-110">
                      <Icon size={32} />
                    </div>
                    {/* Floating glow behind icon */}
                    <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {cap.description}
                  </p>

                  {/* Aesthetic line reveal on hover */}
                  <div className="absolute bottom-8 right-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 text-slate-900 font-black text-6xl pointer-events-none">
                    0{idx + 1}
                  </div>
                </div>
                
                {/* Accent shadow/glow */}
                <div className="absolute inset-x-10 bottom-0 h-4 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
