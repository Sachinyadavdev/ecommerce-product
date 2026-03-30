"use client";

import { motion } from "framer-motion";
import { Zap, Timer, Target, Settings, ArrowRight, Gauge, Activity, Cpu } from "lucide-react";

interface HighSpeedStampingProps {
    content?: {
        title?: string;
        subtitle?: string;
        description?: string;
        videoUrl?: string;
        capabilities?: { title: string; desc: string; icon: string }[];
        closingText?: string;
    };
}

export default function HighSpeedStamping({ content }: HighSpeedStampingProps) {
    const title = content?.title || "NIDEC Kyori ANEX Series";
    const subtitle = content?.subtitle || "High-Speed Stamping Press";
    const description = content?.description || "A high-speed stamping press at our facility—designed to deliver exceptional speed, precision and reliability for high-volume manufacturing.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/NIDEC-Kyori-ANEX-Series-Machinery-Equipments.mp4";
    const closingText = content?.closingText || "With this latest investment, Besmak strengthens its ability to deliver faster turnaround, higher accuracy and consistent quality—meeting the evolving demands of global automotive and industrial customers.";

    const capabilities = content?.capabilities || [
        { title: "High-Speed Precision", desc: "Up to 2,000 strokes per minute (SPM) for superior productivity", icon: "zap" },
        { title: "Quick Die Change", desc: "Reduced setup time and minimal downtime", icon: "timer" },
        { title: "Consistent Quality", desc: "Ensures uniform accuracy across high-volume production", icon: "target" },
        { title: "Advanced Automation", desc: "Compact design with enhanced operational efficiency", icon: "settings" },
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "zap": return <Zap className="w-5 h-5" />;
            case "timer": return <Timer className="w-5 h-5" />;
            case "target": return <Target className="w-5 h-5" />;
            case "settings": return <Settings className="w-5 h-5" />;
            default: return <ArrowRight className="w-5 h-5" />;
        }
    };

    return (
        <section className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden">
            {/* High-Speed Kinetic Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-50/40 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />

                {/* Dynamic Speed Lines (CSS based) */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '120px 100%' }} />
                <div className="absolute inset-0 opacity-[0.02] rotate-12"
                    style={{ backgroundImage: 'linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '80px 100%' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center mb-24">

                    {/* Left side: Content & Metadata */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-[var(--primary)]/5 text-[var(--primary)] border border-[var(--primary)]/10 shadow-sm">
                                <Activity className="w-3.5 h-3.5 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{subtitle}</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900">
                                {title ?
                                    <span className="text-[var(--primary)] block">
                                        {title}
                                    </span>
                                    : ""}
                            </h2>

                            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                                    <Gauge className="w-6 h-6 text-[var(--primary)]" />
                                    <div>
                                        <div className="text-[8px] md:text-[10px] uppercase font-black text-slate-400">Peak Velocity</div>
                                        <div className="text-base md:text-lg font-black text-slate-900">2,000 SPM</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                                    <Cpu className="w-6 h-6 text-cyan-500" />
                                    <div>
                                        <div className="text-[8px] md:text-[10px] uppercase font-black text-slate-400">Control System</div>
                                        <div className="text-base md:text-lg font-black text-slate-900">Advanced CNC</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right side: Video Showcase */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-6 bg-gradient-to-r from-[var(--primary)]/10 to-cyan-100 rounded-[3.5rem] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-50">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute w-full h-full object-cover"
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-[var(--primary)]/5 group-hover:bg-transparent transition-colors duration-500" />

                                {/* UI Overlay for "High-Speed Capture" */}
                                <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[8px] font-black text-white uppercase tracking-widest">Recording 1200 FPS</span>
                                        </div>
                                        <div className="text-[8px] font-black text-white uppercase tracking-widest">CAM-01</div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats moved below video */}
                            <div className="mt-8 bg-white border border-[var(--primary)]/10 p-5 rounded-3xl shadow-lg flex items-center gap-5">
                                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20">
                                    <Zap className="w-6 h-6 fill-current" />
                                </div>
                                <div>
                                    <div className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Industry Leading</div>
                                    <div className="text-base md:text-lg font-black text-slate-900">Efficiency Optimized</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Capability Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 mb-24">
                    {capabilities.map((cap, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-white border border-slate-100 p-3 md:p-8 rounded-xl md:rounded-[2rem] shadow-[0_10px_30_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(40,75,140,0.12)] transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />

                            <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-[var(--primary)]/5 text-[var(--primary)] flex items-center justify-center mb-3 md:mb-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-500 shadow-sm">
                                {getIcon(cap.icon)}
                            </div>
                            <h4 className="text-[10px] md:text-xl font-black text-slate-900 mb-1 md:mb-3 group-hover:text-[var(--primary)] transition-colors">{cap.title}</h4>
                            <p className="text-[8px] md:text-sm text-slate-500 leading-relaxed font-medium">
                                {cap.desc}
                            </p>
                            {/* <div className="mt-6 pt-6 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest flex items-center gap-2">
                                    Learn More <ArrowRight className="w-3 h-3" />
                                </span>
                            </div> */}
                        </motion.div>
                    ))}
                </div>

                {/* Closing Premium Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                        <div className="absolute top-0 right-0 w-full h-full"
                            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 70%)' }} />
                    </div>

                    {/* Revising Banner to be LIGHT but Impactful */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-cyan-500 z-0" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-10 text-white border border-white/30">
                            <Target className="w-8 h-8" />
                        </div>
                        <p className="text-xl md:text-4xl font-black text-white leading-tight mb-8">
                            {closingText}
                        </p>
                        <div className="h-1 w-24 bg-white/40 mx-auto rounded-full" />
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 4s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}
