"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

interface CNHMouldsIntroProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    videoUrl?: string;
  };
}

export default function CNHMouldsIntro({ content }: CNHMouldsIntroProps) {
  console.log("[CNHMouldsIntro] Component mounted", content);
  const {
    title = "Precision Begins at the Mould",
    subtitle = "At Besmak, precision starts at the very foundation—the mould.",
    description = "CNH Moulds Private Limited, our dedicated tooling division, brings deep expertise in high-precision tooling, enabling us to support everything from intricate connectors to complex over-moulded components.",
    videoUrl = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Dedicated%20tooling%20division-CNH-Moulds-Divisions.mp4",
  } = content || {};

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center overflow-hidden py-24 bg-white"
    >
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="h-px w-12 bg-blue-600" />
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                Tooling Division
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1]"
            >
              {title}
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-blue-700 italic">
                {subtitle}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                {description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4">
              <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Watch the Process</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Dedicated Tooling Division</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Video Container */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
              {/* Animated glass frame overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none border border-white/20 rounded-2xl" />
              
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Unique technical overlay info */}
              <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-white/80 font-mono tracking-tighter uppercase">Live System Status: Precision Mode</span>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-slate-100 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
