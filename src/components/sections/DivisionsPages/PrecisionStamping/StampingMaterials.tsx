"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface Material {
  type: string;
  alloys: string;
  properties: string;
}

interface StampingMaterialsProps {
  content?: {
    title?: string;
    description?: string;
    
    // Flat mapping for materials
    mat1Type?: string;
    mat1Alloys?: string;
    mat1Props?: string;
    
    mat2Type?: string;
    mat2Alloys?: string;
    mat2Props?: string;
    
    mat3Type?: string;
    mat3Alloys?: string;
    mat3Props?: string;
    
    mat4Type?: string;
    mat4Alloys?: string;
    mat4Props?: string;

    // Old Array Fallback
    materials?: Material[];
  };
}

const defaultMaterials: Material[] = [
  { type: "Brass", alloys: "C2600, C2640, C2700, C2720", properties: "Excellent corrosion resistance and machinability." },
  { type: "Copper Alloys", alloys: "C1100, CuNiSnP, CuNiSi, CuNi3SiMg", properties: "High electrical and thermal conductivity." },
  { type: "Phosphor Bronze", alloys: "C5191, C5210", properties: "High strength, wear resistance, and fatigue endurance." },
  { type: "Aluminium & Steel", alloys: "Various Grades", properties: "Lightweight properties and structural integrity." }
];

export default function StampingMaterials({ content }: StampingMaterialsProps) {
  // Map flat CMS fields
  const cmsMaterials: Material[] = [
    { 
      type: content?.mat1Type || defaultMaterials[0].type, 
      alloys: content?.mat1Alloys || defaultMaterials[0].alloys, 
      properties: content?.mat1Props || defaultMaterials[0].properties 
    },
    { 
      type: content?.mat2Type || defaultMaterials[1].type, 
      alloys: content?.mat2Alloys || defaultMaterials[1].alloys, 
      properties: content?.mat2Props || defaultMaterials[1].properties 
    },
    { 
      type: content?.mat3Type || defaultMaterials[2].type, 
      alloys: content?.mat3Alloys || defaultMaterials[2].alloys, 
      properties: content?.mat3Props || defaultMaterials[2].properties 
    },
    { 
      type: content?.mat4Type || defaultMaterials[3].type, 
      alloys: content?.mat4Alloys || defaultMaterials[3].alloys, 
      properties: content?.mat4Props || defaultMaterials[3].properties 
    }
  ];

  const hasCmsData = !!(content?.mat1Type || content?.mat2Type);

  const {
    title = "Capabilities & Materials",
    description = "Our expertise extends across various specialized materials, engineered for demanding applications requiring superior conductivity, strength, and corrosion resistance.",
  } = content || {};

  const displayMaterials = hasCmsData ? cmsMaterials : (content?.materials || defaultMaterials);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 site-content relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-b from-primary/5 to-transparent skew-x-12 z-0 opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-linear-to-t from-primary/5 to-transparent -skew-x-12 z-0 opacity-30" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white shadow-xl shadow-primary/5 mb-8 border border-slate-100"
          >
            <Sparkles className="text-primary w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8"
        >
          {displayMaterials.map((mat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary),0.15)] transition-all duration-400 flex flex-col items-center text-center group relative overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center">
                {/* Accent Line */}
                <div className="w-12 h-1.5 rounded-full bg-slate-200 mb-8 group-hover:bg-primary group-hover:w-16 transition-all duration-400" />
                
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {mat.type}
                </h3>
                
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-6 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-300">
                  <p className="text-slate-700 font-bold text-xs uppercase tracking-wider">
                    {mat.alloys}
                  </p>
                </div>
                
                <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light group-hover:text-slate-600 transition-colors">
                  {mat.properties}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
