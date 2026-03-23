"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DEFAULT_MILESTONES = [
  { year: "2026", text: "Plating Plant" },
  { year: "2024", text: "CNH Tool Room Shifted to New Facility — 17,000 Sq. Ft." },
  { year: "2023", text: "Plating Plant & DVP Centre Planned" },
  { year: "2022", text: "Design Centre Started" },
  { year: "2021", text: "Sanand Unit III Started" },
  { year: "2019", text: "EMS 14001 Certificate & Engel Vertical Machines" },
  { year: "2016", text: "Certified as Green Supplier by MARUTI MACE" },
  { year: "2014", text: "Supplier Quality Certificate — Hyundai Motor India" },
  { year: "2013", text: "Facility at Oragadam — 40,000 Sq. Ft." },
  { year: "2012", text: "CNH Moulds Pvt Ltd Established" },
  { year: "2010", text: "Engineering Parts Business Begins" },
  { year: "2007", text: "Warehouse Established in Pune & Gurgaon" },
  { year: "2005", text: "TS 16949 Certified" },
  { year: "2004", text: "Facility with 13 Machines — 20,000 Sq. Ft." },
  { year: "2000", text: "QS 9000 Certificate" },
  { year: "1994", text: "Incorporated BESMAK Components Pvt Ltd" },
  { year: "1991", text: "In-house Tool Room Facility" },
  { year: "1989", text: "Connector Business Begins" },
  { year: "1987", text: "Journey started with tool design" },
];

interface AboutMilestonesProps {
  content?: {
    topTitle?: string;
    title?: string;
    description?: string;
    badgeTitle?: string;
    milestones?: string; // JSON fallback
    // Individual fields
    [key: string]: string | undefined;
  };
}

export default function AboutMilestones({ content }: AboutMilestonesProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<{ year: string; text: string } | null>(null);

  const {
    topTitle = "Our Journey",
    title: contentTitle,
    mainTitle: contentMainTitle, // Legacy support
    description = "From a humble beginning in 1987 to becoming a globally-aspiring automotive components manufacturer — every year has been a step forward in precision and purpose.",
    milestones: milestonesJson,
    badgeTitle = "Future Ready",
  } = content || {};

  const title = contentTitle || contentMainTitle || "Milestones";

  // Collect individual milestone fields (Year 1, Text 1, etc.)
  const individualMilestones: { year: string; text: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const year = content?.[`year${i}`];
    const text = content?.[`text${i}`];
    if (year || text) {
      individualMilestones.push({ year: year || "", text: text || "" });
    }
  }

  // Determine display milestones: Individual fields > JSON string > Defaults
  let displayMilestones = DEFAULT_MILESTONES;

  if (individualMilestones.length > 0) {
    displayMilestones = individualMilestones;
  } else if (milestonesJson) {
    try {
      const parsed = JSON.parse(milestonesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        displayMilestones = parsed;
      }
    } catch (e) {
      console.error("Error parsing milestones JSON", e);
    }
  }

  return (
    <section
      className="bg-white py-16 px-6 md:px-12 lg:px-20 overflow-hidden relative"
    >
      {/* Background decoration - subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#194c9a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#194c9a] text-sm md:text-base font-black uppercase mb-4 block"
          >
            {topTitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-900 text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        {/* The Infographic Container */}
        <div className="relative py-10 px-4">

          {/* Static Background Arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full hidden md:block">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 16 1600"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#194c9a" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              <line
                x1="8" y1="1600" x2="8" y2="20"
                stroke="rgba(25, 76, 154, 0.08)"
                strokeWidth="8"
                strokeLinecap="round"
              />

              <line
                x1="8" y1="1600" x2="8" y2="20"
                stroke="url(#arrowGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                className="opacity-40"
              />

              <path
                d="M-4 28 L8 12 L20 28"
                stroke="url(#arrowGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Milestone Cards */}
          <div className="space-y-12 md:space-y-16 relative">
            {displayMilestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: "-100px", once: false }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`flex ${isEven ? "md:justify-end md:pr-[50%]" : "md:justify-start md:pl-[50%]"}`}
                  >
                    <div
                      onClick={() => setSelectedMilestone(item)}
                      className={`group relative p-8 rounded-[2rem] border border-slate-100 bg-white shadow-[0_15px_45px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(25,76,154,0.12)] transition-all duration-700 max-w-lg ${isEven ? 'text-right md:mr-12' : 'text-left md:ml-12'} cursor-pointer active:scale-95`}
                    >

                      <div className="absolute -inset-[1px] bg-gradient-to-br from-[#194c9a]/20 to-emerald-500/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

                      <div className={`absolute -top-6 ${isEven ? "-right-2" : "-left-2"} px-5 py-1.5 rounded-xl bg-[#194c9a] text-white font-black text-lg shadow-xl ring-6 ring-white transform group-hover:-translate-y-2 transition-transform duration-500`}>
                        {item.year}
                      </div>

                      <div className="relative pt-1">
                        <p className="text-slate-700 text-base md:text-lg leading-relaxed font-semibold group-hover:text-slate-900 transition-colors duration-500">
                          {item.text.replace(/(\d+)\s+(Sq\.\s*Ft\.)/g, "$1\u00A0$2")}
                        </p>
                      </div>

                      <div className={`absolute top-8 ${isEven ? 'left-8' : 'right-8'} text-6xl font-black text-slate-100/50 select-none -z-10`}>
                        {(displayMilestones.length - index).toString().padStart(2, '0')}
                      </div>

                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-px bg-slate-200 group-hover:bg-[#194c9a]/30 transition-colors duration-500 ${isEven ? "-right-12" : "-left-12"}`}>
                        <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 group-hover:scale-150 group-hover:bg-[#10b981] transition-all duration-500 shadow-[0_0_10px_rgba(0,0,0,0.05)] ${isEven ? "right-0" : "left-0"}`} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Present Indicator Tooltip at the Top */}
          <div className="hidden md:flex absolute -top-16 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="px-6 py-2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] animate-bounce"
            >
              {badgeTitle}
            </motion.div>
            <div className="w-px h-12 bg-emerald-500 opacity-50" />
          </div>

        </div>
      </div>

      {/* Interactive Popup Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-12 shadow-2xl overflow-hidden isolate"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -z-10 translate-y-1/2 -translate-x-1/2" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 text-slate-400 hover:bg-[#194c9a] hover:text-white transition-all duration-300"
              >
                <X size={24} strokeWidth={3} />
              </button>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-6 py-2 rounded-2xl bg-[#194c9a] text-white text-2xl font-black shadow-lg"
                >
                  {selectedMilestone.year}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 text-xl md:text-2xl leading-relaxed font-medium pt-4 border-t border-slate-100"
                >
                  {selectedMilestone.text}
                </motion.p>
              </div>

              {/* Decorative Index */}
              <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-slate-50 select-none -z-10 leading-none">
                {selectedMilestone.year.slice(-2)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
