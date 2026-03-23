"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface MatingPartsValueProps {
  value: string;
}

export default function MatingPartsValue({ value }: MatingPartsValueProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Split by comma and trim
  const parts = value.split(',').map(p => p.trim()).filter(Boolean);
  
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX + (rect.width / 2)
      });
    }
  };

  const handleToggle = () => {
    if (!showTooltip) {
      updatePosition();
    }
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    if (showTooltip) {
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showTooltip]);

  // Close tooltip on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Also check if the click was inside the portal (we can't easily do that without a ref to the portal content)
        // But we can check if the target has an ancestor that is our portal
        const target = event.target as HTMLElement;
        if (!target.closest('.mating-parts-portal')) {
            setShowTooltip(false);
        }
      }
    };
    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTooltip]);

  if (parts.length <= 2) {
    return <span className="text-xs font-bold text-slate-600 leading-tight text-right">{value}</span>;
  }

  const initialParts = parts.slice(0, 2).join(', ');

  const TooltipContent = (
    <AnimatePresence>
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          style={{
            position: 'absolute',
            top: coords.top - 12, // Above the button
            left: coords.left,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
          className="mating-parts-portal pointer-events-auto"
        >
          <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100 p-4 font-body min-w-[240px] max-w-[320px] relative">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/5 rounded-md">
                   <Info className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Mating Parts ({parts.length})</span>
              </div>
              <button 
                onClick={() => setShowTooltip(false)} 
                className="p-1 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {parts.map((part, idx) => (
                <div key={idx} className="bg-slate-50/50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-700 shadow-sm hover:border-primary/20 transition-colors">
                  {part}
                </div>
              ))}
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-r border-b border-slate-100 rotate-45 shadow-[4px_4px_4px_rgba(0,0,0,0.02)]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative flex flex-col items-end gap-1" ref={containerRef}>
      <span className="text-xs font-bold text-slate-600 leading-tight text-right italic opacity-90">
        {initialParts}
        <span className="text-slate-400 font-normal">...</span>
      </span>
      
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
            showTooltip 
            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
            : 'text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-md'
        }`}
      >
        View Specs
        <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${showTooltip ? 'rotate-180' : ''}`} />
      </button>

      {mounted && createPortal(TooltipContent, document.body)}
    </div>
  );
}
