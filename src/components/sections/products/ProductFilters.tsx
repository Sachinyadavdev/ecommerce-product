"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  Filter,
  ChevronDown,
  Layers,
  Hash,
  Box,
  Cpu,
  Palette,
  Droplets,
  Settings2,
  Trash2,
  Search,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filterGroups: FilterGroup[];
  title: string;
  totalProducts: number;
  searchQuery?: string;
}

const getIcon = (id: string) => {
  switch (id) {
    case "categoryNumber":
      return <Hash className="h-4 w-4" />;
    case "series":
      return <Settings2 className="h-4 w-4" />;
    case "way":
      return <Cpu className="h-4 w-4" />;
    case "material":
      return <Box className="h-4 w-4" />;
    case "colour":
      return <Palette className="h-4 w-4" />;
    case "mf":
      return <Layers className="h-4 w-4" />;
    case "sealed":
      return <Droplets className="h-4 w-4" />;
    default:
      return <Filter className="h-4 w-4" />;
  }
};

const FilterGroupDropdown = ({ 
  group, 
  activeValues, 
  isOpen, 
  onToggle, 
  onSelect 
}: { 
  group: FilterGroup;
  activeValues: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) => {
  const isActive = activeValues.length > 0;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
          isActive
            ? "bg-primary/5 border-primary/20 text-primary shadow-sm"
            : "bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <span className={isActive ? "text-primary" : "text-slate-400"}>
          {getIcon(group.id)}
        </span>
        <span className="truncate max-w-[120px] md:max-w-none">
          {activeValues.length > 0 
            ? `${group.label}: ${activeValues[0]}${activeValues.length > 1 ? ` (+${activeValues.length - 1})` : ''}`
            : group.label
          }
        </span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${isActive ? "text-primary" : "text-slate-300"}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`dropdown-${group.id}`}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-3 w-[320px] bg-white border border-slate-100/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-[100] overflow-hidden p-4 backdrop-blur-xl"
          >
            {group.options.length > 8 ? (
              <div className="space-y-4">
                <div className="relative group/search">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300 group-focus-within/search:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder={`Search ${group.label}...`}
                    autoFocus
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-11 pr-5 py-3 text-[11px] font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all"
                    onChange={(e) => {
                      const search = e.target.value.toLowerCase();
                      const items = document.querySelectorAll(`[data-group="${group.id}"]`);
                      items.forEach((item: any) => {
                        const text = item.textContent.toLowerCase();
                        item.style.display = text.includes(search) ? "flex" : "none";
                      });
                    }}
                  />
                </div>
                <div className="max-h-72 overflow-y-auto custom-scrollbar pr-1 space-y-1.5">
                      {[...group.options]
                        .sort((a, b) => {
                          const aSelected = activeValues.includes(a.value);
                          const bSelected = activeValues.includes(b.value);
                          if (aSelected && !bSelected) return -1;
                          if (!aSelected && bSelected) return 1;
                          return 0;
                        })
                        .map((opt) => {
                          const isSelected = activeValues.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              data-group={group.id}
                              onClick={() => onSelect(opt.value)}
                              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                isSelected
                                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                                  : "bg-white border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span className="truncate pr-2">{opt.label}</span>
                              {isSelected ? (
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_white]" />
                              ) : (
                                <div className="w-1 h-1 rounded-full bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </button>
                          );
                        })}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {[...group.options]
                  .sort((a, b) => {
                    const aSelected = activeValues.includes(a.value);
                    const bSelected = activeValues.includes(b.value);
                    if (aSelected && !bSelected) return -1;
                    if (!aSelected && bSelected) return 1;
                    return 0;
                  })
                  .map((opt) => {
                    const isSelected = activeValues.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => onSelect(opt.value)}
                        className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border duration-300 ${
                          isSelected
                            ? "bg-primary border-primary text-white shadow-xl shadow-primary/25 scale-[1.08] relative z-10"
                            : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileFilterContent = ({ 
  filterGroups, 
  searchParams, 
  expandedGroups, 
  setExpandedGroups, 
  updateFilter, 
  clearAll, 
  activeFiltersCount 
}: {
  filterGroups: FilterGroup[];
  searchParams: URLSearchParams;
  expandedGroups: Record<string, boolean>;
  setExpandedGroups: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  updateFilter: (id: string, value: string) => void;
  clearAll: () => void;
  activeFiltersCount: number;
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-gray-100 pb-5">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-xl">
          <Filter className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-black text-primary text-[10px] uppercase tracking-[0.2em]">
          Refine Search
        </h3>
      </div>
      {activeFiltersCount > 0 && (
        <button 
          onClick={clearAll}
          className="text-[9px] font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors uppercase tracking-widest"
        >
          <Trash2 className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>

    <div className="space-y-2">
      {filterGroups.map((group) => {
        const activeValues = searchParams.getAll(group.id);
        const isActive = activeValues.length > 0;

        return (
          <div
            key={group.id}
            className={`group relative rounded-xl border transition-all duration-300 ${
              isActive
                ? "border-primary/20 bg-primary/[0.02]"
                : "border-slate-100 bg-white hover:border-slate-200"
            }`}
          >
            <button
              onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                }`}>
                  {getIcon(group.id)}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">Filter by</span>
                  <span className={`text-[13px] font-black uppercase tracking-widest ${isActive ? "text-primary" : "text-slate-700"}`}>
                    {group.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isActive && (
                   <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                     {activeValues.length} Selected
                   </span>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${expandedGroups[group.id] ? "rotate-180" : ""} ${isActive ? "text-primary" : "text-slate-300"}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedGroups[group.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-2">
                    <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100/50">
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((opt) => {
                          const isSelected = activeValues.includes(opt.value);
                          return (
                            <button
                              key={opt.value}
                              onClick={() => updateFilter(group.id, opt.value)}
                              className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                isSelected
                                  ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                                  : "bg-white border-slate-100 text-slate-500 hover:border-slate-300"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  </div>
);

export default function ProductFilters({ 
  filterGroups, 
  title, 
  totalProducts,
  searchQuery 
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    categoryId: true,
    series: true,
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key]) => key !== "q" && key !== "page" && key !== "limit",
  );

  const activeFiltersCount = activeFilters.length;

  useEffect(() => {
    if (activeFiltersCount > 0) setShowFilters(true);
  }, [activeFiltersCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (activeDropdown && filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeDropdown]);

  const updateFilter = (id: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(id);
    
    if (currentValues.includes(value)) {
      // Toggle off: remove this specific value
      const newValues = currentValues.filter(v => v !== value);
      params.delete(id);
      newValues.forEach(v => params.append(id, v));
    } else {
      // Toggle on: add this value
      params.append(id, value);
    }
    
    params.delete("page");
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    if (q) params.set("q", q);
    // Keep the current limit when clearing filters
    const limit = searchParams.get("limit");
    if (limit) params.set("limit", limit);
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?${params.toString()}`, { scroll: false });
  };

  return (
    <div ref={filterRef} className="w-full relative overflow-visible">
      <AnimatePresence mode="wait">
        {!showFilters ? (
          /* --- Header View --- */
          <motion.div
            key="header-view"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white px-4 py-5 md:px-0 md:py-4 border-b border-slate-100 md:border-b-0 md:bg-transparent"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                <h2 className="text-xl md:text-2xl font-black text-[#5e9baf] tracking-tight leading-[1.1] md:leading-tight">
                  {searchQuery ? (
                    <>Results for <span className="text-primary italic">"{searchQuery}"</span></>
                  ) : (
                    title
                  )}
                </h2>
                
                <div className="inline-flex items-center gap-2 text-[9px] md:text-[8px] font-black text-primary uppercase tracking-[0.2em] bg-primary/5 px-3 py-1.5 md:py-1 rounded-full border border-primary/10 w-fit">
                  <div className="w-1.5 h-1.5 md:w-1 md:h-1 rounded-full bg-primary/40 animate-pulse" />
                  <span>{totalProducts} Models</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Desktop Toggle Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="hidden lg:flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-white hover:bg-[#3f863e] transition-all duration-500 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filter Options</span>
              </button>

              {/* Mobile Toggle - Icon Only */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-white shadow-xl shadow-primary/25 active:scale-90 hover:bg-[#3f863e] transition-all duration-500"
              >
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* --- Filters View (Bar) --- */
          <motion.div
            key="filters-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full"
          >
            <div className="bg-white border border-slate-100 shadow-[0_15px_45px_rgb(0,0,0,0.04)] p-4 md:p-5 rounded-2xl flex items-center justify-between gap-4 md:gap-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 md:gap-4 flex-1">
                {/* Desktop Filter Groups */}
                <div className="hidden lg:flex items-center gap-3 flex-wrap">
                {filterGroups.map((group) => (
                  <FilterGroupDropdown 
                    key={group.id} 
                    group={group} 
                    activeValues={searchParams.getAll(group.id)}
                    isOpen={activeDropdown === group.id}
                    onToggle={() => setActiveDropdown(activeDropdown === group.id ? null : group.id)}
                    onSelect={(value) => {
                      updateFilter(group.id, value);
                    }}
                  />
                ))}
                </div>

                {/* Mobile/Tablet "Refine" Button when filters are active */}
                <button
                  onClick={() => setIsMobileOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 text-slate-600 font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all"
                >
                  <Filter className="h-3.5 w-3.5" />
                  <span>Refine</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[8px] animate-in zoom-in">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4">
                {activeFiltersCount > 0 ? (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] border border-red-100 shadow-lg shadow-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar - Portaled to Body */}
      {mounted && isMobileOpen && createPortal(
        <AnimatePresence>
          <div key="mobile-modal-overlay" className="fixed inset-0 z-[9999] lg:hidden">
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 h-[92%] bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-3xl overflow-hidden flex flex-col"
            >
              <div className="flex flex-col items-center px-6 pt-3 pb-6 border-b border-slate-100 bg-white">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full mb-6" />
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Product</span>
                    <h2 className="font-black text-2xl text-primary tracking-tight">Refine Selection</h2>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-3.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all active:scale-95"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar bg-white">
                <MobileFilterContent 
                  filterGroups={filterGroups}
                  searchParams={new URLSearchParams(searchParams.toString())}
                  expandedGroups={expandedGroups}
                  setExpandedGroups={setExpandedGroups}
                  updateFilter={updateFilter}
                  clearAll={clearAll}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
              <div className="p-6 bg-white border-t border-slate-100/50 pb-8">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full bg-primary text-white py-4.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:bg-[#3f863e] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-3"
                >
                  <span>Apply Filters</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
