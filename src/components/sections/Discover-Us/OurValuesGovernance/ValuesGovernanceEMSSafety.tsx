"use client";

import { motion } from "framer-motion";
import { Leaf, HeartPulse, ShieldCheck, Users, CheckCircle2 } from "lucide-react";

interface ValuesGovernanceEMSSafetyProps {
  content?: {
    heroTagline?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    emsTitle?: string;
    emsDescription?: string;
    emsItem1?: string;
    emsItem2?: string;
    emsItem3?: string;
    emsItem4?: string;
    emsItem5?: string;
    safetyTitle?: string;
    safetyDescription?: string;
    safetyItem1?: string;
    safetyItem2?: string;
    safetyItem3?: string;
    safetyItem4?: string;
    safetyItem5?: string;
    processSafetyTitle?: string;
    processSafetyItem1?: string;
    processSafetyItem2?: string;
    processSafetyItem3?: string;
    processSafetyItem4?: string;
    wellbeingTitle?: string;
    wellbeingItem1?: string;
    wellbeingItem2?: string;
    wellbeingItem3?: string;
    wellbeingItem4?: string;
  };
}

const defaultEmsItems = [
  "Reducing environmental impact through efficient manufacturing processes",
  "Optimizing energy consumption across production and facility operations",
  "Minimizing waste generation and promoting recycling initiatives",
  "Responsible handling and disposal of industrial materials",
  "Compliance with all applicable environmental regulations and standards",
];

const defaultSafetyItems = [
  "Implementation of strict safety protocols across all production units",
  "Regular safety training and awareness programs for employees",
  "Use of appropriate personal protective equipment (PPE)",
  "Hazard identification and risk assessment processes",
  "Emergency preparedness and response systems",
];

const defaultProcessItems = [
  "Standardized operating procedures (SOPs) for all critical processes",
  "Periodic safety audits and inspections",
  "Compliance with industry safety norms and guidelines",
  "Continuous improvement through feedback and incident analysis",
];

const defaultWellbeingItems = [
  "Promoting employee health and well-being",
  "Encouraging participation in safety programs",
  "Building awareness through regular communication and training",
  "Creating a culture where safety is everyone's responsibility",
];

export default function ValuesGovernanceEMSSafety({ content }: ValuesGovernanceEMSSafetyProps) {
  const {
    heroTagline = "Responsibility",
    heroTitle = "EMS & Safety",
    heroSubtitle = "Committed to Environmental Responsibility and Workplace Safety",
    emsTitle = "Environmental Management System (EMS)",
    emsDescription = "We follow structured environmental practices to ensure sustainable manufacturing and responsible resource utilization.",
    safetyTitle = "Health & Safety at Workplace",
    safetyDescription = "Safety is a core priority at Besmak. We are committed to providing a safe and healthy work environment for all employees, contractors, and stakeholders.",
    processSafetyTitle = "Process Safety & Compliance",
    wellbeingTitle = "Employee Well-being & Engagement",
  } = content || {};

  const emsItems = defaultEmsItems.map((def, i) => (content as any)?.[`emsItem${i + 1}`] || def);
  const safetyItems = defaultSafetyItems.map((def, i) => (content as any)?.[`safetyItem${i + 1}`] || def);
  const processItems = defaultProcessItems.map((def, i) => (content as any)?.[`processSafetyItem${i + 1}`] || def);
  const wellbeingItems = defaultWellbeingItems.map((def, i) => (content as any)?.[`wellbeingItem${i + 1}`] || def);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Hero intro */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20 hover:bg-primary/20 transition-colors"
          >
            <Leaf className="w-3.5 h-3.5" />
            {heroTagline}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
          >
            {heroTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            {heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 w-24 bg-linear-to-r from-primary to-primary/30 mx-auto mt-8 rounded-full"
          />
        </div>

        {/* 2-column: EMS + Safety */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* EMS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:scale-110 transition-all duration-500">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{emsTitle}</h3>
            </div>
            <p className="text-slate-600 text-base mb-8 leading-relaxed">{emsDescription}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Our Environmental Commitments</p>
            <ul className="space-y-4">
              {emsItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Safety */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", bounce: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-500">
                <HeartPulse className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{safetyTitle}</h3>
            </div>
            <p className="text-slate-600 text-base mb-8 leading-relaxed">{safetyDescription}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Key Safety Practices</p>
            <ul className="space-y-4">
              {safetyItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 2-column: Process Safety + Well-being */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Process safety */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{processSafetyTitle}</h3>
            </div>
            <p className="text-slate-600 text-base mb-8 leading-relaxed">
              We integrate safety into every stage of our operations—from tool design and moulding to stamping and assembly.
            </p>
            <ul className="space-y-4">
              {processItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Well-being */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-500">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{wellbeingTitle}</h3>
            </div>
            <p className="text-slate-600 text-base mb-8 leading-relaxed">
              We believe that a safe workplace goes beyond compliance. Our initiatives focus on employee health, participation, and an ingrained safety culture.
            </p>
            <ul className="space-y-4">
              {wellbeingItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 hover:-translate-y-0.5 transition-transform">
                  <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
