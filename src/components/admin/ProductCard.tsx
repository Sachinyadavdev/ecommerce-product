"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, ExternalLink, Trash2, Package, Tag } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";
import { getSafeImageSrc } from "@/lib/image-utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    categoryName: string;
    categorySpecification?: string;
    images: string | string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = typeof product.images === "string"
    ? (product.images.startsWith("[") ? JSON.parse(product.images) : [product.images])
    : product.images;

  const mainImage = getSafeImageSrc(images && images.length > 0 ? images[0] : null);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-all hover:scale-110"
            title="View Live"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/products/edit/${product.id}`}
            className="p-2.5 bg-[#5e9baf] hover:bg-[#5e9baf]/90 text-white rounded-xl shadow-lg transition-all hover:scale-110"
            title="Edit Asset"
          >
            <Edit className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#284b8c] text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-slate-100/50">
            {product.categoryName || "Uncategorized"}
          </span>
          {product.categorySpecification && (
            <span className="px-2 py-0.5 bg-[#284b8c]/80 backdrop-blur-md text-white text-[8px] font-bold rounded-md w-fit">
              {product.categorySpecification}
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[13px] font-black text-slate-800 leading-tight mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-[#5e9baf] transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Product</span>
          </div>

          <DeleteProductButton
            productId={product.id}
            productName={product.name}
            className="text-slate-300 hover:text-rose-500 transition-colors p-1"
          />
        </div>
      </div>
    </div>
  );
}
