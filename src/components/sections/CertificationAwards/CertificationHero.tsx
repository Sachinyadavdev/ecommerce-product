"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Award, ShieldCheck, Trophy, Star, ArrowDown } from "lucide-react";

interface CertificationHeroProps {
  content?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
    overlayColor?: string;
    ctaText?: string;
  };
}

export default function CertificationHero({ content }: CertificationHeroProps) {
  const {
    title = "Certifications & Awards",
    description = "Honoring our commitment to quality and industrial excellence across the global automotive landscape.",
    backgroundImage = "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=2070",
    overlayColor = "bg-slate-950/70",
    ctaText = "Explore Our Excellence",
  } = content || {};

  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for spotlight and tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Position for spotlight (relative to container 0,0)
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  // Smooth springs for mouse values
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothSpotX = useSpring(spotX, springConfig);
  const smoothSpotY = useSpring(spotY, springConfig);

  // Tilt transformation
  const rotateX = useTransform(smoothMouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // For tilt (centered coords)
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
    
    // For spotlight (absolute coords relative to container)
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.08,
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  // Decorative floating icons component
  const FloatingIcon = ({ icon: Icon, delay, initialX, initialY }: any) => (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.2, 0.1], 
        scale: [0, 1, 1],
        y: [initialY, initialY - 60, initialY]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" as const 
      }}
      className="absolute pointer-events-none text-white/20 z-10"
    >
      <Icon size={48} strokeWidth={1} />
    </motion.div>
  );

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-slate-950 mt-16 md:mt-20 perspective-[1000px]"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className={`absolute inset-0 ${overlayColor} backdrop-blur-[1px]`} />
      </motion.div>

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none opacity-40 transition-opacity duration-500 hover:opacity-100"
        style={{
          background: useTransform(
            [smoothSpotX, smoothSpotY],
            ([x, y]: any) => `radial-gradient(circle 450px at ${x}px ${y}px, rgba(59, 130, 246, 0.18), transparent 80%)`
          )
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20 z-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Floating Elements */}
      <FloatingIcon icon={Award} delay={0} initialX="10%" initialY="20%" />
      <FloatingIcon icon={ShieldCheck} delay={2} initialX="85%" initialY="15%" />
      <FloatingIcon icon={Trophy} delay={4} initialX="15%" initialY="75%" />
      <FloatingIcon icon={Star} delay={6} initialX="80%" initialY="65%" />

      <div className="container mx-auto px-4 relative z-20 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            opacity,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="text-center"
        >
          {/* Quality Badge */}
          <motion.div 
            variants={itemVariants}
            style={{ transform: "translateZ(50px)" }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-[10px] bg-white/5 backdrop-blur-xl border border-white/10 mb-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          >
            <ShieldCheck className="text-blue-400 w-5 h-5" />
            <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              Besmak Quality Standard
            </span>
          </motion.div>

          <h1 
            className="text-5xl md:text-8xl lg:text-[9rem] font-black text-white mb-10 tracking-tighter leading-[0.9] drop-shadow-2xl"
            style={{ transform: "translateZ(80px)" }}
          >
            {title.split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-4 -mb-4 mr-4">
                <motion.span 
                  custom={i}
                  variants={wordVariants}
                  className="inline-block origin-bottom"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div 
            variants={itemVariants} 
            className="max-w-2xl mx-auto mb-16"
            style={{ transform: "translateZ(40px)" }}
          >
            <p className="text-lg md:text-2xl text-blue-100 font-light leading-relaxed opacity-80">
              {description}
            </p>
          </motion.div>

          {/* Premium CTA Button */}
          <motion.div variants={itemVariants} style={{ transform: "translateZ(60px)" }}>
            <button 
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              className="group relative inline-flex items-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-[20px] font-bold transition-all duration-500 hover:gap-6 hover:bg-blue-50 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-widest">{ctaText}</span>
              <ArrowDown className="relative z-10 w-5 h-5 transition-transform group-hover:translate-y-1" strokeWidth={3} />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 w-[200%] h-full bg-linear-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
