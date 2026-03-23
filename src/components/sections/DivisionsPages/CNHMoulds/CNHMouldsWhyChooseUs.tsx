"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Handshake, Lightbulb, TrendingUp } from "lucide-react";

interface USP {
  title: string;
  description: string;
  icon: string;
}

interface CNHMouldsWhyChooseUsProps {
  content?: {
    title?: string;
    usps?: USP[];
  };
}

const defaultUSPs: USP[] = [
  { title: "Precision Engineering", description: "Our molds are crafted with the highest level of accuracy to ensure superior performance.", icon: "Target" },
  { title: "Innovation & Expertise", description: "Years of experience allowing us to deliver tailored solutions for diverse industry applications.", icon: "Lightbulb" },
  { title: "Scalability & Flexibility", description: "From small batch to large-scale production, our capabilities cater to businesses of all sizes.", icon: "TrendingUp" }
];

const iconMap: any = { Target: CheckCircle2, Lightbulb, TrendingUp };

export default function CNHMouldsWhyChooseUs({ content }: CNHMouldsWhyChooseUsProps) {
  const {
    title = "Why Choose CNH Moulds?",
    usps = defaultUSPs
  } = content || {};

  return (
    <section className="py-24 bg-white site-content">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bold text-slate-900 mb-6"
          >
            {title}
          </motion.h2>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto italic">
            "Delivering exceptional quality, efficiency, and reliability in every project we undertake."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, idx) => {
            const Icon = iconMap[usp.icon] || CheckCircle2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-10 rounded-[4rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{usp.title}</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">
                  {usp.description}
                </p>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-12 lg:p-16 bg-primary rounded-[4rem] text-white text-center shadow-xl shadow-primary/30"
        >
          <Handshake size={48} className="mx-auto mb-8 opacity-40" />
          <h3 className="text-3xl font-bold mb-6 italic tracking-tight">Ready to start your next project?</h3>
          <p className="text-xl font-light text-white/90 max-w-2xl mx-auto">
            Contact us today to explore how we can support your manufacturing needs with precision mold solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
