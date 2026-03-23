"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, CheckCircle2, Factory, ChevronRight } from "lucide-react";

interface Partner {
  name: string;
}

interface EcosystemIntegrationProps {
  content?: {
    title?: string;
    description?: string;
    oems?: Partner[];
  };
}

const DEFAULT_OEMS: Partner[] = [
  { name: "Tata Motors" },
  { name: "Hyundai" },
  { name: "Honda" },
  { name: "Suzuki" },
  { name: "Mahindra" },
  { name: "Toyota" },
  { name: "Ford" }
];

export default function EcosystemIntegration({ content }: EcosystemIntegrationProps) {
  const {
    title = "OEM & Tier-1 Ecosystem Integration",
    description = "Besmak plays a vital role in the automotive supply chain by working closely with Tier-1 wiring harness manufacturers and system integrators, who in turn supply major automotive brands.",
    oems = DEFAULT_OEMS
  } = content || {};

  // Duplicate for marquee effect
  const marqueeOems = [...oems, ...oems, ...oems];

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-[500px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 group cursor-default">
              <div className="p-1 bg-primary rounded-full group-hover:rotate-180 transition-transform duration-500">
                <Factory size={12} className="text-white" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-[0.15em]">Supply Chain Excellence</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              {title}
            </h2>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium max-w-xl">
              {description}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p className="text-slate-700 font-bold">Deep Tier-1 supplier connectivity</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p className="text-slate-700 font-bold">Seamless platform integration</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p className="text-slate-700 font-bold">End-to-end quality assurance</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            <div className="bg-linear-to-br from-[#194c9a] to-[#284b8c] rounded-[48px] p-10 text-white relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(25,76,154,0.3)] border border-white/10">
              {/* Complex background effects */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <ShieldCheck size={32} className="text-blue-200" />
                  </div>
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1e50a0] bg-slate-200 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full bg-slate-400/20" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <h3 className="text-3xl font-black mb-6 leading-tight">Your Strategic <br/>Growth Partner</h3>
                <p className="text-blue-100/90 text-lg leading-relaxed mb-10 font-medium">
                  We empower global automotive brands through technical excellence and seamless integration capabilities.
                </p>
                
                <div className="grid gap-4 mt-auto">
                  {[
                    { label: "Precision Engineering", icon: Globe },
                    { label: "Rapid Scalability", icon: Zap }
                  ].map((item, i) => (
                    <div key={item.label} className="group/item flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover/item:bg-primary transition-colors">
                          <item.icon size={20} className="text-blue-100" />
                        </div>
                        <span className="font-bold text-white tracking-wide">{item.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-blue-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Brand Marquee Section */}
        <div className="relative mt-20 p-8 pt-10 border-t border-slate-100">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-8">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400">Trusted by Global Automotive Leaders</span>
          </div>
          
          <div className="relative overflow-hidden">
             {/* Gradient Fade Edges */}
             <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
             <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />
             
             <div className="flex overflow-hidden group">
                <div className="flex whitespace-nowrap animate-marquee group-hover:pause py-4">
                  {marqueeOems.map((oem, idx) => (
                    <div 
                      key={`${oem.name}-${idx}`}
                      className="inline-flex items-center px-12 py-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
                    >
                      <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">{oem.name}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
