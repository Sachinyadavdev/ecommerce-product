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
    <section className="relative py-10 md:py-16 site-content overflow-hidden bg-slate-50">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-white rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      {/* Grid Pattern Effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: `radial-gradient(circle, var(--primary) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex p-4 bg-white text-primary rounded-2xl mb-8 shadow-sm border border-slate-100"
          >
            <Microscope size={36} strokeWidth={1.5} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tighter leading-tight text-primary"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto"
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
              className="p-8 md:p-10 rounded-3xl bg-white border border-slate-100 flex flex-col items-center text-center group hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mx-auto">
                  <Target size={32} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-xl md:text-2xl font-black mb-4 text-primary transition-colors tracking-tight">
                  {item.name}
                </h4>
                
                <p className="text-slate-500 font-medium leading-relaxed text-[15px] md:text-base">
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
