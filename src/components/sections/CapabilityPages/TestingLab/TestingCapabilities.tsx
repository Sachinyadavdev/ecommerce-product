import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Thermometer, Gauge, Beaker, Zap, Cpu, Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface TestingType {
  title: string;
  details: string;
  icon: any;
}

interface TestingCapabilitiesProps {
  content?: {
    title?: string;
    description?: string;
    items?: TestingType[];
  };
}

const defaultItems: TestingType[] = [
  {
    title: "Mechanical Testing",
    details: "Strength, durability & ergonomic testing; load, stress & endurance validation",
    icon: Microscope,
  },
  {
    title: "Thermal Testing",
    details: "Thermal ageing; climatic & thermal shock testing",
    icon: Thermometer,
  },
  {
    title: "Pressure Testing",
    details: "IPX9K, IP67 & rain spray validation; leakage testing",
    icon: Gauge,
  },
  {
    title: "Chemical Testing",
    details: "Corrosion resistance; material compatibility testing",
    icon: Beaker,
  },
  {
    title: "Electrical Testing",
    details: "Continuity, resistance & performance validation; environmental & durability tests",
    icon: Zap,
  },
];

const iconMap: Record<string, any> = {
  Microscope, Thermometer, Gauge, Beaker, Zap,
};

export default function TestingCapabilities({ content }: TestingCapabilitiesProps) {
  const {
    title = "Comprehensive Laboratory Capabilities",
    description = "Our laboratory supports a wide range of testing to ensure product quality and reliability. Each test is carried out to meet the required standards and performance expectations.",
    items: rawItems = defaultItems,
  } = content || {};

  const items = rawItems.map(item => ({
    ...item,
    icon: typeof item.icon === "string" ? iconMap[item.icon] || Microscope : item.icon || Microscope,
  }));

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const activeItem = items[activeIndex];
  const ActiveIcon = activeItem.icon;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, items.length]);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative circle top-right */}
      <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full border border-primary/8 pointer-events-none z-0" />
      <div className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-primary/8 pointer-events-none z-0" />

      {/* Glow behind active panel */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/15">
                <Cpu size={14} className="text-primary" />
              </div>
              <span className="text-[10px] font-black tracking-[0.22em] uppercase text-primary">
                Infrastructure Matrix
              </span>
              <div className="h-px w-10 bg-primary/25" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05]"
            >
              {title}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-slate-500 font-light leading-relaxed max-w-sm lg:text-right"
          >
            {description}
          </motion.p>
        </div>

        {/* Main layout: left list + right detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">

          {/* Left: stacked tab list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true);
                  }}
                  className={`group w-full text-left flex items-center gap-5 px-6 py-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${isActive
                      ? "bg-primary border-primary shadow-lg shadow-primary/15"
                      : "bg-slate-50 border-slate-100 hover:border-primary/20 hover:bg-primary/[0.03]"
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

                  {/* Index */}
                  <span
                    className={`text-xs font-black w-6 shrink-0 transition-colors ${isActive ? "text-white/50" : "text-slate-300"
                      }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Divider */}
                  <div className={`w-px h-6 shrink-0 transition-colors ${isActive ? "bg-white/20" : "bg-slate-200"}`} />

                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? "bg-white/20" : "bg-white border border-slate-100"
                      }`}
                  >
                    <Icon size={17} className={isActive ? "text-white" : "text-primary"} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <span
                    className={`font-bold text-sm tracking-wide transition-colors flex-1 ${isActive ? "text-white" : "text-slate-700 group-hover:text-slate-900"
                      }`}
                  >
                    {item.title}
                  </span>

                  {/* Arrow */}
                  <span
                    className={`text-base leading-none transition-all duration-300 ${isActive ? "text-white translate-x-0 opacity-100" : "text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div className="lg:col-span-3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full rounded-3xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col"
              >
                {/* Top accent bar & Timer bar */}
                <div className="h-1 w-full bg-slate-100 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-30" />
                   {/* Visual Timer sync on detail panel too */}
                   {!isPaused && (
                     <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="absolute inset-0 bg-primary origin-left"
                     />
                   )}
                </div>

                <div className="flex flex-col flex-1 p-10 lg:p-14">

                  {/* Large icon */}
                  <div className="flex items-center justify-between mb-10">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center">
                      <ActiveIcon size={36} className="text-primary" strokeWidth={1.5} />
                    </div>
                    
                    {/* Pause/Play Control */}
                    <button 
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                    >
                      {isPaused ? <Play size={20} className="fill-current" /> : <Pause size={20} className="fill-current" />}
                    </button>
                  </div>

                  {/* Number + title */}
                  <div className="flex items-start gap-5 mb-8">
                    <span className="text-7xl font-black text-slate-100 leading-none select-none mt-1">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                      {activeItem.title}
                    </h3>
                  </div>

                  {/* Details */}
                  <p className="text-lg text-slate-500 font-light leading-relaxed mb-12 max-w-md">
                    {activeItem.details}
                  </p>

                  {/* Footer row */}
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-slate-300" : "bg-emerald-400 animate-pulse"}`} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {isPaused ? "Auto-Switch Paused" : "Auto-Switch Active"}
                      </span>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex items-center gap-1.5">
                      {items.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveIndex(i);
                            setIsPaused(true);
                          }}
                          className={`rounded-full transition-all duration-300 ${i === activeIndex
                              ? "w-6 h-2 bg-primary"
                              : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}