"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */

interface SocialPost {
    id: string;
    platform: string;
    embedHtml: string;
}

interface EventsAchievementsProps {
    content?: {
        caption?: string;
        title?: string;
        description?: string;
        /** Ignored now that we fetch from DB */
        events?: string;
    };
}

/* ── Component ─────────────────────────────────────────────────── */

export default function EventsAchievements({ content }: EventsAchievementsProps) {
    const {
        caption = "COMPANY MILESTONES",
        title = "Events & Achievements",
        description = "Key milestones, celebrations, and initiatives highlighting our continued growth and commitment to excellence.",
    } = content || {};

    const [posts, setPosts] = useState<SocialPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/social-posts?home=true");
                const data = await res.json();
                if (Array.isArray(data)) setPosts(data);
            } catch (error) {
                console.error("Failed to fetch home social posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="ea-section py-10 md:py-16 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
                {/* ── Premium Header ── */}
                <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-white border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-5"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#284b8c]" />
                        <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-linear-to-r from-[#284b8c] to-[#00a758]">
                            {caption}
                        </span>
                    </motion.div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#284b8c] tracking-tight leading-[1.1] mb-5 drop-shadow-sm">
                        {title}
                    </h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>
                </div>

                {/* ── Dynamic Social Posts Grid ── */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-[#1a4fa0]" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No posts featured on the home page yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        {posts.map((post, index) => {
                            // Keep native height exact, add small buffer, hide scrollbar
                            let processedHtml = post.embedHtml.replace(/<iframe /g, '<iframe scrolling="no" ');
                            processedHtml = processedHtml.replace(/height="(\d+)"/g, (match, p1) => `height="${parseInt(p1) + 25}"`);

                            return (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
                                    className="w-full flex-col flex [&>iframe]:w-full! [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                                />
                            );
                        })}
                    </div>
                )}

                {/* ── View All Events Button ── */}
                {!isLoading && posts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 md:mt-12 flex justify-center"
                    >
                        <Link
                            href="/events"
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-linear-to-r from-[#284b8c] to-[#00a758] text-white rounded-[10px] font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:scale-105"
                        >
                            <span className="relative z-10 transition-colors duration-300">
                                View All Events
                            </span>
                            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-linear-to-r from-[#00a758] to-[#284b8c] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    </motion.div>
                )}
            </div>


        </section>
    );
}
