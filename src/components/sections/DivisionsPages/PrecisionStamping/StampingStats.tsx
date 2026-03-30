"use client";

import { motion } from "framer-motion";
import { Ruler, Zap, Gauge, Target } from "lucide-react";

interface StampingStatsProps {
  content?: {
    stat1Label?: string;
    stat1Value?: string;
    stat1Icon?: string;
    stat1Sub?: string;
    stat2Label?: string;
    stat2Value?: string;
    stat2Icon?: string;
    stat2Sub?: string;
    stat3Label?: string;
    stat3Value?: string;
    stat3Icon?: string;
    stat3Sub?: string;
    stat4Label?: string;
    stat4Value?: string;
    stat4Icon?: string;
    stat4Sub?: string;
    
    // Fallback for old schema
    stats?: {
      label: string;
      value: string;
      icon: string;
      subValue?: string;
    }[];
  };
}

const defaultStats = [
  { label: "Material Thickness", value: "0.15 - 2.5 MM", icon: "Ruler", subValue: "Versatile processing range" },
  { label: "Tooling Accuracy", value: "0.01 MM", icon: "Target", subValue: "Ultra-precision tolerance" },
  { label: "Part Accuracy", value: "0.02 MM", icon: "Gauge", subValue: "Consistent quality output" },
  { label: "Production Speed", value: "1200 SPM", icon: "Zap", subValue: "High-volume efficiency" }
];

const iconMap: Record<string, any> = { Ruler, Zap, Gauge, Target };

export default function StampingStats({ content }: StampingStatsProps) {
  // Map flat CMS fields to stats array
  const cmsStats = [
    { 
      label: content?.stat1Label || defaultStats[0].label, 
      value: content?.stat1Value || defaultStats[0].value, 
      icon: content?.stat1Icon || defaultStats[0].icon, 
      subValue: content?.stat1Sub || defaultStats[0].subValue 
    },
    { 
      label: content?.stat2Label || defaultStats[1].label, 
      value: content?.stat2Value || defaultStats[1].value, 
      icon: content?.stat2Icon || defaultStats[1].icon, 
      subValue: content?.stat2Sub || defaultStats[1].subValue 
    },
    { 
      label: content?.stat3Label || defaultStats[2].label, 
      value: content?.stat3Value || defaultStats[2].value, 
      icon: content?.stat3Icon || defaultStats[2].icon, 
      subValue: content?.stat3Sub || defaultStats[2].subValue 
    },
    { 
      label: content?.stat4Label || defaultStats[3].label, 
      value: content?.stat4Value || defaultStats[3].value, 
      icon: content?.stat4Icon || defaultStats[3].icon, 
      subValue: content?.stat4Sub || defaultStats[3].subValue 
    }
  ];

  const hasCmsData = !!(content?.stat1Label || content?.stat2Label);
  const displayStats = hasCmsData ? cmsStats : (content?.stats || defaultStats);

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as any,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const as any }
    }
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 site-content relative z-20 -mt-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {displayStats.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Ruler;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 md:p-8 flex flex-col items-center text-center group relative overflow-hidden transition-colors hover:bg-slate-50/50"
                >
                  {/* Subtle hover accent line at top */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  
                  <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  
                  <h4 className="text-slate-500 font-semibold uppercase tracking-widest text-[10px] md:text-xs mb-1.5 group-hover:text-slate-700 transition-colors">
                    {stat.label}
                  </h4>
                  
                  {stat.subValue && (
                    <p className="text-slate-400 text-xs font-light italic">
                      {stat.subValue}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
