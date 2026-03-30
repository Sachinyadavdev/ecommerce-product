"use client";

import { motion } from "framer-motion";
import { Layers, Box, Zap, Settings, ShieldCheck, Factory, Construction, Award } from "lucide-react";

interface Capability {
  title: string;
  description: string;
  icon: string;
}

interface CNHMouldsCapabilitiesProps {
  content?: {
    title?: string;
    capabilities?: Capability[];

    // Flat CMS Mapping (supports up to 4 items)
    cap1Title?: string;
    cap1Description?: string;
    cap1Icon?: string;
    cap2Title?: string;
    cap2Description?: string;
    cap2Icon?: string;
    cap3Title?: string;
    cap3Description?: string;
    cap3Icon?: string;
    cap4Title?: string;
    cap4Description?: string;
    cap4Icon?: string;
  };
}

const defaultCapabilities: Capability[] = [
  { title: "Wide range of Mold Sizes", description: "Producing molds suitable for 40 Tons to 450 Tons capacity machines", icon: "Settings" },
  { title: "Cavity Versatility", description: "Providing single-cavity to 64-cavity molds with family mold expertise (up to 70% weight difference).", icon: "Layers" },
  { title: "Material Integration", description: "Significant experience in 65% glass-filled (GF) molds and over-molding technologies.", icon: "Box" },
  { title: "Specialized Engineering", description: "Expertise in insert-molding and complex threaded component manufacturing.", icon: "ShieldCheck" }
];

const iconMap: any = { Layers, Box, Zap, Settings, ShieldCheck, Factory, Construction, Award };

export default function CNHMouldsCapabilities({ content }: CNHMouldsCapabilitiesProps) {
  console.log("[CNHMouldsCapabilities] Received content:", content);
  
  // Determine the title
  const title = content?.title || "Our Core Capabilities";


  // Build capabilities list based on priority:
  // 1. Specialized CMS fields (cap1Title, etc.)
  // 2. Existing capabilities array (from previous versions if any)
  // 3. Defaults
  const displayCapabilities: Capability[] = [
    {
      title: content?.cap1Title ?? defaultCapabilities[0].title,
      description: content?.cap1Description ?? defaultCapabilities[0].description,
      icon: content?.cap1Icon ?? defaultCapabilities[0].icon,
    },
    {
      title: content?.cap2Title ?? defaultCapabilities[1].title,
      description: content?.cap2Description ?? defaultCapabilities[1].description,
      icon: content?.cap2Icon ?? defaultCapabilities[1].icon,
    },
    {
      title: content?.cap3Title ?? defaultCapabilities[2].title,
      description: content?.cap3Description ?? defaultCapabilities[2].description,
      icon: content?.cap3Icon ?? defaultCapabilities[2].icon,
    },
    {
      title: content?.cap4Title ?? defaultCapabilities[3].title,
      description: content?.cap4Description ?? defaultCapabilities[3].description,
      icon: content?.cap4Icon ?? defaultCapabilities[3].icon,
    },
  ].filter(cap => cap.title && cap.title.trim() !== "");

  const hasSpecializedCmsData = Boolean(
    content?.cap1Title !== undefined || content?.cap1Description !== undefined || content?.cap1Icon !== undefined ||
    content?.cap2Title !== undefined || content?.cap2Description !== undefined || content?.cap2Icon !== undefined ||
    content?.cap3Title !== undefined || content?.cap3Description !== undefined || content?.cap3Icon !== undefined ||
    content?.cap4Title !== undefined || content?.cap4Description !== undefined || content?.cap4Icon !== undefined
  );

  const capabilities = hasSpecializedCmsData 
    ? displayCapabilities 
    : (Array.isArray(content?.capabilities) && content.capabilities.length > 0)
      ? content.capabilities
      : defaultCapabilities;

  return (
    <section className="py-10 md:py-16 bg-white site-content">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-slate-900 mb-4"
          >
            {title}
          </motion.h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap: Capability, idx: number) => {
            const Icon = iconMap[cap.icon] || Settings;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex items-start gap-8"
              >
                <div className="shrink-0 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
