"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface CardData {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  description?: string;
  image: string;
  href: string;
  bg: string;
  bgImage?: string;
  isDark: boolean;
  colSpan?: 1 | 2;
}

interface CardGridProps {
  content?: {
    title?: string;
    subtitle?: string;
    cards?: CardData[];
  };
}

const defaultCards: CardData[] = [
  {
    id: "connectors-systems",
    category: "Connection",
    categoryColor: "rgba(255,255,255,0.75)",
    title: "Connection Systems",
    description:
      "We build high performance electronics and connection devices, combining precision engineering and deep regulatory expertise.",
    image:
      "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/167574675e2d8b125fbaaaf1b9a7dd028a95e6f5.png",
    href: "/products/connectors",
    bg: "#1a365d",
    isDark: true,
  },
  {
    id: "Engineering-Products-Division",
    category: "Engineering",
    categoryColor: "#4a90d9",
    title: "Engineering Products",
    description:
      "Advanced engineering products tailored for industrial applications with uncompromising quality and durability under extreme conditions.",
    image:
      "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Engineering-products-division-verticals.png",
    href: "/products/fuse-box",
    bg: "#334155",
    isDark: true,
  },
  {
    id: "Precision-Stamping-Manufacturing",
    category: "Precision",
    categoryColor: "#b07c0a",
    title: "Precision Stamping",
    description:
      "State-of-the-art precision stamping manufacturing delivering high-volume, exact-specification metal components for various industries.",
    image:
      "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Precision-Stamping-verticals.png",
    href: "/products/dummy-plugs",
    bg: "#475569",
    isDark: true,
  },
  {
    id: "CNH-Moulds",
    category: "Moulds",
    categoryColor: "#b07c0a",
    title: "CNH Moulds",
    description:
      "Expertly crafted CNH moulds designed for complex geometries, superior tolerances, and long-lasting production performance.",
    image:
      "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/cnh_moulds.png",
    href: "/products/relay",
    bg: "#0f172a",
    isDark: true,
  },
];

const BlurText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className={`inline-flex flex-wrap justify-center ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { filter: "blur(12px)", opacity: 0, y: 10 },
            visible: {
              filter: "blur(0px)",
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function CardGrid({ content }: CardGridProps) {
  const {
    title = "Precision Engineered Components",
    subtitle = "At Besmak, we deliver cutting-edge industrial solutions built on innovation, operational excellence, and uncompromising quality.",
    cards = defaultCards,
  } = content || {};

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] z-10 relative">
        <div className="text-center mb-12 max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-white border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#284b8c]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-linear-to-r from-[#284b8c] to-[#00a758]">
              Interactive Showcase
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#284b8c] tracking-tight leading-[1.1] mb-5 drop-shadow-sm">
            <BlurText text={title} />
          </h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Accordion Flex Gallery */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-[750px] lg:h-[600px] w-full mt-10">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group border ${
                  isActive
                    ? "lg:w-[65%] flex-grow-[8] shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-black/10"
                    : "lg:w-[11.66%] flex-grow-[1] min-h-[100px] lg:min-h-full border-black/5 hover:border-black/20"
                }`}
                style={{
                  background: "#284b8c",
                  backgroundImage: card.bgImage
                    ? `url(${card.bgImage})`
                    : `linear-gradient(145deg, #4275db 0%, #284b8c 100%)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Product Floating Image & Overlays */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Glowing spotlight effect behind the active product */}
                  <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full bg-blue-200 mix-blend-overlay blur-[70px] transition-all duration-1000 ${isActive ? "opacity-60 scale-100" : "opacity-0 scale-75"}`} />

                  {/* Subtle noise/texture layout */}
                  <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_1px,transparent_10px)]" />

                  {/* Deep blue gradient overlay for text legibility */}
                  <div
                    className={`absolute inset-0 z-10 transition-opacity duration-700 bg-linear-to-t from-[#284b8c] via-[#284b8c]/40 to-transparent ${isActive ? "opacity-90" : "opacity-60 group-hover:opacity-80"}`}
                  />

                  {/* The actual product image centered top */}
                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { scale: 0.85, y: 0, opacity: 1 }
                        : { scale: 0.7, y: 0, opacity: 0.3 }
                    }
                    transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                    className={`absolute inset-x-0 top-0 h-[65%] lg:h-[75%] z-10 flex items-start justify-center p-8 lg:p-12 mix-blend-normal transition-all duration-700 ${isActive ? "filter-none opacity-100" : "opacity-50 blur-[1px]"}`}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain object-top drop-shadow-[0_25px_45px_rgba(0,0,0,0.5)]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-8 pointer-events-none">
                  {/* ACTIVE STATE CONTENT */}
                  <div
                    className={`flex-col md:flex-row justify-between items-start md:items-end gap-6 transition-all duration-700 w-full ease-[cubic-bezier(0.25,1,0.5,1)] transform pointer-events-auto ${isActive ? "flex opacity-100 translate-y-0 delay-100" : "hidden md:flex opacity-0 translate-y-12 absolute bottom-8 left-8 right-8"}`}
                  >
                    <div className="max-w-xl">
                      <h3 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight break-words leading-none mb-4 drop-shadow-lg">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none">
                          {card.description}
                        </p>
                      )}
                    </div>

                    <Link
                      href={card.href}
                      className="shrink-0 inline-flex items-center justify-center border border-white text-white px-8 py-3 rounded hover:bg-white hover:text-slate-900 transition-colors duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    >
                      <span className="font-bold tracking-[0.15em] text-xs uppercase">
                        Explore Products
                      </span>
                    </Link>
                  </div>

                  {/* INACTIVE STATE CONTENT */}
                  <div
                    className={`transition-all duration-500 absolute w-full lg:w-auto left-0 lg:left-auto lg:right-4 bottom-0 lg:bottom-8 p-5 lg:p-0 flex items-center justify-center pointer-events-none ${!isActive ? "opacity-100 delay-300 lg:translate-x-0" : "opacity-0 translate-y-4 lg:translate-x-8 lg:translate-y-0"}`}
                  >
                    <h3 className="text-white lg:text-white/90 font-black tracking-[0.2em] text-sm md:text-base uppercase whitespace-nowrap drop-shadow-[0_2px_15px_rgba(40,75,140,0.8)] group-hover:text-white transition-colors [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl] lg:rotate-180">
                      {card.category || card.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore All Link - Below Showcase */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-linear-to-r from-[#284b8c] to-[#00a758] text-white rounded-[10px] font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:scale-105"
          >
            <span className="relative z-10 transition-colors duration-300">
              View Product Directory
            </span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-linear-to-r from-[#00a758] to-[#284b8c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
