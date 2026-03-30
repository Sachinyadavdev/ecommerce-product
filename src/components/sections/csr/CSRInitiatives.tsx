"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Trees, ArrowRight, CheckCircle2 } from "lucide-react";

interface CSRInitiative {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  images?: string[];
  tags?: string[];
}

interface CSRInitiativesProps {
  content?: {
    heading?: string;
    image?: string;
    [key: string]: string | undefined;
  };
}

export default function CSRInitiatives({ content }: CSRInitiativesProps) {
  const {
    heading = "OUR KEY INITIATIVES",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Key-community.png",
  } = content || {};

  const displayItems: CSRInitiative[] = [
    {
      title: "Solar & Wind Energy",
      description: "At Besmak, we prioritize eco-friendliness and environmental care through green power initiatives. Currently, 40% of our total power requirement is met via sustainable Solar & Wind energy sources, reducing our carbon footprint significantly.",
      icon: <Sun className="w-6 h-6" />,
      images: [
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-Solar-images.png",
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-Sampling-and-Solar-images.png",
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/BesmakSolar-images.png"
      ],
      tags: ["Green Energy", "40% Power", "Sustainability"]
    },
    {
      title: "Tree Plantation Drives",
      description: "Since 2014, we have actively undertaken tree plantation across our campuses. This initiative aims to increase green cover, improve local air quality, and foster a culture of environmental stewardship among our employees.",
      icon: <Trees className="w-6 h-6" />,
      images: [
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-Tree.png",
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-Sampling.png",
        "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak-Sampling-images.png"
      ],
      tags: ["Environment", "Community", "Long-term"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const as any }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col mb-12 items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#009966]/5 text-[#009966] rounded-[10px] text-xs font-black tracking-[0.2em] mb-6 border border-[#009966]/10"
          >
            <CheckCircle2 size={14} />
            {heading}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl"
          >
            Making a Sustainable <span className="text-[#009966]">Impact</span> Together
          </motion.h2>
        </div>

        {/* Main Highlight Section with the new image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-video min-h-[400px] md:h-auto rounded-[3rem] overflow-hidden shadow-2xl mb-16 group"
        >
          <img 
            src={image} 
            alt="CSR Main Visualization" 
            className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-105" 
          />
          
          {/* Green-Blue Overlay Gradient (Right Aligned, with gap from edge) */}
          <div className="absolute inset-0 bg-linear-to-l from-[#009966]/80 via-[#284b8c]/20 to-transparent flex flex-col justify-center items-end pr-8 md:pr-16 py-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl bg-white/5 backdrop-blur-lg p-6 md:p-10 rounded-[2.5rem] border-l-8 border-[#009966] border-y border-r border-white/10 shadow-2xl text-left"
            >
              <h3 className="text-white text-2xl md:text-3xl font-black mb-4 tracking-tighter leading-tight drop-shadow-2xl md:whitespace-nowrap">
                Committed to <span className="text-white/90">Sustainable Development</span>
              </h3>
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed drop-shadow-lg mb-0">
                Our initiatives are integrated into our core business strategy, ensuring that every step we take towards growth is a step towards a better world.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Detailed Items Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {displayItems.map((item, index) => (
            <InitiativeCard key={index} item={item} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function InitiativeCard({ item, variants }: { item: CSRInitiative; variants: any }) {
  const [activeIdx, setActiveIdx] = useState(0);
  
  return (
    <motion.div
      variants={variants}
      className="bg-slate-50 border border-slate-100 p-10 md:p-12 rounded-[2.5rem] flex flex-col gap-8 transition-all duration-500 hover:shadow-xl hover:shadow-[#009966]/5 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 text-[#009966]/5 group-hover:text-[#009966]/10 transition-colors">
        {item.icon && React.cloneElement(item.icon as React.ReactElement, { size: 100, strokeWidth: 1 })}
      </div>

      <div className="relative z-10 space-y-6 flex-1">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white shadow-sm border border-slate-200 rounded-2xl flex items-center justify-center text-[#009966] group-hover:bg-[#009966] group-hover:text-white transition-all duration-500">
            {item.icon}
          </div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">
            {item.title}
          </h3>
        </div>

        <p className="text-slate-500 text-lg leading-relaxed font-light">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          {item.tags?.map((tag, i) => (
            <span key={i} className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        
        {item.images ? (
          <div className="pt-8 space-y-4">
            {/* Interactive Gallery */}
            <div className="relative w-full aspect-square md:w-[600px] md:h-[500px] max-w-full rounded-3xl overflow-hidden shadow-lg bg-slate-200">
              {item.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeIdx === i ? 1 : 0,
                    scale: activeIdx === i ? 1 : 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`${item.title} ${i + 1}`}
                />
              ))}
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {item.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeIdx === i ? "border-[#009966] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="Thumbnail" />
                </button>
              ))}
            </div>
          </div>
        ) : item.image && (
          <div className="pt-8 w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img src={item.image} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" alt={item.title} />
          </div>
        )}

        {!item.images && (
          <div className="pt-6 border-t border-slate-200 flex justify-between items-center group/btn cursor-pointer">
            <span className="text-[#009966] text-xs font-black tracking-widest uppercase">Learn More</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover/btn:bg-[#009966] group-hover/btn:border-[#009966] group-hover/btn:text-white transition-all">
              <ArrowRight size={14} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

