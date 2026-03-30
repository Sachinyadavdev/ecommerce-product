"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Settings, ShieldCheck, Atom, Factory, Users } from "lucide-react";

interface Point {
  title: string;
  description: string;
}

interface EngineeringWhyChooseUsProps {
  content?: {
    title?: string;
    description?: string;
    points?: Point[];
    pt1Title?: string;
    pt1Desc?: string;
    pt2Title?: string;
    pt2Desc?: string;
    pt3Title?: string;
    pt3Desc?: string;
    pt4Title?: string;
    pt4Desc?: string;
    pt5Title?: string;
    pt5Desc?: string;
    pt6Title?: string;
    pt6Desc?: string;
  };
}

const defaultPoints: Point[] = [
  { 
    title: "Proven Expertise", 
    description: "Deep domain knowledge in precision molding and component manufacturing." 
  },
  { 
    title: "End-to-End Solutions", 
    description: "Complete production capabilities from prototyping to full-scale manufacturing." 
  },
  { 
    title: "Quality Assurance", 
    description: "Robust quality systems, traceability processes, and certified testing facilities." 
  },
  { 
    title: "Material Expertise", 
    description: "Specialized in handling engineering-grade thermoplastics and high-performance materials." 
  },
  { 
    title: "Future-Ready Infrastructure", 
    description: "State-of-the-art manufacturing facilities with continuous upgrades." 
  },
  { 
    title: "Customer Focus", 
    description: "Strong emphasis on reliability, speed, and building long-term partnerships." 
  }
];

const pointIcons = [Award, Settings, ShieldCheck, Atom, Factory, Users];

export default function EngineeringWhyChooseUs({ content }: EngineeringWhyChooseUsProps) {
  const cmsPoints: Point[] = [
    { title: content?.pt1Title || defaultPoints[0].title, description: content?.pt1Desc || defaultPoints[0].description },
    { title: content?.pt2Title || defaultPoints[1].title, description: content?.pt2Desc || defaultPoints[1].description },
    { title: content?.pt3Title || defaultPoints[2].title, description: content?.pt3Desc || defaultPoints[2].description },
    { title: content?.pt4Title || defaultPoints[3].title, description: content?.pt4Desc || defaultPoints[3].description },
    { title: content?.pt5Title || defaultPoints[4].title, description: content?.pt5Desc || defaultPoints[4].description },
    { title: content?.pt6Title || defaultPoints[5].title, description: content?.pt6Desc || defaultPoints[5].description },
  ];

  const hasCmsData = content?.pt1Title || content?.pt2Title || content?.pt3Title;

  const {
    title = "Why Choose Us",
    description = "At Besmak’s Engineering Products Division, we are committed to delivering value beyond manufacturing. Here’s what sets us apart:",
    points = hasCmsData ? cmsPoints : (content?.points || defaultPoints)
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="relative py-10 md:py-16 bg-primary text-white site-content overflow-hidden">
      {/* Textured Line Background */}
      <div className="absolute inset-0 opacity-[0.06] z-0 pointer-events-none mix-blend-overlay"
           style={{ 
             backgroundImage: `repeating-linear-gradient(
               -45deg,
               transparent,
               transparent 2px,
               #ffffff 2px,
               #ffffff 4px
             )` 
           }} 
      />
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--tw-gradient-stops))] from-transparent to-primary/80 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl text-blue-100 mb-8 shadow-xl border border-white/20"
          >
            <CheckCircle2 size={36} strokeWidth={1.5} />
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
            className="text-lg md:text-xl text-blue-100/90 font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {points.map((point, idx) => {
            const Icon = pointIcons[idx % pointIcons.length] || CheckCircle2;
            return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative p-8 md:p-10 rounded-4xl bg-white/8 backdrop-blur-xl border border-white/10 flex flex-col h-full group hover:bg-white/12 hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Card Inner Glow */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] text-blue-200">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-white text-white/95 transition-colors">
                  {point.title}
                </h4>
                
                <p className="text-blue-100/80 leading-relaxed font-light text-[15px] md:text-base group-hover:text-blue-100 transition-colors">
                  {point.description}
                </p>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
