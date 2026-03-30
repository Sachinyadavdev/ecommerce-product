"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowLeft, Tag, Clock, ExternalLink, Image as ImageIcon, Linkedin } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  thumbnail?: string;
  bannerImage?: string;
  tags?: string;
  status?: string;
  gallery?: any;
}

function formatDateRange(start: string, end?: string | null) {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
  if (!end) return s.toLocaleDateString("en-IN", opts);
  const e = new Date(end);
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    return `${s.getDate()} – ${e.getDate()} ${s.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`;
  }
  return `${s.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} – ${e.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`;
}

export default function EventDetail({ event }: { event: Event }) {
  const tags = event.tags ? event.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const parsedGallery: string[] = Array.isArray(event.gallery) 
    ? event.gallery 
    : (typeof event.gallery === 'string' ? JSON.parse(event.gallery || '[]') : []);
  const heroImage = event.bannerImage || event.thumbnail;
  const status = event.status || "upcoming";
  const isUpcoming = status === "upcoming";
  const isOngoing = status === "ongoing";
  const isCompleted = status === "completed";

  return (
    <>
      {/* Banner */}
      <div className="relative w-full overflow-hidden bg-[#0a1628]" style={{ minHeight: "420px" }}>
        {heroImage ? (
          <>
            <img
              src={heroImage}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#284b8c]/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#61a0b3]/20 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-20">
          {/* Back link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Status badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${isUpcoming ? "bg-blue-500/20 text-blue-300 border-blue-500/20" : isOngoing ? "bg-amber-500/20 text-amber-400 border-amber-500/20" : "bg-white/5 text-white/50 border-white/10"}`}>
                {(isUpcoming || isOngoing) && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isUpcoming ? "bg-blue-400" : "bg-amber-400"}`} />}
                {isUpcoming ? "Upcoming Event" : isOngoing ? "Ongoing Event" : "Past Event"}
              </span>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-white/50 text-xs font-bold rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {event.title}
            </h1>

            {event.subtitle && (
              <p className="text-xl text-white/60 mb-8 leading-relaxed">{event.subtitle}</p>
            )}

            {/* Key details */}
            <div className="flex flex-wrap gap-6 mt-2">
              <div className="flex items-center gap-2 text-white/70">
                <CalendarDays className="w-5 h-5 text-[#61a0b3] flex-shrink-0" />
                <span className="font-medium">{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-5 h-5 text-[#61a0b3] flex-shrink-0" />
                  <span className="font-medium">{event.location}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-black text-gray-900 mb-6">About This Event</h2>
                {event.description ? (
                  <div className="max-w-none text-gray-600 leading-relaxed whitespace-pre-line
                    [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2
                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2
                    [&_p]:mb-4
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                  ">
                    {event.description}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No description provided for this event.</p>
                )}
              </div>

              {/* Image Gallery */}
              {parsedGallery.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-[#284b8c]" />
                    Event Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {parsedGallery.map((imgUrl, idx) => (
                      <motion.div
                        key={idx}
                        className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100 group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Gallery image ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {/* Date Card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#284b8c]/5 rounded-xl flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-[#284b8c]" />
                  </div>
                  <h3 className="font-black text-gray-800">Date & Time</h3>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
              </div>

              {/* Location Card */}
              {event.location && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#284b8c]/5 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#284b8c]" />
                    </div>
                    <h3 className="font-black text-gray-800">Location</h3>
                  </div>
                  <p className="text-gray-600 font-medium">{event.location}</p>
                </div>
              )}

              {/* Tags Card */}
              {tags.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#284b8c]/5 rounded-xl flex items-center justify-center">
                      <Tag className="w-5 h-5 text-[#284b8c]" />
                    </div>
                    <h3 className="font-black text-gray-800">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#284b8c]/5 text-[#284b8c] text-xs font-bold rounded-full border border-[#284b8c]/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              {(isUpcoming || isOngoing) && (
                <div className="bg-[#0a1628] rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#284b8c]/30 rounded-full blur-2xl" />
                  <div className="relative">
                    <h3 className="font-black text-lg mb-2">Interested?</h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-5">
                      Get in touch with our team for more details about this event.
                    </p>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/contact-us"
                        className="flex items-center gap-2 w-full justify-center py-3 bg-white text-[#0a1628] rounded-xl font-bold text-sm hover:bg-[#61a0b3] hover:text-white transition-colors"
                      >
                        Contact Us
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank')}
                        className="flex items-center gap-2 w-full justify-center py-3 bg-[#0077b5] text-white rounded-xl font-bold text-sm hover:bg-[#0077b5]/80 transition-colors"
                      >
                        Share on LinkedIn
                        <Linkedin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Back to events */}
              <Link
                href="/events"
                className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-medium text-sm hover:border-[#284b8c]/30 hover:text-[#284b8c] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to All Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
