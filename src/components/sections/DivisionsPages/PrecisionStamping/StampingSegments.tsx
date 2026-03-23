"use client";

import { motion } from "framer-motion";
import { Car, Zap, Radio, CheckCircle2 } from "lucide-react";

interface Segment {
  title: string;
  icon: string;
  items: string[];
}

interface StampingSegmentsProps {
  content?: {
    title?: string;
    description?: string;
    oemsTitle?: string;
    
    // Flat mapping for 3 segments
    seg1Title?: string;
    seg1Icon?: string;
    seg1Item1?: string;
    seg1Item2?: string;
    seg1Item3?: string;
    
    seg2Title?: string;
    seg2Icon?: string;
    seg2Item1?: string;
    seg2Item2?: string;
    seg2Item3?: string;

    seg3Title?: string;
    seg3Icon?: string;
    seg3Item1?: string;
    seg3Item2?: string;
    seg3Item3?: string;

    // Flat mapping for 4 OEM categories
    oem1Category?: string;
    oem1Logo1?: string;
    oem1Logo2?: string;
    oem1Logo3?: string;
    oem1Logo4?: string;
    
    oem2Category?: string;
    oem2Logo1?: string;
    oem2Logo2?: string;
    oem2Logo3?: string;
    oem2Logo4?: string;
    
    oem3Category?: string;
    oem3Logo1?: string;
    oem3Logo2?: string;
    oem3Logo3?: string;
    oem3Logo4?: string;
    
    oem4Category?: string;
    oem4Logo1?: string;
    oem4Logo2?: string;
    oem4Logo3?: string;
    oem4Logo4?: string;

    // Old Array Fallbacks
    segments?: Segment[];
    oems?: { category: string; logos?: { name: string; src: string }[]; brands?: string[] }[];
  };
}

const defaultSegments: Segment[] = [
  { 
    title: "Automotive", 
    icon: "Car", 
    items: ["High-performance terminals", "Precision stamping parts", "Bus bars for EV Battery Management"] 
  },
  { 
    title: "Energy & Industrial", 
    icon: "Zap", 
    items: ["Terminal block parts", "Power measurement & distribution", "Power measuring non-auto components"] 
  },
  { 
    title: "Telecom & Electronics", 
    icon: "Radio", 
    items: ["Bus bars and shields", "Signal protection & EMI shielding", "Telecom infrastructure components"] 
  }
];

const defaultOems = [
  { category: "2-Wheeler", logos: [{ name: "Hero", src: "" }, { name: "Suzuki", src: "" }, { name: "Royal Enfield", src: "" }, { name: "TVS", src: "" }] },
  { category: "4-Wheeler", logos: [{ name: "Tata", src: "" }, { name: "Honda", src: "" }, { name: "Hyundai", src: "" }] },
  { category: "Heavy Vehicle", logos: [{ name: "Tata", src: "" }] },
  { category: "Non-Automotive", logos: [{ name: "Salcomp", src: "" }, { name: "SFO", src: "" }, { name: "Salzer", src: "" }, { name: "Harting", src: "" }] }
];

const iconMap: Record<string, any> = { Car, Zap, Radio };

