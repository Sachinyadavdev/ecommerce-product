"use client";

import { motion } from "framer-motion";
import { Factory, Cog, Target, Ruler } from "lucide-react";

interface Machine {
  name: string;
  qty: number;
  description: string;
}

interface CNHMouldsInfrastructureProps {
  content?: {
    title?: string;
    description?: string;
    machines?: Machine[];

    // Flat CMS Mapping
    mac1Name?: string;
    mac1Qty?: string | number;
    mac1Description?: string;
    mac2Name?: string;
    mac2Qty?: string | number;
    mac2Description?: string;
    mac3Name?: string;
    mac3Qty?: string | number;
    mac3Description?: string;
    mac4Name?: string;
    mac4Qty?: string | number;
    mac4Description?: string;
  };
}

const defaultMachines: Machine[] = [
  { name: "CNC Milling", qty: 3, description: "High-precision machining for complex molds." },
  { name: "EDM & Wire EDM", qty: 10, description: "Intricate detailing and superior surface finishes." },
  { name: "Surface Grinding", qty: 7, description: "High-accuracy finishing for mold components." },
  { name: "Metrology (CMM/VMM)", qty: 2, description: "Ensuring precise measurements and quality control." }
];

export default function CNHMouldsInfrastructure({ content }: CNHMouldsInfrastructureProps) {
  // Build machines list based on specialized CMS fields if present
  const displayMachines: Machine[] = [
    {
      name: content?.mac1Name ?? defaultMachines[0].name,
      qty: Number(content?.mac1Qty) || defaultMachines[0].qty,
      description: content?.mac1Description ?? defaultMachines[0].description
    },
    {
      name: content?.mac2Name ?? defaultMachines[1].name,
      qty: Number(content?.mac2Qty) || defaultMachines[1].qty,
      description: content?.mac2Description ?? defaultMachines[1].description
    },
    {
      name: content?.mac3Name ?? defaultMachines[2].name,
      qty: Number(content?.mac3Qty) || defaultMachines[2].qty,
      description: content?.mac3Description ?? defaultMachines[2].description
    },
    {
      name: content?.mac4Name ?? defaultMachines[3].name,
      qty: Number(content?.mac4Qty) || defaultMachines[3].qty,
      description: content?.mac4Description ?? defaultMachines[3].description
    }
  ].filter(m => m.name && m.name.trim() !== "");

  const hasSpecializedData = Boolean(
    content?.mac1Name !== undefined || content?.mac1Qty !== undefined || content?.mac1Description !== undefined ||
    content?.mac2Name !== undefined || content?.mac2Qty !== undefined || content?.mac2Description !== undefined ||
    content?.mac3Name !== undefined || content?.mac3Qty !== undefined || content?.mac3Description !== undefined ||
    content?.mac4Name !== undefined || content?.mac4Qty !== undefined || content?.mac4Description !== undefined
  );

  const finalMachines = hasSpecializedData 
    ? displayMachines 
    : (Array.isArray(content?.machines) && content.machines.length > 0)
      ? content.machines
      : defaultMachines;

  const {
    title = "State-of-the-Art Infrastructure",
    description = "Our new 20,000 sq. ft. facility, inaugurated in January 2024, supports high-precision mold manufacturing with the latest advancements in technology."
  } = content || {};

  return (
    <section className="py-10 md:py-16 bg-slate-100 site-content overflow-hidden text-slate-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <div className="p-4 bg-primary/10 inline-block rounded-2xl text-primary mb-6">
                <Factory size={32} />
              </div>
              <h2 className="font-bold mb-6">{title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {description}
              </p>
              <div className="mt-10 pt-10 border-t border-slate-200">
                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Facility Size</p>
                <p className="text-4xl font-black text-slate-900 italic">20,000 SQ. FT.</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalMachines.map((mac, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[3rem] bg-white shadow-sm border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Cog size={20} />
                  </div>
                  <span className="text-4xl font-black text-slate-100 group-hover:text-primary/10 transition-colors uppercase">
                    {mac.qty} Units
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-3">{mac.name}</h4>
                <p className="text-slate-500 font-light text-sm">
                  {mac.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
