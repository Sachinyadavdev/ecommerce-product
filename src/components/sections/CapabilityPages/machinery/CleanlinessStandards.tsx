"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Microscope, Award, CheckCircle2, Factory } from "lucide-react";

interface CleanlinessStandardsProps {
    content?: {
        title?: string;
        description?: string;
        videoUrl?: string;
    };
}

export default function CleanlinessStandards({ content }: CleanlinessStandardsProps) {
    const title = content?.title || "Cleanliness Standards for EV & Electronics";
    const description = content?.description || "In today's automotive landscape—especially in EVs, power electronics and PCB applications—cleanliness is critical to ensuring performance and reliability. At Besmak, we go beyond conventional standards to deliver products that meet the highest levels of precision and quality.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/ISO-8-Clean-Room-for-Automotive-Cleanliness.mp4";

    return (
        <section className="py-16 md:py-24 bg-white text-slate-900 relative overflow-hidden">
            {/* Ultra-Modern Background Accents */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2" />

                {/* Cleanroom Particle Effect (CSS Dots) */}
                <div className="absolute inset-0 opacity-[0.4]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '48px 48px' }} />
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left Column: Vision & Central Media */}
                    <div className="lg:w-[48%] sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-[10px] font-black tracking-widest uppercase mb-6 border border-emerald-200 backdrop-blur-md">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                Environmental Excellence
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 leading-[1.1] tracking-tight text-slate-900">
                                {title.split('for').map((part, i) => (
                                    <span key={i} className={i === 1 ? "text-[var(--primary)] block" : "block"}>
                                        {i === 1 ? `for ${part}` : part}
                                    </span>
                                ))}
                            </h2>
                            <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                                {description}
                            </p>
                        </motion.div>

                        {/* Masked Video Anchor */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto block"
                                >
                                    <source src={videoUrl} type="video/mp4" />
                                </video>
                                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors pointer-events-none" />

                                <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">ISO 8 Environment Live</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: High-Impact Cards */}
                    <div className="lg:w-[48%] flex flex-col gap-8">

                        {/* ISO 8 Cleanroom Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white border border-slate-100 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-30px_rgba(16,185,129,0.15)] transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                    <Factory className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-slate-900 group-hover:text-emerald-700 transition-colors">Controlled Cleanroom</h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        To maintain stringent cleanliness requirements, we have established an <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-md mx-1 shadow-sm">ISO Class 8</span> cleanroom facility, engineered to minimize contamination and support high-precision manufacturing.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Precision Analysis Card with "Scan Line" */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-blue-50/50 border border-blue-100 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm relative overflow-hidden group/scan"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/0 via-blue-400/10 to-blue-400/0 h-1/2 w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-16 h-16 bg-primary-200 text-primary rounded-2xl flex items-center justify-center shadow-sm">
                                        <Microscope className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl md:text-3xl font-black text-slate-900">Precision Analysis</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                                    Our facility is equipped with an advanced high-magnification image analysis system capable of detecting:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {['Metallic particles', 'Non-metallic', '5μm Fibers'].map((item, i) => (
                                        <div key={i} className="bg-white border border-blue-100 rounded-xl p-4 flex items-center gap-3 group-hover/scan:bg-blue-100 transition-colors shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Certification Seals Row */}
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            {[
                                { name: "ISO 16232:2018", standard: "Automotive Cleanliness" },
                                { name: "VDA 19.1:2015", standard: "Technical Cleanliness" }
                            ].map((seal, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="bg-white border border-slate-100 p-3 md:p-6 rounded-xl md:rounded-[2rem] flex items-center gap-3 md:gap-6 group hover:border-emerald-200 transition-all shadow-sm"
                                >
                                    <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-emerald-50 flex items-center justify-center bg-emerald-50/30 group-hover:border-emerald-200 transition-all shrink-0">
                                        <Award className="w-5 h-5 md:w-8 md:h-8 text-emerald-600 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[7px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5 md:mb-1 truncate">{seal.standard}</div>
                                        <div className="text-[10px] md:text-lg font-black text-slate-900 underline decoration-emerald-500/30 md:decoration-4 underline-offset-4 truncate">{seal.name}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        {/* Closing Premium Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-12 md:mt-20 bg-emerald-50 border border-emerald-100 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-sm"
                        >
                            <div className="absolute top-0 left-0 w-full h-full opacity-[0.05]"
                                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                            <p className="text-lg md:text-3xl font-light text-slate-700 max-w-5xl mx-auto leading-relaxed italic relative z-10">
                                "By prioritizing cleanliness at every stage, Besmak enhances product safety, operational efficiency and <span className="text-emerald-600 font-bold">setting new benchmarks in quality</span> for automotive and EV components."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(200%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}
