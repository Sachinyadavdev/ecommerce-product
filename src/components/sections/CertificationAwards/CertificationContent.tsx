"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface CertificationContentProps {
  content?: {
    header?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    imagePosition?: "left" | "right";
    bgColor?: string;
  };
}

export default function CertificationContent({ content }: CertificationContentProps) {
  const {
    header = "Quality Assurance",
    title = "Delivering Excellence through Rigorous Testing",
    description = "Our manufacturing processes are backed by state-of-the-art testing facilities and a dedicated quality control team. Each product undergoes multiple stages of inspection to ensure it meets our stringent quality standards and client specifications. We believe that quality is not just a goal, but a fundamental part of our DNA.",
    imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    imagePosition = "right",
    bgColor = "bg-slate-50/40",
  } = content || {};

  const isLeft = imagePosition === "left";
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const rotateValue = isLeft ? -1 : 1;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.95, x: isLeft ? -40 : 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] as any,
        delay: 0.3
      },
    },
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-10 md:py-16 ${bgColor} overflow-hidden`}
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-[#294C8D]/2 to-[#294C8D]/5 pointer-events-none" />
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(var(--blue-600) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>
      
      {/* Animated Light Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, -30, 0],
          opacity: [0.05, 0.1, 0.05] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#294C8D]/20 rounded-full blur-[100px] z-0" 
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 60, 0],
          opacity: [0.05, 0.08, 0.05] 
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#294C8D]/15 rounded-full blur-[100px] z-0" 
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className={`flex flex-col lg:flex-row items-start gap-16 lg:gap-24 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div 
                variants={textItemVariants}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-[10px] bg-blue-50/50 border border-blue-100 text-blue-600 font-bold tracking-widest text-sm uppercase mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                {header}
              </motion.div>
              
              <motion.h2 
                variants={textItemVariants}
                className="text-4xl md:text-6xl font-black mb-10 text-slate-900 leading-[1.1] tracking-tight"
              >
                {title}
              </motion.h2>
              
              <motion.div 
                variants={textItemVariants}
                className="relative w-24 h-1.5 bg-blue-500/10 mb-10 rounded-full overflow-hidden"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="absolute inset-0 bg-blue-600 rounded-full"
                />
              </motion.div>

              <motion.div 
                variants={textItemVariants}
                className="space-y-6"
              >
                {description.split('\n').map((para, i) => (
                  <p key={i} className="text-xl text-slate-600 leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Image Component */}
          <div className="w-full lg:w-1/2 flex items-start">
            <div className="relative w-full">
              {/* Image Frame Accents - subtle and hidden behind image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className={`absolute -top-4 -right-4 w-24 h-24 border-2 border-blue-200 rounded-2xl -z-10`} 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className={`absolute -bottom-4 -left-4 w-32 h-32 border-2 border-blue-100 rounded-full -z-10`} 
              />

              <motion.div
                variants={imageContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, rotate: rotateValue * 0.5 }}
                className="relative aspect-video lg:aspect-[1.2/1] w-full rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group cursor-pointer"
              >
                <motion.div style={{ y: imageY }} className="h-[110%] w-full relative">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-linear-to-tr from-blue-900/20 via-transparent to-white/10 opacity-30 group-hover:opacity-40 transition-opacity duration-700" />
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
