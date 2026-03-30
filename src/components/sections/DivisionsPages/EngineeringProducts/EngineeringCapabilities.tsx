"use client";

import { motion } from "framer-motion";
import { Settings, Layers, Zap, FlaskConical, ShieldCheck, Microscope, CheckCircle2 } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

interface EngineeringCapabilitiesProps {
  content?: {
    title?: string;
    subtitle?: string;
    capabilities?: Capability[];
    cap1Title?: string;
    cap1Description?: string;
    cap1Icon?: string;
    cap2Title?: string;
    cap2Description?: string;
    cap2Icon?: string;
    cap3Title?: string;
    cap3Description?: string;
    cap3Icon?: string;
  };
}

const defaultCapabilities: Capability[] = [
  {
    title: "Manufacturing Excellence",
    description: "Comprehensive solutions including insert molding, overmolding, and plastic threaded parts molding using engineering-grade thermoplastics.",
    icon: "Settings",
    details: [
      "In-house tool design & building",
      "Prototype molding services",
      "3D printing for rapid prototyping",
      "ISO 8 Clean Room (EV products Focus)",
      "Advanced image analysis (>5 micron particle detection)"
    ]
  },
  {
    title: "Raw Material Expertise",
    description: "Processing a wide range of engineering-grade materials with content ranging from 15% to 65%.",
    icon: "FlaskConical",
    details: [
      "LDPE, PPS, talk-filled & glass-filled materials",
      "Rigorous raw material verification",
      "Moisture analysis",
      "Melt Flow Index (MFI) testing"
    ]
  },
  {
    title: "Value-Added Processes",
    description: "Deployment of SPMs and complementary processes based on customer requirements.",
    icon: "Zap",
    details: [
      "Ultrasonic & Resistance welding",
      "Pad printing & Laser marking",
      "Air leak & Continuity testing",
      "Hi-pot testing",
      "Complete barcode reverse traceability"
    ]
  }
];

const iconMap: any = { Settings, Layers, Zap, FlaskConical, ShieldCheck, Microscope };

export default function EngineeringCapabilities({ content }: EngineeringCapabilitiesProps) {
  const cmsCapabilities: Capability[] = [
    {
      title: content?.cap1Title || defaultCapabilities[0].title,
      description: content?.cap1Description || defaultCapabilities[0].description,
      icon: content?.cap1Icon || defaultCapabilities[0].icon,
      details: defaultCapabilities[0].details,
    },
    {
      title: content?.cap2Title || defaultCapabilities[1].title,
      description: content?.cap2Description || defaultCapabilities[1].description,
      icon: content?.cap2Icon || defaultCapabilities[1].icon,
      details: defaultCapabilities[1].details,
    },
    {
      title: content?.cap3Title || defaultCapabilities[2].title,
      description: content?.cap3Description || defaultCapabilities[2].description,
      icon: content?.cap3Icon || defaultCapabilities[2].icon,
      details: defaultCapabilities[2].details,
    },
  ];

  const hasCmsData = content?.cap1Title || content?.cap2Title || content?.cap3Title;

  const {
    title = "Engineering Capabilities",
    subtitle = "Advanced Processes & Infrastructure",
    capabilities = hasCmsData ? cmsCapabilities : (content?.capabilities || defaultCapabilities),
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden site-content">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-primary/10 border border-primary/20 mb-6"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{subtitle}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-primary tracking-tighter leading-[1.1]"
          >
            {title}
          </motion.h2>
        </div>

        {/* Capabilities Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          {capabilities.map((cap, idx) => {
            const Icon = iconMap[cap.icon] || Settings;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100/80 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 h-full flex flex-col group relative overflow-hidden ring-1 ring-slate-900/5 hover:ring-primary/20"
              >
                {/* Decorative background glow on hover */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-8 border border-slate-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500 group-hover:scale-110 origin-left">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300 tracking-tight">{cap.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed font-light text-base md:text-lg">
                    {cap.description}
                  </p>
                  
                  {/* Details List */}
                  {cap.details && (
                    <div className="pt-6 border-t border-slate-100">
                      <ul className="space-y-4">
                        {cap.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-4 text-slate-600 group/item">
                            <div className="mt-1 w-5 h-5 shrink-0 rounded-full bg-slate-50 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                              <CheckCircle2 size={14} className="text-slate-400 group-hover/item:text-primary transition-colors" />
                            </div>
                            <span className="text-sm font-medium leading-normal">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
