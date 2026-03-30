"use client";

import { motion } from "framer-motion";
import { Cpu, Settings, Target, Zap } from "lucide-react";

interface EngineeringAboutProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function EngineeringAbout({ content }: EngineeringAboutProps) {
  const {
    title = "About Us",
    description = "At Besmak’s Engineering Products Division, we specialize in delivering precision-engineered plastic components that power India’s growing auto component manufacturing sector. With a focus on high-quality, high-performance solutions, we offer end-to-end manufacturing capabilities to meet the evolving needs of the automotive and industrial markets.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/hero-bg-blueprint.jpg", // Placeholder image
  } = content || {};

  const features = [
    { icon: Target, title: "Precision Range", desc: "Meticulously engineered components for critical applications." },
    { icon: Settings, title: "High Performance", desc: "Built to withstand the toughest industrial environments." },
    { icon: Cpu, title: "Innovative Solutions", desc: "Advanced manufacturing techniques for tomorrow's technology." },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden site-content">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          
          {/* Image & Graphics Content */}
          <motion.div variants={imageVariants} className="relative w-full order-2 lg:order-1 h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
            {/* Outline Decorative Frame */}
            <div className="absolute inset-0 border-2 border-slate-200 rounded-[2.5rem] translate-x-4 translate-y-4 -z-10 bg-white/50" />
            
            <div className="relative w-full h-full rounded-4xl overflow-hidden shadow-2xl bg-white group cursor-pointer">
              {image ? (
                <>
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out" 
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                </>
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
            </div>

            {/* Floating Glass Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" as const }}
              className="absolute -bottom-6 -right-2 md:-right-6 bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-100 z-30 max-w-[260px] md:max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-primary leading-none">Smart</h4>
                  <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Manufacturing</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                Advanced engineering solutions tailored for modern industrial requirements.
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-primary/10 rounded-[10px] mb-6">
              <span className="text-primary font-bold tracking-wider text-xs uppercase">Division Overview</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-primary mb-8 leading-[1.1] tracking-tighter">
              {title}
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6 mb-12">
              {description?.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-lg text-slate-600 leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Features List */}
            <motion.div variants={itemVariants} className="space-y-6 pt-8 border-t border-slate-200">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="w-12 h-12 mt-1 shrink-0 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1 transition-colors">{feature.title}</h4>
                    <p className="text-base text-slate-600 font-light leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
          </div>

        </motion.div>
      </div>
    </section>
  );
}
