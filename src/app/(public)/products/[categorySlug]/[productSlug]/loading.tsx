
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="bg-white min-h-screen">
      {/* Skeleton PageHeader */}
      <div className="relative min-h-[180px] md:min-h-[210px] bg-[#EEF2FF] flex items-center overflow-hidden mb-0 pt-20 md:pt-24">
        <div className="container mx-auto px-6 max-w-7xl relative z-30 pb-4">
          <div className="w-48 h-3 bg-indigo-100/50 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-0.5 md:py-1 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-4 lg:gap-8 items-start">
          
          {/* LEFT: Technical Viewport Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-[12px] relative overflow-hidden border border-slate-100">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-20 bg-slate-50 rounded-lg border border-slate-100" />
              ))}
            </div>
            <div className="p-4 bg-indigo-50/20 rounded-[12px] border border-indigo-100/40 space-y-3">
              <div className="w-32 h-4 bg-indigo-100/40 rounded-full" />
              <div className="w-full h-12 bg-white rounded-xl border border-slate-100" />
            </div>
          </div>

          {/* RIGHT: Industrial Intelligence Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-0.5 w-10 bg-slate-100" />
                <div className="w-32 h-4 bg-slate-100 rounded-full" />
              </div>
              <div className="w-3/4 h-16 bg-slate-100 rounded-2xl" />
              <div className="flex gap-8">
                <div className="w-32 h-10 bg-slate-50 rounded-xl" />
                <div className="w-32 h-10 bg-slate-50 rounded-xl" />
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="border-l-4 border-slate-100 pl-8 space-y-3">
              <div className="w-full h-4 bg-slate-50 rounded-full" />
              <div className="w-full h-4 bg-slate-50 rounded-full" />
              <div className="w-2/3 h-4 bg-slate-50 rounded-full" />
            </div>

            {/* Technical Sheet Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-48 h-6 bg-slate-100 rounded-lg" />
                  <div className="w-32 h-3 bg-slate-50 rounded-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-14 bg-white border border-slate-50 rounded-xl p-3 flex items-center justify-between">
                    <div className="w-16 h-3 bg-slate-50 rounded-full" />
                    <div className="w-12 h-3 bg-slate-100 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
