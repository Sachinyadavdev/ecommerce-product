"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { useState, useEffect } from "react";

interface SMCommitmentSectionProps {
  content?: {
    image1?: string;
    image2?: string;
    image3?: string;
  };
}

export default function SMCommitmentSection({ content }: SMCommitmentSectionProps) {
  const {
    image1 = "/images/sustainability_commitment.png",
    image2 = "/images/engineering_infrastructure_premium.png",
    image3 = "/images/sustainability_commitment.png",
  } = content || {};

  const images = [image1, image2, image3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#00A758]/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative aspect-[4/3.5] w-full rounded-[10px] overflow-hidden shadow-2xl border border-slate-100">
              {/* Crossfade slideshow — no white flash */}
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: i === current ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image src={src} alt={`Slide ${i + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#284b8c]/20 to-transparent" />
                </motion.div>
              ))}

              {/* Dot indicators */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-[10px] transition-all duration-300 ${
                      i === current ? "bg-white w-6" : "bg-white/50 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Two-part Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="flex flex-col gap-10"
          >
            {/* Block 1 */}
            <div>
              <div className="flex items-center gap-6 mb-8 group">
                <div className="w-1.5 h-12 bg-[#284b8c] rounded-full group-hover:bg-[#00A758] transition-colors duration-500" />
                <div className="bg-[#284b8c]/5 px-5 py-2 rounded-[10px] border border-[#284b8c]/10 backdrop-blur-sm">
                  <span className="text-[#284b8c] font-black text-xs uppercase tracking-[0.5em]">Our Vision</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight mb-5">
                Powering Manufacturing with Sustainable Energy
              </h2>
              <p className="text-slate-600 leading-relaxed text-base mb-4">
                At Besmak, sustainability is not just an initiative — it is a core principle that drives how we operate, innovate and grow. As a responsible manufacturing organisation, we are committed to reducing our environmental footprint by adopting clean energy solutions, promoting green practices and fostering a culture of environmental responsibility across all our units.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                Our approach goes beyond compliance. We actively invest in renewable energy, encourage employee participation in green initiatives and continuously work towards building a future-ready, environmentally conscious manufacturing ecosystem.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#00A758]/30 to-transparent" />

            {/* Block 2 */}
            <div>
              <h3 className="text-2xl font-black text-[#00A758] tracking-tight mb-4">
                Our Commitment to a Greener Future
              </h3>
              <p className="text-slate-600 leading-relaxed text-base mb-4">
                In today&apos;s rapidly evolving industrial landscape, sustainable manufacturing is no longer optional — it is essential. At Besmak, we have taken decisive steps to ensure that the energy powering our operations is increasingly derived from environmentally friendly sources.
              </p>
              <p className="text-slate-600 leading-relaxed text-base">
                By integrating renewable energy into our daily operations and aligning our practices with global sustainability goals, we are not only reducing carbon emissions but also creating long-term value for our stakeholders, employees and the communities we serve.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
