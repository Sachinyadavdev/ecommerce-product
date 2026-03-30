"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { TreePine, Users, Heart, Leaf, Sprout } from "lucide-react";
import { useState, useEffect } from "react";

interface GreenCultureSectionProps {
  content?: { image1?: string; image2?: string; image3?: string };
}

export default function GreenCultureSection({ content }: GreenCultureSectionProps) {
  const {
    image1 = "/images/engineering_infrastructure_premium.png",
    image2 = "/images/sustainability_commitment.png",
    image3 = "/images/engineering_infrastructure_premium.png",
  } = content || {};

  const images = [image1, image2, image3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] rounded-full bg-[#00A758]/6 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-[#284b8c]/5 text-[#284b8c] rounded-[10px] text-xs font-black uppercase tracking-[0.5em] mb-4 border border-[#284b8c]/10">
              <Sprout size={14} className="text-[#00A758]" /> Environment First
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight">
              Fostering a Sustainable Mindset
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5">
              Sustainability at Besmak is not limited to infrastructure — it is deeply embedded in our organisational culture.
            </p>
            <p className="text-slate-600 leading-relaxed mb-5">
              We actively engage employees in environmental initiatives, encouraging them to adopt sustainable practices both at work and in their daily lives. Over{" "}
              <strong className="text-[#00A758] font-black">2,000 saplings have been distributed</strong>{" "}
              to employees as part of our ongoing efforts to promote green habits and environmental awareness.
            </p>
            <p className="text-slate-600 leading-relaxed mb-10">
              This collective participation ensures that sustainability becomes a shared responsibility, driving meaningful change beyond the workplace.
            </p>

            {/* Highlight row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { icon: TreePine, value: "2,000+", label: "Saplings Distributed", color: "#00A758" },
                { icon: Users, value: "All Levels", label: "Employee Participation", color: "#284b8c" },
                { icon: Heart, value: "Annual", label: "Green Drives", color: "#00A758" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className="flex-1 text-center bg-[#f0f7ff] rounded-[10px] py-5 px-3 border border-slate-100 hover:shadow-md transition-all"
                >
                  <s.icon className="w-6 h-6 mx-auto mb-2" style={{ color: s.color }} />
                  <p className="text-lg font-black tracking-tight" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Auto-rotating Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, delay: 0.8 }}
              className="absolute -top-5 -right-5 bg-[#284b8c] text-white px-5 py-3 rounded-[10px] shadow-xl hidden md:block z-20"
            >
              <p className="text-2xl font-black leading-none">2,000+</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/70">Saplings Planted</p>
            </motion.div>

            {/* Slideshow */}
            <div className="relative aspect-[4/3] w-full rounded-[10px] overflow-hidden shadow-2xl border-4 border-white">
              {/* Crossfade — no white flash */}
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: i === current ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt={`Slide ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#284b8c]/30 to-transparent" />
                </motion.div>
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-[10px] transition-all duration-300 ${
                      i === current ? "w-10 bg-[#00A758]" : "w-2 bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
