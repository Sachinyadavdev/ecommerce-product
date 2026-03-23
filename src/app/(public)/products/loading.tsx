
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="bg-[#fcfdfe] min-h-screen">
      {/* Skeleton Header */}
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="w-48 h-4 bg-gray-200 rounded-full mb-6 opacity-50" />
          <div className="w-96 h-12 bg-gray-200 rounded-full mb-4" />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 p-6 space-y-6 shadow-sm">
              <div className="aspect-[4/3] bg-gray-50 rounded-[1.5rem] relative overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </div>
              <div className="space-y-3">
                <div className="w-24 h-4 bg-gray-50 rounded-full" />
                <div className="w-full h-6 bg-gray-100 rounded-full" />
                <div className="w-2/3 h-4 bg-gray-50 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
