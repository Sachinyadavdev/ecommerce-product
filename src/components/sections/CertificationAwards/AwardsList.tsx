"use client";

import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useAnimation, 
  useMotionValue, 
  useAnimationFrame,
  useTransform,
  wrap
} from "framer-motion";
import Image from "next/image";
import { 
  Award, 
  Star, 
  Trophy, 
  Medal, 
  Crown, 
  ChevronLeft, 
  ChevronRight, 
  Plus
} from "lucide-react";

interface AwardItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  icon?: string;
  imageUrl?: string;
}

interface AwardsListProps {
  content?: {
    title?: string;
    subtitle?: string;
    awards?: AwardItem[];
    [key: string]: any;
  };
}

const iconMap: Record<string, any> = {
  Award,
  Star,
  Trophy,
  Medal,
  Crown,
};

const defaultAwards: AwardItem[] = [
  { id: "1", year: "2023", title: "Best Supplier Award", organization: "Leading Automotive OEM", icon: "Trophy" },
  { id: "2", year: "2022", title: "Excellence in Innovation", organization: "Manufacturing Export Council", icon: "Star" },
  { id: "3", year: "2021", title: "Top Quality Performer", organization: "International Quality Bureau", icon: "Medal" },
  { id: "4", year: "2020", title: "Safety First Excellence", organization: "National Safety Council", icon: "Award" },
];

