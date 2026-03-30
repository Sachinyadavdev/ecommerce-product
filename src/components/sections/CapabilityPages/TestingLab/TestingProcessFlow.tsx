"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cpu, Activity, ShieldCheck } from "lucide-react";

interface ProcessFlowProps {
  content?: {
    image?: string;
  };
}

export default function TestingProcessFlow({ content }: ProcessFlowProps) {
  const {
    image = "/images/testing-process-flow-v2.png",
  } = content || {};

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Pristine HUD Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary via-transparent to-primary" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-full bg-gradient-to-r from-primary via-transparent to-primary" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #0ea5e9 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-primary mx-auto mb-8 transform -rotate-12"
          >
            <Cpu size={28} className="text-emerald-500" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-4">
            Operational Protocol <span className="text-primary italic">Visualised</span>
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-primary to-emerald-500 mx-auto rounded-full" />
        </div>

        <div className="flex justify-center relative">
          {/* Side Technical Metadata - Light Mode */}
          <div className="hidden lg:flex absolute -left-24 top-1/2 -translate-y-1/2 flex-col gap-16 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
            <span className="flex items-center gap-2"> <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> System Integrity: Optimal</span>
            <span>Protocol: I-V2.0.4</span>
          </div>
          <div className="hidden lg:flex absolute -right-24 top-1/2 -translate-y-1/2 flex-col gap-16 text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
            <span className="flex items-center gap-2"> <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Verification: NABL-8092</span>
            <span>Scan Frequency: 120Hz</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-5xl aspect-[16/10] md:aspect-video rounded-[3rem] overflow-hidden bg-white/40 backdrop-blur-3xl border border-white shadow-[0_40px_100px_-30px_rgba(14,165,233,0.15)] group"
          >
            {/* Inner Glass Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-emerald-50/50 pointer-events-none" />
            
            <Image
              src={image}
              alt="Besmak Testing Process Flow"
              fill
              className="object-contain p-8 md:p-20 transition-transform duration-[6s] group-hover:scale-105 group-hover:rotate-1"
            />
            
            {/* Light HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Refined Corner Brackets */}
              <div className="absolute top-12 left-12 w-16 h-16 border-t-[3px] border-l-[3px] border-primary/20 rounded-tl-2xl" />
              <div className="absolute top-12 right-12 w-16 h-16 border-t-[3px] border-r-[3px] border-primary/20 rounded-tr-2xl" />
              <div className="absolute bottom-12 left-12 w-16 h-16 border-b-[3px] border-l-[3px] border-primary/20 rounded-bl-2xl" />
              <div className="absolute bottom-12 right-12 w-16 h-16 border-b-[3px] border-r-[3px] border-primary/20 rounded-br-2xl" />

              {/* Animated Floating Data Point */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/3 left-1/4"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                </div>
              </motion.div>
            </div>

            {/* Bottom Status Panel - Frosted Glass */}
            <div className="absolute bottom-0 left-0 w-full h-20 bg-white/60 backdrop-blur-xl border-t border-white/40 flex items-center justify-between px-12">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Activity className="text-primary w-5 h-5 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Monitoring Active</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500 w-5 h-5" />
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Secure Data Link</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-300">REF: BEM-PX-2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
