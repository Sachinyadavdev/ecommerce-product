"use client";

import { motion } from "framer-motion";
import { ChevronRight, Globe2 } from "lucide-react";
import Link from "next/link";

interface ProductSegment {
  name: string;
  link?: string;
}

interface EngineeringProductsProps {
  content?: {
    title?: string;
    segments?: ProductSegment[];
    industriesTitle?: string;
    industriesDescription?: string;
    seg1Name?: string;
    seg1Link?: string;
    seg2Name?: string;
    seg2Link?: string;
    seg3Name?: string;
    seg3Link?: string;
    seg4Name?: string;
    seg4Link?: string;
    seg5Name?: string;
    seg5Link?: string;
    seg6Name?: string;
    seg6Link?: string;
    seg7Name?: string;
    seg7Link?: string;
    seg8Name?: string;
    seg8Link?: string;
    seg9Name?: string;
    seg9Link?: string;
  };
}

const defaultSegments: ProductSegment[] = [
  { name: "FSM", link: "#" }, { name: "ECU", link: "#" }, { name: "Cluster", link: "#" },
  { name: "APS", link: "#" }, { name: "Wiring Harness Channels", link: "#" }, { name: "Latch & Actuator Systems", link: "#" },
  { name: "Connector Accessories", link: "#" }, { name: "Bus bar overmolding components", link: "#" }, { name: "EV products", link: "#" }
];

export default function EngineeringProducts({ content }: EngineeringProductsProps) {
  // Map flat CMS fields to segments array
  const cmsSegments: ProductSegment[] = [
    { name: content?.seg1Name || defaultSegments[0].name, link: content?.seg1Link || defaultSegments[0].link },
    { name: content?.seg2Name || defaultSegments[1].name, link: content?.seg2Link || defaultSegments[1].link },
    { name: content?.seg3Name || defaultSegments[2].name, link: content?.seg3Link || defaultSegments[2].link },
    { name: content?.seg4Name || defaultSegments[3].name, link: content?.seg4Link || defaultSegments[3].link },
    { name: content?.seg5Name || defaultSegments[4].name, link: content?.seg5Link || defaultSegments[4].link },
    { name: content?.seg6Name || defaultSegments[5].name, link: content?.seg6Link || defaultSegments[5].link },
    { name: content?.seg7Name || defaultSegments[6].name, link: content?.seg7Link || defaultSegments[6].link },
    { name: content?.seg8Name || defaultSegments[7].name, link: content?.seg8Link || defaultSegments[7].link },
    { name: content?.seg9Name || defaultSegments[8].name, link: content?.seg9Link || defaultSegments[8].link },
  ];

  const hasCmsData = content?.seg1Name || content?.seg2Name || content?.seg3Name;

  const {
    title = "Product Segments",
    segments = hasCmsData ? cmsSegments : (content?.segments || defaultSegments),
    industriesTitle = "End-Use Industries",
    industriesDescription = "Our products are supplied to leading four-wheeler and two-wheeler manufacturers, contributing to India’s leadership in the global auto components industry."
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 relative site-content overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <div className="absolute top-0 right-0 w-160 h-160 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch">
          
          {/* Left Column: Segments Grid */}
          <div className="lg:w-2/3 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-white border border-slate-200 mb-4 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Our Portfolio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {title}
              </h2>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {segments.map((seg, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-300 overflow-hidden"
                >
                  <Link href={seg.link || "#"} className="flex flex-row items-center justify-between px-6 py-5 w-full h-full">
                    {/* Subtle hover gradient side */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-full" />
                    
                    <span className="font-bold text-slate-700 group-hover:text-primary transition-colors text-[15px] leading-tight pr-4 relative z-10">
                      {seg.name}
                    </span>
                    
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors relative z-10 text-slate-400 group-hover:text-primary">
                      <ChevronRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Highlight Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="lg:w-1/3 flex flex-col"
          >
            <div className="h-full bg-[#284B8C] rounded-[2.5rem] p-10 lg:p-12 relative overflow-hidden shadow-2xl flex flex-col justify-center group">
              {/* Card Background Effects */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/30 rounded-full blur-[80px] group-hover:bg-primary/40 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mb-10 text-white shadow-inner">
                  <Globe2 size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  {industriesTitle}
                </h3>
                
                <p className="text-lg text-slate-300 leading-relaxed font-light italic relative">
                  <span className="absolute -left-4 -top-2 text-4xl text-primary/40 leading-none">"</span>
                  {industriesDescription}
                  <span className="absolute -bottom-4 ml-2 text-4xl text-primary/40 leading-none rotate-180">"</span>
                </p>
                
                <div className="mt-12 inline-flex items-center gap-2 text-primary-100 font-bold uppercase tracking-widest text-xs">
                  <span className="w-8 h-px bg-primary-100" /> Global Reach
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
