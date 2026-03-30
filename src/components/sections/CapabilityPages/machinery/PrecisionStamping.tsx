"use client";

import { motion } from "framer-motion";
import { Wrench, CheckCircle, Shield, MoveRight } from "lucide-react";

interface PrecisionStampingProps {
    content?: {
        title?: string;
        subtitle?: string;
        description?: string;
        expertiseText?: string;
        videoUrl?: string;
    };
}

export default function PrecisionStamping({ content }: PrecisionStampingProps) {
    const title = content?.title || "Precision Engineering Excellence";
    const subtitle = content?.subtitle || "Precision Stamping";
    const description = content?.description || "As a leading provider of precision stamping solutions, Besmak is committed to delivering high-quality components that meet the demanding requirements of diverse industries.";
    const expertiseText = content?.expertiseText || "Our expertise lies in developing customised solutions engineered to the highest standards of precision, durability and reliability, ensuring consistent performance across every application.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Precision-Stamping-Machinery.mp4";

    return (
        <section className="py-24 bg-slate-50 relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1 relative"
                    >
                        <div className="relative w-full aspect-video md:aspect-square lg:aspect-square rounded-3xl overflow-hidden shadow-2xl group bg-blue-50/50">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute w-full h-full object-contain"
                            >
                                <source src={videoUrl} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all duration-500 pointer-events-none" />
                        </div>

                        {/* Feature card moved below video */}
                        <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl w-full border border-slate-100 flex items-center gap-6">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--primary)] shrink-0 shadow-sm">
                                <Wrench className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-lg mb-1">Customised Solutions</h4>
                                <p className="text-sm text-slate-500 font-medium">Engineered to the highest standards of precision</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-black tracking-widest uppercase rounded-md shadow-sm">
                                {subtitle}
                            </span>
                            <div className="h-px bg-slate-200 grow" />
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
                            {title}
                        </h2>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden mb-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                            <Shield className="w-8 h-8 text-[var(--primary)] mb-4 relative z-10" />
                            <p className="text-base md:text-lg text-slate-800 font-medium leading-relaxed relative z-10">
                                "{expertiseText}"
                            </p>
                        </div>

                        <ul className="space-y-4">
                            {['Precision Engineering', 'Durability & Reliability', 'Consistent Performance'].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
