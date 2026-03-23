"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="bg-[#fcfdfe] min-h-screen pb-12">
      {/* Skeleton Header - Matching PageHeader */}
      <div className="relative min-h-[180px] md:min-h-[210px] bg-[#EEF2FF] flex items-center overflow-hidden mb-0 pt-20 md:pt-24">
        <div className="absolute inset-0 bg-[#EEF2FF] opacity-30" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="w-48 h-3 bg-primary/10 rounded-full mb-4 opacity-50" />
          <div className="w-64 h-10 bg-primary/20 rounded-xl opacity-30 mb-8" />
        </div>
      </div>

      <div className="container mx-auto px-6 pt-0 pb-12 max-w-7xl mt-6 relative z-40">
        <div className="flex flex-col gap-6">
          {/* Skeleton Filter Bar Sticky */}
          <div className="sticky top-[75px] z-50 bg-[#fcfdfe] py-2">
            <div className="z-40 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-48 h-8 bg-slate-100/50 rounded-lg" />
                  <div className="w-px h-10 bg-slate-50 mx-2" />
                  <div className="hidden lg:flex items-center gap-3">
                    <div className="w-32 h-10 bg-slate-50 rounded-xl" />
                    <div className="w-32 h-10 bg-slate-50 rounded-xl" />
                    <div className="w-32 h-10 bg-slate-50 rounded-xl" />
                  </div>
                </div>
                <div className="w-40 h-10 bg-primary/5 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Skeleton Grid - Matching ProductGrid */}
          <div className="flex-1 min-w-0">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-100 p-3 space-y-4 shadow-sm">
                    <div className="h-64 bg-slate-50 rounded-lg relative overflow-hidden">
                       <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                       <div className="w-16 h-3 bg-primary/5 rounded-full" />
                       <div className="w-full h-5 bg-slate-100 rounded-full" />
                       <div className="w-2/3 h-4 bg-slate-50 rounded-full" />
                    </div>
                    <div className="pt-2 border-t border-slate-50 flex justify-between">
                       <div className="w-20 h-3 bg-slate-50 rounded-full" />
                       <div className="w-6 h-6 rounded-full bg-slate-50" />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
