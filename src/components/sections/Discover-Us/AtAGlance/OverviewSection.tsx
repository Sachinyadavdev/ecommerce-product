"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface OverviewSectionProps {
  content?: {
    image1?: string;
    visionBadge?: string;
    visionDescription?: string;
    missionBadge?: string;
    missionDescription?: string;
    missionItem1?: string;
    missionItem2?: string;
    missionItem3?: string;
    title?: string;
    description?: string;
  };
}

export default function OverviewSection({ content }: OverviewSectionProps) {
  const {
    image1 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    visionBadge = "Vision",
    visionDescription = "Globally preferred manufacturer driven by passionate people through innovation",
    missionBadge = "Mission",
    missionDescription = "Excellence in Moulding through precision tooling",
    missionItem1 = "Besmak to become a World Class Manufacturing Company with a Global presence.",
    missionItem2 = "Be a Preferred Company by exceeding Customer Satisfaction.",
    missionItem3 = "Maximise Employee Satisfaction by providing a climate for learning and growth.",
    title = "Precision Engineering for the Global Automotive Industry",
    description = "Besmak Components is a leading manufacturer of automotive connection systems, precision plastic components, and engineering solutions.",
  } = content || {};

  const missionPoints = [missionItem1, missionItem2, missionItem3].filter(Boolean) as string[];

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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="w-full py-10 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-6">
        {/* Row 1: Image & Title Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Visual Column */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image1}
                alt="Engineering Excellence"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              {/* Background accent */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-full -z-10 blur-2xl"></div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-[#000] text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-[1.2]">
                {title}
              </h2>
              <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                {description}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Row 2: Vision & Mission Boxes */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vision Box - Quote Style */}
          <motion.div
            className="w-full lg:w-1/2 bg-[#1a4fa0] p-12 rounded-3xl transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 25px 30px -5px rgba(26, 79, 160, 0.4)" }}
          >
            {/* Decorative Quote Marks */}
            <div className="absolute top-10 left-6 opacity-20 transform -scale-x-100">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H16.017C15.4647 19 15.017 19.4477 15.017 20V21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.53528 13 -1.017 12.5523 -1.017 12V9C-1.017 6.79086 0.77385 5 2.983 5H8.017C10.2261 5 12.017 6.79086 12.017 9V15C12.017 17.2091 10.2261 19 8.017 19H5.017C4.46472 19 4.017 19.4477 4.017 20V21H3.017Z" />
              </svg>
            </div>
            <div className="absolute bottom-10 right-6 opacity-20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 6.79086 11.8079 5 14.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 17.2091 21.2261 19 19.017 19H16.017C15.4647 19 15.017 19.4477 15.017 20V21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.53528 13 -1.017 12.5523 -1.017 12V9C-1.017 6.79086 0.77385 5 2.983 5H8.017C10.2261 5 12.017 6.79086 12.017 9V15C12.017 17.2091 10.2261 19 8.017 19H5.017C4.46472 19 4.017 19.4477 4.017 20V21H3.017Z" />
              </svg>
            </div>

            <p className="text-white text-xl md:text-2xl font-medium italic leading-[1.6] mb-8 max-w-[85%]">
              "{visionDescription}"
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center gap-4 w-full max-w-[200px] mb-6">
              <div className="h-[1px] flex-1 bg-white/30" />
              <div className="w-2 h-2 rounded-full border border-white/50" />
              <div className="h-[1px] flex-1 bg-white/30" />
            </div>

            <p className="text-white/90 text-sm md:text-base font-bold tracking-widest uppercase">
              — {visionBadge}
            </p>
          </motion.div>

          {/* Mission Box */}
          <motion.div
            className="w-full lg:w-1/2 bg-[#1a4fa0]/5 p-8 rounded-3xl border border-[#1a4fa0]/10 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(26, 79, 160, 0.1), 0 8px 10px -6px rgba(26, 79, 160, 0.1)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#00B259] text-white text-xs font-black px-4 py-1.5 rounded-[10px] tracking-[0.1em] uppercase shadow-sm">
                {missionBadge}
              </span>
            </div>
            <h2 className="text-gray-900 text-base font-extrabold mb-6">
              {missionDescription}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {missionPoints.map((point, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mt-1 bg-[#00B259]/10 p-1 rounded-lg group-hover:bg-[#00B259] transition-colors duration-300 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#00B259] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-slate-600 text-lg font-medium leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
