"use client";

import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
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

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-600">
          No products found.
        </h2>
        <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
          console.error(
            `Error parsing images for product ${product.id}:`,
            error,
          );
          images = [];
        }

        const featuredImage =
          images.length > 0 && typeof images[0] === "string" && isValidImageSrc(images[0]) ? images[0] : null;

        // Dynamic Description Logic
        let specsSummary = "";
        try {
          if (!product.description && product.specifications) {
            const specs =
              typeof product.specifications === "string"
                ? JSON.parse(product.specifications)
                : product.specifications;

            if (specs && typeof specs === "object") {
              // Pick 3 interesting keys to build a summary
              const relevantKeys = [
                "Series",
                "Way",
                "Material",
                "M / F",
                "Tab Size",
              ];
              const parts = [];
              for (const key of relevantKeys) {
                if (specs[key]) {
                  parts.push(`${key}: ${specs[key]}`);
                }
                if (parts.length >= 3) break;
              }
              specsSummary = parts.join(" | ");
            }
          }
        } catch (e) {
          console.error("Error generating specs summary:", e);
        }

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: (index % 12) * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            whileHover={{
              y: -12,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" as const }
            }}
            className="group block h-full"
          >
            <Link
              href={getProductLink(product)}
              className="flex flex-col bg-white border border-slate-100 rounded-[10px] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(var(--primary-rgb),0.12)] hover:border-primary/30 transition-all duration-500 h-full relative font-body"
            >
              <div className="h-64 bg-slate-50/50 flex items-center justify-center relative overflow-hidden">
                {featuredImage ? (
                  <Image
                    src={featuredImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <Image
                    src="/assets/placeholder/no-product-image.png"
                    alt="No image available"
                    fill
                    className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                )}
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-primary/5 transition-colors duration-500" />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black text-primary tracking-[0.12em] bg-primary/5 px-2.5 py-1 rounded-full uppercase">
                    {product.category.name}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary group-hover:text-primary transition-colors line-clamp-1 mb-0">
                  {product.name}
                </h3>
                <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity mb-1.5">
                  {product.description ||
                    specsSummary ||
                    "Premium quality industrial component from Besmak India."}
                </p>
                <div className="mt-auto pt-2 border-t border-slate-50 flex items-center justify-between text-primary text-[10px] font-black uppercase tracking-[0.15em] group-hover:gap-2 transition-all">
                  <span>View Details</span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
