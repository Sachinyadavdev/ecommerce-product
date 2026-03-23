"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

interface FoundersMessageProps {
  content?: {
    topTitle?: string;
    mainTitle?: string;
    quote?: string;
    para1?: string;
    para2?: string;
    para3?: string;
    name?: string;
    founderRole?: string;
    imageUrl?: string;
  };
}

export default function FoundersMessage({ content }: FoundersMessageProps) {
  const {
    mainTitle = "About Founder",
    quote = '"From a single-room tool design studio in 1987 to a ₹259 Crore manufacturing powerhouse — our journey is proof that precision, persistence and passion can build world-class institutions."',
    para1 = "A technocrat with rich experience in Product Design & Tool Manufacturing, Mr. C.N. Hari founded Besmak Components Pvt. Ltd. in 1994 with a singular vision: to build an Indian manufacturing company that competes on the global stage through engineering excellence.",
    para2 = "What started as a connector business in 1989 has evolved into a multi-vertical, IATF 16949-certified enterprise — with state-of-the-art facilities across Chennai, Ahmedabad, Pune, and Delhi, producing over 3.2 million precision components each day.",
    para3 = "Under his leadership, Besmak has secured certifications from MARUti MACE (Green Supplier), Hyundai Motor India, and NABL accreditation for our in-house testing laboratory — setting new benchmarks for quality in the automotive supply chain.",
    name = "C.N. Hari",
    founderRole = "Founder Chairman \n Managing Director",
    imageUrl = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CN%20Hari%20-%20Besmak%20Founder%20-%20Image%20%281%29.png",
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  } as const;

  return (
    <section className="bg-slate-50 px-6 md:px-12 lg:px-20 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">

          {/* Left Column - Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[38%] relative pt-1 pr-1 isolate"
          >
            {/* Background Accent Box with Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-[#194c9a] rounded-[2.5rem] -z-10 translate-x-1 -translate-y-1 shadow-[0_20px_50px_rgba(25,76,154,0.3)]"></div>

            <div className="relative aspect-[4/5] rounded-[2.2rem] overflow-hidden bg-slate-900 shadow-2xl group">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Refined Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-[#194c9a] via-[#194c9a]/80 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-white text-3xl font-black tracking-tight mb-2">
                    {name}
                  </h3>
                  <p className="text-blue-200 text-xs font-bold tracking-[0.2em] whitespace-pre-line leading-relaxed">
                    {founderRole}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            className="w-full lg:w-[62%] relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative z-10">
              <motion.div variants={itemVariants} className="mb-10">
                <span className="inline-block text-[#194c9a] text-sm font-black uppercase mb-4 opacity-70">
                  Leadership Insight
                </span>
                <h2 className="text-slate-900 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-12">
                  {mainTitle}
                </h2>
              </motion.div>

              {/* Blockquote with refined styling */}
              <motion.div
                variants={itemVariants}
                className="relative mb-12"
              >
                <div className="absolute -top-10 -left-6 opacity-10 text-[#194c9a]">
                  <Quote size={80} fill="currentColor" className="rotate-180" />
                </div>
                <div className="border-l-4 border-green-500 pl-10">
                  <p className="text-slate-800 text-2xl md:text-3xl italic leading-tight font-medium tracking-tight">
                    {quote}
                  </p>
                </div>
              </motion.div>

              {/* Paragraphs with staggered entrance */}
              <div className="space-y-8">
                {[para1, para2, para3].map((para, i) => (
                  <motion.p
                    key={i}
                    variants={itemVariants}
                    className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium"
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
