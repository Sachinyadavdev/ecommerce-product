"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Save, X, Upload, Image as ImageIcon, Tag,
  FileText, Link as LinkIcon, CheckCircle2, Settings2,
  Hash, Cpu, Layers, Box, Palette, Droplets, Package
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface CategoryFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function CategoryForm({ initialData, isEdit = false }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    tag: initialData?.tag || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    display_order: initialData?.display_order || 0,
    active_filters: initialData?.active_filters 
      ? (typeof initialData.active_filters === 'string' ? JSON.parse(initialData.active_filters) : initialData.active_filters)
      : ["categoryNumber", "series", "way", "material", "colour", "mf", "sealed"],
  });

  const availableFilters = [
    { id: "categoryNumber", label: "Number", icon: Hash },
    { id: "series", label: "Series", icon: Settings2 },
    { id: "way", label: "Way", icon: Cpu },
    { id: "material", label: "Material", icon: Box },
    { id: "colour", label: "Colour", icon: Palette },
    { id: "mf", label: "M/F", icon: Layers },
    { id: "sealed", label: "Sealed", icon: Droplets },
  ];

  const handleFilterToggle = (filterId: string) => {
    setFormData(prev => {
      const current = prev.active_filters || [];
      const updated = current.includes(filterId)
        ? current.filter((id: string) => id !== filterId)
        : [...current, filterId];
      return { ...prev, active_filters: updated };
    });
  };

  useEffect(() => {
    if (!isEdit && formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, isEdit]);

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (e: any) {
      toast.error("Upload failed: " + (e?.message || "Unknown error"));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/category", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success(isEdit ? "Category updated successfully!" : "Category launched successfully!");
      router.push("/admin/categories");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ===== LEFT — Form Fields (3/5) ===== */}
        <div className="lg:col-span-3 space-y-5">

          {/* Name */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <label className="flex items-center gap-2 text-[10px] font-black text-[#5e9baf]/60 uppercase tracking-[0.2em] mb-4">
              <Package className="h-4 w-4 text-[#5e9baf]" />
              Categorical Identity
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-0 border-b-2 border-slate-100 focus:border-[#5e9baf] pb-3 text-slate-800 text-2xl font-black outline-none transition-all placeholder:text-slate-100 bg-transparent mb-6 uppercase"
              placeholder="Primary Name..."
            />

            <label className="flex items-center gap-2 text-[10px] font-black text-[#284b8c]/60 uppercase tracking-[0.2em] mb-4">
              <Tag className="h-4 w-4 text-[#284b8c]" />
              Hover Designation (Subtitle)
            </label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full border-0 border-b-2 border-slate-100 focus:border-[#284b8c] pb-3 text-slate-600 text-lg font-bold outline-none transition-all placeholder:text-slate-100 bg-transparent"
              placeholder="e.g. Integrated Solutions..."
            />
            <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase tracking-widest">
              This replaces the static "Integrated Solutions" text on the products page.
            </p>
          </div>

          {/* Display Order */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              <Hash className="h-4 w-4 text-[#5e9baf]" />
              Categorical Sequencing
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Math.max(0, parseInt(e.target.value) || 0) })}
                className="w-32 border border-slate-200 bg-slate-50/50 rounded-xl px-4 py-3 text-slate-700 text-sm font-black outline-none focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 transition-all"
                placeholder="0"
              />
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                Determines the visual priority on the public index. Lower values appear first.
              </p>
            </div>
          </div>

          {/* Slug */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              <LinkIcon className="h-4 w-4 text-[#5e9baf]" />
              Permalink Configuration
            </label>
            <div className="flex items-center gap-0 bg-slate-50/50 rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#5e9baf]/30 focus-within:ring-4 focus-within:ring-[#5e9baf]/5 transition-all">
              <span className="px-5 py-4 text-xs text-gray-400 font-bold font-mono whitespace-nowrap border-r border-gray-200 bg-gray-100/30 select-none">
                /products/
              </span>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-5 py-4 text-xs font-bold font-mono text-slate-700 bg-transparent outline-none"
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              <FileText className="h-4 w-4 text-[#5e9baf]" />
              Public Narrative
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-5 py-4 text-slate-700 text-sm font-medium leading-relaxed outline-none focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 transition-all resize-none"
              placeholder="Describe this category..."
            />
            <div className="flex justify-between mt-3">
               <p className="text-[10px] text-gray-300 font-bold uppercase">{formData.description.length} Characters</p>
               <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">SEO Optimized</p>
            </div>
          </div>

          {/* Filter Configuration */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <label className="flex items-center gap-2 text-[10px] font-black text-[#5e9baf] uppercase tracking-[0.2em]">
                <Settings2 className="h-4 w-4" />
                Filter Engine Setup
              </label>
              <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md uppercase">Configurable</span>
            </div>
            
            <div className="p-6 space-y-2">
              <p className="text-[11px] text-slate-400 font-medium mb-6 leading-relaxed">
                Select specifications to enable as sidebar filters.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableFilters.map((filter) => {
                  const isActive = formData.active_filters?.includes(filter.id);
                  const Icon = filter.icon;
                  return (
                    <div
                      key={filter.id}
                      onClick={() => handleFilterToggle(filter.id)}
                      className={`group flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-center ${
                        isActive 
                          ? "bg-[#5e9baf]/[0.04] border-[#5e9baf]/30 shadow-sm ring-2 ring-[#5e9baf]/5"
                          : "bg-white border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                        isActive ? "bg-[#5e9baf] text-white shadow-lg shadow-[#5e9baf]/20" : "bg-slate-50 text-slate-400"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <p className={`text-[10px] font-black uppercase tracking-widest transition-colors mb-1 truncate w-full ${isActive ? "text-primary" : "text-slate-600"}`}>
                        {filter.label}
                      </p>

                      <div className={`w-5 h-1 rounded-full transition-all duration-300 ${
                        isActive ? "bg-[#5e9baf] w-8" : "bg-slate-100"
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT — Image Panel (2/5) ===== */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <ImageIcon className="h-4 w-4 text-[#5e9baf]" />
              <span className="text-[10px] font-black text-[#5e9baf] uppercase tracking-[0.2em]">Visual Reference</span>
            </div>

            <div className="p-6 space-y-6">
              {/* Drop zone / preview */}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

              {formData.image ? (
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-50 border border-gray-100 shadow-inner">
                  <Image src={formData.image} alt="Preview" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, image: "" }))}
                      className="bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl hover:bg-red-600 transition-all transform hover:scale-105"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-1.5 shadow-xl border-2 border-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`aspect-[4/3] flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 cursor-pointer transition-all duration-500 group relative overflow-hidden bg-slate-50/50 ${
                    dragOver ? "border-[#5e9baf] bg-[#5e9baf]/[0.02] scale-[1.02]" : "hover:border-[#5e9baf]/30 hover:bg-white"
                  }`}
                >
                  {uploadingImage ? (
                    <div className="flex flex-col items-center animate-pulse">
                      <Loader2 className="h-8 w-8 text-[#5e9baf] animate-spin mb-4" />
                      <p className="text-[10px] font-black text-[#5e9baf] uppercase tracking-widest">Processing...</p>
                    </div>
                  ) : (
                    <>
                      <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Upload className="h-6 w-6 text-[#5e9baf]/40" />
                      </div>
                      <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.1em] mb-1">
                        Upload Asset
                      </p>
                      <p className="text-[8px] text-slate-400 font-bold uppercase">Optimized formats only</p>
                    </>
                  )}
                </div>
              )}

              {/* URL fallback */}
              <div>
                <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest block mb-2">
                  Image Source URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full border border-slate-200 bg-slate-50/50 rounded-xl px-4 py-3 text-[10px] text-slate-600 font-bold font-mono outline-none focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 transition-all"
                  placeholder="Insert path manually..."
                />
              </div>

              <p className="text-[10px] text-gray-300 font-bold leading-relaxed italic">
                A high-quality 4:3 image is recommended for optimal display on search results.
              </p>
            </div>

            {/* Publishing Actions Integrated in Sidebar */}
            <div className="px-6 py-6 border-t border-slate-50 bg-slate-50/30">
               <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">State: Ready for Deployment</span>
               </div>
               
               <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-[#284b8c] hover:bg-[#5e9baf] active:scale-[0.98] text-white rounded-xl flex items-center justify-center gap-4 text-xs font-black shadow-2xl shadow-[#284b8c]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    )}
                    {isEdit ? "Update System" : "Launch Category"}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full px-5 py-4 border border-slate-100 rounded-xl text-slate-400 hover:text-[#284b8c] hover:border-[#284b8c]/20 hover:bg-white transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                  >
                    <X className="h-3.5 w-3.5" /> Abort Changes
                  </button>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-[9px] text-gray-300 font-black uppercase tracking-[0.2em]">
                     <div className="w-8 h-8 rounded-xl bg-gray-100/50 flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                     </div>
                     Synced: {new Date().toLocaleDateString()}
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
