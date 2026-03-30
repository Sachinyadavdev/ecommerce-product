"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Cable,
  Zap,
  Layers,
  Box,
  Hammer,
  TrendingUp,
  Network,
  Award,
  ShieldCheck,
  Users,
  FileText,
  Truck,
  Settings,
  Trophy,
  Activity,
  Handshake,
  Workflow
} from "lucide-react";

interface CompanyOverviewProps {
  content?: {
    topTitle?: string;
    title?: string;
    mainTitle?: string;
    componentsSubtitle?: string;
    component1?: string;
    component2?: string;
    component3?: string;
    component4?: string;
    component5?: string;
    component6?: string;
    strengthsTopTitle?: string;
    strengthsMainTitle?: string;
    strength1?: string;
    strength2?: string;
    strength3?: string;
    strength4?: string;
    strength5?: string;
    strength6?: string;
    strength7?: string;
    strength8?: string;
    overviewImage?: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
    stat3Value?: string;
    stat3Label?: string;
  };
}

export default function CompanyOverview({ content }: CompanyOverviewProps) {
  const {
    topTitle = "BESMAK India",
    title: contentTitle,
    mainTitle: contentMainTitle,
    componentsSubtitle = "Expert in Manufacturing Wide Range of Components:",
    component1 = "Automobile Connection System",
    component2 = "Terminals",
    component3 = "Wiring Harness Components",
    component4 = "High Precision Plastic Components",
    component5 = "Injection Moulds",
    component6 = "High Speed Stamping Tools",
    strengthsTopTitle = "Excellence Driven",
    strengthsMainTitle = "Key Strengths of Besmak",
    strength1 = "100% revenue is from Automobile Industry",
    strength2 = "Strong Presence in the Wiring harnesses supply chain",
    strength3 = "BESMAK is a preferred source for OEMs for indigenisation and development",
    strength4 = "QMS is certified in accordance with IATF16949 in 2016",
    strength5 = "Total Number of Employees — 460",
    strength6 = "One part under Patent application",
    strength7 = "We prioritise delivery, flexibility and customer satisfaction in all our services",
    strength8 = "We focus on new product development, ensuring quality while maintaining cost efficiency",
    overviewImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    stat1Value = "30+",
    stat1Label = "YEARS OF EXCELLENCE",
    stat2Value = "460",
    stat2Label = "EMPLOYEES",
    stat3Value = "3.2M",
    stat3Label = "PARTS PER DAY",
  } = content || {};

  const mainTitle = contentTitle || contentMainTitle || "Company Overview";

  const componentIcons = [Car, Cable, Zap, Layers, Box, Hammer];
  const strengthIcons = [TrendingUp, Cable, Handshake, ShieldCheck, Users, FileText, Truck, Settings];

  const componentsList = [
    component1, component2, component3, component4, component5, component6,
  ].filter(Boolean).map((item, idx) => ({
    text: item,
    Icon: componentIcons[idx] || Box
  }));

  const strengthsList = [
    strength1, strength2, strength3, strength4, strength5, strength6, strength7, strength8,
  ].filter(Boolean).map((item, idx) => ({
    text: item,
    Icon: strengthIcons[idx] || Award
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  return (
    <section className="bg-slate-50 py-10 md:py-16 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -z-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-[80px] -z-10 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-6">
        {/* Row 1: Company Overview & Image */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={containerVariants}
            className="w-full lg:w-[55%]"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span className="text-[#1a4fa0] text-sm font-black uppercase tracking-widest mb-4 block">
                {topTitle}
              </span>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold font-black mb-6 tracking-tight leading-tight">
                {mainTitle}
              </h2>
              <div className="w-20 h-1.5 bg-[#1a4fa0] rounded-full mb-8" />
              <p className="text-slate-600 text-lg  tracking-widest mb-8 border-l-4 border-emerald-500 pl-4">
                {componentsSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {componentsList.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group relative flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-[#1a4fa0] hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 text-[#1a4fa0] group-hover:bg-[#1a4fa0] group-hover:text-white transition-colors duration-300 shrink-0">
                    <item.Icon className="w-6 h-6" />
                  </div>
                  <span className="text-slate-600  text-lg  transition-colors">
                    {item.text}
                  </span>

                  {/* Animated Bottom Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-[#1a4fa0]"
                    initial={{ width: 0 }}
                    variants={{
                      hover: { width: "100%" }
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* New Vertical Image */}
          <motion.div
            className="w-full lg:w-[45%] h-full min-h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={overviewImage}
                alt="Manufacturing Excellence"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c234a]/40 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Row 2: Key Strengths (Full Width) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="w-full mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="text-emerald-600 text-sm font-black uppercase tracking-widest mb-4 block">
              {strengthsTopTitle}
            </span>
            <h2 className="text-gray-900 text-4xl md:text-5xl font-extrabold font-black mb-6 tracking-tight">
              {strengthsMainTitle}
            </h2>
            <div className="w-20 h-1.5 bg-[#00B259] rounded-full mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengthsList.map((strength, idx) => (
              <motion.div
                key={idx}
                variants={{
                  ...itemVariants,
                  hover: { y: -10, scale: 1.02 }
                }}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="relative overflow-hidden flex flex-col gap-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 group hover:bg-gradient-to-r hover:from-white hover:to-emerald-100"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <strength.Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-gray-600 text-base text-lg leading-relaxed ">
                  {strength.text}
                </p>

                {/* Background Decoration */}
                <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-300">
                  <strength.Icon className="w-24 h-24" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Row 3: Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-slate-100"
        >
          {/* Stat 1 */}
          <div className="group relative flex-1 py-12 px-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="absolute top-4 left-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Trophy className="w-16 h-16 text-[#1a4fa0]" />
            </div>
            <span className="text-[#1a4fa0] text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              {stat1Value}
            </span>
            <span className="text-slate-500 text-lg font-black tracking-widest uppercase px-4 py-1.5 bg-slate-100 rounded-full">
              {stat1Label}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="group relative flex-1 py-12 px-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="absolute top-4 left-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users className="w-16 h-16 text-emerald-600" />
            </div>
            <span className="text-emerald-600 text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              {stat2Value}
            </span>
            <span className="text-emerald-700/60 text-lg font-black tracking-widest uppercase px-4 py-1.5 bg-emerald-50 rounded-full">
              {stat2Label}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="group relative flex-1 py-12 px-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
            <div className="absolute top-4 left-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp className="w-16 h-16 text-[#0c234a]" />
            </div>
            <span className="text-[#0c234a] text-5xl md:text-6xl font-black mb-4 tracking-tighter">
              {stat3Value}
            </span>
            <span className="text-slate-500 text-lg font-black tracking-widest uppercase px-4 py-1.5 bg-slate-100 rounded-full">
              {stat3Label}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