export default function StampingSegments({ content }: StampingSegmentsProps) {
  // Map flat CMS fields for segments
  const cmsSegments: Segment[] = [
    { 
      title: content?.seg1Title || defaultSegments[0].title, 
      icon: content?.seg1Icon || defaultSegments[0].icon,
      items: [
        content?.seg1Item1 || defaultSegments[0].items[0],
        content?.seg1Item2 || defaultSegments[0].items[1],
        content?.seg1Item3 || defaultSegments[0].items[2]
      ].filter(Boolean)
    },
    { 
      title: content?.seg2Title || defaultSegments[1].title, 
      icon: content?.seg2Icon || defaultSegments[1].icon,
      items: [
        content?.seg2Item1 || defaultSegments[1].items[0],
        content?.seg2Item2 || defaultSegments[1].items[1],
        content?.seg2Item3 || defaultSegments[1].items[2]
      ].filter(Boolean)
    },
    { 
      title: content?.seg3Title || defaultSegments[2].title, 
      icon: content?.seg3Icon || defaultSegments[2].icon,
      items: [
        content?.seg3Item1 || defaultSegments[2].items[0],
        content?.seg3Item2 || defaultSegments[2].items[1],
        content?.seg3Item3 || defaultSegments[2].items[2]
      ].filter(Boolean)
    }
  ];

  // Map flat CMS fields for OEMs
  const buildLogos = (defaults: { name: string, src: string }[], urls: (string | undefined)[]) => {
    // If urls are provided via CMS, map them to objects. If empty, fall back to default logic or show nothing if no defaults.
    return [0,1,2,3].map(i => ({
      name: defaults[i]?.name || `Partner ${i+1}`,
      src: urls[i] || defaults[i]?.src || ""
    })).filter(logo => logo.src || logo.name); // only keep if we have a name or image
  };

  const cmsOems = [
    { 
      category: content?.oem1Category || defaultOems[0].category,
      logos: buildLogos(defaultOems[0].logos, [content?.oem1Logo1, content?.oem1Logo2, content?.oem1Logo3, content?.oem1Logo4])
    },
    { 
      category: content?.oem2Category || defaultOems[1].category,
      logos: buildLogos(defaultOems[1].logos, [content?.oem2Logo1, content?.oem2Logo2, content?.oem2Logo3, content?.oem2Logo4])
    },
    { 
      category: content?.oem3Category || defaultOems[2].category,
      logos: buildLogos(defaultOems[2].logos, [content?.oem3Logo1, content?.oem3Logo2, content?.oem3Logo3, content?.oem3Logo4])
    },
    { 
      category: content?.oem4Category || defaultOems[3].category,
      logos: buildLogos(defaultOems[3].logos, [content?.oem4Logo1, content?.oem4Logo2, content?.oem4Logo3, content?.oem4Logo4])
    }
  ];

  const hasCmsSegmentsData = !!(content?.seg1Title || content?.seg2Title);
  const hasCmsOemsData = !!(content?.oem1Category || content?.oem1Logo1 || content?.oem2Logo1 || content?.oem3Logo1 || content?.oem4Logo1);

  const {
    title = "Market Segments & Industry Partnerships",
    description = "Manufacturing components that serve critical functions across the automotive, energy, and telecommunications sectors.",
    oemsTitle = "Our Strategic Partners",
  } = content || {};

  const displaySegments = hasCmsSegmentsData ? cmsSegments : (content?.segments || defaultSegments);
  const displayOems = hasCmsOemsData ? cmsOems : (content?.oems || defaultOems);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 site-content relative overflow-hidden">
      {/* Abstract Background Top */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-b from-primary/5 to-transparent skew-x-12 z-0 opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 lg:mb-32"
        >
          {displaySegments.map((seg, idx) => {
            const Icon = iconMap[seg.icon] || Car;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary/30 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(var(--color-primary),0.15)] transition-all duration-400 group relative overflow-hidden flex flex-col h-full"
              >
                {/* Decorative fade at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-2 bg-linear-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {seg.title}
                </h3>
                
                <ul className="space-y-4 mt-auto">
                  {seg.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100/50 group-hover:border-primary/10 transition-colors duration-300">
                      <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-slate-600 font-medium text-sm leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Strategic Partners (OEMs) Block */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100"
        >
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-16 text-center tracking-tight text-slate-900">
              {oemsTitle}
            </h3>
            
            <div className="flex justify-center mt-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 w-full">
                {displayOems.flatMap((cat: any) => {
                  const displayLogos: { name: string; src: string }[] = cat.logos || (cat.brands ? cat.brands.map((b: string) => ({ name: b, src: "" })) : []);
                  return hasCmsOemsData 
                    ? displayLogos.filter(logo => logo.src) 
                    : displayLogos.filter(logo => logo.name);
                }).map((logo, lIdx) => (
                  <motion.div 
                    key={lIdx} 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: lIdx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -6, boxShadow: "0 20px 40px -10px rgba(var(--color-primary-rgb), 0.15)" }}
                    className="aspect-4/3 bg-white border border-slate-100/80 rounded-2xl flex items-center justify-center p-6 shadow-sm hover:border-primary/20 transition-all duration-300 relative group/logo overflow-hidden"
                  >
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover/logo:translate-x-full bg-linear-to-r from-transparent via-slate-50/50 to-transparent transition-transform duration-1000" />
                    
                    {logo.src ? (
                      <img 
                        src={logo.src} 
                        alt={logo.name} 
                        className="max-w-full max-h-full object-contain filter transition-all duration-500 z-10" 
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-400 text-center uppercase tracking-wide group-hover/logo:text-primary transition-colors duration-300 z-10 px-2">
                        {logo.name}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
