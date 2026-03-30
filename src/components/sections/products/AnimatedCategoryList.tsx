import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedCategoryListProps {
  categories?: any[];
  content?: {
    title?: string;
    subtitle?: string;
  };
}

export default function AnimatedCategoryList({
  categories: initialCategories = [],
  content
}: AnimatedCategoryListProps) {
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [loading, setLoading] = useState(initialCategories.length === 0);

  const {
    title = "Product Categories",
    subtitle = "Explore our diverse range of industrial solutions and components."
  } = content || {};
  useEffect(() => {
    if (initialCategories.length === 0) {
      const fetchCategories = async () => {
        try {
          const res = await fetch("/api/category");
          const data = await res.json();
          setCategories(data);
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, [initialCategories]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 max-w-7xl pt-0 pb-24 space-y-4 md:space-y-6 relative text-primary flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4" />
          <p className="text-slate-500 font-medium">Loading catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 max-w-7xl pt-4 pb-24 space-y-12 md:space-y-16 relative text-primary">
      {/* Background Decorative Shapes */}
      <div className="absolute top-20 -left-20 w-64 md:w-96 h-64 md:h-96 bg-primary/2 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Header Section - Render only if title exists */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="w-20 h-1 bg-primary mb-8 rounded-full" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-tight mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {categories.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">No categories found.</p>
        </div>
      ) : (
        categories.map((category, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              className="group relative py-8 md:py-12 first:pt-0 last:pb-32"
            >
              {/* Vertical Connectivity Spine */}
              <div className="absolute top-0 bottom-0 left-[24px] md:left-1/2 md:-translate-x-1/2 w-px bg-slate-200/60 hidden md:block" />

              <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16 lg:gap-24 relative z-10`}>
                {/* ── Image/Asset Viewport ── */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="w-full md:w-[48%] lg:w-[50%] relative group/asset"
                >
                  <div className="relative h-64 md:h-80 lg:h-[400px] overflow-hidden rounded-[10px] shadow-2xl shadow-slate-200/50 bg-white border border-slate-100/50 transition-all duration-700 group-hover/asset:shadow-primary/20 group-hover/asset:-translate-y-2">

                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover/asset:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <Image
                        src="/assets/placeholder/no-product-image.png"
                        alt="No image available"
                        fill
                        className="object-cover opacity-60 transition-transform duration-1000 ease-out group-hover/asset:scale-110"
                      />
                    )}

                    {/* Industrial HUD Overlay */}
                    <div className="absolute inset-0 border-[20px] border-white/0 group-hover/asset:border-white/10 transition-all duration-700 pointer-events-none" />
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md text-[9px] font-black text-white uppercase tracking-widest opacity-0 group-hover/asset:opacity-100 transition-opacity">
                      REF: {category.slug.toUpperCase()}
                    </div>
                  </div>
                </motion.div>

                {/* ── Technical Intelligence Side ── */}
                <div className="flex-1 space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ x: isEven ? 30 : -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-[0.9] transition-colors">
                      {category.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 32 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-1 bg-primary"
                      />
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">
                        {category.tag || "Integrated Solutions"}
                      </span>
                    </div>
                  </motion.div>

                  {category.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="text-slate-500 leading-relaxed max-w-lg text-base md:text-lg font-medium"
                    >
                      {category.description}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="pt-4 flex flex-wrap items-center gap-8"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Active Products</span>
                      <span className="text-2xl font-black text-primary">{category.productCount}</span>
                    </div>

                    <Link
                      href={`/products/${category.slug}`}
                      className="group/btn relative inline-flex items-center justify-center gap-4 bg-primary text-white px-10 py-5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#3f863e] transition-all duration-500 shadow-2xl shadow-slate-900/20 active:scale-95"
                    >
                      Explore Catalog
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
}
