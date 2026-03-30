"use client";

import { motion } from "framer-motion";
import { Construction, MapPin, ArrowUpRight, Globe2, Factory, Warehouse } from "lucide-react";

interface Plant {
  unit: string;
  capacity: string;
  location: string;
  description: string;
  image: string;
  stats: string[];
}

interface PlantCapacityProps {
  content?: {
    title?: string;
    subtitle?: string;
    plants?: Plant[];
    expansionNote?: string;
    // Fallbacks for older schema support
    sanandCapacity?: string;
    chennaiCapacity?: string;
    sanandImage?: string;
    chennaiImage?: string;
  };
}

export default function PlantCapacity({ content }: PlantCapacityProps) {
  const title = content?.title || "Manufacturing Footprint";
  const subtitle = content?.subtitle || "Global Operations";
  const expansionNote =
    content?.expansionNote ||
    "Additional plant setup is currently in progress to expand operations";

  const productionUnits = [
    {
      unit: "Chennai Unit I",
      capacity: "40,000 sq. ft",
      location: "Tamil Nadu",
      type: "Production",
      icon: <Factory className="w-6 h-6" />,
      status: "Operational"
    },
    {
      unit: "Athipet Unit II",
      capacity: "17,000 sq. ft",
      location: "Tamil Nadu",
      type: "Production",
      icon: <Factory className="w-6 h-6" />,
      status: "Operational"
    },
    {
      unit: "Sanand Unit III",
      capacity: "40,000 sq. ft",
      location: "Gujarat",
      type: "Production",
      icon: <Factory className="w-6 h-6" />,
      status: "Operational"
    },
    {
      unit: "Chennai Unit IV",
      capacity: "100,000 sq. ft",
      location: "Tamil Nadu",
      type: "Upcoming",
      icon: <Construction className="w-6 h-6" />,
      status: "Under Construction"
    }
  ];

  const warehouses = [
    {
      name: "Chennai Warehouse I",
      capacity: "9,000 Sq. ft.",
      location: "Tamil Nadu",
      icon: <Warehouse className="w-6 h-6" />
    },
    {
      name: "Pune Warehouse II",
      capacity: "10,000 Sq. ft.",
      location: "Maharashtra",
      icon: <Warehouse className="w-6 h-6" />
    },
    {
      name: "Delhi Warehouse III (Gurgaon)",
      capacity: "12,500 Sq. ft.",
      location: "NCR Region",
      icon: <Warehouse className="w-6 h-6" />
    }
  ];

  return (
    <section id="machinery-footprint" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[150px] animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Modern Header Style */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-1.5 w-16 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]" />
              <span className="text-sm font-black tracking-[0.5em] text-primary uppercase drop-shadow-sm">
                {subtitle}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-4 md:mb-8"
            >
              Building the Future of <span className="text-primary italic">Precision.</span>
            </motion.h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
              Strategically located hubs engineered for high-volume automotive excellence and global logistics.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group px-6 md:px-8 py-3 md:py-4 bg-primary rounded-2xl md:rounded-3xl border-2 md:border-4 border-white shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform duration-500"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Globe2 size={24} className="text-white animate-spin-slow" />
            </div>
            <div>
              <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Global Standards</div>
              <div className="text-base md:text-lg font-black text-white leading-none">ISO Certified Hubs</div>
            </div>
          </motion.div>
        </div>

        {/* High-Impact Production Units Grid */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Factory className="w-8 h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Advanced Production Units</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {productionUnits.map((unit, idx) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative p-3 md:p-10 rounded-xl md:rounded-[3rem] border-2 transition-all duration-700 h-full flex flex-col hover:-translate-y-4 ${unit.status === "Under Construction"
                  ? "bg-slate-50 border-primary/20 border-dashed hover:bg-white hover:border-primary/40 hover:shadow-[0_40px_80px_-20px_rgba(var(--primary-rgb),0.1)]"
                  : "bg-white border-slate-100 hover:border-primary hover:shadow-[0_40px_100px_-20px_rgba(var(--primary-rgb),0.2)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)]"
                  }`}
              >
                {/* Decorative scanning line animation on hover */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/30 blur-sm animate-[scan_3s_infinite]" />
                </div>

                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 ${unit.status === "Under Construction"
                  ? "bg-primary/10 text-primary shadow-inner shadow-primary/20"
                  : "bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_15px_30px_rgba(var(--primary-rgb),0.3)]"
                  }`}>
                  {unit.icon}
                </div>

                <div className="mb-4 md:mb-8 relative z-10">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <MapPin size={8} className="md:size-3 text-primary/50" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{unit.location}</span>
                  </div>
                  <h4 className="text-[10px] sm:text-sm md:text-2xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{unit.unit}</h4>
                </div>

                <div className="mt-auto pt-4 md:pt-8 border-t border-slate-100 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 md:mb-2">Production Area</span>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-base md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tighter">{unit.capacity}</span>
                        {unit.status === "Operational" && (
                          <div className="relative flex h-2 w-2 md:h-3 md:w-3">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></div>
                            <div className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {unit.status === "Under Construction" && (
                  <div className="absolute top-4 right-4 md:top-8 md:right-8 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className="px-3 py-1 md:px-5 md:py-2 bg-primary/10 text-primary text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] rounded-full border border-primary/20 backdrop-blur-sm">
                      Next-Gen Hub
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industrial Glass Warehouse Section */}
        <div className="mb-32">
          <div className="flex items-center justify-between mb-16 px-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Warehouse className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Strategic Logistics Centers</h3>
            </div>
            <div className="h-px bg-slate-100 flex-1 mx-10 hidden md:block" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10">
            {warehouses.map((wh, idx) => (
              <motion.div
                key={wh.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group p-3 md:p-10 rounded-xl md:rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_50px_100px_-30px_rgba(0,0,0,0.08)] hover:border-primary/30 transition-all duration-700 flex flex-col relative overflow-hidden"
              >
                {/* Background "W" Decorative Letter */}
                <div className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 text-[180px] font-black text-slate-100 leading-none select-none group-hover:text-primary/5 transition-colors duration-700">W</div>

                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="w-12 h-12 md:w-18 md:h-18 rounded-xl md:rounded-3xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xl shadow-black/5 group-hover:bg-primary group-hover:text-white transition-all duration-700 group-hover:scale-110">
                    {wh.icon}
                  </div>
                  <div>
                    <div className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-primary mb-1 underline decoration-primary/20 decoration-2 underline-offset-4">{wh.location}</div>
                    <p className="text-sm sm:text-base md:text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">{wh.name}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between relative z-10 p-3 md:p-6 bg-white/60 backdrop-blur-md rounded-xl md:rounded-3xl border border-white group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                  <div>
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Storage Capacity</span>
                    <span className="text-base md:text-2xl font-black text-primary tracking-tighter">{wh.capacity}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-200 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all md:size-5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Master Expansion Banner (Bento-Inspired) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group rounded-[2.5rem] md:rounded-[4rem] overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary z-0" />
          {/* Animated Tech Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.1] z-10"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute -top-[50%] -right-[20%] w-[100%] h-[150%] bg-white/10 rounded-full blur-[100px] animate-pulse" />

          <div className="relative z-20 p-8 md:p-20 flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="w-24 h-24 rounded-[2rem] bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/20 shrink-0 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <Construction size={48} className="text-white" />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Future-Ready Infrastructure</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-[1] tracking-tighter mb-8">
                {expansionNote}
              </h3>
              <p className="text-lg text-white/70 font-medium max-w-xl mx-auto lg:mx-0">
                Scaling up to 100,000+ Sq. ft. to support the next era of electrification and high-precision connector manufacturing.
              </p>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-2xl transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700 min-w-[280px]">
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1 opacity-50">Current Progress</div>
                <div className="text-3xl font-black text-slate-900 italic tracking-widest uppercase">Phase IV</div>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full relative"
                >
                  <div className="absolute top-0 right-0 h-full w-4 bg-white/30 skew-x-12 animate-[shimmer_2s_infinite]" />
                </motion.div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Civil Structure</span>
                <span className="text-primary italic">75% Complete</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-50px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(450px); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
