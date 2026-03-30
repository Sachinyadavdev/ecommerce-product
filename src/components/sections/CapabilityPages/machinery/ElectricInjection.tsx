"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Cpu, Leaf, CheckCircle2, Factory } from "lucide-react";
import Image from "next/image";

interface ElectricInjectionProps {
    content?: {
        title?: string;
        subtitle?: string;
        description?: string;
        highlights?: { icon: string; title: string; desc: string }[];
        excellenceTitle?: string;
        excellenceDesc?: string;
        videoUrl?: string;
    };
}

export default function ElectricInjection({ content }: ElectricInjectionProps) {
    const defaultHighlights = [
        { icon: "zap", title: "Clamp Force", desc: "65 Ton" },
        { icon: "clock", title: "Improved Cycle Time", desc: "15.4s ➝ 14.4s" },
        { icon: "cpu", title: "Advanced Technology", desc: "AI-enabled features with CNC-controlled precision" },
        { icon: "leaf", title: "Sustainability", desc: "Up to 70% energy savings with zero hydraulic oil usage" },
    ];

    const title = content?.title || "FANUC Roboshot Alpha S50iB";
    const subtitle = content?.subtitle || "Fully Electric Injection Molding";
    const description = content?.description || "A fully electric injection molding machine that brings enhanced precision, efficiency, and sustainability to our manufacturing operations.";
    const excellenceTitle = content?.excellenceTitle || "Driving Operational Excellence";
    const excellenceDesc = content?.excellenceDesc || "From installation to full production in just 9 days, our team demonstrated exceptional coordination and technical expertise. This achievement reflects our commitment to adopting advanced technology.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/FANUC-Roboshot-Alpha-S50iB-Machinery-Equipments.mp4";

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "zap": return <Zap className="w-6 h-6" />;
            case "clock": return <Clock className="w-6 h-6" />;
            case "cpu": return <Cpu className="w-6 h-6" />;
            case "leaf": return <Leaf className="w-6 h-6" />;
            default: return <CheckCircle2 className="w-6 h-6" />;
        }
    };

    return (
        <section className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-px bg-[var(--primary)]" />
                            <span className="text-sm font-black tracking-widest text-[var(--primary)] uppercase">
                                {subtitle}
                            </span>
                        </div>

                        <h2 className="text-xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
                            {title}
                        </h2>

                        <p className="text-sm md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium border-l-4 border-[var(--primary)]/20 pl-4">
                            {description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-12">
                            {(content?.highlights || defaultHighlights).map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                                    className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                                >
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-50 text-[var(--primary)] flex items-center justify-center mb-2 md:mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                                        {getIcon(item.icon)}
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-1 text-[10px] md:text-lg">{item.title}</h4>
                                    <p className="text-[8px] md:text-sm text-slate-600 font-medium">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="bg-[var(--primary)] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white relative overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <div className="flex items-start gap-4 relative z-10">
                                <Factory className="w-8 h-8 text-blue-200 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold mb-2">{excellenceTitle}</h3>
                                    <p className="text-blue-50/90 text-sm leading-relaxed">
                                        {excellenceDesc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Video Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative min-h-[350px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl group bg-blue-50/50"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute w-full h-full object-contain"
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent pointer-events-none" />

                        {/* Decorative Elements */}
                        <div className="absolute top-3 right-3 md:top-6 md:right-6 backdrop-blur-md bg-white border border-blue-100 text-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-[10px] md:text-xs font-bold tracking-widest flex items-center gap-2 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Operational Now
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                            <div className="backdrop-blur-md bg-white border border-blue-100 p-4 md:p-6 rounded-xl shadow-lg">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4 className="text-slate-900 font-bold text-base md:text-lg mb-1">High Precision Injection</h4>
                                        <p className="text-slate-500 text-xs md:text-sm">Next-gen manufacturing capability</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-[var(--primary)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
