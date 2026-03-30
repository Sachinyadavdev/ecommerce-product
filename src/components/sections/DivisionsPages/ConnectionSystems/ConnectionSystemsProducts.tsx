"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  CheckCircle2, 
  Factory, 
  Zap, 
  Cpu, 
  Layers, 
  Unplug, 
  Radio, 
  Power,
  Box,
  Cable
} from "lucide-react";

interface ConnectionSystemsProductsProps {
  content?: {
    title?: string;
    products?: string[];
    segmentsTitle?: string;
    segments?: string;
    backgroundImage?: string;
  };
}

const getProductIcon = (product: string) => {
  const p = product.toLowerCase();
  if (p.includes('sealed')) return <Unplug className="w-6 h-6" />;
  if (p.includes('smt')) return <Cpu className="w-6 h-6" />;
  if (p.includes('headers')) return <Layers className="w-6 h-6" />;
  if (p.includes('terminals')) return <Box className="w-6 h-6" />;
  if (p.includes('relay')) return <Power className="w-6 h-6" />;
  if (p.includes('hybrid')) return <Radio className="w-6 h-6" />;
  return <Zap className="w-6 h-6" />;
};

export default function ConnectionSystemsProducts({ content }: ConnectionSystemsProductsProps) {
  const {
    title = "Advanced Product Portfolio",
    products = [
      "Sealed and Unsealed Connectors",
      "SMT Connectors",
      "Headers and Wire Seals",
      "Terminals, Clips, Caps, and Cable Tags",
      "Hybrid and Relay Connectors"
    ],
    segmentsTitle = "End-Use Segments",
    segments = "Our products cater to leading automotive OEMs across 2-wheeler, 4-wheeler, and electric vehicle (EV) segments such as Hero, Suzuki, Royal Enfield, TVS, Bajaj, Honda, Tata, Hyundai, Kia, Ola, Ather, and more.",
  } = content || {};

  const defaultBg = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/167574675e2d8b125fbaaaf1b9a7dd028a95e6f5.png";
  const backgroundImage = content?.backgroundImage || defaultBg;

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-16 relative overflow-hidden site-content">
      {/* Background Image Layer */}
      {backgroundImage && (
        <motion.div 
          style={{ y }}
          className="absolute inset-x-0 -top-[20%] h-[140%] z-0"
        >
          <img 
            src={backgroundImage} 
            alt="Product Background" 
            className="w-full h-full object-cover opacity-[0.5]"
          />
          <div className="absolute inset-0 bg-white/5" />
        </motion.div>
      )}

      {/* Connector Animation Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 opacity-40">
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-100" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Connector Socket */}
          <motion.rect 
            x="350" y="150" width="100" height="100" rx="10" 
            stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4"
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          {/* Moving Connection Lines */}
          <motion.path 
            d="M50 200 H350" 
            stroke="url(#lineGradientLight)" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.path 
            d="M750 200 H450" 
            stroke="url(#lineGradientLight)" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
          />
          {/* Pulse Effect at target */}
          <motion.circle 
            cx="400" cy="200" r="5" fill="var(--primary)"
            animate={{ scale: [1, 4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="lineGradientLight" x1="50" y1="200" x2="350" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Digital Bits */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: 7 + Math.random() * 7, 
              repeat: Infinity, 
              delay: Math.random() * i 
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Product Range Section */}
          <div className="lg:col-span-12 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-primary rounded-full shadow-[0_0_12px_var(--primary)]" />
                <span className="text-primary font-black tracking-[0.3em] text-xs uppercase bg-white/80 backdrop-blur-sm px-3 py-1 rounded-[10px] shadow-sm">Innovative Engineering</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black whitespace-pre-line tracking-tight leading-tight mb-8">
                {title}
              </h2>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {products.map((product: string, idx: number) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-slate-100 shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-primary/15 hover:border-primary/30"
                >
                  <div className="shrink-0 w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:shadow-primary/30">
                    {getProductIcon(product)}
                  </div>
                  <span className="text-xl font-bold text-slate-800 leading-snug group-hover:text-slate-900 transition-colors">
                    {product}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* End-Use Segments Section */}
          <div className="lg:col-span-12 xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative p-10 md:p-14 rounded-[3rem] bg-linear-to-br from-[#284B8C] to-[#1A325E] shadow-2xl overflow-hidden group border border-white/10"
            >
              {/* Animated Glow */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/25 rounded-full blur-[100px] transition-all duration-1000 group-hover:bg-primary/35" />
              
              <div className="relative z-10">
                <div className="p-4 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl inline-flex items-center justify-center text-white mb-8 shadow-lg">
                   <Factory size={36} />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  {segmentsTitle}
                </h3>
                
                <div className="space-y-8">
                  <p className="text-xl text-blue-100/80 leading-relaxed font-light">
                    {segments}
                  </p>
                  
                  <div className="pt-8 border-t border-white/10 flex flex-wrap gap-4">
                    {['2-Wheelers', '4-Wheelers', 'EV Segments', 'Industrial'].map((tag, i) => (
                      <motion.span 
                        key={i} 
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.25)', borderColor: 'rgba(255,255,255,0.4)' }}
                        className="px-6 py-2.5 rounded-xl bg-white/15 border border-white/20 text-xs font-black text-white tracking-widest uppercase transition-all cursor-default shadow-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
