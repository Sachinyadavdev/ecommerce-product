"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import SearchDropdown from "@/components/ui/SearchDropdown";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductSearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        setShowDropdown(true);
        try {
          const res = await fetch(
            `/api/products/search?q=${encodeURIComponent(query.trim())}`,
          );
          const data = await res.json();
          setResults(data);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-slate-50 py-10 md:py-16 relative overflow-hidden font-body border-t border-slate-100">
      {/* Technical Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Technical Grid Pattern - More Subtle */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                            linear-gradient(to right, #284b8c 1px, transparent 1px),
                            linear-gradient(to bottom, #284b8c 1px, transparent 1px)
                        `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative Accents - Thinner/Sharper */}
        <div className="absolute top-0 right-[15%] w-[1px] h-full bg-slate-200/50 -rotate-12 transform origin-top" />
        <div className="absolute top-0 right-[18%] w-[1px] h-full bg-slate-200/30 -rotate-12 transform origin-top" />
        <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] bg-slate-200/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        {/* Subtle Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(40,75,140,0.015),transparent)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Compact Label - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-2 text-[9px] font-black text-[#284b8c]/50 uppercase tracking-[0.4em]">
              <Sparkles className="w-2.5 h-2.5" />
              Precision Discovery
            </span>
          </motion.div>

          <div className="w-full max-w-3xl relative" ref={dropdownRef}>
            {/* Compact Search Bar with Premium Shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.99 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <form
                onSubmit={handleSearch}
                className="relative group overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] focus-within:ring-4 focus-within:ring-[#284b8c]/5 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="pl-5 text-slate-400">
                    <Search className="h-5 w-5" />
                  </div>

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onFocus={() => query.length >= 2 && setShowDropdown(true)}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products"
                    className="w-full h-12 md:h-14 px-4 text-slate-800 text-base md:text-lg placeholder:text-slate-300 focus:outline-none font-bold bg-transparent"
                  />

                  <AnimatePresence>
                    {query && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        type="button"
                        onClick={() => setQuery("")}
                        className="p-2 mr-1 text-slate-300 hover:text-slate-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="h-12 md:h-14 px-6 md:px-10 bg-[#284b8c] hover:bg-[#203c70] text-white font-black text-xs md:text-sm uppercase tracking-widest transition-all active:scale-[0.98] shrink-0 flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </form>

              <SearchDropdown
                products={results}
                loading={loading}
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
              />
            </motion.div>
          </div>

          {/* Compact Bottom Links - Thinner/Lighter */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 pt-2">
            <Link
              href="/e-catalog"
              className="group flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-[#284b8c] transition-all uppercase tracking-widest"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded bg-white border border-slate-100 group-hover:bg-[#284b8c] group-hover:text-white transition-all shadow-sm">
                <Search className="w-3 h-3" />
              </span>
              <span className="border-b border-transparent group-hover:border-[#284b8c] transition-all">
                Explore e-Catalog
              </span>
            </Link>
            {/* <div className="hidden md:block h-4 w-px bg-slate-200" /> */}

            {/* <div className="flex items-center gap-4">
                             <div className="flex items-center gap-2 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Available Parts:</span>
                                 <span className="text-[10px] font-black text-[#284b8c]">5000+</span>
                             </div>
                        </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
