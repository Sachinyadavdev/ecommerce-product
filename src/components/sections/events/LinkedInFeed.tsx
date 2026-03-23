"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ExternalLink, MessageSquare, Heart, Share2, Loader2, Clock } from "lucide-react";
import { LinkedInPost } from "@/lib/linkedin";

export default function LinkedInFeed() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/linkedin/posts");
        const data = await response.json();
        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch LinkedIn posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#284b8c]" />
        <p className="font-medium">Syncing with LinkedIn...</p>
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0077b5] text-xs font-bold rounded-full mb-4 border border-blue-100">
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              Direct from LinkedIn
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              Latest Industry <span className="text-[#0077b5]">Updates</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Stay connected with our professional community and get real-time insights into our global operations.
            </p>
          </div>
          
          <a
            href="https://www.linkedin.com/company/besmak-india"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#284b8c] text-white font-bold rounded-2xl hover:bg-[#3f863e] transition-all group shadow-xl shadow-blue-900/10"
          >
            Follow us on LinkedIn
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-50 rounded-[32px] p-1 border border-gray-100/50 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
            >
              <div className="bg-white rounded-[28px] overflow-hidden flex flex-col h-full border border-gray-100 shadow-sm group-hover:border-blue-100/50">
                {/* Header */}
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden border border-gray-100">
                      {post.authorImage ? (
                        <img src={post.authorImage} alt={post.authorName} className="w-full h-full object-cover" />
                      ) : (
                        <Linkedin className="w-5 h-5 text-[#0077b5]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900">{post.authorName}</h4>
                      <p className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <Linkedin className="w-4 h-4 text-[#0077b5] opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4 whitespace-pre-wrap">
                    {post.text}
                  </p>
                  
                  {post.image && (
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                </div>

                {/* Footer/CTA */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 mt-auto group-hover:bg-blue-50/30 transition-colors">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-bold text-[#0077b5] group/btn"
                  >
                    <span className="flex items-center gap-1.5">
                      Read on LinkedIn
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex gap-3 text-gray-400">
                      <Heart className="w-3.5 h-3.5" />
                      <MessageSquare className="w-3.5 h-3.5" />
                      <Share2 className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop floating decoration */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-48 h-48 bg-[#284b8c]/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}
