"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CalendarDays,
  MapPin,
  Save,
  X,
  Loader2,
  ExternalLink,
  Image as ImageIcon,
  ToggleLeft,
  ToggleRight,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDateForInput(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  thumbnail: "",
  bannerImage: "",
  tags: "",
  isActive: true,
  status: "upcoming" as "upcoming" | "ongoing" | "completed",
  gallery: [] as string[],
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "upcoming" | "ongoing" | "completed">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [slugAutoMode, setSlugAutoMode] = useState(true);

  // Media picker states
  const [thumbnailPickerOpen, setThumbnailPickerOpen] = useState(false);
  const [bannerPickerOpen, setBannerPickerOpen] = useState(false);
  const [galleryPickerOpen, setGalleryPickerOpen] = useState(false);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/events?limit=50");
      const data = await res.json();
      setEvents(data.events || []);
      setTotal(data.total || 0);
    } catch {
      toast.error("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const openCreate = () => {
    setEditingEvent(null);
    setForm(EMPTY_FORM);
    setSlugAutoMode(true);
    setIsModalOpen(true);
  };

  const openEdit = (event: any) => {
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      slug: event.slug || "",
      subtitle: event.subtitle || "",
      description: event.description || "",
      location: event.location || "",
      startDate: formatDateForInput(event.startDate),
      endDate: formatDateForInput(event.endDate),
      thumbnail: event.thumbnail || "",
      bannerImage: event.bannerImage || "",
      tags: event.tags || "",
      isActive: !!event.isActive,
      status: (event.status || "upcoming") as "upcoming" | "ongoing" | "completed",
      gallery: Array.isArray(event.gallery) ? event.gallery : (typeof event.gallery === 'string' ? JSON.parse(event.gallery || '[]') : []),
    });
    setSlugAutoMode(false);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: slugAutoMode ? slugify(val) : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";
      const method = editingEvent ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save event");
      }

      toast.success(editingEvent ? "Event updated!" : "Event created!");
      setIsModalOpen(false);
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Event deleted");
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const searchFiltered = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase())
  );

  const upcomingCount  = events.filter((e) => (e.status || "upcoming") === "upcoming").length;
  const ongoingCount   = events.filter((e) => e.status === "ongoing").length;
  const completedCount = events.filter((e) => e.status === "completed").length;

  const filtered = searchFiltered.filter((e) => {
    if (tab === "upcoming")  return (e.status || "upcoming") === "upcoming";
    if (tab === "ongoing")   return e.status === "ongoing";
    if (tab === "completed") return e.status === "completed";
    return true;
  });

  const now = today;

  // Inline status quick-change (no full edit needed)
  const handleStatusChange = async (id: string, newStatus: string) => {
    const event = events.find((e) => e.id === id);
    if (!event) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...event, status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success(`Status changed to ${newStatus}`);
      fetchEvents();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Events Management
            <span className="text-sm font-normal bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">
              {total} Total
            </span>
          </h1>
          <p className="text-gray-500 mt-1">
            Create and manage events shown on the public events page.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#284b8c] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-[#1a3566] transition-colors shadow-lg shadow-blue-100 font-semibold"
        >
          <Plus className="h-5 w-5" />
          Add Event
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar: tabs + search + external link */}
        <div className="border-b bg-gray-50">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1 px-4 pt-3">
            {([
              { key: "all",       label: "All Events",  count: events.length },
              { key: "upcoming",  label: "Upcoming",     count: upcomingCount },
              { key: "ongoing",   label: "Ongoing",      count: ongoingCount },
              { key: "completed", label: "Completed",    count: completedCount },
            ] as const).map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`relative flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-t-lg transition-all ${
                  tab === key
                    ? "bg-white text-[#284b8c] shadow-sm border border-b-white border-gray-100 -mb-px z-10"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {label}
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  tab === key
                    ? key === "upcoming"  ? "bg-blue-50 text-blue-600"
                    : key === "ongoing"   ? "bg-amber-50 text-amber-600"
                    : key === "completed" ? "bg-gray-100 text-gray-500"
                    : "bg-blue-50 text-blue-600"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* Search + View link */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={`Search ${tab === "all" ? "all" : tab} events...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 text-sm bg-white"
              />
            </div>
            <a
              href="/events"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#284b8c] transition-colors ml-auto"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Page
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Event</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Publish</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#284b8c]" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <CalendarDays className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 font-medium">No events found.</p>
                    <button
                      onClick={openCreate}
                      className="mt-3 text-sm text-[#284b8c] font-semibold hover:underline"
                    >
                      Create your first event →
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((event) => {
                  const start = event.startDate ? new Date(event.startDate) : null;
                  const isPast = start ? start < now : false;
                  return (
                    <tr key={event.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {event.thumbnail ? (
                            <img
                              src={event.thumbnail}
                              alt={event.title}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <CalendarDays className="w-6 h-6 text-[#284b8c]/40" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{event.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">/{event.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${isPast ? "text-gray-400" : "text-gray-700"}`}>
                          {start ? start.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </span>
                        <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          isPast
                            ? "bg-gray-100 text-gray-500"
                            : "bg-emerald-50 text-emerald-600"
                        }`}>
                          {isPast ? "Completed" : "Upcoming"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{event.location || "—"}</span>
                      </td>
                    <td className="px-6 py-4">
                        {/* Inline status quick-changer */}
                        <div className="flex items-center">
                          <select
                            value={event.status || "upcoming"}
                            onChange={(e) => handleStatusChange(event.id, e.target.value)}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-full border cursor-pointer appearance-none text-center focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors ${
                              (event.status || "upcoming") === "upcoming"
                                ? "bg-blue-50 text-blue-700 border-blue-100 focus:ring-blue-400"
                                : event.status === "ongoing"
                                ? "bg-amber-50 text-amber-700 border-amber-100 focus:ring-amber-400"
                                : "bg-gray-100 text-gray-600 border-gray-200 focus:ring-gray-400"
                            }`}
                          >
                            <option value="upcoming">🔵 Upcoming</option>
                            <option value="ongoing">🟡 Ongoing</option>
                            <option value="completed">⚫ Completed</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            event.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {event.isActive ? "Active" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`/events/${event.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View live"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => openEdit(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id, event.title)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editingEvent ? "Edit Event" : "Create New Event"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editingEvent ? `Editing: ${editingEvent.title}` : "Fill in the event details below"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6 space-y-5">
              {/* Title + Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Event Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    placeholder="e.g. Industrial Expo 2026"
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                    Slug (URL) *
                    <button
                      type="button"
                      onClick={() => setSlugAutoMode((p) => !p)}
                      className={`text-xs px-2 py-0.5 rounded-full transition-colors ${slugAutoMode ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
                    >
                      {slugAutoMode ? "Auto" : "Manual"}
                    </button>
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) => {
                      setSlugAutoMode(false);
                      setForm((p) => ({ ...p, slug: slugify(e.target.value) }));
                    }}
                    required
                    placeholder="industrial-expo-2026"
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Subtitle / Tagline</label>
                <input
                  value={form.subtitle}
                  onChange={(e) => setForm((p) => ({ ...p, subtitle: e.target.value }))}
                  placeholder="A short tagline shown on cards"
                  className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Detailed event description..."
                  rows={4}
                  className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Dates + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">Start Date *</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                    required
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Location
                    </span>
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. New Delhi, India"
                    className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Card Thumbnail</label>
                <div className="flex gap-2">
                  <input
                    value={form.thumbnail}
                    onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
                    placeholder="https://... or pick from media"
                    className="flex-1 p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setThumbnailPickerOpen(true)}
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" /> Pick
                  </button>
                </div>
                {form.thumbnail && (
                  <img src={form.thumbnail} alt="thumbnail" className="mt-2 h-20 rounded-lg object-cover border border-gray-100" />
                )}
              </div>

              {/* Banner Image */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Banner / Hero Image</label>
                <div className="flex gap-2">
                  <input
                    value={form.bannerImage}
                    onChange={(e) => setForm((p) => ({ ...p, bannerImage: e.target.value }))}
                    placeholder="https://... or pick from media"
                    className="flex-1 p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setBannerPickerOpen(true)}
                    className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" /> Pick
                  </button>
                </div>
                {form.bannerImage && (
                  <img src={form.bannerImage} alt="banner" className="mt-2 h-24 w-full rounded-lg object-cover border border-gray-100" />
                )}
              </div>

              {/* Image Gallery */}
              <div className="space-y-2 col-span-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">Event Image Gallery</label>
                  <button
                    type="button"
                    onClick={() => setGalleryPickerOpen(true)}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    + Add Images
                  </button>
                </div>
                {form.gallery.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {form.gallery.map((url, i) => (
                      <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                        <img src={url} alt={`gallery-${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm(p => ({ ...p, gallery: p.gallery.filter((_, idx) => idx !== i) }))}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <p className="text-sm font-bold text-gray-400">No images added to gallery yet.</p>
                  </div>
                )}
              </div>



              {/* Tags */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> Tags (comma separated)
                </label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
                  placeholder="e.g. Manufacturing, Expo, Industrial"
                  className="w-full p-2.5 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder:text-gray-400"
                />
              </div>

              {/* Event Status Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Event Status</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "upcoming",  label: "Upcoming",  emoji: "🔵", active: "border-blue-200 bg-blue-50 text-blue-700 ring-2 ring-blue-300 ring-offset-1" },
                    { value: "ongoing",   label: "Ongoing",   emoji: "🟡", active: "border-amber-200 bg-amber-50 text-amber-700 ring-2 ring-amber-300 ring-offset-1" },
                    { value: "completed", label: "Completed", emoji: "⚫", active: "border-gray-300 bg-gray-100 text-gray-700 ring-2 ring-gray-300 ring-offset-1" },
                  ] as const).map(({ value, label, emoji, active }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, status: value }))}
                      className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all ${
                        form.status === value
                          ? active
                          : "border-gray-100 bg-white text-gray-400 hover:border-gray-200"
                      }`}
                    >
                      <span className="text-lg">{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Publish toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Publish Event</p>
                  <p className="text-xs text-gray-400">Active events appear on the public events page</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, isActive: !p.isActive }))}
                  className="flex items-center gap-2 transition-colors"
                >
                  {form.isActive ? (
                    <ToggleRight className="w-8 h-8 text-emerald-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-300" />
                  )}
                  <span className={`text-sm font-bold ${form.isActive ? "text-emerald-600" : "text-gray-400"}`}>
                    {form.isActive ? "Active" : "Draft"}
                  </span>
                </button>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#284b8c] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#1a3566] disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-100 text-sm transition-colors"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editingEvent ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Pickers */}
      <MediaPickerModal
        isOpen={thumbnailPickerOpen}
        onClose={() => setThumbnailPickerOpen(false)}
        onSelect={(urls) => setForm((p) => ({ ...p, thumbnail: urls[0] || "" }))}
        selectedUrls={form.thumbnail ? [form.thumbnail] : []}
        multiple={false}
      />
      <MediaPickerModal
        isOpen={bannerPickerOpen}
        onClose={() => setBannerPickerOpen(false)}
        onSelect={(urls) => setForm((p) => ({ ...p, bannerImage: urls[0] || "" }))}
        selectedUrls={form.bannerImage ? [form.bannerImage] : []}
        multiple={false}
      />
      <MediaPickerModal
        isOpen={galleryPickerOpen}
        onClose={() => setGalleryPickerOpen(false)}
        onSelect={(urls) => setForm((p) => ({ ...p, gallery: Array.from(new Set([...p.gallery, ...urls])) }))}
        selectedUrls={form.gallery}
        multiple={true}
      />
    </div>
  );
}
