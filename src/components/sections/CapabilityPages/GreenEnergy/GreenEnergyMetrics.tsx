"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Sun, Wind, Factory, TreePine, Users, Zap } from "lucide-react";

interface MetricCard {
  title: string;
  items: string[];
  icon: any;
}

interface GreenEnergyMetricsProps {
  content?: {
    title?: string;
    description?: string;
    cards?: MetricCard[];
    tagline?: string;
  };
}

const defaultCards: MetricCard[] = [
  {
    title: "Green Energy Initiatives",
    icon: Leaf,
    items: ["40% Solar Consumption", "20% Wind Consumption", "Lower Carbon Emissions"]
  },
  {
    title: "Energy Usage (2023–24)",
    icon: Zap,
    items: ["Total usage: 90%", "83% from solar/wind", "7% rooftop solar"]
  },
  {
    title: "Sustainability Impact",
    icon: TreePine,
    items: ["2,000+ plants tracked", "1 sapling per employee/year", "3-year growth monitoring"]
  }
];

export default function GreenEnergyMetrics({ content }: GreenEnergyMetricsProps) {
  const {
    title = "Our Sustainability Impact",
    description = "From solar to wind energy, ESG governance to workplace diversity — here's how Besmak is building a responsible and sustainable future.",
    cards = defaultCards,
    tagline = "Key Initiatives & Data"
  } = content || {};

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-primary" />
            <span className="text-primary font-black tracking-[0.3em] text-xs uppercase">{tagline}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary mb-10 tracking-tighter leading-[1.1]">
            {title}
          </h2>
          <p className="text-xl text-slate-600 font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex flex-col group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-white text-primary rounded-2xl flex items-center justify-center mb-10 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <card.icon size={32} strokeWidth={1.5} />
              </div>
              
              <h4 className="text-2xl font-black mb-6 text-primary transition-colors tracking-tight">
                {card.title}
              </h4>
              
              <ul className="space-y-4">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={18} className="text-primary/40 mt-1 shrink-0" />
                    <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
