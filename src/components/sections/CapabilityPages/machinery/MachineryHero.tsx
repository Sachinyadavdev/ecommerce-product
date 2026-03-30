"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Settings } from "lucide-react";
import Link from "next/link";

interface MachineryHeroProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function MachineryHero({ content }: MachineryHeroProps) {
  const {
    title = "Machinery & Equipments",
    subtitle = "Advanced Manufacturing Infrastructure",
    description = "State-of-the-art facilities for high precision injection moulding, stamping and plating.",
    backgroundImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/machinery-equipments%20banner%20img.png",
    backgroundVideo,
    ctaText = "Explore Infrastructure",
    ctaLink = "#machinery-details"
  } = content || {};

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateGear = useTransform(scrollY, [0, 1000], [0, 360]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] md:h-screen flex items-center overflow-hidden bg-white mt-14 md:mt-20 py-20 md:py-0"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-full h-full object-cover opacity-40"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        ) : (
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 scale-110"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" as const }}
          >
            <Image
              src={backgroundImage}
              alt={title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Premium Light Overlay - Matching LSRHero */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />

        {/* Global Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Floating Icon - Unique to Machinery */}
        <motion.div
          style={{ rotate: rotateGear }}
          className="absolute top-1/4 right-1/4 opacity-[0.03] pointer-events-none hidden md:block z-10"
        >
          <Settings size={500} strokeWidth={0.5} className="text-[var(--primary)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.3em] text-[var(--primary)] uppercase border-l-4 border-[var(--primary)] bg-[var(--primary)]/5">
              {subtitle}
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-[var(--primary)] mb-8 md:mb-10 tracking-tighter leading-[0.95] md:leading-[0.85] drop-shadow-sm">
            {(title || "").split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-3 md:mr-6"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-3xl text-slate-600 font-extralight leading-tight mb-10 md:mb-16 max-w-2xl border-l-2 border-[var(--primary)]/20 pl-4 md:pl-6"
          >
            {description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-5"
          >
            <Link href={ctaLink}>
              <button className="group relative flex items-center bg-[var(--primary)] text-white px-8 md:px-10 py-4 md:py-5 rounded-md font-black transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(40,75,140,0.5)] active:scale-95 overflow-hidden">
                <span className="relative z-10 text-base md:text-lg uppercase tracking-widest">{ctaText}</span>
                <span className="ml-3 md:ml-4 transition-transform duration-500 group-hover:translate-x-2 relative z-10">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                </span>
                {/* Subtle Shimmer */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--primary)] to-transparent z-30"
      />
    </section>
  );
}

