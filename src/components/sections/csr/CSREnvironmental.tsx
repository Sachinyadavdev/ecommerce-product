"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, Zap, Droplets, Recycle, Wind, Sun } from "lucide-react";

interface CSREnvironmentalProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    // Stats
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
    // Initiatives
    point1Title?: string;
    point1Desc?: string;
    point2Title?: string;
    point2Desc?: string;
    point3Title?: string;
    point3Desc?: string;
    point4Title?: string;
    point4Desc?: string;
  };
}

export default function CSREnvironmental({ content }: CSREnvironmentalProps) {
  const {
    title = "Environmental Responsibility",
    subtitle = "Our Commitment to a Greener Future",
    description = "At Besmak, we prioritize the environment in every aspect of our operations. From reducing our carbon footprint through renewable energy to implementing sustainable waste management practices, we are dedicated to minimizing our environmental impact.",
    image = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop",
    stat1Value = "40%",
    stat1Label = "Renewable Energy",
    stat2Value = "10k+",
    stat2Label = "Trees Planted",
    stat3Value = "Zero",
    stat3Label = "Waste to Landfill",
    point1Title = "Renewable Energy",
    point1Desc = "We meet 40% of our power requirements through Solar & Wind energy initiatives.",
    point2Title = "Water Conservation",
    point2Desc = "Advanced rainwater harvesting and water recycling systems across our campuses.",
    point3Title = "Waste Management",
    point3Desc = "Systematic waste segregation and recycling programs to achieve zero-waste goals.",
    point4Title = "Green Belt",
    point4Desc = "Ongoing tree plantation drives since 2014 to maintain a lush green ecosystem.",
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-10"
          >
            <div className="space-y-4">
              <motion.span 
                variants={itemVariants}
                className="text-blue-600 font-bold tracking-widest text-sm uppercase"
              >
                {subtitle}
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
              >
                {title}
              </motion.h2>
              <motion.div variants={itemVariants} className="w-20 h-1.5 bg-blue-600 rounded-full" />
            </div>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-600 leading-relaxed font-medium"
            >
              {description}
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { val: stat1Value, lab: stat1Label, icon: <Zap className="w-5 h-5 text-yellow-500" /> },
                { val: stat2Value, lab: stat2Label, icon: <Leaf className="w-5 h-5 text-green-500" /> },
                { val: stat3Value, lab: stat3Label, icon: <Recycle className="w-5 h-5 text-blue-500" /> }
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-2 hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-slate-50 rounded-xl">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-slate-900">{stat.val}</div>
                  <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.lab}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-blue-600/5 rounded-[2.5rem] blur-2xl rotate-3"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={image} 
                alt="Environmental Responsibility" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Initiatives Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: point1Title, desc: point1Desc, icon: <Sun className="w-6 h-6" color="#3B82F6" /> },
            { title: point2Title, desc: point2Desc, icon: <Droplets className="w-6 h-6" color="#3B82F6" /> },
            { title: point3Title, desc: point3Desc, icon: <Recycle className="w-6 h-6" color="#3B82F6" /> },
            { title: point4Title, desc: point4Desc, icon: <Wind className="w-6 h-6" color="#3B82F6" /> }
          ].map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <div className="group-hover:translate-y-[-2px] transition-transform group-hover:text-white">
                  {point.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-4">{point.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
