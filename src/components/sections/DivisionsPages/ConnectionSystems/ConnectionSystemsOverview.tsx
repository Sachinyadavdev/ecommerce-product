"use client";

import { motion } from "framer-motion";
import { Award, Globe } from "lucide-react";

interface ConnectionSystemsOverviewProps {
  content?: {
    title?: string;
    description?: string;
    image1?: string;
    image2?: string;
    stat1Value?: string;
    stat1Label?: string;
    stat2Value?: string;
    stat2Label?: string;
  };
}

export default function ConnectionSystemsOverview({ content }: ConnectionSystemsOverviewProps) {
  const {
    title = "Technical Overview",
    description = "The Connection Systems Division of Besmak Components Pvt Ltd is a leading manufacturer of precision connectors and engineering components, catering to the rapidly evolving needs of the automotive and industrial sectors. With over three decades of domain expertise, we specialize in delivering high-quality, reliable, and technologically advanced connection systems that meet stringent global standards.\n\nOur division is built on a strong foundation of technical excellence, world-class infrastructure, and an unwavering commitment to customer satisfaction. As a preferred partner to leading OEMs, we support their growth with superior products, scalable manufacturing, and continuous innovation.",
    image1 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/167574675e2d8b125fbaaaf1b9a7dd028a95e6f5.png",
    image2 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/791c828d-1943-424a-a169-ae9f66ae9543-F4v7RjX8T7rNf4w9z1Xk6X8yX7rNf4.png",
    stat1Value = "30+",
    stat1Label = "Years Experience",
    stat2Value = "Global",
    stat2Label = "Standard Quality",
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -2 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden site-content">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Text Content */}
          <motion.div className="order-2 lg:order-1">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-6">
              <span className="text-primary font-bold tracking-wider text-xs uppercase">Vision & Excellence</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              {title}
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              {description.split('\n\n').map((para, idx) => (
                <p key={idx} className="text-lg text-slate-600 leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Premium Stat Cards */}
            <motion.div variants={itemVariants} className="mt-12 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-shadow hover:shadow-md"
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-2xl leading-none mb-1">{stat1Value}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">{stat1Label}</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 transition-shadow hover:shadow-md"
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-2xl leading-none mb-1">{stat2Value}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">{stat2Label}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Grid */}
          <motion.div className="order-1 lg:order-2 relative">
            <div className="relative aspect-4/5 md:aspect-square">
              {/* Primary Image */}
              <motion.div 
                variants={imageVariants}
                whileHover={{ scale: 1.02, y: -5, rotate: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 right-0 w-[85%] h-[85%] rounded-3xl overflow-hidden shadow-2xl z-10 group cursor-pointer"
              >
                <img 
                  src={image1} 
                  alt="Industrial Connectivity Solutions"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Secondary Overlapping Image */}
              <motion.div 
                variants={imageVariants}
                whileHover={{ scale: 1.05, y: -10, rotate: -1 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-20 border-8 border-white group cursor-pointer"
              >
                <img 
                  src={image2} 
                  alt="Precision Engineering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Decorative Accent Ring */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute -top-10 -right-10 w-40 h-40 border-20 border-primary/10 rounded-full -z-10" 
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
