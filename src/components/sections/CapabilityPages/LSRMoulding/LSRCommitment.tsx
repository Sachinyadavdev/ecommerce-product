"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LSRCommitmentProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export default function LSRCommitment({ content }: LSRCommitmentProps) {
  const {
    title = "Ready for High-Precision Manufacturing",
    description = "Our LSR facility is operational with robotic assistance and precision dosing — built for the next generation of connection system components.",
    image = "/images/lsr-moulding-facility.png",
  } = content || {};

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#284b8c]/5 rounded-[10px] border border-[#284b8c]/10 mb-8">
              <span className="text-[#284b8c] font-black tracking-[0.3em] text-[10px] uppercase">Our Commitment</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] mb-8 tracking-tighter leading-tight">
              {title}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Right: Editable Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-[10px] overflow-hidden shadow-2xl"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#284b8c]/20 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
