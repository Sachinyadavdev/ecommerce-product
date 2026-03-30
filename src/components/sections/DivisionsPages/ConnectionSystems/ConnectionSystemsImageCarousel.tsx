"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useAnimationFrame,
  useTransform,
  wrap
} from "framer-motion";
import { Maximize2, Cpu } from "lucide-react";

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
}

interface ConnectionSystemsImageCarouselProps {
  content?: {
    title?: string;
    subtitle?: string;
    [key: string]: any;
  };
}

const defaultImages: CarouselImage[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", alt: "Advanced Precision Molding" },
  { id: "2", src: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200", alt: "High-Volume Production Lines" },
  { id: "3", src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200", alt: "Manufacturing Components" },
  { id: "4", src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", alt: "Automated Assembly" }
];

export default function ConnectionSystemsImageCarousel({ content }: ConnectionSystemsImageCarouselProps) {
  const discoverImages = (): CarouselImage[] => {
    let extracted: CarouselImage[] = [];
    
    // Dynamically support any amount of images added from the CMS
    const keys = Object.keys(content || {});
    // Find the highest image index configured
    let maxIdx = 3;
    keys.forEach(k => {
      const match = k.match(/^image(\d+)(Src|Alt)$/);
      if (match) {
        maxIdx = Math.max(maxIdx, parseInt(match[1]));
      }
    });

    for(let i = 1; i <= maxIdx; i++) {
        const src = content?.[`image${i}Src`];
        const alt = content?.[`image${i}Alt`] || "";
        
        if (src) {
            extracted.push({ id: `img_${i}`, src, alt });
        }
    }
    
    if (extracted.length > 0) return extracted;
    return defaultImages;
  };

  const images = discoverImages();

  const {
    title = "State-of-the-Art Infrastructure",
    subtitle = "Manufacturing Showcase",
  } = content || {};

  // Doubled array for seamless infinite loop scroll
  const extendedImages = [...images, ...images];

  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [isPaused, setIsPaused] = useState(false);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  // Measure the exact width of a single set of images
  useEffect(() => {
    const handleMeasurement = () => {
      if (trackRef.current) {
        const children = Array.from(trackRef.current.children) as HTMLElement[];
        if (children.length >= images.length) {
          const firstItem = children[0];
          const nextSetItem = children[images.length];
          if (firstItem && nextSetItem) {
            setSingleSetWidth(nextSetItem.offsetLeft - firstItem.offsetLeft);
          }
        }
      }
    };

    handleMeasurement();
    window.addEventListener("resize", handleMeasurement);
    
    // Retrigger slightly later to ensure images are loaded or layout shifted
    const t = setTimeout(handleMeasurement, 500);

    return () => {
        window.removeEventListener("resize", handleMeasurement);
        clearTimeout(t);
    };
  }, [images]);

  // Framer Motion continuous scroll logic
  useAnimationFrame((t, delta) => {
    if (isPaused || singleSetWidth === 0) return;

    // Movement speed: 40 pixels per second
    const moveBy = (delta / 1000) * 40; 
    let newX = baseX.get() - moveBy;

    // If we've scrolled past one full set's width, silently reset to start
    if (newX <= -singleSetWidth) {
      newX = 0;
    }

    baseX.set(newX);
  });

  // Draggable logic wrapped around the single set boundary
  const x = useTransform(baseX, (v) => wrap(-singleSetWidth, 0, v));

  if (!images || images.length === 0) return null;

  return (
    <section className="py-10 md:py-16 bg-white relative overflow-hidden site-content">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Larger max-width for showcasing flex row images */}
      <div className="container mx-auto px-4 !max-w-[1600px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10 px-4 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-600/20 mb-6"
            >
              <Cpu className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">{subtitle}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]"
            >
              {title}
            </motion.h2>

        </div>

        {/* Carousel Container */}
        <div className="relative group/slider w-full" ref={containerRef}>
          {/* Edge Fades for smooth entry/exit effect */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div 
            className="flex overflow-x-hidden pt-2 pb-6 cursor-grab active:cursor-grabbing px-2 md:px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-4 md:gap-6 lg:gap-8"
                drag="x"
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(e, info) => {
                    // Update baseX position with the user's drag distance
                    const shiftedX = baseX.get() + info.offset.x;
                    baseX.set(shiftedX);
                    setIsPaused(false);
                }}
              >
                {extendedImages.map((img, index) => (
                    // Base width calculated to fit roughly 4 items on large screens
                    <div 
                        key={`${img.id}-${index}`}
                        className="flex-none w-[280px] sm:w-[320px] md:w-[400px] lg:w-[calc(25vw-2.5rem)] xl:w-[calc(25vw-3rem)] select-none group/card"
                    >
                        <div className="relative aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden group shadow-lg ring-1 ring-slate-200 bg-slate-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.src}
                                alt={img.alt || "Carousel Image"}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110 pointer-events-none"
                            />
                            
                            {img.alt && img.alt.trim() !== "" && (
                              <>
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity duration-500 pointer-events-none" />
                                
                                {/* Image Info Overlay */}
                                <motion.div 
                                    className="absolute bottom-6 left-6 right-6 pointer-events-none"
                                >
                                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300 leading-tight">
                                    {img.alt}
                                    </h3>
                                </motion.div>
                              </>
                            )}
                            
                            {/* Maximize Button Hint */}
                            <div className="absolute top-4 right-4 group-hover/card:opacity-100 opacity-0 transition-opacity duration-300">
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center">
                                <Maximize2 size={16} />
                              </div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
