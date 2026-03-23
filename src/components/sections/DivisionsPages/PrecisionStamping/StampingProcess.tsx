"use client";

import { motion } from "framer-motion";
import { Hammer, Droplets, Zap, Scissors, PencilRuler, Cog, Wrench } from "lucide-react";

interface Process {
  title: string;
  description: string;
  icon: string;
}

interface StampingProcessProps {
  content?: {
    title?: string;
    designTitle?: string;
    designDescription?: string;
    
    // Flat mapping for processes
    proc1Title?: string;
    proc1Desc?: string;
    proc1Icon?: string;
    
    proc2Title?: string;
    proc2Desc?: string;
    proc2Icon?: string;
    
    proc3Title?: string;
    proc3Desc?: string;
    proc3Icon?: string;
    
    proc4Title?: string;
    proc4Desc?: string;
    proc4Icon?: string;

    // Old Array Fallback
    processes?: Process[];
  };
}

const defaultProcesses: Process[] = [
  { title: "In-House Tooling", description: "Design and manufacture of high-precision tools for complex productions.", icon: "Wrench" },
  { title: "In-House Welding", description: "Expertise in brazing and spot welding for durable joints.", icon: "Zap" },
  { title: "In-House Tinning", description: "Specialized services to enhance component longevity.", icon: "Droplets" },
  { title: "Tapping", description: "Precise thread formation for superior assembly compatibility.", icon: "Scissors" }
];

const iconMap: Record<string, any> = { Hammer, Droplets, Zap, Scissors, PencilRuler, Cog, Wrench };

export default function StampingProcess({ content }: StampingProcessProps) {
  // Map flat CMS fields
  const cmsProcesses: Process[] = [
    { 
      title: content?.proc1Title || defaultProcesses[0].title, 
      description: content?.proc1Desc || defaultProcesses[0].description, 
      icon: content?.proc1Icon || defaultProcesses[0].icon 
    },
    { 
      title: content?.proc2Title || defaultProcesses[1].title, 
      description: content?.proc2Desc || defaultProcesses[1].description, 
      icon: content?.proc2Icon || defaultProcesses[1].icon 
    },
    { 
      title: content?.proc3Title || defaultProcesses[2].title, 
      description: content?.proc3Desc || defaultProcesses[2].description, 
      icon: content?.proc3Icon || defaultProcesses[2].icon 
    },
    { 
      title: content?.proc4Title || defaultProcesses[3].title, 
      description: content?.proc4Desc || defaultProcesses[3].description, 
      icon: content?.proc4Icon || defaultProcesses[3].icon 
    }
  ];

  const hasCmsData = !!(content?.proc1Title || content?.proc2Title);

  const {
    title = "Precision Manufacturing Process",
    designTitle = "Design & Tooling",
    designDescription = "Our engineering team utilizes advanced CAD/CAM software to design progressive dies and complex tooling setups. Before manufacturing begins, every design undergoes rigorous simulation to verify structural integrity, optimize material usage, and guarantee seamless production runs."
  } = content || {};

  const displayProcesses = hasCmsData ? cmsProcesses : (content?.processes || defaultProcesses);

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
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(var(--color-primary) 2px, transparent 2px)`, backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title & Hero Box */}
          <div className="lg:col-span-5 h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sticky top-32 lg:pb-12"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-light border-l-4 border-primary/30 pl-6 py-2">
                By integrating these core capabilities, we radically streamline production routing and deliver exceptional metallic components that exceed structural expectations.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="p-8 md:p-10 rounded-3xl bg-linear-to-br from-blue-950 to-blue-500 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden group"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/20">
                    <PencilRuler size={32} className="text-white drop-shadow-md" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight drop-shadow-sm">{designTitle}</h3>
                  <p className="text-white/85 font-light leading-relaxed text-lg drop-shadow-sm">
                    {designDescription}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Process Cards Grid */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {displayProcesses.map((proc, index) => {
                const Icon = iconMap[proc.icon] || Cog;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="p-8 md:p-10 rounded-3xl bg-white border border-slate-100 hover:border-primary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary),0.15)] transition-all duration-400 group relative overflow-hidden"
                  >
                    {/* Subtle bottom edge gradient on hover */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-linear-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    
                    <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                      {proc.title}
                    </h4>
                    
                    <p className="text-slate-500 leading-relaxed font-light">
                      {proc.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
