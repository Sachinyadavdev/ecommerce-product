"use client";

import React from "react";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight, Tag, Clock, Linkedin } from "lucide-react";
import Link from "next/link";
import HorizontalMediaScroll from "./HorizontalMediaScroll";
import SocialMediaFeed from "./SocialMediaFeed";

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
  tags?: string;
  status?: string;
}

interface EventsListProps {
  upcoming: Event[];
  ongoing: Event[];
  past: Event[];
  content?: {
    title?: string;
    description?: string;
  };
}

function formatDateRange(start: string, end?: string | null) {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  if (!end) return s.toLocaleDateString("en-IN", opts);
  const e = new Date(end);
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    return `${s.getDate()}–${e.getDate()} ${s.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`;
  }
  return `${s.toLocaleDateString("en-IN", opts)} – ${e.toLocaleDateString("en-IN", opts)}`;
}

function EventCard({ event, index, status }: { event: Event; index: number; status: "upcoming" | "ongoing" | "completed" }) {
  const tags = event.tags ? event.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const isPast = status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/events/${event.slug}`} className="group block">
        <div className={`relative bg-white rounded-3xl border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${isPast ? "border-gray-100 opacity-70 hover:opacity-100" : "border-gray-100 hover:border-[#284b8c]/20 hover:shadow-[#284b8c]/5"}`}>
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-gray-50">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#284b8c]/10 to-[#61a0b3]/10">
                <CalendarDays className="w-14 h-14 text-[#284b8c]/20" />
              </div>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Status badges */}
            {status === "completed" && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                Past Event
              </div>
            )}
            {status === "ongoing" && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Ongoing Now
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-[#284b8c]/5 text-[#284b8c] text-[11px] font-bold rounded-full border border-[#284b8c]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-lg font-black text-gray-900 leading-snug mb-1 group-hover:text-[#284b8c] transition-colors line-clamp-2">
              {event.title}
            </h3>

            {event.subtitle && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-1">{event.subtitle}</p>
            )}

            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays className="w-3.5 h-3.5 text-[#284b8c] flex-shrink-0" />
                <span className="font-medium">{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-[#284b8c] flex-shrink-0" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {event.description && (
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                {event.description}
              </p>
            )}

            {/* CTA */}
            {/* CTA & Share */}
            <div className="flex items-center justify-between gap-2 mt-auto">
              <div className="flex items-center gap-2 text-sm font-bold text-[#284b8c] group-hover:gap-3 transition-all">
                View Details
                <ArrowRight className="w-4 h-4" />
              </div>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/events/${event.slug}`, '_blank');
                }}
                className="p-2 rounded-full bg-blue-50 text-[#0077b5] opacity-0 group-hover:opacity-100 transition-all hover:bg-[#0077b5] hover:text-white"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    slug: "industrial-expo-2026",
    title: "Industrial Expo 2026",
    subtitle: "Showcase of Precision Connectors",
    description: "Join us at the largest industrial exhibition in Mumbai where we showcase our latest precision electrical connectors and manufacturing capabilities.",
    location: "Jio World Convention Centre, Mumbai",
    startDate: "2026-06-15",
    endDate: "2026-06-18",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    tags: "Exhibition, Manufacturing, Mumbai",
    status: "upcoming"
  },
  {
    id: "2",
    slug: "global-tech-summit",
    title: "Global Tech Summit 2026",
    subtitle: "Precision Meets Innovation",
    description: "A premier gathering of technology leaders. Besmak India will be presenting our innovations in high-frequency connectivity solutions.",
    location: "BIEC, Bangalore",
    startDate: "2026-07-20",
    endDate: "2026-07-22",
    thumbnail: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800",
    tags: "Summit, Tech, Bangalore",
    status: "upcoming"
  },
  {
    id: "3",
    slug: "electrical-connectivity-fair",
    title: "Electrical Connectivity Fair",
    subtitle: "Bridging the Future",
    description: "We are currently participating in the Chennai Electrical Fair. Visit our booth to see live demonstrations of our connector assembly processes.",
    location: "Chennai Trade Centre",
    startDate: "2026-03-18",
    endDate: "2026-03-22",
    thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
    tags: "Trade Show, Electrical, Chennai",
    status: "ongoing"
  },
  {
    id: "4",
    slug: "manufacturing-innovation-week",
    title: "Manufacturing Innovation Week",
    subtitle: "Leading the Charge",
    description: "Exploring the future of Industry 4.0. Besmak India is a silver sponsor of this prestigious event.",
    location: "Pragati Maidan, New Delhi",
    startDate: "2026-08-05",
    endDate: "2026-08-09",
    thumbnail: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=800",
    tags: "Innovation, Manufacturing, Delhi",
    status: "upcoming"
  },
  {
    id: "5",
    slug: "smart-grid-forum",
    title: "Smart Grid Forum 2026",
    subtitle: "Powering Tomorrow",
    description: "Discussing the role of precision components in the evolution of smart grids across India.",
    location: "HICC, Hyderabad",
    startDate: "2026-09-12",
    endDate: "2026-09-14",
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    tags: "Smart Grid, Forum, Hyderabad",
    status: "upcoming"
  },
  {
    id: "6",
    slug: "precision-engineering-show",
    title: "Precision Engineering Show",
    subtitle: "Legacy of Excellence",
    description: "A look back at our participation in the Pune engineering show where we won the best innovation award.",
    location: "Auto Cluster Exhibition Center, Pune",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5f649771?auto=format&fit=crop&q=80&w=800",
    tags: "Engineering, Show, Pune",
    status: "completed"
  },
  {
    id: "7",
    slug: "auto-components-expo",
    title: "Auto Components Expo",
    subtitle: "Driving Industry Standards",
    description: "Showcasing our range of automotive electrical connectors in Noida.",
    location: "India Expo Mart, Noida",
    startDate: "2025-12-05",
    endDate: "2025-12-08",
    thumbnail: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    tags: "Automotive, Expo, Noida",
    status: "completed"
  },
  {
    id: "8",
    slug: "industrial-automation-expo",
    title: "Industrial Automation Expo",
    subtitle: "Automating Growth",
    description: "Meet our automation experts and learn about our state-of-the-art manufacturing facilities.",
    location: "CODISSIA Trade Fair Complex, Coimbatore",
    startDate: "2026-10-02",
    endDate: "2026-10-05",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: "Automation, Expo, Coimbatore",
    status: "upcoming"
  },
  {
    id: "9",
    slug: "power-energy-summit",
    title: "Power & Energy Summit",
    subtitle: "Sustainable Connections",
    description: "Exploring sustainable manufacturing practices and energy-efficient connectivity solutions.",
    location: "Mahatma Mandir, Ahmedabad",
    startDate: "2026-11-15",
    endDate: "2026-11-17",
    thumbnail: "https://images.unsplash.com/photo-1454165833741-976552c5a7d1?auto=format&fit=crop&q=80&w=800",
    tags: "Energy, Summit, Ahmedabad",
    status: "upcoming"
  },
  {
    id: "10",
    slug: "digital-manufacturing-conclave",
    title: "Digital Manufacturing Conclave",
    subtitle: "The Future is Digital",
    description: "Ongoing discussion on digital transformation in the electrical components industry.",
    location: "Biswa Bangla Convention Centre, Kolkata",
    startDate: "2026-03-15",
    endDate: "2026-03-20",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010958d684?auto=format&fit=crop&q=80&w=800",
    tags: "Digital, Manufacturing, Kolkata",
    status: "ongoing"
  }
];

