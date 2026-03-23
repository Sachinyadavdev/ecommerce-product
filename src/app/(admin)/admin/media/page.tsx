"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Upload,
  Trash2,
  Loader2,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  FileIcon,
  Image as ImageIcon,
  Filter,
  ShieldCheck,
  Info
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  contentType: string;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showUnused, setShowUnused] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchMedia = useCallback(async (pageNum: number, q: string, unused: boolean) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/media?page=${pageNum}&limit=20&q=${encodeURIComponent(q)}&unused=${unused}`);
      if (!res.ok) throw new Error("Failed to fetch media");
      const data = await res.json();
      setMedia(data.media);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia(page, debouncedQuery, showUnused);
  }, [fetchMedia, page, debouncedQuery, showUnused]);

  const handleToggleUnused = () => {
    setShowUnused(!showUnused);
    setPage(1);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const res = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!res.ok) throw new Error("Upload failed");

      if (page === 1 && !debouncedQuery) {
        await fetchMedia(1, "", showUnused); // Refresh if on first page and no search
      } else {
        setSearchQuery(""); // Clear search to see new upload
        setPage(1);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const res = await fetch(
        `/api/media?id=${id}&url=${encodeURIComponent(url)}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("Delete failed");

      if (media.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await fetchMedia(page, debouncedQuery, showUnused);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const copyToClipboard = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyingId(id);
      setTimeout(() => setCopyingId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#5e9baf]/10 rounded-2xl flex items-center justify-center text-[#5e9baf] shrink-0">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#5e9baf] tracking-tight leading-tight">
              Media Library
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${showUnused ? 'bg-amber-500' : 'bg-[#5e9baf]'} animate-pulse`} />
                {showUnused ? `${totalItems} Unused Assets` : `${totalItems} items in storage`}
              </p>
              {showUnused && (
                <div className="relative flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 rounded-full border border-green-500/20 group/security cursor-help">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] font-black text-green-700 uppercase tracking-tighter">100% Safe Audit</span>
                  {/* Tooltip */}
                  <div className="absolute top-full left-0 mt-2 p-3 bg-[#1a2345] text-white rounded-xl text-[10px] w-64 opacity-0 group-hover/security:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl border border-white/10 leading-relaxed font-bold">
                    <p className="mb-2 text-[#5e9baf]">Deep Security Audit Active:</p>
                    <ul className="space-y-1 text-white/70 list-disc pl-3">
                      <li>Scanned all Database tables & JSON fields</li>
                      <li>Scanned all Source Code (TSX, CSS, JSON)</li>
                      <li>Verified 35+ hardcoded component assets</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Unused Filter Toggle */}
          <button
            onClick={handleToggleUnused}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95 border ${
              showUnused
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200'
            }`}
          >
            <Filter className={`h-4 w-4 ${showUnused ? 'fill-amber-500' : ''}`} />
            <span>Unused Items</span>
          </button>

          {/* Search Bar */}
          <div className="relative group flex-1 sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by filename..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-11 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-slate-700 placeholder:text-slate-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchMedia(page, debouncedQuery, showUnused)}
              className="p-3 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 rounded-2xl transition-all shadow-sm active:scale-95"
              title="Refresh Gallery"
            >
              <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <label className="flex items-center justify-center gap-3 bg-[#284b8c] text-white px-6 py-3 rounded-2xl font-bold text-sm cursor-pointer hover:bg-[#3f863e] transition-all shadow-xl shadow-blue-900/10 active:scale-95 group">
              <Upload className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>{uploading ? "Uploading..." : "Upload New"}</span>
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">!</div>
              <span className="font-semibold">{error}</span>
            </div>
            <button onClick={() => setError(null)} className="p-2 hover:bg-red-100 rounded-xl transition-colors">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && media.length === 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-200"
        >
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {debouncedQuery ? "No matches found" : "Your gallery is empty"}
          </h3>
          <p className="text-slate-500 font-medium">
            {debouncedQuery 
              ? `We couldn't find any results for "${debouncedQuery}"`
              : "Start building your library by uploading some assets."}
          </p>
          {debouncedQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-8 text-blue-600 font-bold text-sm hover:underline"
            >
              Clear search filter
            </button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {media.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-1"
                >
                  <div className="aspect-square relative bg-slate-50 overflow-hidden">
                    {item.contentType.startsWith("image/") ? (
                      <Image
                        src={item.url}
                        alt={item.filename}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                        sizes="(max-width: 768px) 50vw, 20vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-300 transition-all group-hover:blur-sm">
                        <FileIcon className="h-12 w-12 mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {item.contentType.split("/")[1] || "FILE"}
                        </span>
                      </div>
                    )}

                    {/* Industrial HUD UI Overlay - Refined with Icons Only & Blue Tint */}
                    <div className="absolute inset-0 bg-[#284b8c]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 z-10">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(item.id, item.url)}
                        className={`p-4 ${copyingId === item.id ? 'bg-green-500' : 'bg-white/90'} rounded-2xl text-slate-900 shadow-xl transition-all hover:bg-white`}
                        title="Copy Public URL"
                      >
                        {copyingId === item.id ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </motion.button>
                      
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-white/90 rounded-2xl text-slate-900 shadow-xl transition-all hover:bg-white"
                        title="Open Original"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item.id, item.url)}
                        className="p-4 bg-red-500/90 rounded-2xl text-white shadow-xl transition-all hover:bg-red-600"
                        title="Delete Resource"
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white border-t border-slate-50">
                    <p
                      className="text-xs font-bold text-slate-800 truncate mb-1"
                      title={item.filename}
                    >
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-medium text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3 text-slate-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination System */}
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 pb-20">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Showing Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-4 rounded-2xl border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95 shadow-sm text-slate-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {(() => {
                  const maxPages = Math.max(1, totalPages);
                  const pages = [];
                  for (let i = 1; i <= maxPages; i++) {
                    if (i === 1 || i === maxPages || Math.abs(page - i) <= 1) {
                      pages.push(i);
                    } else if (pages[pages.length - 1] !== '...') {
                      pages.push('...');
                    }
                  }
                  return pages.map((p, index) => (
                    <button
                      key={index}
                      onClick={() => typeof p === 'number' && setPage(p)}
                      disabled={p === '...'}
                      className={`h-12 min-w-[3rem] px-4 flex items-center justify-center rounded-2xl border transition-all font-bold text-sm ${
                        page === p
                          ? "bg-[#284b8c] border-[#284b8c] text-white shadow-xl shadow-blue-900/10"
                          : p === '...' 
                          ? "border-transparent text-slate-300 cursor-default" 
                          : "border-white bg-white hover:border-slate-200 text-slate-500 shadow-sm"
                      }`}
                    >
                      {p}
                    </button>
                  ));
                })()}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(Math.max(1, totalPages), p + 1))}
                disabled={page === Math.max(1, totalPages)}
                className="p-4 rounded-2xl border border-slate-200 bg-white disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95 shadow-sm text-slate-600"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
