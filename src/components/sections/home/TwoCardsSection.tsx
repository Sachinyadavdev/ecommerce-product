"use client";

import Link from "next/link";
import { ArrowUpRight, HandHeart, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────────── */

interface CardContent {
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

interface TwoCardsSectionProps {
  content?: {
    leftCard?: string; // JSON string of CardContent
    rightCard?: string; // JSON string of CardContent
  };
}

/* ── Default Data ────────────────────────────────────────────── */

const DEFAULT_LEFT: CardContent = {
  title: "CSR Activities",
  description:
    "At Besmak, we believe that true progress goes beyond manufacturing excellence. While we are proud to contribute to the automobile component industry through high-quality connectors, terminals and precision components, we also remain deeply committed to giving back to the community that supports our growth.\n\nWe strongly believe that responsible business is built on compassion, sustainability and shared growth. Through continuous CSR initiatives, Besmak strives to build healthier communities, support those in need and contribute towards a better tomorrow.",
  link: "/csr",
  buttonText: "Read More",
};

const DEFAULT_RIGHT: CardContent = {
  title: "Career Opportunities",
  description:
    "At Besmak, we believe our people are the driving force behind everything we achieve. We are committed to building a workplace where talent is valued, growth is encouraged and every individual has the opportunity to make a meaningful impact.\n\nWhether you are an experienced professional or a passionate fresher ready to begin your journey, Besmak offers a supportive environment that promotes learning, teamwork and long-term career development.\n\nJoin us and be a part of a company where innovation, responsibility and shared success go hand in hand.",
  link: "/careers",
  buttonText: "Join Us",
};

/* ── Component ─────────────────────────────────────────────────── */

export default function TwoCardsSection({ content }: TwoCardsSectionProps) {
  const parseSafe = (data: any, fallback: CardContent): CardContent => {
    if (!data || typeof data !== "string") return fallback;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing card data:", e);
      return fallback;
    }
  };

  const leftData = parseSafe(content?.leftCard, DEFAULT_LEFT);
  const rightData = parseSafe(content?.rightCard, DEFAULT_RIGHT);

  return (
    <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden">
      {/* ── Animated Ambient Textures & Lighting ── */}
      {/* Breathing Color Orbs */}
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-100/40 rounded-full blur-[130px] -z-10 mix-blend-multiply pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-emerald-100/30 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none"
      />

      {/* Animated Flowing Engineering Dot Mesh */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#284b8c 1.5px, transparent 1.5px)`,
          backgroundSize: `40px 40px`,
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ── Left Card (CSR) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#f5f1ea] rounded-[2.5rem] p-10 md:p-14 overflow-hidden flex flex-col h-full shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(40,75,140,0.08)] transition-all duration-700 hover:-translate-y-2 border border-black/5"
          >
            {/* Decorative Blob */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(214,210,210,0.8)_0%,transparent_70%)] blur-2xl group-hover:scale-110 transition-transform duration-1000 ease-out pointer-events-none z-0" />

            {/* Decorative Watermark Icon */}
            <HandHeart
              strokeWidth={0.75}
              className="absolute -bottom-4 -right-2 w-48 h-48 text-[#284b8c] opacity-[0.04] group-hover:opacity-10 group-hover:scale-105 transition-all duration-1000 -rotate-12 pointer-events-none z-0"
            />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-[1.1] mb-8">
                {leftData.title}
              </h2>
              <div className="text-base md:text-lg text-slate-700 leading-relaxed mb-12 flex-grow space-y-5">
                {leftData.description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={leftData.link}
                  className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(40,75,140,0.15)] transition-all duration-500 hover:scale-105 group/btn"
                >
                  <span className="font-bold text-[#284b8c] text-base tracking-tight">
                    {leftData.buttonText}
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#284b8c] text-white group-hover/btn:bg-[#00a758] transition-colors duration-300 shadow-inner">
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-px group-hover/btn:-translate-y-px transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── Right Card (Careers) ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="group relative bg-white rounded-[2.5rem] p-10 md:p-14 overflow-hidden flex flex-col h-full shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(40,75,140,0.08)] transition-all duration-700 hover:-translate-y-2 border border-slate-100"
          >
            {/* Decorative Blob */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(228,237,247,0.9)_0%,transparent_70%)] blur-2xl group-hover:scale-110 transition-transform duration-1000 ease-out pointer-events-none z-0" />

            {/* Decorative Watermark Icon */}
            <Briefcase
              strokeWidth={0.75}
              className="absolute -bottom-4 -right-2 w-48 h-48 text-slate-800 opacity-[0.04] group-hover:text-[#284b8c] group-hover:opacity-10 group-hover:scale-105 transition-all duration-1000 rotate-6 pointer-events-none z-0"
            />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-[1.1] mb-8">
                {rightData.title}
              </h2>
              <div className="text-base md:text-lg text-slate-600 leading-relaxed mb-12 flex-grow space-y-5">
                {rightData.description.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <Link
                  href={rightData.link}
                  className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-3 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_30px_rgba(40,75,140,0.12)] hover:border-[#284b8c]/20 transition-all duration-500 hover:scale-105 group/btn"
                >
                  <span className="font-bold text-[#284b8c] text-base tracking-tight">
                    {rightData.buttonText}
                  </span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#284b8c] text-white group-hover/btn:bg-[#00a758] transition-colors duration-300 shadow-inner">
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-px group-hover/btn:-translate-y-px transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
