"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Globe2, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface AccreditationProps {
  content?: {
    scopeTitle?: string;
    scopeDescription?: string;
    recognitionTitle?: string;
    recognitionDescription?: string;
    benefitsTitle?: string;
    benefitsDescription?: string;
  };
}

export default function TestingAccreditation({ content }: AccreditationProps) {
  const {
    scopeTitle = "NABL Accreditation Scope",
    scopeDescription = "Our laboratory is accredited to carry out testing across key disciplines, including mechanical, chemical and electrical. We follow international standards as well as customer and OEM requirements such as ISO 8092-2, USCAR-2, JASO D616 and BCPL-C101 to ensure reliable and accepted results.",
    recognitionTitle = "NABL Accredited E&D Laboratory with ILAC MRA Recognition",
    recognitionDescription = "Besmak E&D Laboratory is NABL-accredited and now recognised under the ILAC MRA, strengthening the global acceptance of our testing capabilities. This accreditation ensures that our test results are accepted internationally, reducing the need for repeated testing across different regions.",
    benefitsTitle = "Global Market Access",
    benefitsDescription = "With ILAC MRA recognition, we are able to provide faster approvals, improved compliance, and greater confidence in product validation. It also helps reduce costs and technical barriers, enabling smoother access to global markets for our customers.",
  } = content || {};

  const [active, setActive] = useState(0);

  const segments = [
    { title: scopeTitle, description: scopeDescription, icon: ShieldCheck, details: ["ISO 8092-2", "USCAR-2", "JASO D616", "BCPL-C101"] },
    { title: recognitionTitle, description: recognitionDescription, icon: Award, details: null },
    { title: benefitsTitle, description: benefitsDescription, icon: Globe2, details: null },
  ];

  const ActiveIcon = segments[active].icon;

  return (
    <section className="relative bg-slate-50 overflow-hidden py-16">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* BENTO GRID */}
        <div className="grid grid-cols-12 gap-4">

          {/* A: Section label + title — wide top cell */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-7 bg-white rounded-3xl border border-slate-100 px-10 py-9 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-primary" />
              </div>
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary">Globally Recognised Infrastructure</span>
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
              Certification &{" "}
              <span className="text-primary">Accreditation</span>
            </h2>
          </motion.div>

          {/* B: NABL badge cell */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="col-span-6 lg:col-span-2 bg-primary rounded-3xl p-6 flex flex-col justify-between"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Accreditation</span>
            <span className="text-4xl font-black text-white tracking-tighter">NABL</span>
          </motion.div>

          {/* C: ILAC badge cell */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.13 }}
            className="col-span-6 lg:col-span-3 bg-white rounded-3xl border border-slate-100 p-6 flex flex-col justify-between"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Recognition</span>
            <div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter block">ILAC MRA</span>
              <span className="text-[10px] font-medium text-slate-400 tracking-widest">Internationally Accepted</span>
            </div>
          </motion.div>

          {/* D: Tab selector cells — 3 stacked in one column */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            {segments.map((seg, idx) => {
              const Icon = seg.icon;
              const isActive = active === idx;
              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.07 }}
                  onClick={() => setActive(idx)}
                  className={`group w-full text-left flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-300 ${isActive
                      ? "bg-primary border-primary shadow-lg shadow-primary/15"
                      : "bg-white border-slate-100 hover:border-primary/20"
                    }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? "bg-white/20" : "bg-slate-50 border border-slate-100"
                    }`}>
                    <Icon size={16} className={isActive ? "text-white" : "text-primary"} strokeWidth={1.8} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? "text-white/50" : "text-slate-400"}`}>
                      0{idx + 1}
                    </span>
                    <span className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-slate-700"}`}>
                      {seg.title.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                  {isActive && (
                    <span className="ml-auto text-white/60 text-base">→</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* E: Detail content cell */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-100 overflow-hidden"
            >
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/40 to-transparent" />
              <div className="p-8 lg:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0">
                    <ActiveIcon size={22} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary block mb-1">Segment {String(active + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 leading-tight">{segments[active].title}</h3>
                  </div>
                </div>
                <p className="text-[15px] text-slate-500 font-light leading-relaxed mb-6">{segments[active].description}</p>

                {segments[active].details && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {segments[active].details!.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/25 hover:bg-primary/[0.03] transition-all"
                      >
                        <FileCheck size={13} className="text-primary shrink-0" />
                        <span className="text-xs font-bold text-slate-700 tracking-wide">{d}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-slate-50 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">NABL Certified</span>
                  </div>
                  <div className="w-px h-4 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ILAC MRA Recognised</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}