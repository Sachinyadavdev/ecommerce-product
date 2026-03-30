"use client";

import { motion } from "framer-motion";
import { Sprout, Sun, LayoutGrid, BatteryCharging, Zap } from "lucide-react";

interface MeasurableImpactSectionProps {
  content?: object;
}

const impacts = [
  { icon: Sprout, value: "2,000+", label: "Saplings Planted", detail: "In our campuses spread across India", color: "#00A758" },
  { icon: Sun, value: "1 MW", label: "Solar Power Capacity", detail: "Clean energy installed across facilities", color: "#284b8c" },
  { icon: LayoutGrid, value: "Multiple", label: "Rooftop solar installations", detail: "Across our manufacturing facilities", color: "#00A758" },
  { icon: BatteryCharging, value: "90%", label: "Renewable Energy Use", detail: "UPS powered efficiency", color: "#284b8c" },
];

export default function MeasurableImpactSection({ content }: MeasurableImpactSectionProps) {
  const {
    stat1Value = "2,000+",
    stat1Label = "Saplings Planted",
    stat1Detail = "In our campuses spread across India",
    stat2Value = "1 MW",
    stat2Label = "Solar Power Capacity",
    stat2Detail = "Clean energy installed across facilities",
    stat3Value = "Multiple",
    stat3Label = "Rooftop solar installations",
    stat3Detail = "Across our manufacturing facilities",
    stat4Value = "90%",
    stat4Label = "Renewable Energy Use",
    stat4Detail = "UPS powered efficiency",
  } = (content as any) || {};

  const impacts = [
    { icon: Sprout, value: stat1Value, label: stat1Label, detail: stat1Detail, color: "#00A758" },
    { icon: Sun, value: stat2Value, label: stat2Label, detail: stat2Detail, color: "#284b8c" },
    { icon: LayoutGrid, value: stat3Value, label: stat3Label, detail: stat3Detail, color: "#00A758" },
    { icon: BatteryCharging, value: stat4Value, label: stat4Label, detail: stat4Detail, color: "#284b8c" },
  ];

  return (
    <section className="py-24 bg-[#f0f7ff] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[#284b8c]/5 blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00A758]/10 text-[#00A758] rounded-[10px] text-xs font-black uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" /> Our Results
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight mb-4">
            Measurable Impact
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our sustainability initiatives are designed to deliver tangible, measurable outcomes that contribute to long-term environmental well-being.
          </p>
        </motion.div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-[10px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-transparent transition-all duration-300 relative overflow-hidden text-center"
            >
              <div
                className="w-16 h-16 rounded-[10px] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: item.color + "14" }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
              <p className="text-4xl font-black tracking-tight mb-1" style={{ color: item.color }}>{item.value}</p>
              <p className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-slate-500 max-w-4xl mx-auto text-base"
        >
          These milestones reflect our consistent efforts to align business growth with environmental responsibility.
        </motion.p>
      </div>
    </section>
  );
}
