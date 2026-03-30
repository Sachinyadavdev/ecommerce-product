"use client";

import { motion } from "framer-motion";

interface Advantage {
  title: string;
  description: string;
}

interface ConnectionSystemsWhyChooseUsProps {
  content?: {
    title?: string;
    description?: string;
    advantages?: Advantage[];
  };
}

export default function ConnectionSystemsWhyChooseUs({ content }: ConnectionSystemsWhyChooseUsProps) {
  const {
    title = "Why Choose Us?",
    description = "At Besmak Components Pvt Ltd, we don’t just manufacture connectors — we build lasting partnerships based on trust, quality, and performance. Here’s why we are the preferred choice:",
    advantages = [
      {
        title: "Decades of Experience & Industry Leadership",
        description: "With over 30 years of expertise in connection systems, we understand the evolving needs of the automotive industry and proactively innovate to meet them."
      },
      {
        title: "End-to-End Capabilities",
        description: "From concept to delivery, our comprehensive capabilities in product design, tooling, prototyping, production, and quality validation make us a one-stop partner for customers."
      },
      {
        title: "Focus on Innovation",
        description: "We invest continuously in R&D, automation, and digitalization to enhance product performance and manufacturing efficiency. Our ability to process advanced materials and develop complex components gives us a competitive edge."
      },
      {
        title: "Commitment to Quality & Compliance",
        description: "Our products meet global quality benchmarks, backed by industry certifications and advanced testing infrastructure. We deliver zero-defect, high-precision components at scale."
      },
      {
        title: "Sustainable Manufacturing",
        description: "We leverage renewable energy and adopt eco-friendly manufacturing practices, reflecting our commitment to responsible business growth."
      },
      {
        title: "Customer-Centric Approach",
        description: "We work closely with leading OEMs, aligning our growth with their success. Our dedicated team ensures on-time delivery, customized solutions, and continuous process improvement."
      }
    ]
  } = content || {};

  return (
    <section className="py-10 md:py-16 bg-primary text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-white" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-default h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">
                {adv.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {adv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
