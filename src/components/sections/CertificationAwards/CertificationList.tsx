"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Globe,
  Star,
  ExternalLink,
  X,
  Plus,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CertificationItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  issuedBy?: string;
}

interface CertificationListProps {
  content?: {
    title?: string;
    subtitle?: string;
    items?: CertificationItem[];
    [key: string]: any;
  };
}

const iconMap: Record<string, any> = {
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Globe,
  Star,
};

const defaultItems: CertificationItem[] = [
  {
    id: "1",
    title: "ISO 9001:2015",
    description: "Quality Management Systems certification ensuring consistent product quality.",
    icon: "ShieldCheck",
    issuedBy: "Bureau Veritas",
  },
  {
    id: "2",
    title: "ISO 14001:2015",
    description: "Environmental Management Systems certification for sustainable practices.",
    icon: "Globe",
    issuedBy: "DNV GL",
  },
  {
    id: "3",
    title: "IATF 16949",
    description: "International standard for automotive quality management systems.",
    icon: "FileCheck2",
    issuedBy: "IATF",
  },
  {
    id: "4",
    title: "ISO 45001:2018",
    description: "Occupational Health and Safety Management Systems certification.",
    icon: "CheckCircle2",
    issuedBy: "BSI Group",
  },
];

export default function CertificationList({ content }: CertificationListProps) {
  // Dynamic item discovery: supports item_{idx}_* pattern from CMS
  const discoverItems = (): CertificationItem[] => {
    const indices = new Set<number>();
    Object.keys(content || {}).forEach((key) => {
      const m = key.match(/^item_(\d+)_/);
      if (m) indices.add(parseInt(m[1]));
    });

    const sorted = Array.from(indices).sort((a, b) => a - b);
    if (sorted.length > 0) {
      return sorted.map((idx) => ({
        id: `item_${idx}`,
        title: (content as any)[`item_${idx}_title`] || "",
        description: (content as any)[`item_${idx}_description`] || "",
        icon: (content as any)[`item_${idx}_icon`] || "Award",
        imageUrl: (content as any)[`item_${idx}_imageUrl`] || "",
        issuedBy: (content as any)[`item_${idx}_issuedBy`] || "",
      }));
    }

    return content?.items || defaultItems;
  };

  const {
    title = "Our Certifications",
    subtitle = "We adhere to the highest international standards of quality and safety.",
  } = content || {};

  const items = discoverItems();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 500);
    }
  };

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  return (
    <section className="relative py-10 md:py-16 bg-slate-50 overflow-hidden">
      {/* Background decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.06) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#294C8D]/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const, delay: 3 }}
        className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#294C8D]/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-5"
          >
            <ShieldCheck size={13} />
            Accreditations
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-5 text-slate-900 tracking-tight leading-[1.1]"
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-20 h-1 bg-blue-500 rounded-full mx-auto mb-5"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Certificate Cards Carousel */}
        <div className="relative group/slider mx-auto max-w-7xl px-4 md:px-0">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12 z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border border-slate-200/50 backdrop-blur-md transition-all duration-300 pointer-events-auto
                ${canScrollLeft ? "bg-white text-blue-600 hover:scale-110 active:scale-95 cursor-pointer" : "bg-white/50 text-slate-300 scale-90 opacity-50 cursor-not-allowed"}
              `}
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12 z-20 pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border border-slate-200/50 backdrop-blur-md transition-all duration-300 pointer-events-auto
                ${canScrollRight ? "bg-white text-blue-600 hover:scale-110 active:scale-95 cursor-pointer" : "bg-white/50 text-slate-300 scale-90 opacity-50 cursor-not-allowed"}
              `}
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
          </div>

          {/* Scroll Track */}
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-12 pt-4 px-4 -mx-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <AnimatePresence>
              {items.map((item, index) => {
                const IconComponent = iconMap[item.icon || "Award"] || Award;
                const hasImage = !!item.imageUrl && (item.imageUrl.startsWith("http://") || item.imageUrl.startsWith("https://") || item.imageUrl.startsWith("/"));

                return (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex-none w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] snap-start"
                  >
                    <div className="relative bg-white rounded-4xl border border-slate-200/60 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.06)] overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] hover:border-blue-200/60 group/card">
                      
                      {/* Certificate Image or Icon Area */}
                      {hasImage ? (
                        <div 
                          className="relative h-[450px] overflow-hidden shrink-0 bg-white cursor-zoom-in group/img border-b border-slate-100"
                          onClick={() => setSelectedImage(item.imageUrl!)}
                        >
                          <Image
                            src={item.imageUrl!}
                            alt={item.title}
                            fill
                            className="object-contain transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/5 opacity-40 pointer-events-none" />
                          {/* Shimmer overlay */}
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />
                          
                          {/* Zoom Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-blue-900/5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-12 h-12 rounded-full bg-white/95 shadow-xl flex items-center justify-center text-blue-600 transform scale-50 group-hover/img:scale-100 transition-transform duration-300">
                              <Maximize2 size={24} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-80 bg-linear-to-br from-blue-50 to-slate-50 shrink-0 border-b border-slate-100">
                          <div className="relative">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center text-blue-600 transition-all duration-500 group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:shadow-blue-500/30 group-hover/card:shadow-lg group-hover/card:-rotate-6">
                              <IconComponent size={36} strokeWidth={1.3} />
                            </div>
                            {/* Floating ring accent */}
                            <div className="absolute -inset-3 rounded-[1.8rem] border-2 border-blue-100/60 opacity-0 group-hover/card:opacity-100 transition-opacity scale-90 group-hover/card:scale-100 duration-500" />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-7 flex flex-col flex-1">
                        {item.issuedBy && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[10px] bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4 self-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {item.issuedBy}
                          </div>
                        )}

                        <h3 className="text-xl font-black mb-3 text-slate-900 group-hover/card:text-blue-700 transition-colors leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-slate-500 leading-relaxed text-sm flex-1 font-medium">
                          {item.description}
                        </p>

                        {/* Animated bottom line */}
                        <div className="mt-6 flex items-center gap-3">
                          <div className="flex-1 h-px bg-slate-100 relative overflow-hidden">
                            <motion.div
                              initial={{ x: "-100%" }}
                              whileInView={{ x: "100%" }}
                              transition={{ duration: 1.5, delay: index * 0.05 + 0.5, ease: "easeInOut" as const }}
                              viewport={{ once: true }}
                              className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400 to-transparent"
                            />
                          </div>
                          <ExternalLink size={14} className="text-slate-300 group-hover/card:text-blue-500 transition-colors shrink-0" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-110"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl aspect-4/3 md:aspect-auto md:h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Certificate"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
