"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronRight } from "lucide-react";

export default function DisclaimerPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the disclaimer has already been accepted
    const isAccepted = localStorage.getItem("besmak_disclaimer_accepted");
    if (!isAccepted) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("besmak_disclaimer_accepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-110000 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={handleAccept}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
          >
            {/* Visual Header Decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#163c8c] via-[#02a957] to-[#163c8c]" />

            <div className="p-8 sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-900/20">
                <AlertTriangle className="h-7 w-7 text-amber-600 dark:text-amber-400" />
              </div>

              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Portfolio Project Notice
              </h2>

              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed">
                  Welcome! This website is a <strong>clone</strong> developed exclusively for portfolio demonstration and technical showcase purposes.
                </p>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800/50">
                  <p className="font-medium text-slate-900 dark:text-slate-100">Legal Disclaimer:</p>
                  <p className="mt-1 italic">
                    It is not affiliated with, endorsed by, or representing <strong>Besmak India</strong>. All trademarks and brand rights are owned by their respective holders.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <a
                  href="https://besmakindia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-sm font-medium text-[#163c8c] transition-colors hover:text-[#02a957] dark:text-blue-400 dark:hover:text-green-400"
                >
                  Visit Official Site
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                <button
                  onClick={handleAccept}
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#163c8c] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#0c2458] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                >
                  <span className="relative z-10">Proceed to Site</span>
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite]" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