const MOCK_MEDIA = [
  { id: "m1", type: "image" as const, url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", title: "Industrial Expo Poster" },
  { id: "m2", type: "image" as const, url: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800", title: "Tech Summit Banner" },
  { id: "m3", type: "video" as const, url: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=800", title: "Corporate Highlights", thumbnail: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=800" },
  { id: "m4", type: "image" as const, url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800", title: "Smart Grid Event" },
  { id: "m5", type: "video" as const, url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", title: "Manufacturing Tour", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
  { id: "m6", type: "image" as const, url: "https://images.unsplash.com/photo-1504917595217-d4dc5f649771?auto=format&fit=crop&q=80&w=800", title: "Engineering Expo" },
];

export default function EventsList({ 
  upcoming: initialUpcoming = [], 
  ongoing: initialOngoing = [], 
  past: initialPast = [],
  content
}: EventsListProps) {
  const [upcoming, setUpcoming] = React.useState<Event[]>(initialUpcoming.length > 0 ? initialUpcoming : MOCK_EVENTS.filter(e => e.status === "upcoming"));
  const [ongoing, setOngoing] = React.useState<Event[]>(initialOngoing.length > 0 ? initialOngoing : MOCK_EVENTS.filter(e => e.status === "ongoing"));
  const [past, setPast] = React.useState<Event[]>(initialPast.length > 0 ? initialPast : MOCK_EVENTS.filter(e => e.status === "completed"));
  const [loading, setLoading] = React.useState(false);

  const {
    title = "Events & Exhibitions",
    description = "Stay updated with our latest industry presence and exhibition highlights."
  } = content || {};

  React.useEffect(() => {
    if (initialUpcoming.length === 0 && initialOngoing.length === 0 && initialPast.length === 0) {
      // Simulate fetch or use mock data
      // For now, we are using MOCK_EVENTS directly in initial state
    }
  }, [initialUpcoming, initialOngoing, initialPast]);

  const hasUpcoming = upcoming.length > 0;
  const hasOngoing = ongoing.length > 0;
  const hasPast = past.length > 0;

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#284b8c] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading events...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* Horizontal Media Section */}
      <div className="bg-white">
        <HorizontalMediaScroll 
          items={MOCK_MEDIA} 
          title="Event Posters & Highlights" 
        />
      </div>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
          >
            <div className="w-20 h-1 bg-[#284b8c] mb-8 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6 uppercase">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              {description}
            </p>
          </motion.div>

          {!hasUpcoming && !hasOngoing && !hasPast ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#284b8c]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CalendarDays className="w-10 h-10 text-[#284b8c]/30" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-3">No Events Yet</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                Check back soon! We're preparing for exciting upcoming events and exhibitions.
              </p>
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              {hasUpcoming && (
                <div className="mb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                        <Clock className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">Upcoming Events</h2>
                        <p className="text-sm text-slate-400 font-medium">{upcoming.length} events scheduled</p>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-slate-200 ml-4" />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {upcoming.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} status="upcoming" />
                    ))}
                  </div>
                </div>
              )}

              {/* Ongoing Events */}
              {hasOngoing && (
                <div className={`${hasUpcoming ? "mb-24" : "mb-0"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
                        <div className="relative flex h-5 w-5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500"></span>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">Ongoing Events</h2>
                        <p className="text-sm text-amber-600 font-bold">Happening right now</p>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-slate-200 ml-4" />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {ongoing.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} status="ongoing" />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {hasPast && (
                <div className="mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                        <CalendarDays className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-slate-900">Past Events</h2>
                        <p className="text-sm text-slate-400 font-medium">{past.length} events archived</p>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-slate-200 ml-4" />
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                    {past.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} status="completed" />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Social Media Feed Footer */}
      <div className="bg-white">
        <SocialMediaFeed />
      </div>
    </div>
  );
}
