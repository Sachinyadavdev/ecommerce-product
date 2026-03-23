"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Globe,
  Settings,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  MoreVertical,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function PagesAdmin() {
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/pages");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      toast.error("Failed to load pages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (slug === "home") {
      toast.error("Cannot delete home page");
      return;
    }
    if (!confirm("Are you sure? All sections on this page will be deleted."))
      return;

    try {
      const response = await fetch(`/api/admin/pages/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Page deleted");
        fetchPages();
      } else {
        const err = await response.json();
        throw new Error(err.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  );

  const getSEOStatus = (page: any) => {
    let score = 0;
    if (page.description?.length >= 120) score += 1;
    if (page.keywords?.length > 0) score += 1;
    if (page.title?.length > 10) score += 1;
    
    if (score === 3) return { label: "Optimized", color: "text-emerald-500", bg: "bg-emerald-50" };
    if (score === 0) return { label: "Needs Work", color: "text-red-500", bg: "bg-red-50" };
    return { label: "Improving", color: "text-amber-500", bg: "bg-amber-50" };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700 site-content">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-heading tracking-tight flex items-center gap-3">
            Site Channels
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-blue-100">
              {pages.length} Pages
            </span>
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage and optimize your website's primary landing pages.</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 group text-sm"
        >
          <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
          Create New Page
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by title or URL slug..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
          />
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 whitespace-nowrap">
          {filteredPages.length} Results
        </div>
      </div>

      {/* Page List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredPages.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No pages matching your search</h3>
            <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or create a new page.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-heading uppercase tracking-widest">Page Structure</th>
                    <th className="px-6 py-4 text-[10px] font-black text-heading uppercase tracking-widest">URL Route</th>
                    <th className="px-6 py-4 text-[10px] font-black text-heading uppercase tracking-widest hidden md:table-cell">SEO Health</th>
                    <th className="px-6 py-4 text-[10px] font-black text-heading uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredPages
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((page, idx) => {
                      const seo = getSEOStatus(page);
                      return (
                        <motion.tr
                          key={page.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="group hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${page.isActive ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                                <Globe className="h-4 w-4" />
                              </div>
                              <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{page.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-600">
                              /{page.slug === "home" ? "" : page.slug}
                            </code>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${seo.bg} ${seo.color}`}>
                              {seo.label === "Optimized" ? <CheckCircle2 className="h-2.5 w-2.5" /> : <AlertCircle className="h-2.5 w-2.5" />}
                              {seo.label}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a
                                href={page.slug === "home" ? "/" : `/${page.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                title="View Live"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                              <Link
                                href={`/admin/pages/edit/${page.id}`}
                                className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                title="Manage Settings"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(page.id, page.slug)}
                                className={`p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all ${page.slug === "home" ? "invisible" : ""}`}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPages.length > itemsPerPage && (
              <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredPages.length)} of {filteredPages.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(filteredPages.length / itemsPerPage) }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                          currentPage === i + 1 
                          ? "bg-[#284b8c] text-white shadow-lg shadow-blue-900/10" 
                          : "text-gray-400 hover:text-gray-900 hover:bg-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredPages.length / itemsPerPage), p + 1))}
                    disabled={currentPage === Math.ceil(filteredPages.length / itemsPerPage)}
                    className="p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
