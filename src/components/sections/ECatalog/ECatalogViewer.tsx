"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import Script from "next/script";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ChevronLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 24, height: 24 }}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const ChevronRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 24, height: 24 }}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const ZoomInIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
  </svg>
);
const ZoomOutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35M8 11h6" />
  </svg>
);
const FullscreenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);
const ExitFullscreenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 0 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
);
const SoundOnIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const SoundOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const GridIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);
const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 20, height: 20 }}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ─── Single PDF page rendered by PDF.js ───────────────────────────────────────
interface PDFCanvasPageProps {
  pdfDoc: unknown;
  pageNum: number;
  width: number;
  height: number;
}

const PDFCanvasPage = React.forwardRef<HTMLDivElement, PDFCanvasPageProps>(
  ({ pdfDoc, pageNum, width, height }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      if (!pdfDoc || !canvasRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = pdfDoc as any;
      let cancelled = false;

      doc.getPage(pageNum).then((page: unknown) => {
        if (cancelled) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = page as any;
        const viewport = p.getViewport({ scale: 1 });
        const scale = Math.min(
          width / viewport.width,
          height / viewport.height,
        );
        const scaledViewport = p.getViewport({ scale });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = Math.floor(scaledViewport.width);
        canvas.height = Math.floor(scaledViewport.height);

        p.render({ canvasContext: ctx, viewport: scaledViewport });
      });

      return () => {
        cancelled = true;
      };
    }, [pdfDoc, pageNum, width, height]);

    return (
      <div
        ref={ref}
        style={{
          width,
          height,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <canvas ref={canvasRef} />
      </div>
    );
  },
);
PDFCanvasPage.displayName = "PDFCanvasPage";

// ─── Thumbnail Grid ────────────────────────────────────────────────────────────
interface ThumbnailGridProps {
  numPages: number;
  pdfDoc: unknown;
  currentPage: number;
  onSelect: (page: number) => void;
  onClose: () => void;
}

function ThumbnailCanvas({
  pdfDoc,
  pageNum,
}: {
  pdfDoc: unknown;
  pageNum: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = pdfDoc as any;
    doc.getPage(pageNum).then((page: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = page as any;
      const viewport = p.getViewport({ scale: 0.22 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      p.render({ canvasContext: ctx, viewport });
    });
  }, [pdfDoc, pageNum]);
  return (
    <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100px" }} />
  );
}

function ThumbnailGrid({
  numPages,
  pdfDoc,
  currentPage,
  onSelect,
  onClose,
}: ThumbnailGridProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#0e1f3f",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 16,
          width: "min(90vw, 780px)",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "#fff",
          }}
        >
          <span>All Pages</span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              color: "#fff",
              width: 28,
              height: 28,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 12,
            padding: 16,
            overflowY: "auto",
          }}
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                onSelect(page);
                onClose();
              }}
              style={{
                background:
                  currentPage === page ? "rgba(0,167,88,0.15)" : "none",
                border: `2px solid ${currentPage === page ? "#00A758" : "transparent"}`,
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: 4,
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                  width: 100,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 141,
                }}
              >
                <ThumbnailCanvas pdfDoc={pdfDoc} pageNum={page} />
              </div>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 500,
                }}
              >
                {page}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Viewer ───────────────────────────────────────────────────────────────
interface ECatalogViewerProps {
  pdfUrl: string;
}

const PDFJS_VERSION = "4.4.168";

