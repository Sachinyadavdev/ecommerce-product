"use client";

import { motion } from "framer-motion";
import { Layers, ShieldCheck, Activity, Target, ChevronRight } from "lucide-react";
import Image from "next/image";

interface StampingDivisionProps {
    content?: {
        title?: string;
        description?: string;
        videoUrl?: string;
        stats?: { label: string; value: string }[];
        capabilities?: string[];
        closingText?: string;
    };
}

export default function StampingDivision({ content }: StampingDivisionProps) {
    const title = content?.title || "Cutting-Edge Stamping Division";
    const description = content?.description || "At Besmak, our stamping division brings together advanced technology, precision engineering and high-performance capabilities to support diverse industry needs. Equipped with 10 high-speed stamping machines, we process materials ranging from 0.15 mm to 2.5 mm, delivering high-accuracy stamped components for automotive, energy and industrial applications.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Cutting-Edge%20Stamping-Division-Machinery-Equipments.mp4";
    const closingText = content?.closingText || "Our extensive catalogue includes terminals from 025 to 250 series, engineered to meet evolving application requirements with reliability, durability and performance.";

    const stats = content?.stats || [
        { label: "High-Speed Machines", value: "10+" },
        { label: "Material Range", value: "0.15-2.5mm" },
        { label: "Industries Served", value: "Auto/Energy" },
    ];

    const capabilities = content?.capabilities || [
        "High-speed, high-precision stamping operations",
        "Capability to handle a wide range of material thickness",
        "Consistent quality aligned with industry standards",
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="py-16 md:py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-50 text-[var(--primary)] text-sm font-bold tracking-widest uppercase mb-6"
                    >
                        <Layers className="w-4 h-4" />
                        Precision & Capability
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6"
                    >
                        {title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600"
                    >
                        {description}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                    {/* Video Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7 order-2 xl:order-1"
                    >
                        <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-blue-50/50 mb-6">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute w-full h-full object-contain"
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                        </div>

                        {/* Stats Section moved below video */}
                        <div className="flex gap-4 w-full">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex-1 bg-white border border-blue-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="text-xl font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Capabilities List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 border-b-2 border-slate-100 pb-4">Key Capabilities</h3>
                        {capabilities.map((cap, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[var(--primary)] mt-1">
                                    {idx === 0 ? <Activity className="w-5 h-5" /> : idx === 1 ? <Layers className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed group-hover:text-slate-900 transition-colors">
                                    {cap}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-blue-50 border border-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 text-left">
                        <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center shrink-0 shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-base md:text-xl text-slate-700 font-light leading-relaxed">
                            {closingText}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
