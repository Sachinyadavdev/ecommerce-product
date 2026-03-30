"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HardDrive, Anchor, Zap } from "lucide-react";

interface ToolSteel {
  name: string;
  description: string;
}

interface CNHMouldsMaterialsProps {
  content?: {
    title?: string;
    description?: string;
    
    // Flat CMS Mapping
    st1Name?: string;
    st1Description?: string;
    st2Name?: string;
    st2Description?: string;
    st3Name?: string;
    st3Description?: string;
    st4Name?: string;
    st4Description?: string;
    st5Name?: string;
    st5Description?: string;

    // Old Fallback
    steels?: ToolSteel[];
  };
}

const defaultSteels: ToolSteel[] = [
  { name: "P20 & P20 HH", description: "Pre-hardened tool steels ideal for plastic moulds." },
  { name: "1.2344 ESR", description: "High-performance hot-work steel with heat resistance." },
  { name: "Orvar Supreme", description: "Premium-grade steel with excellent toughness and polishability." },
  { name: "Unimax", description: "High-hardness tool steel for extreme wear conditions." },
  { name: "Elmax", description: "Stainless tool steel for maximum corrosion protection." }
];

export default function CNHMouldsMaterials({ content }: CNHMouldsMaterialsProps) {
  console.log("[CNHMouldsMaterials] Received content:", content);

  const {
    title = "Premium-Grade Tool Steels",
    description = "We prioritize quality and durability by using only the finest tool steels, ensuring exceptional strength and wear resistance in every application.",
  } = content || {};

  // Build specialized CMS steels list
  // We use nullish coalescing (??) so that an empty string "" counts as a value (allowing hiding)
  const displaySteels: ToolSteel[] = [
    { 
      name: content?.st1Name ?? defaultSteels[0].name, 
      description: content?.st1Description ?? defaultSteels[0].description 
    },
    { 
      name: content?.st2Name ?? defaultSteels[1].name, 
      description: content?.st2Description ?? defaultSteels[1].description 
    },
    { 
      name: content?.st3Name ?? defaultSteels[2].name, 
      description: content?.st3Description ?? defaultSteels[2].description 
    },
    { 
      name: content?.st4Name ?? defaultSteels[3].name, 
      description: content?.st4Description ?? defaultSteels[3].description 
    },
    { 
      name: content?.st5Name ?? defaultSteels[4].name, 
      description: content?.st5Description ?? defaultSteels[4].description 
    },
  ].filter(steel => steel.name && steel.name.trim() !== "");

  const hasSpecializedData = Boolean(
    content?.st1Name !== undefined || content?.st1Description !== undefined ||
    content?.st2Name !== undefined || content?.st2Description !== undefined ||
    content?.st3Name !== undefined || content?.st3Description !== undefined ||
    content?.st4Name !== undefined || content?.st4Description !== undefined ||
    content?.st5Name !== undefined || content?.st5Description !== undefined
  );

  const finalSteels = hasSpecializedData 
    ? displaySteels 
    : (Array.isArray(content?.steels) && content.steels.length > 0)
      ? content.steels
      : defaultSteels;

  return (
    <section className="py-10 md:py-16 bg-white site-content">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-slate-900 mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalSteels.map((steel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 rounded-4xl bg-slate-50 border border-slate-100 flex items-start gap-5 hover:bg-primary group transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">{steel.name}</h4>
                <p className="text-slate-500 text-sm group-hover:text-primary-foreground/70 transition-colors">
                  {steel.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
