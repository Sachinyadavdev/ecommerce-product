"use client";

import Link from "next/link";
import { Upload } from "lucide-react";

export default function BulkUpload() {
  return (
    <Link
      href="/admin/products/bulk"
      className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-white hover:border-primary hover:text-primary hover:shadow-md transition-all text-[10px] font-black uppercase tracking-widest active:scale-95 shrink-0"
    >
      <Upload className="h-3.5 w-3.5" />
      Bulk Catalog Tools
    </Link>
  );
}
