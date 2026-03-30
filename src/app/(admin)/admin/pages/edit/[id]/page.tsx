"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Globe,
  Settings,
  Search,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function EditPageAdmin() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    keywords: "",
    bannerImage: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await fetch(`/api/admin/pages/${params.id}`);
        if (!response.ok) throw new Error("Failed to load page data");
        const data = await response.json();
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
          keywords: data.keywords || "",
          bannerImage: data.bannerImage || "",
          isActive: data.isActive === 1 || data.isActive === true,
        });
      } catch (error: any) {
        toast.error(error.message);
        router.push("/admin/pages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, [params.id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/pages/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to update page");
      }

      toast.success("Page updated successfully");
      router.push("/admin/pages");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-heading tracking-tight">Edit Page Settings</h1>
            <p className="text-sm text-gray-500 font-medium">Modifying structure for /{formData.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={formData.slug === "home" ? "/" : `/${formData.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-all flex items-center text-sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Live
          </a>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold flex items-center shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95 text-sm"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-heading flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                General Information
              </h2>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">Page Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Industrial Solutions"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">URL Slug</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium tracking-tight text-sm">besmak.in/</span>
                    <input
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      disabled={formData.slug === "home"}
                      placeholder="industrial-solutions"
                      required
                      className="w-full pl-[84px] pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm disabled:opacity-60"
                    />
                  </div>
                  {formData.slug === "home" && (
                    <p className="text-[9px] text-amber-600 font-bold uppercase tracking-wider ml-1 mt-1">System protected</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Page Hero Banner</h3>
                  <p className="text-[10px] text-gray-500 font-medium">This banner will appear at the top of the {formData.title || "page"}</p>
                </div>
              </div>

              <div className="space-y-4">
                {formData.bannerImage ? (
                  <div className="group relative rounded-xl overflow-hidden aspect-[21/9] bg-gray-50 border border-gray-200 shadow-sm">
                    <Image src={formData.bannerImage} alt="Banner Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, bannerImage: "" }))}
                        className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl hover:bg-red-600 transition-all"
                      >
                        Remove Banner
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[21/9] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-100 bg-gray-50">
                    <ImageIcon className="h-8 w-8 text-gray-200 mb-2" />
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No Banner Selected</p>
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">Banner Image URL</label>
                  <input
                    name="bannerImage"
                    value={formData.bannerImage}
                    onChange={handleInputChange}
                    placeholder="/images/banners/my-banner.jpg"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                  />
                  <p className="text-[9px] text-gray-400 mt-1 ml-1">Paste the URL of the banner image. Reusable across sections.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-5 border-t border-gray-50">
              <h2 className="text-lg font-bold text-heading flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-500" />
                SEO Metadata
              </h2>
              
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <label className="text-xs font-bold text-gray-700 ml-1">Meta Description</label>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${formData.description.length > 160 ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                      {formData.description.length}/160
                    </span>
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief summary summary..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm h-24 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 ml-1">Keywords</label>
                  <input
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    placeholder="industrial, connectors (comma separated)"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visibility Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${formData.isActive ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Page Visibility</h3>
                <p className="text-[10px] text-gray-500 font-medium">Determine if page is live or draft</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="sr-only peer" 
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </motion.div>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-5">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5 sticky top-8"
          >
            <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
              <Search className="h-3.5 w-3.5" />
              Google Preview
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5">
                besmak.in › {formData.slug || "..."}
              </div>
              <h3 className="text-lg font-medium text-blue-600 leading-tight hover:underline cursor-pointer line-clamp-2">
                {formData.title || "My Page Title"} | Besmak India
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {formData.description || "Enter a meta description to see how this page will appear in search results."}
              </p>
            </div>

            <div className="pt-5 border-t border-gray-50 space-y-3">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SEO Health</h4>
              <div className="space-y-2">
                {/* Title Check */}
                <div className="group relative">
                  <div className="flex items-center justify-between text-[11px] cursor-help">
                    <span className="text-gray-500">Title optimized</span>
                    {formData.title.length > 10 ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                  </div>
                  {formData.title.length <= 10 && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-[#284b8c] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                      <p className="font-bold mb-1 text-blue-200">Fix required:</p>
                      Keep titles between 10-60 characters for best visibility.
                    </div>
                  )}
                </div>

                {/* Description Check */}
                <div className="group relative">
                  <div className="flex items-center justify-between text-[11px] cursor-help">
                    <span className="text-gray-500">Description length</span>
                    {formData.description.length >= 120 && formData.description.length <= 160 ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                  </div>
                  {(formData.description.length < 120 || formData.description.length > 160) && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-[#284b8c] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                      <p className="font-bold mb-1 text-blue-200">Fix required:</p>
                      Aim for 120-160 characters to avoid truncation in Google results.
                    </div>
                  )}
                </div>

                {/* Slug Check */}
                <div className="group relative">
                  <div className="flex items-center justify-between text-[11px] cursor-help">
                    <span className="text-gray-500">Slug structure</span>
                    {formData.slug.length > 0 && !formData.slug.includes(" ") ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                  </div>
                  {(formData.slug.length === 0 || formData.slug.includes(" ")) && (
                    <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-[#284b8c] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                      <p className="font-bold mb-1 text-blue-200">Fix required:</p>
                      Slugs must contain no spaces and use only lowercase letters or hyphens.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
