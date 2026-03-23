"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface CNHMouldsTeamProps {
  content?: {
    title?: string;
    description?: string;
    teamSize?: string;
    backgroundImage?: string;
    
    // Flat mapping for Statistics
    stat1Title?: string;
    stat1Value?: string;
    
    stat2Title?: string;
    stat2Value?: string;
  };
}

export default function CNHMouldsTeam({ content }: CNHMouldsTeamProps) {
  const {
    title = "Our Team Strength",
    description = "At CNH Moulds, our 122-member team is the backbone of our success. With experts across operations, design, quality, planning, sales, HR, and vendor development, we work together to deliver excellence.",
    teamSize = "122+",
    backgroundImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
    
    stat1Title = "Efficiency",
    stat1Value = "100% Focused",
    
    stat2Title = "Standards",
    stat2Value = "Top Quality"
  } = content || {};

  return (
    <section 
      className="py-24 md:py-32 bg-slate-950 text-white site-content relative overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Premium Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] z-0" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              className="p-4 bg-primary/20 backdrop-blur-md inline-block rounded-2xl text-primary mb-8 border border-primary/20"
            >
              <Users size={40} strokeWidth={1.5} />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight drop-shadow-lg">
              {title}
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-12 drop-shadow">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-5 group"
              >
                <div className="w-1.5 h-14 bg-slate-700 rounded-full group-hover:bg-primary transition-colors duration-500" />
                <div>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1 group-hover:text-primary-light transition-colors">{stat1Title}</p>
                  <p className="text-2xl font-bold tracking-tight text-white drop-shadow">{stat1Value}</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-5 group"
              >
                <div className="w-1.5 h-14 bg-slate-700 rounded-full group-hover:bg-primary transition-colors duration-500" />
                <div>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1 group-hover:text-primary-light transition-colors">{stat2Title}</p>
                  <p className="text-2xl font-bold tracking-tight text-white drop-shadow">{stat2Value}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-primary blur-[80px] opacity-30 scale-125 rounded-full group-hover:opacity-50 transition-opacity duration-1000" />
              
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-[1.5rem] border-slate-800/80 group-hover:border-primary/30 transition-colors duration-700 flex flex-col items-center justify-center text-center p-8 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
                <span className="text-7xl md:text-8xl lg:text-[9rem] font-black italic text-primary leading-none tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-500">
                  {parseInt(teamSize) ? parseInt(teamSize) : "122"}
                </span>
                <span className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors duration-500">
                  {parseInt(teamSize) ? "Experts" : teamSize}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative floating text */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[12rem] md:text-[18rem] font-black text-white select-none pointer-events-none -ml-16 md:-ml-32 leading-none"
      >
        CNH
      </motion.div>
    </section>
  );
}
