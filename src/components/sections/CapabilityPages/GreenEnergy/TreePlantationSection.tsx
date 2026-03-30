"use client";

import { motion } from "framer-motion";
import { TreePine, Heart, Users } from "lucide-react";
import Image from "next/image";

interface TreePlantationSectionProps {
  content?: {
    title?: string;
    description?: string;
    image1?: string;
    image2?: string;
  };
}

export default function TreePlantationSection({ content }: TreePlantationSectionProps) {
  const {
    title = "Tree Plantation Drive",
    description = "As part of our commitment to environmental responsibility, Besmak actively organises tree plantation drives across its facilities and surrounding communities. Our team members plant saplings to contribute to a greener ecosystem, reduce our carbon footprint, and inspire a culture of environmental stewardship within the organisation.",
    image1 = "/images/sustainability_commitment.png",
    image2 = "/images/engineering_infrastructure_premium.png",
  } = content || {};

  const highlights = [
    { icon: TreePine, value: "2000+", label: "Saplings Planted", color: "#00A758" },
    { icon: Users, value: "All Units", label: "Employee Participation", color: "#284b8c" },
    { icon: Heart, value: "Annual", label: "Plantation Drives", color: "#00A758" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#284b8c 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00A758]/10 text-[#00A758] rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <TreePine className="w-3.5 h-3.5" /> Green Initiative
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#284b8c] tracking-tight leading-tight">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Right: Content first on mobile, second on lg */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="text-lg text-slate-600 leading-relaxed font-light mb-10">
              {description}
            </p>

            {/* Highlight cards */}
            <div className="flex flex-col gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex items-center gap-5 bg-[#f8faff] rounded-[10px] px-6 py-4 border border-slate-100 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="w-12 h-12 rounded-[10px] flex items-center justify-center flex-shrink-0"
                    style={{ background: h.color + "18" }}
                  >
                    <h.icon className="w-6 h-6" style={{ color: h.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-black tracking-tight" style={{ color: h.color }}>{h.value}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{h.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Left: Overlapping Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative order-1 lg:order-2"
          >
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-[10px] overflow-hidden shadow-2xl">
              <Image src={image2} alt="Team planting saplings" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#284b8c]/20 to-transparent" />
            </div>

            {/* Overlapping secondary image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="absolute -bottom-8 -left-8 w-3/5 aspect-[4/3] rounded-[10px] overflow-hidden shadow-xl border-4 border-white hidden md:block"
            >
              <Image src={image1} alt="Sapling handover ceremony" fill className="object-cover" />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -top-5 -right-5 bg-[#00A758] text-white rounded-[10px] px-4 py-3 shadow-xl"
            >
              <p className="text-2xl font-black leading-none">2000+</p>
              <p className="text-[9px] font-black uppercase tracking-widest mt-0.5 text-white/80">Trees Planted</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
