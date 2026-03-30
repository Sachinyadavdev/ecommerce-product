"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, X, Image as ImageIcon, Package } from "lucide-react";
import MediaPickerModal from "./MediaPickerModal";
import Image from "next/image";
import { toast } from "sonner";
import { isValidImageSrc } from "@/lib/image-utils";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
}

export default function ProductForm({
  initialData,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isBannerPickerOpen, setIsBannerPickerOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || "",
    categorySpecification: initialData?.categorySpecification || "",
    images: initialData?.images
      ? typeof initialData.images === "string"
        ? JSON.parse(initialData.images)
        : initialData.images
      : [],
    bannerImage: initialData?.bannerImage || "",
    specifications: initialData?.specifications
      ? typeof initialData.specifications === "string"
        ? JSON.parse(initialData.specifications)
        : initialData.specifications
      : {},
  });

  useEffect(() => {
    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category"); // Need to ensure this exists or use a direct db call in parent
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/product", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error ||
          (isEdit ? "Failed to update product" : "Failed to create product"),
        );
      }

      toast.success(
        isEdit
          ? "Product updated successfully!"
          : "Product created successfully!",
      );
      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Form error:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Core Product Configuration */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#5e9baf] rounded-full" />
            Core Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Product Designation *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-3 border text-slate-900 text-sm font-bold transition-all"
                placeholder="Product Name"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Permalink Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full border-slate-200 bg-slate-100/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-3 border text-slate-500 text-[13px] font-mono font-bold"
                placeholder="slug-id"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Classification
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-3 border text-slate-900 text-sm font-bold transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Ref Number / Technical Specification
              </label>
              <input
                type="text"
                value={formData.categorySpecification}
                onChange={(e) => setFormData({ ...formData, categorySpecification: e.target.value })}
                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-3 border text-slate-900 text-sm font-bold transition-all"
                placeholder="e.g. Model Reference"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                Operational Narrative
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-4 border text-slate-900 text-sm font-medium leading-relaxed transition-all resize-none"
                placeholder="Brief product overview..."
              />
            </div>
          </div>
        </div>

        {/* Section: Page Banner */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
              Page Banner
            </h2>
            <button
              type="button"
              onClick={() => {
                 // We'll use a simple prompt or another modal for a single image if needed,
                 // but for now let's reuse MediaPickerModal or just a simple input.
                 // Actually, let's add a separate state for banner picker.
                 setIsBannerPickerOpen(true);
              }}
              className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Select Banner
            </button>
          </div>

          {formData.bannerImage ? (
            <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[32/9] rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
              <Image
                src={formData.bannerImage}
                alt="Banner"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bannerImage: "" })}
                  className="p-2 bg-rose-500 text-white rounded-xl shadow-lg border-2 border-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsBannerPickerOpen(true)}
              className="w-full aspect-video md:aspect-[21/9] lg:aspect-[32/9] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-50 transition-all"
            >
              <ImageIcon className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-[10px] font-black uppercase tracking-widest">No Banner Selected</p>
            </div>
          )}
          <p className="text-[9px] text-gray-400 mt-3 font-bold uppercase tracking-widest leading-relaxed">
            This image will be used as the hero banner for this specific product page.
          </p>
        </div>

        {/* Section 2: Visual Media & Documentation */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-6 bg-[#284b8c] rounded-full" />
              Media Documentation
            </h2>
            <button
              type="button"
              onClick={() => setIsMediaPickerOpen(true)}
              className="text-[10px] font-black uppercase tracking-widest bg-[#284b8c] text-white px-5 py-2.5 rounded-xl hover:bg-[#5e9baf] transition-all shadow-lg flex items-center gap-2"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              Select Images
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {formData.images.length === 0 ? (
              <div className="col-span-full py-8 border-2 border-dashed border-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-200">
                <p className="text-[9px] font-black uppercase tracking-widest">No Visuals Indexed</p>
              </div>
            ) : (
              formData.images.map((url: string, index: number) => {
                const isValid = isValidImageSrc(url);
                return (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-xl border border-slate-100 overflow-hidden shadow-sm bg-slate-50"
                  >
                    {isValid ? (
                      <Image
                        src={url}
                        alt="Image"
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-100 text-slate-300">
                        <ImageIcon className="h-4 w-4 mb-1 opacity-20" />
                        <span className="text-[7px] font-black uppercase tracking-tighter opacity-40">Invalid Link</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...formData.images];
                          newImages.splice(index, 1);
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="p-1.5 bg-rose-500 text-white rounded-lg shadow-lg"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#5e9baf] text-white text-[7px] font-black uppercase tracking-widest rounded shadow-sm">
                        Hero
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 3: Technical Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#5e9baf] rounded-full" />
                Technical Parameters
              </h2>
              <button
                type="button"
                onClick={() => {
                  const newKey = `Property ${Object.keys(formData.specifications).length + 1}`;
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, [newKey]: "" },
                  });
                }}
                className="text-[9px] font-black uppercase tracking-widest text-[#284b8c] hover:underline"
              >
                + Add Spec
              </button>
            </div>

            <div className="space-y-2">
              {Object.entries(formData.specifications).map(([key, value], index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      const newKey = e.target.value;
                      const newSpecs = { ...formData.specifications };
                      if (newKey !== key) {
                        newSpecs[newKey] = value;
                        delete newSpecs[key];
                        setFormData({ ...formData, specifications: newSpecs });
                      }
                    }}
                    className="flex-1 border-slate-100 bg-slate-50/50 rounded-lg p-2 border text-[11px] font-black text-slate-500 uppercase tracking-tight outline-none focus:border-[#284b8c]/20"
                    placeholder="Attribute"
                  />
                  <input
                    type="text"
                    value={String(value)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        specifications: { ...formData.specifications, [key]: e.target.value },
                      });
                    }}
                    className="flex-auto border-slate-200 bg-white rounded-lg p-2 border text-[12px] text-slate-900 font-bold outline-none focus:border-[#5e9baf]/30"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSpecs = { ...formData.specifications };
                      delete newSpecs[key];
                      setFormData({ ...formData, specifications: newSpecs });
                    }}
                    className="text-slate-200 hover:text-rose-500 p-1.5"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Controls Sidebar (Inside Grid) */}
          <div className="space-y-6">
            <div className="bg-[#284b8c] p-6 rounded-2xl shadow-xl shadow-[#284b8c]/20 text-white">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 opacity-60">Status Dashboard</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="opacity-50">State</span>
                  <span className="font-black">{isEdit ? "UPDATING" : "INITIALIZING"}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="opacity-50">Specs Indexed</span>
                  <span className="font-black">{Object.keys(formData.specifications).length}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-4 bg-white text-[#284b8c] rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#5e9baf] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {isEdit ? "Commit Updates" : "Deploy Product"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full py-4 border border-slate-100 bg-white rounded-2xl text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Abort Changes
            </button>
          </div>
        </div>
      </form>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        selectedUrls={formData.images}
        onSelect={(urls) => setFormData({ ...formData, images: urls })}
      />

      <MediaPickerModal
        isOpen={isBannerPickerOpen}
        onClose={() => setIsBannerPickerOpen(false)}
        selectedUrls={formData.bannerImage ? [formData.bannerImage] : []}
        onSelect={(urls) => setFormData({ ...formData, bannerImage: urls[0] || "" })}
      />
    </div>
  );
}
