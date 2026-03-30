"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { isValidImageSrc, getProductLink } from "@/lib/image-utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  images: string | null;
  specifications: string | null;
  category: {
    name: string;
    slug: string;
  };
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="relative group/gallery">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white shadow-xl rounded-full flex items-center justify-center -ml-5 opacity-0 group-hover/gallery:opacity-100 transition-all border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 active:scale-95 hidden md:flex"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 bg-white shadow-xl rounded-full flex items-center justify-center -mr-5 opacity-0 group-hover/gallery:opacity-100 transition-all border border-slate-100 text-slate-400 hover:text-primary hover:scale-110 active:scale-95 hidden md:flex"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-6 px-1 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => {
          let images = [];
          try {
            if (product.images) {
              if (typeof product.images === "string") {
                const decoded = JSON.parse(product.images);
                images = Array.isArray(decoded) ? decoded : [];
              } else if (Array.isArray(product.images)) {
                images = product.images;
              }
            }
          } catch (error) {
            images = [];
          }

          const featuredImage =
            images.length > 0 && typeof images[0] === "string" && isValidImageSrc(images[0]) ? images[0] : null;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
            >
              <Link
                href={getProductLink(product)}
                className="flex flex-col bg-indigo-50/20 border border-indigo-100/60 rounded-xl overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(var(--primary-rgb),0.12)] hover:border-indigo-400 transition-all duration-500 h-full relative group"
              >
                <div className="h-48 sm:h-56 bg-indigo-50/40 flex items-center justify-center relative overflow-hidden">
                  {featuredImage ? (
                    <Image
                      src={featuredImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      sizes="(max-width: 640px) 280px, 320px"
                    />
                  ) : (
                    <Image
                      src="/assets/placeholder/no-product-image.png"
                      alt="No image available"
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors duration-500" />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-black text-primary tracking-[0.12em] bg-primary/5 px-2 py-0.5 rounded-full uppercase">
                      {product.category.name}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-primary group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between text-primary text-[9px] font-black uppercase tracking-[0.15em]">
                    <span>View Product</span>
                    <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