export default function ECatalogViewer({ pdfUrl }: ECatalogViewerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [pdfDoc, setPdfDoc] = useState<unknown>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showThumbs, setShowThumbs] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageDims, setPageDims] = useState({ width: 500, height: 707 });

  // ── Responsive sizing ─────────────────────────────────────────────────────────
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const mobile = vw < 768;
      setIsMobile(mobile);
      const availH = vh - 150;
      const availW = vw - 80;
      const maxPageW = mobile
        ? Math.min(availW, 420)
        : Math.floor(Math.min(availW / 2, 540));
      const pageH = Math.min(Math.floor(maxPageW * 1.414), availH);
      const pageW = Math.floor(pageH / 1.414);
      setPageDims({
        width: Math.max(pageW, 200),
        height: Math.max(pageH, 280),
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // ── Load PDF after script is ready ───────────────────────────────────────────
  useEffect(() => {
    if (!scriptLoaded) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjsLib = (window as any).pdfjsLib;
    if (!pdfjsLib) return;

    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;

    pdfjsLib
      .getDocument({
        url: pdfUrl,
        cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/cmaps/`,
        cMapPacked: true,
      })
      .promise.then((doc: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = doc as any;
        setPdfDoc(doc);
        setNumPages(d.numPages);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [scriptLoaded, pdfUrl]);

  // ── Audio ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.85;
    }
  }, []);

  const playFlipSound = useCallback(() => {
    if (isSoundOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((e) => console.warn("Audio play failed:", e));
    }
  }, [isSoundOn]);

  // ── Flipbook ──────────────────────────────────────────────────────────────────
  const onFlip = useCallback(
    (e: { data: number }) => {
      setCurrentPage(e.data + 1);
      playFlipSound();
    },
    [playFlipSound],
  );

  const prevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const nextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      bookRef.current?.pageFlip()?.flip(page - 1);
      setCurrentPage(page);
      playFlipSound();
    },
    [playFlipSound],
  );

  // ── Zoom ──────────────────────────────────────────────────────────────────────
  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));

  // ── Fullscreen ────────────────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  // ── Keyboard nav ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextPage();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevPage();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [nextPage, prevPage]);

  return (
    <>
      {/* Load PDF.js from CDN — bypasses Webpack bundling entirely */}
      <Script
        src={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.mjs`}
        strategy="afterInteractive"
        type="module"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Audio element for page flip sound */}
      <audio ref={audioRef} src="/page-flip.mp3" preload="auto" />

      <style>{`
        .e-catalog-bg {
          min-height: calc(100vh - 70px);
          background: linear-gradient(160deg, #0b1829 0%, #112240 45%, #1a3a6b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 20px 16px 0;
          position: relative;
          overflow: hidden;
        }
        .e-catalog-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(40,75,140,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 110%, rgba(0,167,88,0.18) 0%, transparent 55%);
          pointer-events: none;
        }
        .catalog-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(0.85rem, 1.8vw, 1.2rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 16px;
          opacity: 0.9;
          text-align: center;
          position: relative;
          z-index: 2;
        }
        .catalog-heading span { color: #00A758; }
        .book-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          z-index: 2;
        }
        .book-zoom-wrap {
          transition: transform 0.35s ease;
          transform-origin: center center;
        }
        /* Nav arrows */
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255,255,255,0.09);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.18);
          color: #fff;
          border-radius: 50%;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .nav-btn:hover { background: rgba(0,167,88,0.28); border-color: #00A758; box-shadow: 0 0 20px rgba(0,167,88,0.4); transform: translateY(-50%) scale(1.1); }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; transform: translateY(-50%); }
        .nav-btn.left { left: -26px }
        .nav-btn.right { right: -26px }
        @media(max-width:600px) { .nav-btn.left{left:2px} .nav-btn.right{right:2px} }
        /* Toolbar */
        .cat-toolbar {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 12px 20px 18px;
          z-index: 2;
          position: relative;
        }
        .toolbar-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 40px;
          padding: 6px 14px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
        .tbtn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.72);
          cursor: pointer;
          padding: 7px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s, background 0.2s;
        }
        .tbtn:hover { color: #00A758; background: rgba(0,167,88,0.12); }
        .tbtn.on { color: #00A758; }
        .tdiv { width: 1px; height: 20px; background: rgba(255,255,255,0.15); margin: 0 3px; }
        .tcount {
          font-size: 0.76rem;
          font-weight: 600;
          color: rgba(255,255,255,0.65);
          white-space: nowrap;
          padding: 0 6px;
          min-width: 64px;
          text-align: center;
          letter-spacing: 0.03em;
        }
        /* Shadow below book */
        .book-floor { width: 100%; height: 20px; background: radial-gradient(ellipse 70% 100% at 50% 0%,rgba(0,0,0,0.4) 0%,transparent 80%); margin-top: -2px; pointer-events: none; position: relative; z-index: 2; }
        .flip-hint { font-size: 0.68rem; color: rgba(255,255,255,0.28); text-align: center; margin: 4px 0 0; letter-spacing: 0.04em; position: relative; z-index: 2; }
        /* Loading */
        .load-wrap { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; z-index: 10; }
        .load-bar { width: 180px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
        .load-fill { height: 100%; background: linear-gradient(90deg,#00A758,#284B8C); border-radius: 4px; animation: lslide 1.7s ease-in-out infinite; }
        @keyframes lslide { 0%{width:0%;margin-left:0} 50%{width:65%;margin-left:0} 100%{width:0%;margin-left:100%} }
        .load-label { font-size: 0.75rem; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; text-transform: uppercase; }
        .load-icon { animation: bounce 1.3s ease-in-out infinite; }
        @keyframes bounce { 0%,100%{transform:translateY(0) rotateY(0deg)} 50%{transform:translateY(-10px) rotateY(18deg)} }
      `}</style>

      <div className="e-catalog-bg" ref={containerRef}>
        {/* Loading State */}
        {isLoading && (
          <div className="load-wrap">
            <div className="load-icon">
              <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
                <rect
                  x="3"
                  y="3"
                  width="50"
                  height="58"
                  rx="4"
                  fill="#284B8C"
                  opacity="0.75"
                />
                <rect x="6" y="3" width="4" height="58" rx="2" fill="#1e3570" />
                <rect
                  x="14"
                  y="12"
                  width="32"
                  height="3"
                  rx="2"
                  fill="rgba(255,255,255,0.22)"
                />
                <rect
                  x="14"
                  y="20"
                  width="24"
                  height="3"
                  rx="2"
                  fill="rgba(255,255,255,0.15)"
                />
                <rect
                  x="14"
                  y="28"
                  width="28"
                  height="3"
                  rx="2"
                  fill="rgba(255,255,255,0.15)"
                />
                <path
                  d="M32 46l5-5h11v15H27V41l5 5z"
                  fill="#00A758"
                  opacity="0.85"
                />
              </svg>
            </div>
            <div className="load-bar">
              <div className="load-fill" />
            </div>
            <span className="load-label">Loading Catalogue…</span>
          </div>
        )}

        {/* Main Flipbook */}
        {!isLoading && !!pdfDoc && (
          <>
            <h1 className="catalog-heading">
              Besmak India <span>Product Catalogue</span>
            </h1>

            <div className="book-stage">
              <button
                className="nav-btn left"
                onClick={prevPage}
                disabled={currentPage <= 1}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </button>

              <div
                className="book-zoom-wrap"
                style={{ transform: `scale(${zoom})` }}
              >
                <HTMLFlipBook
                  ref={bookRef}
                  width={pageDims.width}
                  height={pageDims.height}
                  size="fixed"
                  minWidth={180}
                  maxWidth={580}
                  minHeight={254}
                  maxHeight={820}
                  drawShadow={true}
                  flippingTime={700}
                  usePortrait={isMobile}
                  startPage={0}
                  showCover={true}
                  mobileScrollSupport={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  onFlip={onFlip}
                  className="the-flipbook"
                  style={{}}
                  startZIndex={0}
                  autoSize={false}
                  maxShadowOpacity={0.55}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {Array.from({ length: numPages }, (_, i) => (
                    <PDFCanvasPage
                      key={i}
                      pdfDoc={pdfDoc}
                      pageNum={i + 1}
                      width={pageDims.width}
                      height={pageDims.height}
                    />
                  ))}
                </HTMLFlipBook>
              </div>

              <button
                className="nav-btn right"
                onClick={nextPage}
                disabled={currentPage >= numPages}
                aria-label="Next page"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="book-floor" />

            {/* Toolbar */}
            <div className="cat-toolbar">
              <div className="toolbar-pill">
                <button
                  className={`tbtn${showThumbs ? " on" : ""}`}
                  onClick={() => setShowThumbs(true)}
                  title="Page thumbnails"
                >
                  <GridIcon />
                </button>
                <div className="tdiv" />
                <button className="tbtn" onClick={zoomOut} title="Zoom out">
                  <ZoomOutIcon />
                </button>
                <span className="tcount">{Math.round(zoom * 100)}%</span>
                <button className="tbtn" onClick={zoomIn} title="Zoom in">
                  <ZoomInIcon />
                </button>
                <div className="tdiv" />
                <span className="tcount">
                  {currentPage} / {numPages}
                </span>
                <div className="tdiv" />
                <button
                  className={`tbtn${isSoundOn ? " on" : ""}`}
                  onClick={() => setIsSoundOn((s) => !s)}
                  title={isSoundOn ? "Mute" : "Sound on"}
                >
                  {isSoundOn ? <SoundOnIcon /> : <SoundOffIcon />}
                </button>
                <div className="tdiv" />
                <button
                  className="tbtn"
                  onClick={toggleFullscreen}
                  title="Fullscreen"
                >
                  {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
                </button>
                <div className="tdiv" />
                <button
                  className="tbtn"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = pdfUrl;
                    link.download = "Besmak-India-Catalogue.pdf";
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  title="Download PDF"
                >
                  <DownloadIcon />
                </button>
              </div>
            </div>

            <p className="flip-hint">
              Click page corners or use ← → to navigate
            </p>
          </>
        )}

        {/* Thumbnail grid */}
        {showThumbs && !!pdfDoc && numPages > 0 && (
          <ThumbnailGrid
            numPages={numPages}
            pdfDoc={pdfDoc}
            currentPage={currentPage}
            onSelect={goToPage}
            onClose={() => setShowThumbs(false)}
          />
        )}
      </div>
    </>
  );
}
