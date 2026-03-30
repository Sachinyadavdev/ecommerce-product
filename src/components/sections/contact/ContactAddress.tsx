"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

interface ContactAddressProps {
  content?: {
    topText?: string;
    heading?: string;
    bgHeading?: string;
    card1_header?: string;
    card1_title?: string;
    card1_city?: string;
    card1_address?: string;
    card1_phone?: string;
    card1_email?: string;
    card1_footer?: string;
    card2_header?: string;
    card2_title?: string;
    card2_city?: string;
    card2_address?: string;
    card2_footer?: string;
    card3_header?: string;
    card3_title?: string;
    card3_city?: string;
    card3_address?: string;
    card3_footer?: string;
    bottom_header?: string;
    bottom_address?: string;
  };
}

export default function ContactAddress({ content }: ContactAddressProps) {
  const {
    topText = "",
    heading = "Manufacturing Locations",
    bgHeading = "WORKS",
    card1_header = "HEAD OFFICE & UNIT I",
    card1_title = "Oragadam",
    card1_city = "Kanchipuram, Tamil Nadu",
    card1_address = "Plot No. A-45, SIPCOT Industrial Growth Center,\nOragadam Industrial Corridor,\nOragadam, Sriperumbudur Taluka,\nKanchipuram – 602118\nTamil Nadu, India",
    card1_phone = "",
    card1_email = "",
    card1_footer = "Chennai Manufacturing Unit",
    card2_header = "UNIT II",
    card2_title = "Athipet",
    card2_city = "Chennai, Tamil Nadu",
    card2_address = "No.1, Ganesh Road,\nNageswara Rao Road Extn,\nAthipet,\nChennai - 600058\nTamil Nadu, India",
    card2_footer = "Chennai Manufacturing Unit",
    card3_header = "UNIT III",
    card3_title = "Sanand",
    card3_city = "Ahmedabad, Gujarat",
    card3_address = "Survey No. 627/B,\nOpp. Virochannagar Railway Station,\nNear Khoraj Village,\nSanand Taluka,\nAhmedabad – 382170\nGujarat, India",
    card3_footer = "West India Manufacturing Unit",
    bottom_header = "DESIGN STUDIO CENTER - CHENNAI",
    bottom_address = "The Executive Zone Private Limited,\nShakthi Towers, Ground Floor, Tower 1, No. 766, Anna Salai, Chennai - 600002, Tamil Nadu",
  } = content || {};

  const [activeMaps, setActiveMaps] = React.useState<Record<number, boolean>>({});
  const [showBottomMap, setShowBottomMap] = React.useState(false);

  const toggleMap = (index: number) => {
    setActiveMaps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const cards = [
    {
      header: card1_header,
      title: card1_title,
      city: card1_city,
      address: card1_address,
      phone: card1_phone,
      email: card1_email,
      footer: card1_footer,
      stateMap: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/tamilnadu-map.png",
      mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(card1_title + " " + card1_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    },
    {
      header: card2_header,
      title: card2_title,
      city: card2_city,
      address: card2_address,
      footer: card2_footer,
      stateMap: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/tamilnadu-map.png",
      mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(card2_title + " " + card2_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    },
    {
      header: card3_header,
      title: card3_title,
      city: card3_city,
      address: card3_address,
      footer: card3_footer,
      stateMap: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/gujarat-map.png",
      mapUrl: `https://maps.google.com/maps?q=${encodeURIComponent(card3_title + " " + card3_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="relative mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black relative z-10">
            {heading}
          </h2>
          {/* Background Text */}
          <div className="absolute top-0 right-0 text-[12vw] font-black text-gray-50/80 -z-10 select-none pointer-events-none transform -translate-y-12 tracking-tighter whitespace-nowrap overflow-hidden opacity-50">
            {bgHeading}
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-100 shadow-sm rounded-sm overflow-hidden flex flex-col h-[500px] transition-all duration-300 group"
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            >
              {/* Card Header */}
              <div className="bg-[#1e2a6b] text-white p-6 relative overflow-hidden shrink-0">
                <div className="absolute top-2 right-4 text-slate-700 font-black text-4xl opacity-20">
                  {index + 1 === 1 ? "I" : index + 1 === 2 ? "II" : "III"}
                </div>
                
                {/* State Map Icon Overlay */}
                {card.stateMap && (
                  <button 
                    onClick={() => toggleMap(index)}
                    className="absolute top-6 right-6 w-14 h-14 hover:scale-110 transition-transform z-20 cursor-pointer"
                    title="Toggle Map View"
                  >
                    <img src={card.stateMap} alt="State Map" className="w-full h-full object-contain" />
                  </button>
                )}

                <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-800 pb-2 inline-block">
                  {card.header}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  {card.city}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 relative overflow-hidden bg-white">
                <motion.div 
                  initial={false}
                  animate={{ opacity: activeMaps[index] ? 0 : 1, x: activeMaps[index] ? -20 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-8 h-full flex flex-col ${activeMaps[index] ? 'pointer-events-none' : ''}`}
                >
                  <div className="text-slate-500 text-sm leading-relaxed whitespace-pre-line mb-8">
                    {card.address}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-50 mt-auto">
                    {card.phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span>{card.phone}</span>
                      </div>
                    )}
                    {card.email && (
                      <div className="flex items-center gap-3 text-sm text-slate-700">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span>{card.email}</span>
                      </div>
                    )}
                    {card.footer && (
                      <div className="text-xs text-slate-400 font-medium pt-2">
                        {card.footer}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Map View Overlay */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: activeMaps[index] ? 1 : 0, x: activeMaps[index] ? 0 : 20 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 z-10 bg-white ${!activeMaps[index] ? 'pointer-events-none' : ''}`}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={card.mapUrl}
                    className="grayscale opacity-90"
                  />
                  <button 
                    onClick={() => toggleMap(index)}
                    className="absolute top-4 right-4 bg-[#1e2a6b] text-white p-2 rounded-sm shadow-lg hover:bg-[#2a3a8b] transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Full-width Section - Design Office */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-[#1e2a6b] rounded-[2.5rem] p-10 md:p-14 mb-4 relative overflow-hidden group shadow-xl"
        >
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-110" />
          
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 w-full">
            <div className="flex-1 space-y-4">
              <h3 className="text-white text-3xl font-bold tracking-tight">
                {bottom_header}
              </h3>
              <p className="text-slate-300/90 text-lg leading-relaxed font-light whitespace-pre-line">
                {bottom_address}
              </p>
            </div>

            <button 
              onClick={() => setShowBottomMap(!showBottomMap)}
              className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm flex items-center justify-center w-24 h-24 hover:bg-white/20 transition-all shrink-0 hover:scale-105 active:scale-95 group/btn"
              title="Toggle Office Location Map"
            >
              <img 
                src="https://fohffyjhcwci6coi.public.blob.vercel-storage.com/tamilnadu-map.png" 
                alt="Tamil Nadu" 
                className="w-full h-full object-contain brightness-0 invert opacity-80 group-hover/btn:opacity-100 transition-opacity" 
              />
            </button>
          </div>
        </motion.div>

        {/* Bottom Slide-down Map */}
        <motion.div
          animate={{ height: showBottomMap ? 400 : 0, opacity: showBottomMap ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="overflow-hidden rounded-[2.5rem] bg-slate-100"
        >
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(bottom_header + " " + bottom_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            className="grayscale opacity-80"
          />
        </motion.div>
      </div>
    </section>
  );
}
