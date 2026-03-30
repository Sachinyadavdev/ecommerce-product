"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Building2 } from "lucide-react";

interface ValuesGovernanceCorporateGovernanceProps {
  content?: {
    tagline?: string;
    title?: string;
    description?: string;
    item1?: string;
    item2?: string;
    item3?: string;
    item4?: string;
    item5?: string;
    closingStatement?: string;
    bgImage?: string;
  };
}

const defaultItems = [
  "Strong leadership oversight and strategic direction",
  "Transparent decision-making processes",
  "Compliance with industry regulations and standards",
  "Risk management and process control systems",
  "Ethical business conduct across all operations",
];

export default function ValuesGovernanceCorporateGovernance({ content }: ValuesGovernanceCorporateGovernanceProps) {
  const {
    tagline = "How We Operate",
    title = "Corporate Governance",
    description = "Besmak follows structured governance practices to ensure operational excellence and responsible business conduct:",
    closingStatement = "Our governance framework ensures that we consistently deliver value while maintaining the trust of our customers, partners, and stakeholders.",
    bgImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  } = content || {};

  const items = defaultItems.map((def, i) => (content as any)?.[`item${i + 1}`] || def);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Subtle parallax effect for background
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="py-10 md:py-16 relative overflow-hidden bg-slate-900 border-y border-slate-800">
      {/* Parallax Background */}
      {bgImage && (
        <motion.div
          style={{ y, backgroundImage: `url(${bgImage})` }}
          className="absolute inset-x-0 -top-[20%] h-[140%] w-full bg-cover bg-center"
        />
      )}



      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left — textual content in a subtle glass card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="bg-linear-to-br from-[#2A4C8D]/90 to-[#2A4C8D]/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-primary/20 text-white border border-primary/30 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-1.5 w-1.5 pt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              {tagline}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
              {title}
            </h2>
            
            <p className="text-base text-white/80 leading-relaxed mb-8">
              {description}
            </p>

            <ul className="space-y-4 mb-8">
              {items.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <span className="text-white/90 text-base leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/5 border-l-4 border-primary rounded-r-xl p-5"
            >
              <p className="text-base text-white/80 italic leading-relaxed">
                "{closingStatement}"
              </p>
            </motion.div>
          </motion.div>

          {/* Right — visual governance pillars (glassmorphism grid) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="relative h-full flex flex-col justify-center"
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6 relative z-10">
              {[
                { label: "Leadership Oversight", icon: "🏛️", delay: 0 },
                { label: "Transparency", icon: "🔍", delay: 0.1 },
                { label: "Regulatory Compliance", icon: "📋", delay: 0.2 },
                { label: "Risk Management", icon: "🛡️", delay: 0.3 },
              ].map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + pillar.delay, type: "spring", bounce: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                  className="bg-linear-to-br from-[#2A4C8D]/80 to-[#2A4C8D]/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center gap-4 shadow-xl hover:from-[#2A4C8D]/90 hover:to-[#2A4C8D]/70 hover:border-white/40 transition-all duration-300 text-center group cursor-default"
                >
                  <span className="text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 block">{pillar.icon}</span>
                  <p className="text-base font-bold text-white leading-snug group-hover:text-primary-100">{pillar.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Central glowing badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7, type: "spring", bounce: 0.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 animate-pulse" />
                <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-primary to-primary border-2 border-white/20 flex items-center justify-center shadow-2xl relative z-10">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
