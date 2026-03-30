"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Wind, Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface SMWindEnergySectionProps {
  content?: {
    title?: string;
    description?: string;
    impact?: string;
    pledgeTitle?: string;
    pledgeSubtitle?: string;
    image1?: string;
    image2?: string;
    image3?: string;
  };
}

export default function SMWindEnergySection({ content }: SMWindEnergySectionProps) {
  const {
    title = "A Broader Clean Energy Mix",
    description = "We’re also sourcing clean energy through Power Purchase Agreements with Wind Energy producers.",
    impact = "Less fossil fuel. More forward momentum.",
    pledgeTitle = "Green Today, Greener Tomorrow",
    pledgeSubtitle = "Pledge for the planet",
    image1 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/wind-farm-1.png",
    image2 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/solar-panel-3.png",
    image3 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/tree-plantation-2.png"
  } = content || {};

  const images = [image1, image2, image3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="wind-energy-section" className="py-24 bg-[#284b8c] relative overflow-hidden text-white group/section">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-[#00A758]/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Energy Mix Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pt-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-[10px] bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                <Wind className="w-6 h-6 text-[#00A758]" />
              </div>
              <span className="text-white/70 font-black tracking-[0.3em] text-xs uppercase">Clean Strategy</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              {title}
            </h2>

            <p className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed mb-10">
              {description}
            </p>

            <div className="p-8 bg-white/5 rounded-[10px] border border-white/10 backdrop-blur-sm">
              <p className="text-2xl lg:text-3xl font-black text-[#00A758] leading-tight">
                {impact}
              </p>
            </div>
          </motion.div>

          {/* Right Side: Pledge & Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="relative p-8 bg-white/5 rounded-[10px] border border-white/10 backdrop-blur-sm transition-transform hover:scale-[1.02] duration-500">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-6 h-6 text-[#00A758] fill-current" />
                <span className="text-[#00A758] font-black tracking-[0.2em] text-xs uppercase">{pledgeSubtitle}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                {pledgeTitle}
              </h3>
            </div>

            {/* Premium Panoramic Slideshow - Seamless Crossfade */}
            <div className="relative aspect-[21/9] w-full rounded-[10px] overflow-hidden shadow-2xl border-4 border-white group/slideshow bg-slate-100">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ 
                    opacity: i === current ? 1 : 0,
                    scale: i === current ? 1 : 1.05
                  }}
                  transition={{ 
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 2, ease: "easeOut" }
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt={`Pledge visual ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover/slideshow:bg-black/5 transition-colors duration-500" />
                </motion.div>
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-[10px] transition-all duration-300 ${
                      i === current ? "w-10 bg-[#00A758]" : "w-2 bg-white/40 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] text-center">
              Our Vision in Action • Besmak Sustainability
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
