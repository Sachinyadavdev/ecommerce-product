"use client";

import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck, Gauge, Zap } from "lucide-react";

const testCategories = [
  {
    title: "Mechanical Test",
    color: "bg-gradient-to-r from-cyan-600 to-cyan-800",
    shadow: "shadow-cyan-100",
    icon: <ShieldCheck className="w-6 h-6" />,
    items: [
      "Inserting force of terminal unit",
      "Inserting force of housing unit",
      "Holding force of housing unit",
      "Inserting and separating force of connector",
      "Inserting force of terminal and housing",
      "Holding force of terminal",
      "Holding force of connector",
      "Reverse insertion of connector",
      "Reverse insertion of terminal",
      "Unlocking force",
      "Strength for crimped connection",
      "Sealing performance (WPC Only)",
      "Dual Locking Mechanism",
      "Fitting & separating force of retainer & rear holder",
      "Inserting & Holding force at connector fixing area",
    ],
  },
  {
    title: "Durability Test",
    color: "bg-gradient-to-r from-primary to-primary",
    shadow: "shadow-primary",
    icon: <Gauge className="w-6 h-6" />,
    items: [
      "High temperature exposure",
      "Low temperature Exposure",
      "Thermal shock",
      "Humidity Resistance",
      "Current cycle",
      "Inserting & separating durability",
      "Prying durability",
      "Salt Spray",
      "Water Resistance",
      "Oil Resistance",
      "Chemical Resistance",
      "High Water Pressure Test",
      "Dewing",
      "Rain Spray Test",
      "IP X9K Test",
    ],
  },
  {
    title: "Electrical Test",
    color: "bg-gradient-to-r from-teal-500 to-teal-700",
    shadow: "shadow-teal-100",
    icon: <Zap className="w-6 h-6" />,
    items: [
      "Insulation resistance",
      "Withstand Voltage",
      "Voltage Drop",
      "Low Voltage and Low Current",
      "Resistance",
      "Temperature Rise",
      "Leak Current",
    ],
  },
];

export default function TestingTypesDetail() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-50 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Specialized <span className="text-primary">Testing Parameters</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Comprehensive validation protocols ensuring unparalleled quality and reliability for every component we manufacture.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group flex flex-col h-full"
            >
              {/* Category Header */}
              <div className={`${category.color} ${category.shadow} p-6 rounded-t-3xl shadow-lg relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative flex items-center gap-4 text-white">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* List Content */}
              <div className="flex-1 bg-white border-x border-b border-slate-100 p-8 rounded-b-3xl shadow-sm group-hover:shadow-xl transition-all duration-500">
                <ul className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + itemIdx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-700 font-medium leading-snug group-hover/item:text-primary transition-colors duration-300">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
