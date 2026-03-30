"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Thermometer, ShieldCheck, Zap, Activity, Microscope } from "lucide-react";

interface LSRCapabilitiesProps {
  content?: {
    title?: string;
    description?: string;
    tagline?: string;
  };
}

export default function LSRCapabilities({ content }: LSRCapabilitiesProps) {
  const {
    title = "Why LSR at Besmak?",
    description = "Our LSR moulding capability is designed to produce high-performance, precision components with higher dimensional accuracy and stability.",
    tagline = "Technical Advantages"
  } = content || {};

  const capabilities = [
    { title: "Thermal Stability", desc: "Maintains flexibility from -50°C to 200°C", icon: Thermometer },
    { title: "Chemical Resistance", desc: "Superior protection against harsh fluids", icon: ShieldCheck },
    { title: "Fast Cycle Times", desc: "Optimised production for high volume", icon: Zap },
    { title: "Bio-compatibility", desc: "Suitable for sensitive medical/food apps", icon: Activity },
    { title: "Precision Accuracy", desc: "Dimensional stability for complex parts", icon: Microscope },
    { title: "High Insulation", desc: "Excellent electrical insulation property", icon: Activity },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#00A758] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
              {tagline}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] mb-6 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[10px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-[10px] bg-slate-50 flex items-center justify-center text-[#284b8c] mb-6 group-hover:bg-[#284b8c] group-hover:text-white transition-colors duration-300">
                <cap.icon size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">
                {cap.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-[#284b8c] rounded-[10px] p-10 md:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            <div>
              <p className="text-[10px] font-black tracking-widest text-[#00C875] uppercase mb-2">Min. Wall</p>
              <p className="text-4xl font-black tracking-tighter">0.3 mm</p>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-[#00C875] uppercase mb-2">Robotics</p>
              <p className="text-4xl font-black tracking-tighter">3-Axis</p>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-[#00C875] uppercase mb-2">Accuracy</p>
              <p className="text-4xl font-black tracking-tighter">100%</p>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-[#00C875] uppercase mb-2">Tech</p>
              <p className="text-4xl font-black tracking-tighter">LIM/LSR</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
