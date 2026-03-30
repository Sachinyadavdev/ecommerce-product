"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List as ListIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
  Loader2
} from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import SearchInput from "./SearchInput";
import BulkUpload from "./BulkUpload";
import DeleteProductButton from "./DeleteProductButton";
import { Edit, ExternalLink } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import { getProductLink } from "@/lib/image-utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  categorySpecification?: string;
  images: any;
  createdAt: string;
}

interface ProductListClientProps {
  initialProducts: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  categories: { id: string; name: string }[];
  selectedCategory: string;
}

export default function ProductListClient({
  initialProducts,
  totalProducts,
  currentPage,
  totalPages,
  searchTerm,
  categories,
  selectedCategory
}: ProductListClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (selectedCategory) params.set("category", selectedCategory);

      const res = await fetch(`/api/products/export?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products for export");

      const products = await res.json();

      if (products.length === 0) {
        toast.error("No products found to export");
        return;
      }

      // Map to the template format used by Bulk Upload
      const exportData = products.map((p: any) => ({
        "Product Designation": p.name,
        "Permalink Slug": p.slug,
        "Classification": p.categoryName || "",
        "Ref Number / Technical Specification": p.categorySpecification || "",
        "Operational Narrative": p.description || "",
        "Media Documentation": p.images, // Already a JSON string from DB
        "Technical Parameters": p.specifications // Already a JSON string from DB
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      const fileName = `besmak_products_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success(`Exported ${products.length} products to Excel`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export products");
    } finally {
      setIsExporting(false);
    }
  };

  const startIdx = totalProducts === 0 ? 0 : (currentPage - 1) * 20 + 1;
  const endIdx = Math.min(currentPage * 20, totalProducts);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#5e9baf] tracking-tight flex items-center gap-3">
            <div className="w-2 h-8 bg-[#284b8c] rounded-full" />
            Product Catalog
          </h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 ml-5">
            View and manage your product inventory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-[#5e9baf] hover:text-[#5e9baf] transition-all shadow-sm text-[10px] font-black uppercase tracking-widest active:scale-95 shrink-0 disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            {isExporting ? "Exporting..." : "Export to Excel"}
          </button>
          <BulkUpload />
          <Link
            href="/admin/products/new"
            className="bg-[#284b8c] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5e9baf] transition-all shadow-lg shadow-[#284b8c]/20 font-black uppercase tracking-widest text-[10px] active:scale-95 shrink-0"
          >
            <Plus className="h-4 w-4" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Filter & View Toggle Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
        <div className="w-full lg:w-auto flex-1 flex flex-col md:flex-row items-center gap-3">
          <div className="w-full md:w-auto flex-1 max-w-sm">
            <SearchInput />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => {
                const params = new URLSearchParams(window.location.search);
                if (e.target.value) {
                  params.set("category", e.target.value);
                } else {
                  params.delete("category");
                }
                params.delete("page"); // Reset to page 1
                window.location.href = `${window.location.pathname}?${params.toString()}`;
              }}
              className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-2.5 border text-slate-900 text-[11px] font-black uppercase tracking-widest transition-all outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end lg:self-auto">
          {/* Top Pagination Controls */}
          <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">
                {startIdx}-{endIdx}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                of {totalProducts}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-1">
              <Link
                href={{ query: { search: searchTerm, category: selectedCategory, page: Math.max(1, currentPage - 1) } }}
                className={`p-1.5 rounded-lg transition-all ${currentPage === 1
                  ? "text-slate-200 cursor-not-allowed"
                  : "text-slate-600 hover:bg-white hover:text-[#284b8c] hover:shadow-sm"}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
              <Link
                href={{ query: { search: searchTerm, category: selectedCategory, page: Math.min(totalPages, currentPage + 1) } }}
                className={`p-1.5 rounded-lg transition-all ${currentPage === totalPages
                  ? "text-slate-200 cursor-not-allowed"
                  : "text-slate-600 hover:bg-white hover:text-[#284b8c] hover:shadow-sm"}`}
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-[#284b8c]" : "text-slate-400 hover:text-slate-600"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-[#284b8c]" : "text-slate-400 hover:text-slate-600"}`}
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Main Content Area */}
        <div className="w-full">
          {initialProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Search className="h-8 w-8 text-slate-200" />
              </div>
              <h3 className="text-slate-800 font-black uppercase tracking-tight">No Products Found</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2 px-10">
                {searchTerm ? `No products matching "${searchTerm}" found.` : "Your product catalog is empty. Add a new product to begin."}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {initialProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-50">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {initialProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-[13px] font-black text-slate-800 group-hover:text-[#5e9baf] transition-colors uppercase tracking-tight leading-none mb-1">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {product.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-white border border-slate-100 text-[10px] font-black text-[#284b8c] uppercase tracking-widest rounded-lg shadow-sm">
                          {product.categoryName || "Uncategorized"}
                        </span>
                        {product.categorySpecification && (
                          <div className="text-[9px] text-slate-400 font-bold uppercase mt-1 opacity-60 italic">{product.categorySpecification}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={getProductLink(product)}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-[#5e9baf] hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/products/edit/${product.id}`}
                            className="p-2 text-slate-400 hover:text-[#284b8c] hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <DeleteProductButton
                            productId={product.id}
                            productName={product.name}
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-100 transition-all"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
