"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface TestingHeroProps {
  content?: {
    title?: string;
    bgImage?: string;
    subtitle?: string;
  };
}

export default function TestingHero({ content }: TestingHeroProps) {
  const subtitle = content?.subtitle || "NABL Accredited | CAB | ILAC MRA Recognised";
  const title = content?.title || "Quality Testing You Can Trust";
  const bgImage = content?.bgImage || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/hero-bg-blueprint.jpg";

  return (
    <div className="w-full h-screen min-h-[calc(100vh-85px)] flex items-center relative overflow-hidden mt-[85px] bg-white">

      {/* Right-side image panel — takes 55% width */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute right-0 top-0 h-full w-[55%] z-0"
      >
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient mask: left fade into white */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
        {/* Subtle top & bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
      </motion.div>

      {/* Decorative grid overlay (left half only) */}
      <div
        className="absolute left-0 top-0 h-full w-[50%] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full border border-primary/10 z-0 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full border border-primary/10 z-0 pointer-events-none" />
      <div className="absolute top-16 left-[42%] w-5 h-5 rounded-full bg-primary/20 z-0 pointer-events-none" />
      <div className="absolute top-1/2 left-[38%] w-3 h-3 rounded-full bg-primary/15 z-0 pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 px-8 mx-auto max-w-7xl">
        <div className="max-w-xl">

          {/* Accreditation Vertical Bar + Subtitle with Perfectly Aligned Attached Light Sheet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-stretch mb-10"
          >
            <div className="w-1 bg-primary" />
            <div className="px-6 py-3 bg-primary/5 backdrop-blur-md rounded-r-xl border border-primary/10 border-l-0 shadow-sm">
              <span className="text-primary text-[10px] font-black tracking-[0.25em] uppercase whitespace-nowrap">
                {subtitle}
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.02] text-primary mb-8"
          >
            {title}
          </motion.h1>

          {/* Divider with label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
              Trusted by OEM Partners Worldwide
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#capabilities"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-white text-sm font-bold tracking-wide shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Capabilities
              <span className="text-base leading-none">→</span>
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-bold tracking-wide hover:border-primary/30 hover:bg-primary/[0.03] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom progress line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent z-20 origin-left"
      />

      {/* Floating vertical label on far right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-8 bottom-10 z-20 flex items-center gap-2 hidden lg:flex"
      >
        <span
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          E&D Laboratory
        </span>
        <div className="w-px h-10 bg-slate-200" />
      </motion.div>
    </div>
  );
}