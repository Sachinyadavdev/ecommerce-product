"use client";

import { motion } from "framer-motion";
import { Microscope, Target } from "lucide-react";

interface QualityItem {
  name: string;
  description: string;
}

interface EngineeringQualityProps {
  content?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
    labItems?: QualityItem[];
    item1Name?: string;
    item1Description?: string;
    item2Name?: string;
    item2Description?: string;
    item3Name?: string;
    item3Description?: string;
  };
}

const defaultLabItems: QualityItem[] = [
  { name: "Zeiss CMM", description: "Precision coordinate measuring for dimensional verification." },
  { name: "VMM with Programmable Probes", description: "Automated optical measuring for complex geometries." },
  { name: "Roughness Testers", description: "Ensuring surface quality meets exact finish specifications." }
];

export default function EngineeringQuality({ content }: EngineeringQualityProps) {
  // Use flattened CMS fields if provided
  const cmsItems: QualityItem[] = [
    {
      name: content?.item1Name || defaultLabItems[0].name,
      description: content?.item1Description || defaultLabItems[0].description,
    },
    {
      name: content?.item2Name || defaultLabItems[1].name,
      description: content?.item2Description || defaultLabItems[1].description,
    },
    {
      name: content?.item3Name || defaultLabItems[2].name,
      description: content?.item3Description || defaultLabItems[2].description,
    },
  ];

  const hasCmsData = content?.item1Name || content?.item2Name || content?.item3Name;

  const {
    title = "Quality & Metrology",
    description = "We follow stringent quality assurance practices supported by advanced metrology systems, ensuring dimensional accuracy and product reliability in every component.",
    backgroundImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/hero-bg-blueprint.jpg",
    labItems = hasCmsData ? cmsItems : (content?.labItems || defaultLabItems)
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="relative py-24 md:py-32 bg-slate-900 text-white site-content overflow-hidden">
      
      {/* Background Image & Overlay */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 z-0 bg-fixed bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Glassmorphic Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70 backdrop-blur-[2px] z-0" />
        </>
      )}

      {/* Grid Pattern Effect */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex p-4 bg-white rounded-2xl text-primary mb-8 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] border border-primary/30"
          >
            <Microscope size={36} strokeWidth={1.5} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {labItems.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 hover:border-primary/50 transition-all duration-500 shadow-xl overflow-hidden relative"
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mx-auto text-primary">
                  <Target size={32} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-primary-100 transition-colors tracking-tight">
                  {item.name}
                </h4>
                
                <p className="text-slate-400 font-light leading-relaxed text-[15px] md:text-base">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
