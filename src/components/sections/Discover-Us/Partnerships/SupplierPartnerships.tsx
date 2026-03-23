"use client";

import { motion } from "framer-motion";

interface SupplierProps {
  content?: {
    title?: string;
    description?: string;
    benefits?: string[];
  };
}

const DEFAULT_BENEFITS = [
  "High-quality raw materials and components",
  "Advanced coating and finishing technologies",
  "Reliable and efficient supply chain operations"
];

export default function SupplierPartnerships({ content }: SupplierProps) {
  const {
    title = "Supplier & Vendor Partnerships",
    description = "We maintain strong relationships with our supplier network to ensure consistent quality and operational excellence.",
    benefits = DEFAULT_BENEFITS
  } = content || {};

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-slate-50 rounded-[40px] p-8 lg:p-16 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                alt="Manufacturing Excellence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white text-xl font-bold">End-to-End Excellence</p>
                <p className="text-blue-100 text-sm">From Design to Delivery</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {title}
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {description}
                <br /><br />
                This collaborative ecosystem enables us to deliver end-to-end manufacturing excellence—from design to delivery.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
