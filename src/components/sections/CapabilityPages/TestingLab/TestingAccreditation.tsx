import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Globe2, Award, FileCheck, CheckCircle2, Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface AccreditationProps {
  content?: {
    scopeTitle?: string;
    scopeDescription?: string;
    recognitionTitle?: string;
    recognitionDescription?: string;
    benefitsTitle?: string;
    benefitsDescription?: string;
  };
}

export default function TestingAccreditation({ content }: AccreditationProps) {
  const {
    scopeTitle = "NABL Accreditation Scope",
    scopeDescription = "Our laboratory is accredited to carry out testing across key disciplines, including mechanical, chemical and electrical. We follow international standards as well as customer and OEM requirements such as ISO 8092-2, USCAR-2, JASO D616 and BCPL-C101 to ensure reliable and accepted results.",
    recognitionTitle = "NABL Accredited E&D Laboratory with ILAC MRA Recognition",
    recognitionDescription = "Besmak E&D Laboratory is NABL-accredited and now recognised under the ILAC MRA, strengthening the global acceptance of our testing capabilities. This accreditation ensures that our test results are accepted internationally, reducing the need for repeated testing across different regions.",
    benefitsTitle = "Global Market Access",
    benefitsDescription = "With ILAC MRA recognition, we are able to provide faster approvals, improved compliance, and greater confidence in product validation. It also helps reduce costs and technical barriers, enabling smoother access to global markets for our customers.",
  } = content || {};

  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const segments = [
    {
      title: scopeTitle,
      description: scopeDescription,
      icon: ShieldCheck,
      details: ["ISO 8092-2", "USCAR-2", "JASO D616", "BCPL-C101"],
    },
    {
      title: recognitionTitle,
      description: recognitionDescription,
      icon: Award,
      details: null,
    },
    {
      title: benefitsTitle,
      description: benefitsDescription,
      icon: Globe2,
      details: null,
    },
  ];

  const active = segments[activeSegment];
  const ActiveIcon = active.icon;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveSegment((prev) => (prev + 1) % segments.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, segments.length]);

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)`,
          backgroundSize: "52px 52px",
        }}
      />
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-primary" />
              </div>
              <span className="text-[10px] font-black tracking-[0.22em] uppercase text-primary">
                Globally Recognised Infrastructure
              </span>
              <div className="h-px w-10 bg-primary/25" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05]"
            >
              Certification &{" "}
              <span className="text-primary relative inline-block">
                Accreditation
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute left-0 -bottom-1.5 h-[4px] w-full bg-primary/20 rounded-full origin-left block"
                />
              </span>
            </motion.h2>
          </div>

          {/* Step counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:items-end gap-1"
          >
            <div className="text-sm text-slate-400 font-medium">
              <span className="text-2xl font-black text-slate-900">{String(activeSegment + 1).padStart(2, "0")}</span>
              <span className="mx-1">/</span>
              {String(segments.length).padStart(2, "0")}
            </div>
            {/* Pause Status Indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-slate-300" : "bg-primary animate-pulse"}`} />
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{isPaused ? "Paused" : "Cycling"}</span>
            </div>
          </motion.div>
        </div>

        {/* ── Horizontal tab strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          {segments.map((seg, idx) => {
            const Icon = seg.icon;
            const isActive = activeSegment === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveSegment(idx);
                  setIsPaused(true);
                }}
                className={`group flex-1 flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${isActive
                    ? "bg-primary border-primary shadow-lg shadow-primary/20"
                    : "bg-white border-slate-100 hover:border-primary/25 hover:bg-primary/[0.03]"
                  }`}
              >
                {/* Progress Bar for Active Tab */}
                {isActive && !isPaused && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-white/30 origin-left w-full"
                    />
                  )}

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? "bg-white/20" : "bg-slate-50 border border-slate-100"
                    }`}
                >
                  <Icon size={17} className={isActive ? "text-white" : "text-primary"} strokeWidth={1.8} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 transition-colors ${isActive ? "text-white/60" : "text-slate-400"
                      }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-sm font-bold truncate transition-colors ${isActive ? "text-white" : "text-slate-700"
                      }`}
                  >
                    {seg.title.split(" ").slice(0, 3).join(" ")}
                  </span>
                </div>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-auto text-white/60 text-lg leading-none"
                  >
                    →
                  </motion.span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Detail panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSegment}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative bg-white rounded-3xl border border-slate-100 overflow-hidden"
          >
            {/* Top accent & Timer bar */}
            <div className="h-1 w-full bg-slate-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/40 to-transparent opacity-40" />
               {!isPaused && (
                 <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-0 bg-primary origin-left"
                 />
               )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5">

              {/* Left content block */}
              <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col">

                {/* Icon + title row with Controls */}
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0">
                      <ActiveIcon size={30} className="text-primary" strokeWidth={1.6} />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary block mb-2">
                        Segment {String(activeSegment + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  {/* Pause/Play Control */}
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shrink-0"
                  >
                    {isPaused ? <Play size={20} className="fill-current" /> : <Pause size={20} className="fill-current" />}
                  </button>
                </div>

                {/* Description */}
                <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 flex-1">
                  {active.description}
                </p>

                {/* Footer badge row */}
                <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-slate-300" : "bg-emerald-400 animate-pulse"}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      NABL Certified
                    </span>
                  </div>
                  <div className="w-px h-4 bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      ILAC MRA Recognised
                    </span>
                  </div>
                </div>
              </div>

              {/* Right panel: standards grid or decorative */}
              <div className="lg:col-span-2 bg-slate-50 border-l border-slate-100 p-10 lg:p-14 flex flex-col justify-center">
                {active.details ? (
                  <div className="flex flex-col gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">
                      Standards Covered
                    </span>
                    {active.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="group flex items-center gap-4 px-5 py-4 bg-white rounded-2xl border border-slate-100 hover:border-primary/25 hover:shadow-sm transition-all duration-200"
                      >
                        <div className="w-8 h-8 rounded-xl bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-200">
                          <FileCheck size={14} className="text-primary group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-bold text-slate-700 text-sm tracking-widest group-hover:text-slate-900 transition-colors">
                          {detail}
                        </span>
                        <span className="ml-auto text-slate-200 group-hover:text-primary/40 transition-colors text-base leading-none">
                          →
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Decorative panel for non-standards segments */
                  <div className="flex flex-col items-center justify-center text-center gap-6 py-8">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                        <ActiveIcon size={44} className="text-primary" strokeWidth={1.3} />
                      </div>
                      {/* orbit ring */}
                      <div className="absolute -inset-3 rounded-[2rem] border border-dashed border-primary/15 pointer-events-none" />
                      <div className="absolute -inset-6 rounded-[2.5rem] border border-dashed border-primary/8 pointer-events-none" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-1">
                        {activeSegment === 1 ? "Internationally Accepted" : "Globally Enabled"}
                      </p>
                      <p className="text-sm text-slate-400 font-light leading-relaxed max-w-[200px] mx-auto">
                        {activeSegment === 1
                          ? "Test results recognised across ILAC MRA signatory countries"
                          : "Faster approvals and reduced barriers for global market entry"}
                      </p>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex items-center gap-1.5 mt-4">
                      {segments.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveSegment(i);
                            setIsPaused(true);
                          }}
                          className={`rounded-full transition-all duration-300 ${i === activeSegment
                              ? "w-6 h-2 bg-primary"
                              : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}