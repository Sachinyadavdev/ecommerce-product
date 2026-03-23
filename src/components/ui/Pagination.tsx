"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  limit: number;
}

export default function Pagination({ totalItems, currentPage, limit }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleLimitChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (totalItems <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-6 border-t border-slate-100">
      {/* Items Per Page Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
          <LayoutGrid className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Show:</span>
          <select 
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="bg-transparent text-[10px] font-black text-slate-800 focus:outline-none cursor-pointer uppercase tracking-tight"
          >
            {[12, 24, 48, 96].map(val => (
              <option key={val} value={val}>{val} Parts</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-wider mb-0.5">Results Scope</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {Math.min((currentPage - 1) * limit + 1, totalItems)} - {Math.min(currentPage * limit, totalItems)} of {totalItems}
          </span>
        </div>
      </div>

      {/* Page Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#486b97] hover:border-[#486b97]/30 disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all group active:scale-95 shadow-sm"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => {
                if (totalPages <= 7) return true;
                if (p === 1 || p === totalPages) return true;
                return Math.abs(p - currentPage) <= 1;
              })
              .map((p, i, arr) => (
                <div key={p} className="flex items-center gap-1.5">
                  {i > 0 && arr[i-1] !== p - 1 && (
                    <span className="text-slate-300 font-bold px-1 tracking-widest">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all border shadow-sm active:scale-95 ${
                      currentPage === p
                        ? "bg-[#486b97] border-[#486b97] text-white shadow-lg shadow-[#486b97]/20 scale-105"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-[#486b97]"
                    }`}
                  >
                    {p}
                  </button>
                </div>
              ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#486b97] hover:border-[#486b97]/30 disabled:opacity-30 disabled:hover:border-slate-100 disabled:hover:text-slate-400 transition-all group active:scale-95 shadow-sm"
          >
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
