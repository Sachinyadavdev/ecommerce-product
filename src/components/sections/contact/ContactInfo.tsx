"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Box } from "lucide-react";

interface ContactInfoProps {
  content?: {
    heading?: string;
    wh1_title?: string;
    wh1_city?: string;
    wh1_badge?: string;
    wh1_address?: string;
    wh1_phone?: string;
    wh1_email?: string;
    wh2_title?: string;
    wh2_city?: string;
    wh2_badge?: string;
    wh2_address?: string;
    wh2_phone?: string;
    wh2_email?: string;
    wh3_title?: string;
    wh3_city?: string;
    wh3_badge?: string;
    wh3_address?: string;
    wh3_phone?: string;
    wh3_email?: string;
  };
}

export default function ContactInfo({ content }: ContactInfoProps) {
  const {
    heading = "3 Warehouses",
    wh1_title = "WH — 01",
    wh1_city = "Kanchipuram, Tamil Nadu",
    wh1_badge = "ORAGADAM",
    wh1_address = "Plot No. 16, Venkateswara Nagar,\nStage III Mettupalayam Village,\nOragadam Industrial Area,\nSriperumbudur Taluka,\nKanchipuram – 602118\nTamil Nadu, India",
    wh1_phone = "",
    wh1_email = "",
    wh2_title = "WH — 02",
    wh2_city = "Pune, Maharashtra",
    wh2_badge = "PUNE",
    wh2_address = "Door No. 1, Gate No. 201,\nVillage Chimball,\nKhed Taluka,\nPune – 410 501\nMaharashtra, India",
    wh2_phone = "",
    wh2_email = "",
    wh3_title = "WH — 03",
    wh3_city = "Gurgaon, Haryana",
    wh3_badge = "GURGAON",
    wh3_address = "Killa No. 15, Khasra No. 1531,\nVillage Kheri Dhoula,\nNH-48, Opp. Grozz Toll,\nGurgaon – 122004\nHaryana, India",
    wh3_phone = "",
    wh3_email = "",
  } = content || {};

  const warehouses = [
    { title: wh1_title, city: wh1_city, badge: wh1_badge, address: wh1_address, phone: wh1_phone, email: wh1_email },
    { title: wh2_title, city: wh2_city, badge: wh2_badge, address: wh2_address, phone: wh2_phone, email: wh2_email },
    { title: wh3_title, city: wh3_city, badge: wh3_badge, address: wh3_address, phone: wh3_phone, email: wh3_email },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="pt-12 pb-24 md:pt-16 md:pb-32 bg-white relative overflow-hidden">
      {/* Texture & Decorative Background from Infrastructure style */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#1e2a6b 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col mb-16"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-[#1e2a6b] mb-6 rounded-full" 
          />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
            {heading}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {warehouses.map((wh, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#1e2a6b]/5 hover:border-[#1e2a6b]/20"
            >
              <div className="absolute top-0 left-10 right-10 h-1 bg-[#1e2a6b] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-full" />
              
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-[#1e2a6b] tracking-tight transition-colors group-hover:text-[#1e2a6b]">
                    {wh.title}
                  </h3>
                  <div className="bg-green-50 px-2 py-1 rounded text-[10px] font-bold text-green-600 tracking-widest uppercase">
                    {wh.badge}
                  </div>
                </div>

                <div className="mb-6 space-y-4 flex-grow">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{wh.city}</h4>
                      <p className="text-slate-500 text-[15px] leading-relaxed whitespace-pre-line">
                        {wh.address}
                      </p>
                    </div>
                  </div>
                </div>

                {(wh.phone || wh.email) && (
                  <div className="space-y-3 pt-6 border-t border-slate-50 mt-auto">
                    {wh.phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <Phone size={16} className="text-[#1e2a6b]" />
                        <a href={`tel:${wh.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[#1e2a6b] transition-colors">{wh.phone}</a>
                      </div>
                    )}
                    {wh.email && (
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <Mail size={16} className="text-[#1e2a6b]" />
                        <a href={`mailto:${wh.email}`} className="hover:text-[#1e2a6b] transition-colors break-all">{wh.email}</a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Decorative background icon */}
              <div className="absolute top-6 right-6 text-slate-50 group-hover:text-[#1e2a6b]/5 transition-colors duration-500 -z-10">
                 <Box size={80} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
