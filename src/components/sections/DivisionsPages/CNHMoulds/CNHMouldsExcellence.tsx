"use client";

import { motion } from "framer-motion";
import { Settings, RefreshCcw, Rocket } from "lucide-react";

interface CNHMouldsExcellenceProps {
  content?: {
    title1?: string;
    description1?: string;
    title2?: string;
    description2?: string;
    title3?: string;
    description3?: string;
  };
}

export default function CNHMouldsExcellence({ content }: CNHMouldsExcellenceProps) {
  const {
    title1 = "Tooling Excellence",
    description1 = "With a state-of-the-art facility and a strong track record, CNH Moulds enhances our ability to deliver accurate, reliable and high-performance tooling solutions tailored to diverse application needs.",
    title2 = "End-to-End Manufacturing Strength",
    description2 = "By integrating advanced tooling with our manufacturing capabilities, we offer seamless, end-to-end solutions—ensuring consistency, efficiency and superior product quality at every stage.",
    title3 = "Engineering Confidence",
    description3 = "This synergy reinforces Besmak’s commitment to quality, innovation and performance, driving engineering confidence across all our products and processes.",
  } = content || {};

  const expertise = [
    {
      title: title1,
      description: description1,
      icon: Settings,
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: title2,
      description: description2,
      icon: RefreshCcw,
      color: "bg-indigo-600",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      title: title3,
      description: description3,
      icon: Rocket,
      color: "bg-slate-800",
      lightColor: "bg-slate-100",
      textColor: "text-slate-800",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-200 to-transparent opacity-30" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.4 } }}
              className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex flex-col items-start gap-8 group hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 overflow-hidden relative"
            >
              {/* Card Corner Decoration */}
              <div className={`absolute -top-12 -right-12 w-24 h-24 ${item.lightColor} rounded-full transition-transform duration-700 group-hover:scale-[3] opacity-50`} />
              
              <div className={`w-16 h-16 rounded-2xl ${item.lightColor} flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg] relative z-10`}>
                <item.icon className={`w-8 h-8 ${item.textColor}`} />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {item.description}
                </p>
              </div>

              <div className={`h-1.5 w-12 ${item.color} rounded-full transition-all duration-500 group-hover:w-full`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
