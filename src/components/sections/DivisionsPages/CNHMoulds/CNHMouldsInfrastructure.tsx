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
  };
}

const defaultMachines: Machine[] = [
  { name: "CNC Milling", qty: 3, description: "High-precision machining for complex molds." },
  { name: "EDM & Wire EDM", qty: 10, description: "Intricate detailing and superior surface finishes." },
  { name: "Surface Grinding", qty: 7, description: "High-accuracy finishing for mold components." },
  { name: "Metrology (CMM/VMM)", qty: 2, description: "Ensuring precise measurements and quality control." }
];

export default function CNHMouldsInfrastructure({ content }: CNHMouldsInfrastructureProps) {
  const {
    title = "State-of-the-Art Infrastructure",
    description = "Our new 20,000 sq. ft. facility, inaugurated in January 2024, supports high-precision mold manufacturing with the latest advancements in technology.",
    machines = defaultMachines
  } = content || {};

  return (
    <section className="py-24 bg-slate-100 site-content overflow-hidden text-slate-900">
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
            {machines.map((mac, idx) => (
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
