"use client";

import React from "react";
import { motion } from "framer-motion";

interface LocationData {
  title: string;
  items: string[];
  isHighlighted?: boolean;
  image: string;
}

interface OurPresenceProps {
  content?: {
    title?: string;
    description?: string;
    loc1Title?: string;
    loc1Items?: string;
    loc1Image?: string;
    loc2Title?: string;
    loc2Items?: string;
    loc2Image?: string;
    loc3Title?: string;
    loc3Items?: string;
    loc3Image?: string;
    loc4Title?: string;
    loc4Items?: string;
    loc4Image?: string;
  };
}

export default function OurPresence({ content }: OurPresenceProps) {
  const {
    title = "Our Presence",
    description = "Manufacturing units, tool rooms, design centres and warehouses across Delhi, Ahmedabad, Pune and Chennai — serving the Indian automotive supply chain.",
    loc1Title = "Chennai",
    loc1Items = "Unit 1 (Oragadam): 40K sq. ft. to 60K sq. ft. under construction\nWarehouse - I - 9K Sq. ft.\nIn-House Validation Center\nTool Room (Oragadam) - 17K Sq. ft\nUnit - II (Athipet)\nDesign Centre (Sakthi Towers)\nUnit - IV under construction - 100K Sq. ft",
    loc1Image = "/images/chennai_landmark.png",
    loc2Title = "Ahmedabad",
    loc2Items = "Unit III (Sanand) – 40K sq. ft.\nConnection Systems & EP Division\nAvailable Capacity: 20K sq. ft.",
    loc2Image = "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80&w=800",
    loc3Title = "Pune",
    loc3Items = "Warehouse - II 10K Sq. ft.\nConnection Systems & EP Division. \nAvailable Capacity: 20K sq. ft.",
    loc3Image = "https://images.unsplash.com/photo-1584891105027-862fc86f3879?auto=format&fit=crop&q=80&w=800",
    loc4Title = "Delhi",
    loc4Items = "Warehouse - III (Gurgaon) 12.5K Sq. ft.",
    loc4Image = "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
  } = content || {};

  const locations: LocationData[] = [
    {
      title: loc1Title,
      items: loc1Items.split("\n").filter(Boolean),
      isHighlighted: true,
      image: loc1Image
    },
    {
      title: loc2Title,
      items: loc2Items.split("\n").filter(Boolean),
      image: loc2Image
    },
    {
      title: loc3Title,
      items: loc3Items.split("\n").filter(Boolean),
      image: loc3Image
    },
    {
      title: loc4Title,
      items: loc4Items.split("\n").filter(Boolean),
      image: loc4Image
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    },
    hover: {
      y: -12,
      rotateX: 2,
      rotateY: -2,
      transition: { duration: 0.3 }
    }
  } as const;

  return (
    <section className="bg-slate-50 py-24 px-6 md:px-12 lg:px-20 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] -z-10 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-gray-900 text-base font-extrabold tracking-tighter mb-6">
            {title}
          </h2>

          <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Locations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {locations.map((loc, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover="hover"
              className="relative overflow-hidden group rounded-[2.5rem] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:border-emerald-200/50 flex flex-col h-full"
            >
              {/* Top Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c234a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className="relative p-8 px-5 flex flex-col flex-grow">
                {/* Hover Full Background Fill */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-br from-emerald-50/60 to-white/0 -z-10"
                  initial={{ opacity: 0 }}
                  variants={{
                    hover: { opacity: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                />

                <motion.div
                  variants={{
                    hover: { x: 4 }
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <h3 className="text-4xl font-black tracking-tighter text-[#0c234a] group-hover:text-emerald-700 transition-colors leading-none">
                    {loc.title}
                  </h3>
                </motion.div>

                <ul className="space-y-4">
                  {loc.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 items-start group/item"
                    >
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 group-hover/item:scale-125 transition-transform" />
                      <span className="text-[17px] leading-relaxed text-slate-600 transition-colors">
                        {item.replace(/(\d+K?)\s+(Sq\.\s*ft\.|sq\.\s*ft\.)/gi, "$1\u00A0$2")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
