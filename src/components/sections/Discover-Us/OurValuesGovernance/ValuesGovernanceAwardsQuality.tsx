"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, ExternalLink, BadgeCheck, Target, ChevronLeft, ChevronRight, X } from "lucide-react";

interface ValuesGovernanceAwardsQualityProps {
  content?: {
    awardsTagline?: string;
    awardsTitle?: string;
    objective1?: string;
    objective2?: string;
    objective3?: string;
    objective4?: string;
    certsTitle?: string;
    [key: string]: string | undefined;
  };
}

const defaultAwards = [
  "Preferred Supplier Recognition from leading automotive OEMs and Tier-1 companies",
  "Excellence in Quality & Delivery Performance awards",
  "Recognition for consistent supply chain reliability and on-time delivery",
  "Appreciation awards for customer support and technical collaboration",
];

const defaultAwardImages = [
  "https://images.unsplash.com/photo-1599596851608-b1fb9e1bd420?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581335965415-321356f6fffe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591122266014-998fc028fa60?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496247749665-49cfddb9a5c7?q=80&w=600&auto=format&fit=crop",
];

const defaultQualityItems = [
  'Focus on "doing it right the first time"',
  "Continuous improvement in products, processes, and systems",
  "Enhancing customer satisfaction through quality and reliability",
  "Adherence to global automotive quality standards",
];

const defaultObjectives = [
  "Continuous improvement in product quality and delivery performance",
  "Strengthening design, process, and technological capabilities",
  "Enhancing employee skills through training and development",
  "Maintaining high standards in safety and operational efficiency",
];

const defaultCertifications = [
  { name: "IATF 16949", label: "Automotive Quality Management System", color: "bg-primary/5 border-primary/20 text-primary" },
  { name: "ISO 9001", label: "Quality Management Systems", color: "bg-primary/5 border-primary/20 text-primary" },
  { name: "SQ Mark", label: "SQ Mark Certification", color: "bg-primary/5 border-primary/20 text-primary" },
  { name: "Industry Standards", label: "Compliance with automotive industry standards and best practices", color: "bg-primary/5 border-primary/20 text-primary" },
];

