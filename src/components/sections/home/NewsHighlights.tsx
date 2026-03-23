"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- React Bits Custom Animations --- //
const BlurText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08 } },
        hidden: {},
      }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { filter: "blur(12px)", opacity: 0, scale: 0.9 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ShinyText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <motion.span
      className={`inline-block text-transparent bg-clip-text bg-[linear-gradient(110deg,#4ade80,45%,#ffffff,55%,#4ade80)] bg-size-[250%_100%] ${className}`}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    >
      {text}
    </motion.span>
  );
};
// ------------------------------------- //

export interface NewsItem {
  title: string;
  description?: string;
  link: string;
}

interface NewsHighlightsProps {
  title: string;
  newsItems: NewsItem[];
  featuredBoxText: string;
  backgroundImage?: string;
}

export default function NewsHighlights({ title, newsItems, featuredBoxText, backgroundImage }: NewsHighlightsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full rounded-[3rem] bg-linear-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a] py-10 px-8 md:py-16 md:px-12 text-white relative overflow-hidden shadow-[0_20px_50px_rgba(23,37,84,0.3)] ring-1 ring-white/10"
    >
      {/* Parallax Background Image */}
      {backgroundImage && (
        <motion.div style={{ y }} className="absolute inset-0 w-[110%] h-[130%] -top-[15%] -left-[5%] pointer-events-none z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-100"
            sizes="100vw"
            priority
          />
        </motion.div>
      )}

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/50 via-[#0f172a]/15 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-center lg:items-start justify-between">
        
        {/* Title Area */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3)]"
          >
            <Sparkles className="w-4 h-4 text-[#00a758] animate-pulse" />
            <ShinyText
              text="Besmak Excellence"
              className="text-xs font-bold tracking-[0.2em] uppercase"
            />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-black tracking-tight drop-shadow-md">
            <BlurText text={title} className="text-white" />
          </h2>

          {/* Featured Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 lg:mt-12 bg-white/5 backdrop-blur-3xl p-5 md:p-6 rounded-4xl border border-white/20 relative shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-[#00a758]/10 hover:border-[#00a758]/30 transition-colors duration-500 text-left"
          >
            <div className="absolute top-0 left-8 w-12 h-[3px] bg-linear-to-r from-[#00a758] to-emerald-300 rounded-b-md" />
            <p className="text-[15px] md:text-[17px] font-medium leading-relaxed text-white">
              {featuredBoxText}
            </p>
          </motion.div>
        </div>

        {/* News Items Grid */}
        <div className="lg:w-2/3 w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
              hidden: {},
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-3"
          >
            {newsItems.map((item, index) => (
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { type: "spring", stiffness: 60, damping: 15 },
                  },
                }}
                key={index}
                href={item.link}
                className="group flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 lg:p-6 hover:bg-white/10 hover:border-[#00a758]/50 transition-all duration-500 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md bg-linear-to-br from-white/30 to-white/5 border border-white/30 flex items-center justify-center mb-6 group-hover:bg-[#00a758] group-hover:border-[#00a758] transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden relative">
                  {/* Glossy inner reflection */}
                  <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />
                  <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-[20px] md:text-[22px] font-bold leading-tight text-white group-hover:text-[#00a758] transition-colors tracking-tight mb-3">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-[15px] text-white/90 leading-relaxed font-medium group-hover:text-white transition-colors flex-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
