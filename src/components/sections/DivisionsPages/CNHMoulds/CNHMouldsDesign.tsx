"use client";

import { motion } from "framer-motion";
import { Monitor } from "lucide-react";

interface Software {
  name: string;
  description: string;
}

interface CNHMouldsDesignProps {
  content?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
    
    // Flat CMS Mapping
    sw1Name?: string;
    sw1Description?: string;
    
    sw2Name?: string;
    sw2Description?: string;
    
    sw3Name?: string;
    sw3Description?: string;
    
    sw4Name?: string;
    sw4Description?: string;

    // Old Fallback
    software?: Software[];
  };
}

const defaultSoftware: Software[] = [
  { name: "NX 11", description: "Powerful CAD/CAM solution for high-precision engineering." },
  { name: "WORKXPLORE", description: "Advanced 3D visualization and analysis software." },
  { name: "MouldFlow Analysis", description: "Flow simulation study by experts for pro-active design" },
  { name: "Delcam", description: "Precision software for toolpath generation and machining." }
];

export default function CNHMouldsDesign({ content }: CNHMouldsDesignProps) {
  console.log("[CNHMouldsDesign] Received content:", content);

  // Determine section-level fields
  const title = content?.title || "Advanced Design & Engineering";
  const description = content?.description || "We leverage industry-leading software solutions for design, simulation, and precision machining, ensuring seamless production and high-quality output.";
  const backgroundImage = content?.backgroundImage || "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2940&auto=format&fit=crop";

  // Build software list by checking specialized CMS fields first, then fallback to defaults
  // We do this per-item to be as robust as possible
  const displaySoftware: Software[] = [
    {
      name: content?.sw1Name ?? defaultSoftware[0].name,
      description: content?.sw1Description ?? defaultSoftware[0].description,
    },
    {
      name: content?.sw2Name ?? defaultSoftware[1].name,
      description: content?.sw2Description ?? defaultSoftware[1].description,
    },
    {
      name: content?.sw3Name ?? defaultSoftware[2].name,
      description: content?.sw3Description ?? defaultSoftware[2].description,
    },
    {
      name: content?.sw4Name ?? defaultSoftware[3].name,
      description: content?.sw4Description ?? defaultSoftware[3].description,
    },
  ].filter(sw => sw.name && sw.name.trim() !== "");

  // Determine if we have any specialized CMS-defined software data
  const hasSpecializedData = Boolean(
    content?.sw1Name !== undefined || content?.sw1Description !== undefined ||
    content?.sw2Name !== undefined || content?.sw2Description !== undefined ||
    content?.sw3Name !== undefined || content?.sw3Description !== undefined ||
    content?.sw4Name !== undefined || content?.sw4Description !== undefined
  );

  // Building final array based on priority:
  // 1. Specialized fields (sw1Name, etc.)
  // 2. Existing 'software' array
  // 3. Defaults
  const finalSoftware = hasSpecializedData 
    ? displaySoftware 
    : (Array.isArray(content?.software) && content.software.length > 0)
      ? content.software
      : displaySoftware;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <section 
      className="py-10 md:py-16 bg-slate-950 text-white site-content relative overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] z-0" />

      {/* Decorative Blueprint lines (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0 mix-blend-overlay">
        <svg className="w-full h-full">
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex p-4 bg-primary/20 backdrop-blur-md rounded-2xl text-primary mb-8 border border-primary/30"
          >
            <Monitor size={40} strokeWidth={1.5} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-white drop-shadow-lg"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed drop-shadow"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {finalSoftware.map((sw, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 md:p-10 rounded-[2.5rem] bg-linear-to-br from-[#284B8C]/70 to-[#1A325E]/90 backdrop-blur-xl border border-white/20 hover:border-white/40 hover:from-[#284B8C]/90 hover:to-[#1A325E] transition-all duration-500 text-center group shadow-2xl relative overflow-hidden flex flex-col h-full"
            >
              {/* Card Glare */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-1.5 bg-white/60 mx-auto mb-8 rounded-full group-hover:bg-white group-hover:w-24 transition-all duration-500 ease-out" />
              
              <h4 className="text-2xl font-bold mb-4 tracking-tight transition-colors text-white">{sw.name}</h4>
              <p className="text-slate-400 group-hover:text-slate-200 font-light text-base leading-relaxed mt-auto transition-colors duration-500">
                {sw.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