export default function AwardsList({ content }: AwardsListProps) {
  const discoverAwards = (): AwardItem[] => {
    const indices = new Set<number>();
    Object.keys(content || {}).forEach((key) => {
      const m = key.match(/^item_(\d+)_/);
      if (m) indices.add(parseInt(m[1]));
    });

    const sorted = Array.from(indices).sort((a, b) => a - b);
    if (sorted.length > 0) {
      return sorted.map((idx) => ({
        id: `item_${idx}`,
        year: (content as any)[`item_${idx}_year`] || "",
        title: (content as any)[`item_${idx}_title`] || "",
        organization: (content as any)[`item_${idx}_organization`] || "",
        icon: (content as any)[`item_${idx}_icon`] || "Trophy",
        imageUrl: (content as any)[`item_${idx}_imageUrl`] || "",
      }));
    }

    return content?.awards || defaultAwards;
  };

  const {
    title = "Recognition of Excellence",
    subtitle = "Our dedication to quality and innovation has earned us numerous accolades from industry leaders and prestigious organizations.",
  } = content || {};

  const awards = discoverAwards();
  
  // Create a doubled array for the infinite loop: [A, B, C, D, A, B, C, D]
  const extendedAwards = [...awards, ...awards];
  
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isPaused, setIsPaused] = useState(false);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Measure the width of exactly one set of awards (including gaps)
  useEffect(() => {
    if (trackRef.current) {
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      if (children.length >= awards.length) {
        // Calculate width: from start of first item to start of (N+1)th item
        // This includes all items and all gaps in one set.
        const firstItem = children[0];
        const nextSetItem = children[awards.length];
        
        if (firstItem && nextSetItem) {
          const width = nextSetItem.offsetLeft - firstItem.offsetLeft;
          setSingleSetWidth(width);
        }
      }
    }
  }, [awards]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        const children = Array.from(trackRef.current.children) as HTMLElement[];
        if (children.length >= awards.length) {
          const firstItem = children[0];
          const nextSetItem = children[awards.length];
          if (firstItem && nextSetItem) {
            setSingleSetWidth(nextSetItem.offsetLeft - firstItem.offsetLeft);
          }
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [awards]);

  // Auto-scroll logic: continuous linear movement
  useAnimationFrame((t, delta) => {
    if (isPaused || singleSetWidth === 0) return;

    // Movement speed: pixels per second (adjusted for smoother feel)
    const moveBy = (delta / 1000) * 40; 
    let newX = baseX.get() - moveBy;

    // The Wrap Magic: when we've scrolled past one full set, snap back to start
    // This creates a truly seamless infinite loop.
    if (newX <= -singleSetWidth) {
      newX = 0;
    }

    baseX.set(newX);
  });

  // Navigation Logic
  const handleNext = () => {
    if (!singleSetWidth) return;
    const itemWidth = singleSetWidth / awards.length;
    let newX = baseX.get() - itemWidth;
    if (newX <= -singleSetWidth) newX += singleSetWidth;
    baseX.set(newX);
  };

  const handlePrev = () => {
    if (!singleSetWidth) return;
    const itemWidth = singleSetWidth / awards.length;
    let newX = baseX.get() + itemWidth;
    if (newX > 0) newX -= singleSetWidth;
    baseX.set(newX);
  };

  // Draggable constraints and wrapping
  const x = useTransform(baseX, (v) => wrap(-singleSetWidth, 0, v));

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 text-slate-900 overflow-hidden relative">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-[#294C8D]/5 to-slate-50/80 pointer-events-none" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/30 -skew-x-12 translate-x-1/4" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-blue-50/40 via-transparent to-transparent" />
        
        {/* Animated Light Blobs */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#294C8D]/15 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 40, 0],
            opacity: [0.03, 0.08, 0.03] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#294C8D]/10 rounded-full blur-[120px]" 
        />
        
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#294C8D]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />
        
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-[#294C8D]/10 border border-[#294C8D]/20 text-[#294C8D] text-[10px] font-bold uppercase tracking-widest mb-6"
            >
              <Award className="w-3 h-3" />
              Accolades
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-[#294C8D]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#294C8D]/70 leading-relaxed font-light"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Navigation Controls - Now controlling the motion value */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 bg-white text-blue-600 shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-200 bg-white text-blue-600 shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 active:scale-95 cursor-pointer transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Scrolling Track Container */}
        <div className="relative group/slider mx-auto" ref={containerRef}>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-slate-50 via-slate-50/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-slate-50 via-slate-50/50 to-transparent z-10 pointer-events-none" />

          <div 
            className="flex overflow-x-hidden pt-4 pb-12 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-8"
              drag="x"
              onDragStart={() => setIsPaused(true)}
              onDragEnd={(e, info) => {
                // Adjust baseX based on drag offset and keep it wrapped
                const shiftedX = baseX.get() + info.offset.x;
                baseX.set(shiftedX);
                setIsPaused(false);
              }}
            >
              {extendedAwards.map((award, index) => {
                const IconComponent = iconMap[award.icon || "Trophy"] || Trophy;
                const hasImage = !!award.imageUrl && (award.imageUrl.startsWith("http") || award.imageUrl.startsWith("/"));

                return (
                  <div
                    key={`${award.id}-${index}`}
                    className="flex-none w-[320px] md:w-[350px] lg:w-[calc(25vw-2rem)] select-none group/card"
                  >
                    <div className="relative bg-white/80 backdrop-blur-xs border border-slate-200/60 rounded-4xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:border-blue-500/30 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] group-hover/card:bg-white group-hover/card:shadow-[0_12px_40px_-12px_rgba(41,76,141,0.12)]">
                      
                      {/* Award Image Area */}
                      {hasImage ? (
                        <div className="relative h-[320px] overflow-hidden shrink-0 bg-linear-to-b from-blue-50/50 to-white/50 border-b border-slate-100 pointer-events-none">
                          <Image
                            src={award.imageUrl!}
                            alt={award.title}
                            fill
                            className="object-contain p-8 transition-transform duration-700 group-hover/card:scale-105"
                            sizes="(max-width: 768px) 100vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-blue-900/5 opacity-40" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[320px] bg-linear-to-br from-blue-600/10 to-transparent shrink-0 border-b border-white/5">
                          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <IconComponent size={40} />
                          </div>
                        </div>
                      )}

                      <div className="p-7 flex flex-col flex-1 relative overflow-hidden text-left bg-linear-to-br from-transparent to-blue-50/30 group-hover/card:to-blue-50/60 transition-colors duration-500">
                        <div className="text-3xl font-black text-[#294C8D]/10 mb-3 italic transition-colors duration-500 group-hover/card:text-[#294C8D]/20">
                          {award.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover/card:text-[#294C8D] transition-colors leading-tight">
                          {award.title}
                        </h3>
                        <p className="text-[#294C8D]/60 text-sm leading-relaxed font-medium group-hover/card:text-[#294C8D]/80 transition-colors line-clamp-2">
                          {award.organization}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-center gap-6 mt-4">
          <button onClick={handlePrev} className="w-14 h-14 rounded-full flex items-center justify-center border border-slate-200 bg-white text-blue-600 shadow-md active:scale-95 transition-all duration-300">
            <ChevronLeft size={24} />
          </button>
          <button onClick={handleNext} className="w-14 h-14 rounded-full flex items-center justify-center border border-slate-200 bg-white text-blue-600 shadow-md active:scale-95 transition-all duration-300">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