export default function ValuesGovernanceAwardsQuality({ content }: ValuesGovernanceAwardsQualityProps) {
  const {
    awardsTagline = "Recognition",
    awardsTitle = "Awards & Recognitions",
    awardsDescription = "Over the years, Besmak has been recognized for its commitment to quality, delivery performance, and customer satisfaction.",
    qualityTagline = "Our Standards",
    qualityTitle = "Quality Policy",
    qualityLink = "https://besmakindia.com/about-us/quality-certificates/",
    qualityCommitment = "We are committed to delivering products and services that consistently meet customer expectations and applicable standards.",
    objectivesTitle = "Quality Objectives",
    certsTitle = "Certifications",
  } = content || {};

  // Dynamically extract awards and awardImages
  const rawAwards: string[] = [];
  const rawAwardImages: string[] = [];
  const rawCertsMap: Record<number, { name: string; label: string; image: string }> = {};
  
  if (content) {
    const contentRecord = content as Record<string, string>;
    Object.keys(contentRecord).forEach((key) => {
      // Awards
      if (key.startsWith("award") && !key.startsWith("awardImage") && !["awardsTagline", "awardsTitle", "awardsDescription"].includes(key)) {
        const val = contentRecord[key];
        if (val) rawAwards.push(val);
      }
      // Award Images
      if (key.startsWith("awardImage")) {
        const val = contentRecord[key];
        if (val) rawAwardImages.push(val);
      }
      // Certifications
      const certNameMatch = key.match(/^cert(\d+)Name$/);
      if (certNameMatch) {
        const idx = parseInt(certNameMatch[1], 10);
        if (!rawCertsMap[idx]) rawCertsMap[idx] = { name: "", label: "", image: "" };
        rawCertsMap[idx].name = contentRecord[key];
      }
      const certLabelMatch = key.match(/^cert(\d+)Label$/);
      if (certLabelMatch) {
        const idx = parseInt(certLabelMatch[1], 10);
        if (!rawCertsMap[idx]) rawCertsMap[idx] = { name: "", label: "", image: "" };
        rawCertsMap[idx].label = contentRecord[key];
      }
      const certImageMatch = key.match(/^cert(\d+)Image$/);
      if (certImageMatch) {
        const idx = parseInt(certImageMatch[1], 10);
        if (!rawCertsMap[idx]) rawCertsMap[idx] = { name: "", label: "", image: "" };
        rawCertsMap[idx].image = contentRecord[key] || "https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&q=80";
      }
    });
  }

  const awards = rawAwards.length > 0 ? rawAwards : defaultAwards;
  const awardImages = rawAwardImages.length > 0 ? rawAwardImages : defaultAwardImages;
  
  const extractedCerts = Object.keys(rawCertsMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map(k => rawCertsMap[k])
    .filter(c => c.name || c.label || c.image);

  const certs = extractedCerts.length > 0 
    ? extractedCerts 
    : defaultCertifications.map(def => ({ ...def, image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&q=80" }));

  const qualityItems = defaultQualityItems.map((def, i) => (content as any)?.[`qualityItem${i + 1}`] || def);
  const objectives = defaultObjectives.map((def, i) => (content as any)?.[`objective${i + 1}`] || def);

  const [currentAwardImageIdx, setCurrentAwardImageIdx] = useState(0);
  const [isAwardLightboxOpen, setIsAwardLightboxOpen] = useState(false);

  const [currentCertIdx, setCurrentCertIdx] = useState(0);
  const [isCertLightboxOpen, setIsCertLightboxOpen] = useState(false);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAwardLightboxOpen(false);
        setIsCertLightboxOpen(false);
      }
      if (e.key === "ArrowLeft") {
        if (isAwardLightboxOpen) prevAwardImage();
        if (isCertLightboxOpen) prevCertImage();
      }
      if (e.key === "ArrowRight") {
        if (isAwardLightboxOpen) nextAwardImage();
        if (isCertLightboxOpen) nextCertImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAwardLightboxOpen, isCertLightboxOpen, awardImages.length, certs.length]);

  const nextAwardImage = () => {
    setCurrentAwardImageIdx((prev) => (prev + 1) % awardImages.length);
  };

  const prevAwardImage = () => {
    setCurrentAwardImageIdx((prev) => (prev - 1 + awardImages.length) % awardImages.length);
  };

  const nextCertImage = () => {
    setCurrentCertIdx((prev) => (prev + 1) % certs.length);
  };

  const prevCertImage = () => {
    setCurrentCertIdx((prev) => (prev - 1 + certs.length) % certs.length);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-primary/4 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-28">

        {/* ── Awards ────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
              <Award className="w-3.5 h-3.5" />
              {awardsTagline}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
              {awardsTitle}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-8">{awardsDescription}</p>
            <ul className="space-y-4 mb-8">
              {awards.map((award, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * idx }}
                  className="flex items-start gap-3 group"
                >
                  <span className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Award className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="text-slate-600 text-base leading-relaxed group-hover:text-slate-900 transition-colors duration-300">{award}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right — animated award images slider */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="w-full aspect-square md:aspect-4/3 rounded-4xl overflow-hidden shadow-2xl relative border-4 border-white group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentAwardImageIdx}
                src={awardImages[currentAwardImageIdx]}
                alt={`Award Recognition ${currentAwardImageIdx + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsAwardLightboxOpen(true)}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Navigation Controls */}
            {/* Left/Right Arrows */}
            <button
              onClick={prevAwardImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group/btn shadow-lg z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={nextAwardImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group/btn shadow-lg z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
              {awardImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentAwardImageIdx(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentAwardImageIdx ? "w-8 bg-primary" : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Quality Policy ──────────────────────────────────────────────── */}
        <div>
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
                <BadgeCheck className="w-3.5 h-3.5" />
                {qualityTagline}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
                {qualityTitle}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-8 italic">{qualityCommitment}</p>
              <ul className="space-y-4 mb-8">
                {qualityItems.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-slate-600 text-base leading-relaxed group-hover:text-slate-900 transition-colors duration-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quality Objectives */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", bounce: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{objectivesTitle}</h3>
                </div>
                <ul className="space-y-5">
                  {objectives.map((obj, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * idx }}
                      className="flex items-start gap-4 group"
                    >
                      <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-sm font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-600 text-base leading-relaxed pt-1 group-hover:text-slate-900 transition-colors duration-300">{obj}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Certifications Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
            className="mt-20 relative w-full overflow-hidden"
          >
            <h3 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">{certsTitle}</h3>
            
            {/* Left and right fade gradients for a smooth carousel effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 20, // Adjust speed here
                }}
                className="flex gap-6 min-w-max"
              >
                {/* Render the array multiple times to create the infinite loop */}
                {[...certs, ...certs, ...certs].map((cert, idx) => {
                  const realIdx = idx % certs.length;
                  
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setCurrentCertIdx(realIdx);
                        setIsCertLightboxOpen(true);
                      }}
                      className="w-80 shrink-0 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:border-primary/30 transition-all duration-500 group cursor-pointer flex flex-col hover:-translate-y-1"
                    >
                      {/* Image section */}
                      <div className="w-full aspect-4/3 bg-slate-100 overflow-hidden relative">
                        <img 
                          src={cert.image} 
                          alt={cert.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      
                      {/* Text section */}
                      <div className="p-6 flex flex-col flex-1 space-y-2 relative bg-white">
                        <p className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors duration-300">{cert.name}</p>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{cert.label}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Award Lightbox Modal */}
      <AnimatePresence>
        {isAwardLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsAwardLightboxOpen(false)}
          >
            <button
              onClick={() => setIsAwardLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevAwardImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50 group hover:scale-110 active:scale-95 duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center p-12 md:p-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={awardImages[currentAwardImageIdx]}
                alt={`Award Recognition Zoomed ${currentAwardImageIdx + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextAwardImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50 group hover:scale-110 active:scale-95 duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
              {awardImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentAwardImageIdx(idx); }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentAwardImageIdx ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certification Lightbox Modal */}
      <AnimatePresence>
        {isCertLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setIsCertLightboxOpen(false)}
          >
            <button
              onClick={() => setIsCertLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevCertImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50 group hover:scale-110 active:scale-95 duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-12 md:p-24"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={certs[currentCertIdx]?.image}
                alt={`Certification Zoomed ${certs[currentCertIdx]?.name}`}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-xl mb-6"
              />
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-extrabold text-white mb-2">{certs[currentCertIdx]?.name}</h3>
                <p className="text-white/70 text-lg max-w-xl">{certs[currentCertIdx]?.label}</p>
              </div>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextCertImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md z-50 group hover:scale-110 active:scale-95 duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
              {certs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentCertIdx(idx); }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentCertIdx ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/80"
                  }`}
                  aria-label={`Go to certification ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
