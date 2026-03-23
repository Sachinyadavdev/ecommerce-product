"use client";

import { motion } from "framer-motion";

interface CoreTeamOverviewProps {
  content?: {
    tagline?: string;
    title?: string;
    description?: string;
    section1Title?: string;
    section1Desc?: string;
    section2Title?: string;
    section2Desc?: string;
    bgImage?: string;
  };
}

export default function CoreTeamOverview({ content }: CoreTeamOverviewProps) {
  const {
    tagline = "Our Core Team",
    title = "The Minds Behind Our Engineering Excellence",
    description = "At Besmak Components Pvt. Ltd., our strength lies in the expertise, vision, and dedication of our core team. Built on a foundation of technocrats and industry professionals, our leadership brings together decades of experience in automotive component manufacturing, tool design, and precision engineering.\n\nFrom strategy to execution, our team plays a critical role in driving innovation, ensuring operational excellence, and delivering consistent value to our customers.",
    section1Title = "Leadership with Vision and Experience",
    section1Desc = "Founded by industry experts with deep knowledge in injection mould design and manufacturing, Besmak has grown under strong leadership that emphasizes customer relationships, technical excellence, and long-term growth.\n\nOur leaders continue to guide the organization with a forward-thinking approach, adapting to evolving automotive trends including electric vehicle components and advanced connectivity solutions.",
    section2Title = "Committed to Quality and Customer Success",
    section2Desc = "Driven by a shared commitment to quality, our leadership ensures that every project is executed with precision—from concept to delivery.\n\nBy working closely with customers and partners, the core team ensures seamless project execution, reliable supply, and solutions tailored to evolving industry needs.",
    bgImage = "",
  } = content || {};

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[80vh] bg-linear-to-b from-primary/5 via-primary/5 to-transparent -z-10" />
      <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] -z-10 opacity-70" />
      <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] -z-10 opacity-60" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-5xl mb-20 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
              {tagline}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1] max-w-4xl"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="text-base md:text-lg text-slate-600 mb-12 leading-relaxed whitespace-pre-line max-w-4xl"
          >
            {description}
          </motion.div>
        </div>

        {/* Info Blocks */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mt-8 w-full relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.3 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-slate-100 border-t-[5px] border-t-primary relative group overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 transform origin-center pointer-events-none z-0">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-primary" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2zm0 3.5l7.5 14.5h-15L12 5.5z"/>
              </svg>
            </div>
            
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <h3 className="text-[22px] md:text-2xl font-bold text-primary mb-6 leading-snug group-hover:translate-x-2 transition-transform duration-500 ease-out">
                {section1Title}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed whitespace-pre-line group-hover:text-slate-800 transition-colors duration-500">
                {section1Desc}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              bounce: 0.3,
            }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] relative group overflow-hidden hover:-translate-y-2 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out border border-slate-100"
          >
            {/* Background Image with animated Overlay */}
            {bgImage && (
              <>
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                {/* Light overlay to ensure text readability */}
                <div className="absolute inset-0 bg-white/90 group-hover:bg-white/80 backdrop-blur-[2px] transition-colors duration-500 z-0" />
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            )}

            {/* Dynamic Texture Elements */}
            {!bgImage && (
              <>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none z-0" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-700 pointer-events-none z-0" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px] z-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
              </>
            )}

            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <h3 className="text-[22px] md:text-2xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-primary transition-colors duration-500 group-hover:-translate-x-2">
                {section2Title}
              </h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed whitespace-pre-line group-hover:text-slate-800 transition-colors duration-500">
                {section2Desc}
              </p>
            </div>
            
            {/* Animated Bottom Border */}
            <div className="absolute bottom-0 left-0 h-[5px] bg-linear-to-r from-primary to-blue-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
