
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Package, ArrowRight, Loader2 } from "lucide-react";
import { isValidImageSrc } from "@/lib/image-utils";

interface SearchProduct {
  id: string;
  name: string;
  image?: string;
  slug: string;
  categorySlug: string;
  categorySpecification?: string;
}

interface SearchDropdownProps {
  products: SearchProduct[];
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchDropdown({ products, loading, isOpen, onClose }: SearchDropdownProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-[100] max-h-[480px] flex flex-col"
      >
        <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">Quick Search Results</span>
          </div>
          {loading && <Loader2 className="h-3 w-3 text-primary animate-spin" />}
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {products.length > 0 ? (
            <div className="py-2">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 px-4 py-3 hover:bg-primary/[0.02] transition-colors"
                >
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                    {product.image && isValidImageSrc(product.image) ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-800 truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{product.categorySlug}</span>
                      {product.categorySpecification && (
                        <>
                          <span className="text-gray-200">|</span>
                          <span className="text-[9px] font-bold text-primary/60">{product.categorySpecification}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading ? (
            <div className="py-12 px-8 text-center">
              <div className="bg-gray-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-5 w-5 text-gray-300" />
              </div>
              <p className="text-xs font-bold text-slate-500 mb-1">No products found</p>
              <p className="text-[10px] text-gray-400">Try searching for different keywords or part numbers</p>
            </div>
          ) : null}
        </div>

        <div className="p-4 bg-primary text-white flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest">Press Enter to see all results</p>
          <Search className="h-4 w-4 opacity-50" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
