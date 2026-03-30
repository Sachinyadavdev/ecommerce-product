"use client";

import { motion } from "framer-motion";
import { Leaf, Edit2 } from "lucide-react";

interface SMResponsibleSectionProps {
  content?: {
    subtitle?: string;
    title?: string;
    description?: string;
    extraDescription?: string;
  };
}

export default function SMResponsibleSection({ content }: SMResponsibleSectionProps) {
  const {
    subtitle = "Environment & Sustainability",
    title = "Driving Responsible Manufacturing",
    description = "As a forward-thinking manufacturing company, we recognise the critical role we play in shaping a sustainable future. Our investments in clean energy and environmental initiatives are a testament to our commitment to responsible growth.",
    extraDescription = "We will continue to explore innovative solutions, expand our renewable energy footprint and strengthen our sustainability practices to ensure that our operations remain aligned with global environmental standards.",
  } = content || {};

  // Floating leaves configuration
  const leaves = [
    { top: "15%", left: "10%", size: 32, delay: 0, duration: 25 },
    { top: "25%", right: "15%", size: 24, delay: 2, duration: 22 },
    { top: "60%", left: "5%", size: 40, delay: 5, duration: 28 },
    { top: "70%", right: "10%", size: 28, delay: 1, duration: 24 },
    { top: "40%", left: "80%", size: 20, delay: 3, duration: 20 },
  ];

  return (
    <section className="py-32 bg-[#faf9f6] relative overflow-hidden border-y border-[#00A758]/5">
      {/* Immersive Background */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00A758_0.5px,transparent_0.5px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)]" />
      </div>

      {/* Floating Leaves Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {leaves.map((leaf, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00A758]/20"
            style={{ 
              top: leaf.top, 
              ...(leaf.left ? { left: leaf.left } : {}),
              ...(leaf.right ? { right: leaf.right } : {})
            }}
            animate={{
              y: [0, -30, 0, 30, 0],
              x: [0, 20, 0, -20, 0],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: leaf.duration,
              repeat: Infinity,
              ease: "linear",
              delay: leaf.delay,
            }}
          >
            <Leaf size={leaf.size} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10 group/edit">
        {/* Manual Edit Icon */}
        <div className="absolute top-0 right-0 bg-[#00A758] p-2.5 rounded-[10px] shadow-lg cursor-pointer hover:bg-[#008f4c] transition-all opacity-0 group-hover/edit:opacity-100 z-20">
          <Edit2 className="w-4 h-4 text-white" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Top Leaf Accent */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-[#00A758]" />
            <Leaf className="w-10 h-10 text-[#00A758] -ml-2" />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#00A758] tracking-tighter leading-[1.1] mb-6">
            {subtitle}
          </h2>

          <h3 className="text-2xl md:text-3xl font-bold text-[#00A758]/90 tracking-tight mb-12">
            {title}
          </h3>

          {/* Content */}
          <div className="space-y-8 text-slate-700 text-lg md:text-xl font-medium leading-[1.8] text-center max-w-3xl mx-auto">
            <p>
              {description}
            </p>

            {extraDescription && (
              <p>
                {extraDescription}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
