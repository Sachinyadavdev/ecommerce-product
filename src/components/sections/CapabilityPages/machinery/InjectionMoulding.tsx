"use client";

import { motion } from "framer-motion";
import { Maximize, BarChart3, CheckSquare, Layers } from "lucide-react";

interface InjectionMouldingProps {
    content?: {
        title?: string;
        description?: string;
        videoUrl?: string;
        capabilities?: { title: string; desc: string; icon: string }[];
        closingText?: string;
    };
}

export default function InjectionMoulding({ content }: InjectionMouldingProps) {
    const title = content?.title || "Expanding Injection Moulding Capabilities";
    const description = content?.description || "Besmak has strengthened its manufacturing capabilities with the addition of three state-of-the-art injection moulding machines (80T and 350T) at our Chennai and Sanand facilities. These fully microprocessor-controlled machines deliver exceptional repeatability, shot consistency and precision, enabling us to meet the highest quality standards across applications.";
    const videoUrl = content?.videoUrl || "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Expanding-Injection-Moulding-Capabilities-Machinery-Equipments.mp4";
    const closingText = content?.closingText || "With continuous investments in advanced technology, Besmak is well-positioned to support evolving industry requirements, delivering precision, reliability and performance at scale—with more capacity expansions planned in the near future.";

    const capabilities = content?.capabilities || [
        { title: "Expanded Range", desc: "Machine range from 40T to 450T", icon: "maximize" },
        { title: "Process Control", desc: "Improved efficiency & production", icon: "bar-chart" },
        { title: "Consistent Quality", desc: "Across high-volume manufacturing", icon: "check" },
        { title: "Scalable Capacity", desc: "Meet growing customer demands", icon: "layers" },
    ];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "maximize": return <Maximize className="w-5 h-5" />;
            case "bar-chart": return <BarChart3 className="w-5 h-5" />;
            case "check": return <CheckSquare className="w-5 h-5" />;
            case "layers": return <Layers className="w-5 h-5" />;
            default: return <CheckSquare className="w-5 h-5" />;
        }
    };

    return (
        <section className="py-16 md:py-24 bg-white relative">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col gap-12 lg:gap-20">
                    {/* Video Section on TOP */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-full rounded-[3rem] overflow-hidden shadow-2xl bg-blue-50/50"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto block"
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* New Addition Card centered below video */}
                    <div className="flex justify-center mt-0 relative z-20 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/95 backdrop-blur-md border border-blue-100 rounded-3xl p-5 md:p-7 shadow-2xl flex items-center gap-6 max-w-lg w-full flex-col sm:flex-row text-center sm:text-left"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-3xl bg-primary-200 flex items-center justify-center shrink-0 shadow-inner">
                                <div className="w-5 h-5 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                            </div>
                            <div className="flex-1">
                                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">New Infrastructure Addition</span>
                                <h3 className="text-xl md:text-3xl font-black text-slate-900 leading-none mb-1">80T & 350T</h3>
                                <p className="text-[8px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">High-Precision Injection Moulding</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Text content below */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-12 h-1 bg-primary rounded-full" />
                                <span className="text-sm font-black text-primary uppercase tracking-[0.4em]">Advanced Infrastructure</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 md:mb-8 leading-tight tracking-tight">
                                {title}
                            </h2>

                            <p className="text-lg md:text-xl text-slate-600 mb-8 md:mb-10 leading-relaxed font-medium">
                                {description}
                            </p>

                            <div className="p-6 md:p-8 bg-primary text-white rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
                                <p className="relative z-10 text-base md:text-xl font-medium leading-relaxed italic opacity-90">
                                    "{closingText}"
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3 md:gap-6 self-center">
                            {capabilities.map((cap, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex flex-col gap-3 p-3 md:p-8 rounded-xl md:rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 group"
                                >
                                    <div className="w-8 h-8 md:w-12 md:h-12 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-white text-primary flex items-center justify-center shrink-0 shadow-md group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {getIcon(cap.icon)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-[10px] md:text-base md:text-lg mb-1 md:mb-2">{cap.title}</h4>
                                        <p className="text-slate-500 text-[8px] md:text-xs md:text-sm font-medium leading-relaxed">{cap.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
