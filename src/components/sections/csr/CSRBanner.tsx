"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Heart, Users, Sun, Trees } from "lucide-react";

interface CSRBannerProps {
  content?: {
    image?: string;
    video?: string;
    title?: string;
    tagline?: string;
  };
}

export default function CSRBanner({ content }: CSRBannerProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotateBox = useTransform(scrollY, [0, 1000], [12, 180]);

  const {
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CSR-Banner.jpg",
    video = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CSR-Video.mp4",
    title = "CSR",
    tagline = "Making a Difference Through Responsible Growth."
  } = content || {};

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
      className="relative h-[85vh] md:h-[95vh] flex items-center overflow-hidden bg-slate-950 mt-16 md:mt-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={image}
            className="absolute w-full h-full object-cover scale-105 opacity-60"
          >
            <source src={video} type="video/mp4" />
          </video>
        </div>

        {/* Blueprint Overlays & Vignette */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/80 z-10" />
        <div className="absolute inset-0 bg-slate-950/30 z-10 backdrop-contrast-[1.1] backdrop-saturate-[1.1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)] z-10" />

        {/* CAD Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 z-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating CSR Themed Design Elements */}
        {mounted && [
          { Icon: Heart, top: "20%", left: "15%", size: 120, color: "text-red-500/30", delay: 0 },
          { Icon: Users, top: "25%", right: "20%", size: 180, color: "text-blue-500/30", delay: 2 },
          { Icon: Sun, bottom: "30%", left: "25%", size: 150, color: "text-yellow-500/30", delay: 4 },
          { Icon: Trees, bottom: "25%", right: "15%", size: 140, color: "text-green-500/30", delay: 6 },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.1, 1],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: item.delay
            }}
            className={`absolute pointer-events-none hidden md:block z-10 ${item.color}`}
            style={{ 
              top: item.top, 
              bottom: item.bottom, 
              left: item.left, 
              right: item.right 
            }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        {/* Floating Leaves Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {mounted && [...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 600 - 300,
                rotate: 0,
                opacity: 0
              }}
              animate={{
                x: [null, Math.random() * 1000 - 500, Math.random() * 1000 - 500],
                y: [null, Math.random() * 600 - 300, Math.random() * 600 - 300],
                rotate: [0, 180, 360],
                opacity: [0, 0.4, 0.4, 0]
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute text-green-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Leaf size={15 + Math.random() * 25} />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Badge line */}
          <motion.div variants={itemVariants} className="flex items-center gap-6 mb-12">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
              className="h-[2px] bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
            <span className="text-white font-black tracking-[0.5em] text-sm md:text-base uppercase bg-white/5 backdrop-blur-md px-5 py-1.5 rounded-full border border-blue-500/20">
              Corporate Social Responsibility
            </span>
          </motion.div>

          {/* Title with word-by-word animation */}
          <h1 className="text-6xl md:text-[9rem] xl:text-[10rem] font-black text-white mb-10 tracking-tighter leading-[0.85] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] uppercase">
            {title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                className="inline-block mr-6"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-4xl text-blue-50 font-extralight leading-tight mb-16 max-w-2xl drop-shadow-xl opacity-90"
          >
            {tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
