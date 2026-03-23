"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { isValidImageSrc } from "@/lib/image-utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(false);
  const [modalZoomPos, setModalZoomPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const modalImageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validImages = Array.isArray(images) ? images.filter(isValidImageSrc) : [];
  const hasImages = validImages.length > 0;
  const currentImage = hasImages ? validImages[activeIndex] : null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % validImages.length);
    setModalZoom(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    setModalZoom(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleModalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalImageRef.current || !modalZoom) return;
    const { left, top, width, height } = modalImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setModalZoomPos({ x, y });
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image Viewport with Amazon-style Zoom */}
      <div
        ref={containerRef}
        className="group relative bg-white rounded-[12px] aspect-square flex items-center justify-center overflow-hidden border border-slate-100 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onClick={() => setIsModalOpen(true)}
      >
        <AnimatePresence mode="wait">
          {hasImages ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-4"
            >
              <Image
                src={currentImage!}
                alt={`${productName} - View ${activeIndex + 1}`}
                fill
                className={`object-contain transition-opacity duration-300 ${isZooming ? "opacity-0" : "opacity-100"}`}
                priority
              />

              {/* Zoom Overlay */}
              {isZooming && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    backgroundImage: `url(${currentImage})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: "250%",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              )}
            </motion.div>
          ) : (
            <div key="no-image" className="flex flex-col items-center justify-center text-slate-200">
              <ImageIcon className="h-20 w-20 mb-4 opacity-10" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Industrial Asset Missing</span>
            </div>
          )}
        </AnimatePresence>

        {/* Global Navigation Controls */}
        {hasImages && validImages.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-[12px] shadow-lg backdrop-blur-md transition-all pointer-events-auto"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-white/90 hover:bg-white text-slate-800 rounded-[12px] shadow-lg backdrop-blur-md transition-all pointer-events-auto"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-[12px] shadow-sm opacity-0 group-hover:opacity-100 transition-all z-20 flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Click to Expand</span>
          <Maximize2 className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* Modern Thumbnail Strip */}
      {hasImages && validImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1">
          {validImages.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-16 w-16 shrink-0 rounded-[12px] border-2 transition-all overflow-hidden bg-white p-1 ${activeIndex === idx
                ? "border-primary shadow-sm"
                : "border-slate-100 hover:border-slate-200"
                }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={url}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className={`object-contain ${activeIndex === idx ? "scale-105" : "opacity-60 hover:opacity-100"}`}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal - PORTALED TO FIX HEADER OVERLAP */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && hasImages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100000] bg-white flex items-center justify-center p-4 md:p-8"
              style={{ isolation: 'isolate' }}
            >
              {/* Floating Fallback Close Button - Always on Top */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="fixed top-6 right-6 z-[100010] p-4 bg-slate-900 text-white rounded-[12px] shadow-2xl hover:bg-primary transition-all active:scale-95 md:hidden"
                aria-label="Close Modal"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Top Bar with Navigation Info & Close */}
              <div className="absolute top-0 left-0 right-0 h-20 px-8 flex items-center justify-between border-b border-slate-50 bg-white/80 backdrop-blur-md z-[100001]">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Asset Inspection</span>
                  <p className="text-sm font-bold text-slate-900">{productName}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-slate-50 px-4 py-1.5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
                    {activeIndex + 1} / {validImages.length}
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="group p-3 bg-slate-900 text-white rounded-[12px] hover:bg-primary transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center gap-2"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest pl-2">Close</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image Viewport */}
              <div
                ref={modalImageRef}
                className={`relative w-full h-[calc(100vh-160px)] mt-12 flex items-center justify-center overflow-hidden transition-all ${modalZoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onMouseMove={handleModalMouseMove}
                onClick={() => setModalZoom(!modalZoom)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentImage!}
                      alt={productName}
                      fill
                      className={`object-contain transition-transform duration-500 ease-out ${modalZoom ? 'scale-[2.5] opacity-0' : 'scale-100 opacity-100'}`}
                      priority
                    />

                    {/* Modal Zoom Layer */}
                    {modalZoom && (
                      <div
                        className="absolute inset-0 z-[100002] pointer-events-none"
                        style={{
                          backgroundImage: `url(${currentImage})`,
                          backgroundPosition: `${modalZoomPos.x}% ${modalZoomPos.y}%`,
                          backgroundSize: "300%",
                          backgroundRepeat: "no-repeat"
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Inner Navigation - ONLY IF NOT ZOOMED */}
                {!modalZoom && validImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-8 p-5 bg-white border border-slate-100 hover:bg-slate-50 text-slate-900 rounded-[12px] shadow-xl transition-all z-[100003] active:scale-95"
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-8 p-5 bg-white border border-slate-100 hover:bg-slate-50 text-slate-900 rounded-[12px] shadow-xl transition-all z-[100003] active:scale-95"
                    >
                      <ChevronRight className="h-8 w-8" />
                    </button>
                  </>
                )}

                {/* Center Hint */}
                {!modalZoom && (
                  <div className="absolute bottom-8 flex items-center gap-2 bg-slate-900/5 backdrop-blur-md px-6 py-2 rounded-full text-slate-500 z-[100003] pointer-events-none">
                    <ZoomIn className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Click to Zoom Asset</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Bottom Bar */}
              {validImages.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-slate-50/50 backdrop-blur-sm border-t border-slate-100 flex items-center justify-center gap-4 z-[100001]">
                  {validImages.map((url, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-12 w-12 rounded-[12px] border-2 transition-all p-1 bg-white ${activeIndex === idx ? "border-primary scale-110 shadow-md" : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                    >
                      <div className="relative h-full w-full">
                        <Image src={url} alt="nav" fill className="object-contain" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
