"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface CNHMouldsProductsProps {
  content?: {
    title?: string;
    oemTitle?: string;
    
    // Flat mapping for 4 products
    prod1Name?: string;
    prod2Name?: string;
    prod3Name?: string;
    prod4Name?: string;

    // Flat OEM Mapping (up to 3 categories, 4 logos each) to match StampingSegments
    oem1Category?: string;
    oem1Logo1?: string; oem1Logo2?: string; oem1Logo3?: string; oem1Logo4?: string;
    
    oem2Category?: string;
    oem2Logo1?: string; oem2Logo2?: string; oem2Logo3?: string; oem2Logo4?: string;
    
    oem3Category?: string;
    oem3Logo1?: string; oem3Logo2?: string; oem3Logo3?: string; oem3Logo4?: string;

    // Old fallbacks
    products?: { name: string }[];
    segments?: { category: string; brands: string[] }[];
  };
}

const defaultProducts = [
  "2-Wheeler Connectors & Cluster Parts",
  "Fuel System Parts",
  "4-Wheeler Plastic Pedals",
  "Reservoir Tanks & Plastic Clips"
];

// Fallback logic for old text array -> converting loosely to visual logo blocks if possible, otherwise hiding
const defaultSegments = [
  { category: "2-Wheeler", logos: [] as string[] },
  { category: "4-Wheeler", logos: [] as string[] },
  { category: "Heavy Vehicle (HV)", logos: [] as string[] }
];

export default function CNHMouldsProducts({ content }: CNHMouldsProductsProps) {
  // Map flat product fields
  const cmsProducts: string[] = [
    content?.prod1Name || defaultProducts[0],
    content?.prod2Name || defaultProducts[1],
    content?.prod3Name || defaultProducts[2],
    content?.prod4Name || defaultProducts[3]
  ].filter(Boolean);

  const hasCmsData = !!(content?.prod1Name || content?.prod2Name || content?.oem1Logo1);

  const {
    title = "Automotive Excellence",
    oemTitle = "Trusted by Leading OEMs",
  } = content || {};

  // Override old arrays with new flat fields if present
  const displayProducts = hasCmsData ? cmsProducts : (content?.products?.map(p => p.name) || defaultProducts);

  // Map flat OEM fields into a single flattened array of logos (User requested continuous grid like StampingSegments)
  const allOemLogos: string[] = [];
  if (hasCmsData) {
    [
      content?.oem1Logo1, content?.oem1Logo2, content?.oem1Logo3, content?.oem1Logo4,
      content?.oem2Logo1, content?.oem2Logo2, content?.oem2Logo3, content?.oem2Logo4,
      content?.oem3Logo1, content?.oem3Logo2, content?.oem3Logo3, content?.oem3Logo4
    ].forEach(logo => {
      if (logo) allOemLogos.push(logo);
    });
  }

  const showOldTextSegments = !hasCmsData && content?.segments && content.segments.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const as any } }
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 site-content relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,rgba(var(--color-primary-rgb),0.03),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Products */}
          <div className="lg:w-5/12">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 tracking-tight leading-tight"
            >
              {title}
            </motion.h2>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-4"
            >
              {displayProducts.map((p, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200 flex items-center gap-5 hover:border-primary/40 hover:shadow-[0_10px_40px_-10px_rgba(var(--color-primary-rgb),0.15)] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <CheckCircle2 size={24} className="text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-slate-800 text-lg leading-snug group-hover:text-primary transition-colors duration-300 flex-1">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: OEMs */}
          <div className="lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white text-slate-900 p-10 md:p-16 rounded-[3rem] relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group border border-slate-100"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <ShieldCheck size={40} className="text-primary" strokeWidth={1.5} />
                  <h3 className="text-3xl font-bold tracking-tight">{oemTitle}</h3>
                </div>

                {/* LOGO GRID RENDERER */}
                {hasCmsData ? (
                  allOemLogos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                      {allOemLogos.map((logo, lIdx) => (
                        <motion.div
                          key={lIdx}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="h-28 md:h-32 bg-white rounded-2xl p-4 md:p-6 flex items-center justify-center shadow-lg relative cursor-pointer border border-transparent hover:border-primary/30 transition-all group/logo"
                        >
                          {/* Inner glow effect on logo hover */}
                          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-primary/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity rounded-b-2xl" />
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                              src={logo}
                              alt={`OEM Partner ${lIdx + 1}`}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 33vw, 20vw"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 font-light border border-dashed border-slate-700 rounded-2xl">
                      Upload your partner logos in the CMS editor.
                    </div>
                  )
                ) : (
                  // Fallback for old content (Text strings)
                  <div className="space-y-8">
                    {showOldTextSegments && content.segments?.map((seg, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-6 last:border-0">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                          {seg.category}
                        </p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          {seg.brands.map(b => (
                            <span key={b} className="text-lg font-bold text-slate-900 tracking-tight">{b}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
