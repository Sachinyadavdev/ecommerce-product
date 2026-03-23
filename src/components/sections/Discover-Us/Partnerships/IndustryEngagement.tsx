"use client";

import { motion } from "framer-motion";

interface EngagementItem {
  title: string;
  icon: string;
}

interface IndustryEngagementProps {
  content?: {
    title?: string;
    items?: EngagementItem[];
  };
}

const DEFAULT_ITEMS: EngagementItem[] = [
  { title: "Automotive component ecosystems", icon: "🏢" },
  { title: "Industry exhibitions and technical forums", icon: "🌐" },
  { title: "Technology and innovation networks", icon: "💡" }
];

export default function IndustryEngagement({ content }: IndustryEngagementProps) {
  const {
    title = "Industry Associations & Engagement",
    items = DEFAULT_ITEMS
  } = content || {};

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Besmak actively participates in industry platforms and collaborates with leading associations to stay aligned with emerging trends and standards.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-10 bg-slate-50 rounded-[32px] hover:bg-primary transition-all duration-500 border border-slate-100 flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                {item.title}
              </h3>
              <div className="mt-6 w-12 h-1 bg-primary/20 group-hover:bg-white/30 rounded-full transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 p-10 bg-primary/5 rounded-[32px] border border-primary/10 text-center">
          <p className="text-slate-700 font-medium text-lg italic">
            "These associations help us stay aligned with emerging trends, standards, and future mobility solutions."
          </p>
        </div>
      </div>
    </section>
  );
}
