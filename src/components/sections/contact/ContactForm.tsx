"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2, Settings, Zap, Layers, ArrowRight } from "lucide-react";

interface ContactFormProps {
  content?: {
    topText?: string;
    heading?: string;
    description?: string;
    div1_name?: string;
    div2_name?: string;
    div3_name?: string;
    div4_name?: string;
    nameLabel?: string;
    emailLabel?: string;
    subjectLabel?: string;
    mobileLabel?: string;
    addressLabel?: string;
    messageLabel?: string;
    buttonText?: string;
  };
}

export default function ContactForm({ content }: ContactFormProps) {
  const {
    topText = "PRODUCT ENQUIRY",
    heading = "Tell us about your requirements",
    description = "Whether you need automotive connectors, terminals or complete wiring harness solutions — our team responds promptly.",
    div1_name = "Connection Systems",
    div2_name = "Engineering Products Division",
    div3_name = "Precision Stamping Division",
    div4_name = "CNH Moulds",
    nameLabel = "YOUR NAME",
    emailLabel = "EMAIL ADDRESS",
    subjectLabel = "SUBJECT",
    mobileLabel = "MOBILE NUMBER",
    addressLabel = "YOUR ADDRESS",
    messageLabel = "MESSAGE",
    buttonText = "SEND ENQUIRY",
  } = content || {};

  const connectorImages = [
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/16MK_090_FHCL-00C-contact.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/4FW_060_MHCL_ASSY_PBT_BLACK-00C-contact.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/6FW_025_MH_SL_A_ASSY_PBT_GF_30_RED-00C-contact.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-CABLE-TIE-STUD-CLAMP-1.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-CABLE-TIE-TREE-CLIP.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-RS-090-2-GROOVE-WIRE-SEAL-NBR-BLACK.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-060_DUMMY-SEAL.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-090_Male_WP_CL-00C.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contact-090_Female_WPCL_00C.png",
    "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/3FSS_060_MHCL_SL_ASSY-00C-contact.png",
  ];

  const gridImages = connectorImages.map((src, i) => ({
    src,
    initialRotate: (i % 3 === 0 ? 10 : i % 3 === 1 ? -10 : 0) + (Math.random() * 10 - 5),
    delay: i * 0.1
  }));

  return (
    <div className="w-full py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Content & Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-800 font-normal mb-10 leading-tight">
                {heading}
              </h2>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 relative min-h-[500px] w-full bg-slate-50/50 rounded-3xl p-8 border border-slate-100 items-center">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-green-200/10 blur-[120px] rounded-full pointer-events-none" />
              
              {gridImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: img.initialRotate }}
                  whileInView={{ opacity: 1, scale: 1, rotate: img.initialRotate }}
                  animate={{
                    y: [0, index % 2 === 0 ? -12 : 12, 0],
                    rotate: [img.initialRotate, img.initialRotate + (index % 2 === 0 ? 5 : -5), img.initialRotate],
                  }}
                  transition={{
                    y: {
                      duration: 3 + (index % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: img.delay
                    },
                    rotate: {
                      duration: 4 + (index % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: img.delay
                    },
                    opacity: { duration: 0.5, delay: img.delay },
                    scale: { duration: 0.5, delay: img.delay }
                  }}
                  className="relative z-10 flex items-center justify-center p-2"
                >
                  <div className="relative group/img">
                    <img 
                      src={img.src} 
                      alt={`Connector ${index + 1}`}
                      className="w-full h-auto max-h-[100px] object-contain filter drop-shadow-xl hover:scale-125 transition-transform duration-500 cursor-pointer"
                    />
                  </div>
                </motion.div>
              ))}
              
              {/* Badge Overlay */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-8 py-3 rounded-full shadow-lg border border-slate-100 z-20">
                <span className="text-[10px] font-black tracking-[0.4em] text-[#1e2a6b] uppercase whitespace-nowrap">
                  Quality Engineered Components
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-100 p-10 md:p-12 rounded-sm shadow-xl"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {emailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {subjectLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="Product / enquiry type"
                    className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {mobileLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {addressLabel}
                </label>
                <input
                  type="text"
                  placeholder="City, State, Country"
                  className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {messageLabel}
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your requirement in detail..."
                  className="w-full bg-white border border-slate-200 px-4 py-4 text-sm focus:border-green-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e2a6b] text-white py-5 px-8 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#151d4a] transition-all group"
              >
                {buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
