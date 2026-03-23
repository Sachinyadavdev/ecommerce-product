"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Loader2, Linkedin, Twitter, Facebook, Instagram, Globe, ChevronLeft, ChevronRight } from "lucide-react";

interface SocialPost {
  id: string;
  platform: string;
  embedHtml: string;
  title: string | null;
}

const PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-[#0077B5]", bg: "bg-[#0077B5]/10" },
  { id: "twitter", label: "X / Twitter", icon: Twitter, color: "text-[#1DA1F2]", bg: "bg-[#1DA1F2]/10" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "text-[#1877F2]", bg: "bg-[#1877F2]/10" },
  { id: "instagram", label: "Instagram", icon: Instagram, color: "text-[#E4405F]", bg: "bg-[#E4405F]/10" },
  { id: "other", label: "Social", icon: Globe, color: "text-blue-500", bg: "bg-blue-50" },
];

export default function SocialMediaFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await fetch("/api/social-posts");
          if (res.ok) {
            const data = await res.json();
            setPosts(data);
          }
        } catch (error) {
          console.error("Failed to fetch social posts", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }, []);
  
    if (loading) {
      return (
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#284b8c]" />
        </div>
      );
    }
  
    if (posts.length === 0) return null;
  
    return (
      <section className="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Decorative background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50/80 to-transparent pointer-events-none" />
        <div className="absolute -left-48 top-20 w-96 h-96 bg-[#284b8c]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -right-48 bottom-0 w-80 h-80 bg-[#61a0b3]/10 rounded-full blur-[80px] pointer-events-none" />
  
        <div className="mx-auto px-4 sm:px-8 relative z-10 w-full max-w-[1600px]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-tight mb-6"
            >
              <Share2 className="w-4 h-4" />
              Social Updates
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6"
            >
              Catch Up On Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#284b8c] to-[#61a0b3]">Latest Announcements</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed"
            >
              Follow our journey, stay updated with real-time news, and be part of our growing professional network.
            </motion.p>
          </div>
  
          {/* Strict Grid Layout for Top Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post, index) => {
              const pInfo = PLATFORMS.find(p => p.id === post.platform) || PLATFORMS.find(p => p.id === 'other');
              const Icon = pInfo!.icon;
              
              // Add a microscopic 25px buffer to the native height. This prevents the bottom buttons from being sliced off if text slightly wraps, but is small enough to avoid noticeable gaps.
              let processedHtml = post.embedHtml.replace(/<iframe /g, '<iframe scrolling="no" ');
              processedHtml = processedHtml.replace(/height="(\d+)"/g, (match, p1) => `height="${parseInt(p1) + 25}"`);

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
                  className="w-full flex flex-col [&>iframe]:w-full! [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              );
            })}
          </div>

        {/* Pagination Controls */}
        {posts.length > postsPerPage && (
          <div className="mt-0 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
              <span className="text-gray-900 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">{currentPage}</span>
              <span>of</span>
              <span>{Math.ceil(posts.length / postsPerPage)}</span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(posts.length / postsPerPage)))}
              disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
              className="p-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
