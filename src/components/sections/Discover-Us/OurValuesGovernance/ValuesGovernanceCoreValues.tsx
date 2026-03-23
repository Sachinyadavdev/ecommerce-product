"use client";

import { motion } from "framer-motion";
import { Shield, Star, Users, Lightbulb, Heart } from "lucide-react";

interface CoreValue {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface ValuesGovernanceCoreValuesProps {
  content?: {
    tagline?: string;
    title?: string;
    subtitle?: string;
    value1Title?: string;
    value1Desc?: string;
    value2Title?: string;
    value2Desc?: string;
    value3Title?: string;
    value3Desc?: string;
    value4Title?: string;
    value4Desc?: string;
    value5Title?: string;
    value5Desc?: string;
  };
}

const defaultValues: CoreValue[] = [
  {
    number: "01",
    title: "Integrity & Ethics",
    description:
      "We conduct our business with the highest standards of honesty and ethical practices. Every decision we make reflects our commitment to fairness, compliance, and long-term trust.",
    icon: "shield",
  },
  {
    number: "02",
    title: "Quality Excellence",
    description:
      "Quality is at the heart of everything we do. From design to delivery, we follow stringent quality systems to ensure our products meet global automotive standards and exceed customer expectations.",
    icon: "star",
  },
  {
    number: "03",
    title: "Customer Commitment",
    description:
      "We believe in building lasting relationships with our customers by delivering reliable, customized, and value-driven solutions. Our approach is collaborative, responsive, and performance-focused.",
    icon: "users",
  },
  {
    number: "04",
    title: "Innovation & Continuous Improvement",
    description:
      "We continuously invest in technology, processes, and people to drive innovation. Our focus on improvement enables us to adapt to evolving industry needs, including electric mobility and advanced connectivity.",
    icon: "lightbulb",
  },
  {
    number: "05",
    title: "Teamwork & Respect",
    description:
      "Our people are our strength. We foster a culture of collaboration, mutual respect, and continuous learning to empower our teams and drive organizational success.",
    icon: "heart",
  },
];

const accentColors = [
  { bg: "bg-primary/5", icon: "bg-primary/10 text-primary", number: "text-primary/10", border: "border-primary/10 hover:border-primary/30", bar: "bg-primary" },
  { bg: "bg-primary/5", icon: "bg-primary/10 text-primary", number: "text-primary/10", border: "border-primary/10 hover:border-primary/30", bar: "bg-primary" },
  { bg: "bg-primary/5", icon: "bg-primary/10 text-primary", number: "text-primary/10", border: "border-primary/10 hover:border-primary/30", bar: "bg-primary" },
  { bg: "bg-primary/5", icon: "bg-primary/10 text-primary", number: "text-primary/10", border: "border-primary/10 hover:border-primary/30", bar: "bg-primary" },
  { bg: "bg-primary/5", icon: "bg-primary/10 text-primary", number: "text-primary/10", border: "border-primary/10 hover:border-primary/30", bar: "bg-primary" },
];

function getIcon(name: string, className?: string) {
  switch (name) {
    case "shield": return <Shield className={className} />;
    case "star": return <Star className={className} />;
    case "users": return <Users className={className} />;
    case "lightbulb": return <Lightbulb className={className} />;
    case "heart": return <Heart className={className} />;
    default: return <Shield className={className} />;
  }
}

export default function ValuesGovernanceCoreValues({ content }: ValuesGovernanceCoreValuesProps) {
  const {
    tagline = "Our Foundation",
    title = "Our Core Values",
    subtitle = "The principles that shape every decision, every product, and every partnership.",
  } = content || {};

  const values = defaultValues.map((v, i) => ({
    ...v,
    title: (content as any)?.[`value${i + 1}Title`] || v.title,
    description: (content as any)?.[`value${i + 1}Desc`] || v.description,
  }));

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-primary, #e60026) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-slate-50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-left mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-5"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            {tagline}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-3xl"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-20 bg-linear-to-r from-primary to-primary/30 mt-6 rounded-full origin-left"
          />
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, idx) => {
            const accent = accentColors[idx % accentColors.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 * idx, type: "spring", bounce: 0.3 }}
                className={`group relative bg-white rounded-3xl p-8 border ${accent.border} shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-500 overflow-hidden hover:-translate-y-2`}
              >
                {/* Big number watermark */}
                <span className={`absolute -top-4 -right-2 text-[80px] font-black select-none pointer-events-none leading-none ${accent.number} transition-all duration-700 group-hover:scale-125 group-hover:rotate-6 group-hover:-translate-y-2`}>
                  {value.number}
                </span>

                {/* Left accent bar */}
                <div className={`absolute left-0 top-8 bottom-8 w-1.5 ${accent.bar} rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100`} />

                <div className={`w-14 h-14 rounded-2xl ${accent.icon} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                  {getIcon(value.icon, "w-6 h-6")}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-primary transition-colors duration-300 relative z-10">
                  {value.title}
                </h3>
                <p className="text-base text-slate-500 leading-relaxed relative z-10">
                  {value.description}
                </p>
              </motion.div>
            );
          })}

          {/* 6th card — decorative brand statement */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 * 5, type: "spring", bounce: 0.3 }}
            className="group relative bg-primary rounded-3xl p-8 shadow-[0_4px_24px_rgba(230,0,38,0.2)] hover:shadow-[0_20px_60px_rgba(230,0,38,0.4)] transition-all duration-500 overflow-hidden flex flex-col justify-between hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 blur-xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Embedded in Everything We Do
              </h3>
              <p className="text-base text-white/90 leading-relaxed">
                Our values are not just principles — they are embedded in our everyday operations, enabling us to deliver precision, performance, and trust.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
