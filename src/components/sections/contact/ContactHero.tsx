"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";

interface ContactHeroProps {
  content?: {
    bgImage?: string;
    topTitle?: string;
    mainTitle?: string;
    description?: string;
    btn1Text?: string;
    btn1Url?: string;
    btn2Text?: string;
    btn2Url?: string;
    contactTitle?: string;
    phoneLabel?: string;
    phoneValue?: string;
    emailLabel?: string;
    emailValue?: string;
    addressLabel?: string;
    addressValue?: string;
  };
}

export default function ContactHero({ content }: ContactHeroProps) {
  const {
    bgImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contactpage-bannerimage.png",
    topTitle = "Let's Build the Future, Together",
    mainTitle = "Let's Build Something Amazing Together",
    description = "At Besmak Components Pvt Ltd, we believe every project begins with a conversation. Whether you’re exploring new components, seeking technical support, or looking for a long-term strategic partner, our team is ready to assist you.",
    btn1Text = "Call Now",
    btn1Url = "tel:+914467123333",
    btn2Text = "Live Chat",
    btn2Url = "#",
    contactTitle = "Contact Information",
    phoneLabel = "Phone",
    phoneValue = "+91 44 6712 3333",
    emailLabel = "Email",
    emailValue = "sales@besmakindia.com",
    addressLabel = "Address",
    addressValue = "Besmak Components Private Limited,\nPlot No. A-45, SIPCOT Industrial Growth Centre,\nOragadam,\nKanchipuram – 602118,\nTamil Nadu, India.",
  } = content || {};

  return (
    <section className="relative min-h-[700px] flex items-center py-20 overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" as const }}
        className="absolute inset-0 z-0"
      >
        <img
          src={bgImage}
          alt="Contact Background"
          className="w-full h-full object-cover opacity-40 shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white">
          
          {/* Left Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-[#284b8c] text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                {topTitle}
              </h2>
              <h1 className="text-3xl md:text-5xl font-light text-slate-100 max-w-2xl">
                {mainTitle}
              </h1>
            </div>

            <div className="w-20 h-1 bg-[#284b8c]" />

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={btn1Url}
                className="bg-[#284b8c] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1e3a6d] transition-all shadow-lg shadow-[#284b8c]/20 group"
              >
                {btn1Text}
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href={btn2Url}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all"
              >
                {btn2Text}
                <MessageCircle className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Floating Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#284b8c] to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-10 overflow-hidden shadow-2xl">
                {/* Decorative Circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#284b8c]/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

                <h3 className="text-white text-2xl font-bold relative z-10">
                  {contactTitle}
                </h3>

                <div className="space-y-8 relative z-10">
                  {/* Phone */}
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 transition-colors">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{phoneLabel}</p>
                      <p className="text-lg font-bold text-white transition-colors">{phoneValue}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{emailLabel}</p>
                      <p className="text-lg font-bold text-white transition-colors">{emailValue}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 transition-colors">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{addressLabel}</p>
                      <p className="text-lg font-bold text-white leading-relaxed whitespace-pre-line transition-colors">{addressValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
