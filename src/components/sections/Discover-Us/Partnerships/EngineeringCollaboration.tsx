"use client";

import { motion } from "framer-motion";

interface CollaborationPoint {
  title: string;
  description?: string;
}

interface EngineeringCollaborationProps {
  content?: {
    title?: string;
    description?: string;
    points?: CollaborationPoint[];
  };
}

const DEFAULT_POINTS: CollaborationPoint[] = [
  { title: "Joint product design and development", description: "Collaborating from the early stages of product development to ensure optimal design." },
  { title: "Tooling and prototyping support", description: "Rapid prototyping and specialized tool design for new automotive applications." },
  { title: "Custom solutions for complex automotive applications", description: "Engineering tailor-made components for unique requirements." },
  { title: "Continuous improvement through feedback and innovation", description: "Constantly evolving based on customer feedback and industry trends." }
];

export default function EngineeringCollaboration({ content }: EngineeringCollaborationProps) {
  const {
    title = "Engineering Collaboration & Co-Development",
    description = "Our partnerships go beyond supply—we actively collaborate with customers from the early stages of product development.",
    points = DEFAULT_POINTS
  } = content || {};

  return (
    <section className="py-12 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            {description}
            <br />
            A dedicated engineering team works closely with customers to ensure that every solution meets performance, safety, and cost expectations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {points.map((point, idx) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="font-bold text-xl">{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {point.title}
              </h3>
              {point.description && (
                <p className="text-slate-600 leading-relaxed">
                  {point.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
