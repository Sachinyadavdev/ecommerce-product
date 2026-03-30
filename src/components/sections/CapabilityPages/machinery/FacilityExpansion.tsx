"use client";

import { motion } from "framer-motion";
import { MoveUpRight, ArrowRightCircle, Rocket } from "lucide-react";

interface FacilityExpansionProps {
    content?: {
        title?: string;
        description?: string;
        videoUrl?: string;
        highlights?: string[];
        closingText?: string;
    };
}

export default function FacilityExpansion({ content }: FacilityExpansionProps) {
    const title = content?.title || "CNH Moulds – Facility Expansion";
    const description = content?.description || "CNH Moulds proudly announces the successful completion of its new facility expansion in February 2024, marking a significant step forward in enhancing manufacturing capabilities. The 20,000 sq. ft. state-of-the-art facility is equipped with a comprehensive range of advanced technologies, enabling improved efficiency, precision and production capacity.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CNH-Moulds-Facility-Expansion-Machinery-Equipments.mp4";
    const closingText = content?.closingText || "This expansion represents a major milestone for CNH Moulds Pvt. Ltd., reinforcing its commitment to delivering high-quality solutions and consistently exceeding customer expectations.";

    const highlights = content?.highlights || [
        "Expansion with a modern 20,000 sq. ft. facility",
        "Installation of seven new advanced machines",
        "Enhanced production capability and operational efficiency",
        "Strengthened capacity to meet growing industry demands"
    ];

    return (
        <section className="py-12 md:py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-1"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                            <span className="text-sm font-black text-primary uppercase tracking-widest">
                                Milestone Feb 2024
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-8 leading-[1.1] tracking-tight">
                            {title}
                        </h2>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                            {description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {highlights.map((highlight, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <ArrowRightCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="text-slate-700 font-medium text-base md:text-lg leading-snug group-hover:text-primary transition-colors">
                                        {highlight}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="bg-slate-50 border-l-4 border-primary p-5 md:p-6 rounded-r-2xl shadow-sm">
                            <div className="flex gap-4 items-start">
                                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-primary mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-1 md:mb-2 uppercase tracking-widest text-[10px] md:text-sm">A Milestone in Growth</h4>
                                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                        {closingText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Video Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-2 relative"
                    >
                        <div className="relative w-full aspect-video lg:aspect-[4/5] xl:aspect-video rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group bg-blue-50/50 mb-6 md:mb-8">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute w-full h-full object-contain"
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-all duration-500 pointer-events-none" />
                        </div>

                        {/* Stats & Operational Status moved outside video */}
                        <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
                            <div className="bg-white px-3 py-3 md:px-4 md:py-4 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 text-center">
                                <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Added Capacity</div>
                                <div className="text-xl md:text-2xl font-black text-[var(--primary)]">20,000 SF</div>
                            </div>
                            <div className="bg-[var(--primary)] px-3 py-3 md:px-4 md:py-4 rounded-xl md:rounded-2xl shadow-sm text-center text-white">
                                <div className="text-[8px] md:text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Machines</div>
                                <div className="text-xl md:text-2xl font-black">+7 New</div>
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                            <p className="font-bold tracking-widest uppercase text-xs text-slate-600">Now fully operational</p>
                            <div className="flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="w-2 h-2 rounded-full bg-emerald-500/40" />
                                <span className="w-2 h-2 rounded-full bg-emerald-500/20" />
                            </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 rounded-full pointer-events-none" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
