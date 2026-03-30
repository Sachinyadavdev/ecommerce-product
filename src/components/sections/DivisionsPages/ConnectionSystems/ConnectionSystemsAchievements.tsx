"use client";

import { motion } from "framer-motion";
import { 
  Award, 
  CheckCircle2, 
  Star, 
  Battery, 
  ShieldCheck, 
  FlaskConical, 
  Box, 
  Heart, 
  Truck,
  Trophy,
  Zap
} from "lucide-react";

interface ConnectionSystemsAchievementsProps {
  content?: {
    title?: string;
    subtitle?: string;
    achievements?: string[];
    image?: string;
  };
}

const getAchievementIcon = (achievement: string) => {
  const a = achievement.toLowerCase();
  if (a.includes('supplier') || a.includes('oem')) return <Truck className="w-6 h-6" />;
  if (a.includes('high-voltage') || a.includes('ev') || a.includes('charging')) return <Battery className="w-6 h-6" />;
  if (a.includes('patent')) return <ShieldCheck className="w-6 h-6" />;
  if (a.includes('nabl') || a.includes('accredited') || a.includes('lab')) return <FlaskConical className="w-6 h-6" />;
  if (a.includes('3d') || a.includes('prototyping') || a.includes('development')) return <Box className="w-6 h-6" />;
  if (a.includes('great place') || a.includes('employee')) return <Heart className="w-6 h-6" />;
  return <Star className="w-6 h-6" />;
};

export default function ConnectionSystemsAchievements({ content }: ConnectionSystemsAchievementsProps) {
  const {
    title = "Technical Milestones",
    subtitle = "Recognized for excellence in precision engineering and high-performance manufacturing standards.",
    achievements = [
      "Preferred supplier for multiple leading automotive OEMs.",
      "Developed high-voltage connectors for EV and charging applications.",
      "Applied patents for innovative connection system products.",
      "NABL-accredited testing lab aligned with global quality standards.",
      "Product design and development capabilities including 3D prototyping.",
      "Recognized as a \"Great Place to Work\" for fostering employee development."
    ],
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/b97621f3-f542-4919-8698-c918ee085f43-R1h0Nf4w9z1Xk6X8yX7rNf4.png"
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section className="py-10 md:py-16 bg-white relative overflow-hidden site-content">
      {/* Light Texture Gradient Background */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40 z-0" 
           style={{ 
             backgroundImage: `
               radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.08) 0%, transparent 50%),
               radial-gradient(circle at 100% 100%, rgba(var(--primary-rgb), 0.05) 0%, transparent 50%),
               url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 60 L0 0 M30 0 L60 30 M0 30 L30 60' stroke='%233b82f6' stroke-width='0.5' fill='none' fill-rule='evenodd' opacity='0.1'/%3E%3C/svg%3E")
             `
           }} 
      />
      {/* Decorative technical elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -translate-x-1/2 opacity-20" />
        <div className="absolute inset-0" 
             style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }} 
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="lg:col-span-7 xl:col-span-6 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" />
                <span className="text-primary font-black tracking-[0.3em] text-xs uppercase bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-[10px] shadow-sm">Global Recognition</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#0A1A3F] mb-8 tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-xl text-[#2B3B5C] font-light leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {achievements.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex flex-col items-start gap-5 p-7 rounded-4xl bg-white border border-blue-50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 group"
                >
                  <div className="p-4 bg-primary/5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner group-hover:shadow-lg group-hover:shadow-primary/30">
                    {getAchievementIcon(item)}
                  </div>
                  <p className="text-lg font-bold text-[#1E293B] leading-snug transition-colors duration-300 group-hover:text-[#0A1A3F]">
                    {item}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-5 xl:col-span-6 order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative"
            >
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                className="relative z-10 rounded-4xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(10,26,63,0.2)] border-12 border-white"
              >
                <img 
                  src={image} 
                  alt="Division Excellence" 
                  className="w-full h-full object-cover aspect-4/5 xl:aspect-square scale-105"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-[#0A1A3F]/60 via-black/0 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-4xl shadow-2xl">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-primary rounded-2xl text-white shadow-xl shadow-primary/40 animate-pulse">
                      <Trophy size={32} />
                    </div>
                    <div>
                      <h4 className="text-white font-extrabold text-2xl tracking-tight">Industry Leader</h4>
                      <p className="text-white/70 text-sm font-medium tracking-wide uppercase">Innovation hub since inception</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -right-12 w-48 h-48 border-32 border-primary/5 rounded-full blur-[2px]" />
              <div className="absolute -bottom-12 -left-12 w-72 h-72 border-48 border-blue-50/50 rounded-full blur-xs" />
              
              {/* Particle Effects */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + "%", 
                    y: Math.random() * 100 + "%" 
                  }}
                  animate={{ 
                    y: ["0%", "-100%"],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: Math.random() * i 
                  }}
                  style={{ left: Math.random() * 100 + "%", top: Math.random() * 100 + "%" }}
                />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
