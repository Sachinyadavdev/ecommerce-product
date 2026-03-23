"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import {
    Download,
    Upload,
    ArrowLeft,
    FileSpreadsheet,
    AlertCircle,
    CheckCircle2,
    Edit2,
    Trash2,
    Loader2,
    X,
    Save,
    Package,
    Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

interface ProductRow {
    id?: string;
    name: string;
    slug: string;
    description?: string;
    categoryName?: string;
    categorySpecification?: string;
    images?: string;
    specifications?: string;
    _errors?: string[];
    _fieldErrors?: Record<string, string>;
}

export default function BulkUploadPage() {
    const router = useRouter();
    const [products, setProducts] = useState<ProductRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<any | null>(null);
    const [showErrorsOnly, setShowErrorsOnly] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useState(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/category");
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    });

    // Auto-reset error filter when no errors remain
    useEffect(() => {
        const hasErrors = products.some(p => p._errors && p._errors.length > 0);
        if (!hasErrors && showErrorsOnly) {
            setShowErrorsOnly(false);
        }
    }, [products, showErrorsOnly]);

    const downloadTemplate = () => {
        const templateData = [{
            "Product Designation": "Sample Product",
            "Classification": "Category Name",
            "Ref Number / Technical Specification": "Ref 123",
            "Operational Narrative": "Description here",
            "Media Documentation": '["/images/Besmak-Logo.png"]',
            "Technical Parameters": '{"Weight": "10kg", "Material": "Stainless Steel"}'
        }];

        const worksheet = XLSX.utils.json_to_sheet(templateData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
        XLSX.writeFile(workbook, "product_bulk_template.xlsx");
        toast.success("Template downloaded!");
    };

    const validateProducts = (data: any[]): ProductRow[] => {
        const seenNames = new Set<string>();
        return data.map((rawItem) => {
            const _errors: string[] = [];
            const _fieldErrors: Record<string, string> = {};

            // Map template fields to internal keys
            const item = {
                name: rawItem["Product Designation"] || rawItem.name,
                slug: rawItem["Permalink Slug"] || rawItem.slug,
                categoryName: rawItem["Classification"] || rawItem.categoryName,
                categorySpecification: rawItem["Ref Number / Technical Specification"] || rawItem.categorySpecification,
                description: rawItem["Operational Narrative"] || rawItem.description,
                images: rawItem["Media Documentation"] || rawItem["Media Documentation (JSON Array)"] || rawItem.images,
                specifications: rawItem["Technical Parameters"] || rawItem["Technical Parameters (JSON Object)"] || rawItem.specifications,
                ...rawItem
            };

            if (!item.name) {
                _errors.push("Product Designation is required");
                _fieldErrors.name = "Product Designation is missing";
            } else {
                const normalizedName = String(item.name).trim().toLowerCase();
                if (seenNames.has(normalizedName)) {
                    _errors.push(`Duplicate Product Designation: "${item.name}" is already in this batch`);
                    _fieldErrors.name = "Duplicate name found in upload";
                }
                seenNames.add(normalizedName);
            }

            // Auto-generate slug from name (lowercase, spaces to hyphens)
            let slug = "";
            if (item.name) {
                slug = String(item.name)
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-") // replace spaces with -
                    .replace(/[^\w-]/g, ""); // remove non-word chars except -
            }
            if (!slug) {
                _errors.push("Slug is required");
                _fieldErrors.slug = "Unique slug is required";
            }

            // Syntax check for JSON fields
            if (item.images) {
                const trimmedImages = String(item.images).trim();
                // Check if it's a direct URL (starts with http or / and doesn't look like JSON)
                const isDirectUrl = (trimmedImages.startsWith('http') || trimmedImages.startsWith('/')) && !trimmedImages.startsWith('[');

                if (isDirectUrl) {
                    // Automatically wrap single URL in JSON array string for the internal logic
                    item.images = JSON.stringify([trimmedImages]);
                } else {
                    try {
                        const parsed = JSON.parse(trimmedImages);
                        if (!Array.isArray(parsed)) throw new Error();
                    } catch (e) {
                        _errors.push("Images must be a valid JSON array or a direct URL");
                        _fieldErrors.images = "Invalid format. Expected: [\"url1\", \"url2\"] or a single URL";
                    }
                }
            }

            if (item.specifications) {
                try {
                    const parsed = JSON.parse(item.specifications);
                    if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
                } catch (e) {
                    _errors.push("Specifications must be a valid JSON object");
                    _fieldErrors.specifications = "Invalid format. Expected: {\"Key\": \"Value\"}";
                }
            }

            // Classification (Category) Validation
            let categoryId = item.categoryId;
            if (!item.categoryName) {
                _errors.push("Classification is required");
                _fieldErrors.categoryName = "Classification (Category) is missing";
            } else if (categories.length > 0) {
                const found = categories.find(c => c.name?.toLowerCase() === item.categoryName?.toLowerCase());
                if (found) {
                    categoryId = found.id;
                } else {
                    _errors.push(`Classification "${item.categoryName}" does not exist in our database`);
                    _fieldErrors.categoryName = "Invalid category name";
                }
            }

            return {
                ...item,
                slug: (slug || "").toLowerCase(),
                categoryId: categoryId || "",
                _errors: _errors.length > 0 ? _errors : undefined,
                _fieldErrors: Object.keys(_fieldErrors).length > 0 ? _fieldErrors : undefined
            };
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                if (data.length === 0) {
                    toast.error("The file is empty.");
                    return;
                }

                const validatedData = validateProducts(data);
                setProducts(validatedData);
                toast.info(`Imported ${validatedData.length} rows for preview.`);
            } catch (err) {
                console.error(err);
                toast.error("Failed to parse file.");
            } finally {
                setUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleEditClick = (index: number) => {
        const product = products[index];
        setEditingIndex(index);

        // Parse JSON fields for editing
        let images: string[] = [];
        try {
            const parsed = product.images ? JSON.parse(product.images) : [];
            images = Array.isArray(parsed) ? parsed.filter(u => u && u.trim().length > 0) : [product.images!].filter(u => u && u.trim().length > 0);
        } catch (e) {
            images = product.images ? [product.images].filter(u => u && u.trim().length > 0) : [];
        }

        let specifications = {};
        try { specifications = product.specifications ? JSON.parse(product.specifications) : {}; } catch (e) { specifications = {}; }

        setEditFormData({
            ...product,
            images,
            specifications
        });
        setIsEditModalOpen(true);
    };

    const saveEdit = () => {
        if (editingIndex === null || !editFormData) return;

        const newProducts = [...products];
        // Re-validate edit
        const _errors: string[] = [];
        const _fieldErrors: Record<string, string> = {};

        if (!editFormData.name) {
            _errors.push("Name is required");
            _fieldErrors.name = "Name is required";
        }

        // Auto-generate slug from the possibly modified name
        const generatedSlug = String(editFormData.name || "")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

        if (!generatedSlug) {
            _errors.push("Valid name is required to generate slug");
            _fieldErrors.slug = "Valid name is required";
        }
        if (!editFormData.categoryName) {
            _errors.push("Classification is required");
            _fieldErrors.categoryName = "Classification (Category) is missing";
        } else if (categories.length > 0) {
            const found = categories.find(c => c.id === editFormData.categoryId || c.name?.toLowerCase() === editFormData.categoryName?.toLowerCase());
            if (!found) {
                _errors.push(`Classification "${editFormData.categoryName}" is invalid`);
                _fieldErrors.categoryName = "Invalid category";
            }
        }

        // Convert parsed objects back to strings for the preview list
        const stringifiedImages = JSON.stringify(editFormData.images || []);
        const stringifiedSpecs = JSON.stringify(editFormData.specifications || {});

        // Final duplicate check across other rows
        const currentName = String(editFormData.name || "").trim().toLowerCase();
        const duplicateExists = products.some((p, i) => i !== editingIndex && p.name.trim().toLowerCase() === currentName);
        if (duplicateExists) {
            _errors.push(`Duplicate Name: "${editFormData.name}" is already used in another row`);
            _fieldErrors.name = "Duplicate name found in batch";
        }

        newProducts[editingIndex] = {
            ...editFormData,
            slug: generatedSlug,
            images: stringifiedImages,
            specifications: stringifiedSpecs,
            _errors: _errors.length > 0 ? _errors : undefined,
            _fieldErrors: Object.keys(_fieldErrors).length > 0 ? _fieldErrors : undefined
        };

        setProducts(newProducts);
        setIsEditModalOpen(false);
        setEditingIndex(null);
        setEditFormData(null);
        toast.success("Changes saved for sync");
    };

    const removeRow = (index: number) => {
        setProducts(products.filter((_, i) => i !== index));
        toast.info("Row removed from preview");
    };

    const getAssetCount = (imgStr?: string) => {
        if (!imgStr) return 0;
        if (imgStr.startsWith('[')) {
            try {
                const parsed = JSON.parse(imgStr);
                return Array.isArray(parsed) ? parsed.length : 1;
            } catch (e) {
                return 1;
            }
        }
        return 1;
    };

    const handleCommit = async () => {
        const hasErrors = products.some(p => p._errors && p._errors.length > 0);
        if (hasErrors) {
            toast.error("Please fix all _errors before committing to the database.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/bulk-products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ products }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.error || "Bulk upload failed");

            toast.success(result.message || "Bulk operation completed successfully!");
            setTimeout(() => router.push("/admin/products"), 2000);
        } catch (err: any) {
            toast.error(err.message || "Failed to commit data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-8 animate-in fade-in duration-500">
            <div className="mb-0">
                <Link
                    href="/admin/products"
                    className="text-blue-600 hover:text-blue-800 flex items-center mb-6 transition-colors font-medium text-sm"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Link>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bulk Product Upload</h1>
                        {products.length > 0 && (
                            <div className="flex flex-col gap-2 mt-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    {products.length} Detected Items &bull; {products.filter(p => p._errors).length} Required Fixes
                                </p>
                                {products.some(p => p._errors) && (
                                    <label className="flex items-center gap-2 cursor-pointer group max-w-fit">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={showErrorsOnly}
                                                onChange={(e) => setShowErrorsOnly(e.target.checked)}
                                                className="peer h-4 w-4 opacity-0 absolute cursor-pointer"
                                            />
                                            <div className={`h-4 w-4 border-2 rounded transition-all ${showErrorsOnly ? 'bg-rose-500 border-rose-500' : 'border-slate-300 group-hover:border-rose-300'}`}>
                                                {showErrorsOnly && <X className="h-3 w-3 text-white" />}
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${showErrorsOnly ? 'text-rose-500' : 'text-slate-400 group-hover:text-rose-400'}`}>
                                            Show only rows with _errors
                                        </span>
                                    </label>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={downloadTemplate}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
                        >
                            <Download className="h-4 w-4" />
                            Download Template
                        </button>

                        {products.length > 0 && (
                            <>
                                <button
                                    onClick={() => setProducts([])}
                                    className="px-5 py-2.5 bg-white border border-slate-200 text-rose-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95"
                                >
                                    Clear List
                                </button>

                                <button
                                    onClick={handleCommit}
                                    disabled={loading || products.some(p => p._errors && p._errors.length > 0)}
                                    className="px-6 py-2.5 bg-[#284b8c] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#284b8c]/20 hover:bg-[#5e9baf] transition-all flex items-center gap-3 disabled:opacity-50 active:scale-95"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Save className="h-4 w-4" />}
                                    Upload Products
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto space-y-8">
                {/* Upload Drop Area */}
                {products.length === 0 ? (
                    <div className="group relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept=".xlsx,.xls"
                            className="hidden"
                            id="bulk-file-input"
                        />
                        <label
                            htmlFor="bulk-file-input"
                            className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/20 transition-all duration-500 cursor-pointer"
                        >
                            <div className="w-16 h-16 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-primary shadow-sm mb-6 transition-all group-hover:scale-110">
                                <FileSpreadsheet className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Import Product Dataset</h2>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Select XLSX file to begin synchronization</p>

                            <div className="mt-10 flex gap-6 text-[9px] font-black uppercase tracking-widest text-slate-300">
                                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Auto-Validation</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Upsert Logic</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Image Support</span>
                            </div>
                        </label>

                        {uploading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Parsing Matrix...</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {products.some(p => p._errors && p._errors.length > 0) && (
                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-lg flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300">
                                <div className="flex items-center gap-3">
                                    <div className="bg-rose-500 p-2 rounded-lg text-white">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-rose-900 uppercase tracking-tight">Dataset Validation Failed</h4>
                                        <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">
                                            {products.filter(p => p._errors).length} rows contain critical _errors. Fix them to enable production sync.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowErrorsOnly(true)}
                                    className="px-4 py-2 bg-white border border-rose-200 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                >
                                    Focus Error Rows
                                </button>
                            </div>
                        )}

                        {/* Table Container */}
                        <div className="bg-white rounded-lg border border-slate-100 shadow-xl shadow-slate-200/30 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100">
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Designation</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Images</th>
                                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {products
                                            .map((item, originalIdx) => ({ ...item, originalIdx }))
                                            .filter(item => !showErrorsOnly || (item._errors && item._errors.length > 0))
                                            .map((item) => (
                                                <tr key={item.originalIdx} className={`group hover:bg-slate-50 transition-colors ${item._errors ? 'bg-rose-50/30' : ''}`}>
                                                    <td className="px-6 py-4">
                                                        {item._errors ? (
                                                            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg flex items-center gap-2 max-w-fit" title={item._errors.join(', ')}>
                                                                <AlertCircle className="h-4 w-4" />
                                                                <span className="text-[10px] font-black uppercase">{item._errors.length} Errors</span>
                                                            </div>
                                                        ) : (
                                                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-[13px] font-black text-slate-800">{item.name}</span>
                                                            <span className="text-[11px] font-mono text-slate-400">{item.slug}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">
                                                            {item.categoryName || "Unassigned"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[11px] font-bold text-slate-400">
                                                            {getAssetCount(item.images)} Assets
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleEditClick(item.originalIdx)}
                                                                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-primary hover:border-primary/30 transition-all"
                                                            >
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeRow(item.originalIdx)}
                                                                className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Advanced Edit Modal */}
            {
                isEditModalOpen && editFormData && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                            <div className="flex justify-between items-center p-8 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                        <Package className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Edit Product</h3>
                                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-[0.3em]">Matrix Reference: {editingIndex}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-all hover:rotate-90">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* General Errors Summary */}
                                {editFormData._errors && editFormData._errors.length > 0 && (
                                    <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="flex items-center gap-3 text-rose-600 mb-2">
                                            <AlertCircle className="h-5 w-5" />
                                            <h4 className="text-sm font-black uppercase tracking-tight">Required Fixes Found</h4>
                                        </div>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                            {editFormData._errors.map((err: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-[10px] font-bold text-rose-500 uppercase tracking-widest leading-relaxed">
                                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0" />
                                                    {err}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Section 1: Core Configuration */}
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
                                                value={editFormData.name}
                                                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                                className={`w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm focus:ring-4 focus:ring-[#5e9baf]/5 focus:border-[#5e9baf]/30 p-3 border text-slate-900 text-sm font-bold transition-all ${editFormData._fieldErrors?.name ? 'border-rose-300 ring-rose-500/10' : ''}`}
                                                placeholder="Product Name"
                                            />
                                            {editFormData._fieldErrors?.name && (
                                                <p className="text-[9px] font-black text-rose-500 uppercase mt-2 tracking-widest">{editFormData._fieldErrors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                                Permalink Slug (Auto-generated)
                                            </label>
                                            <div className="w-full border-slate-200 bg-slate-100/50 rounded-xl shadow-sm p-3 border text-slate-500 text-[13px] font-mono font-bold">
                                                {editFormData.name ? String(editFormData.name).toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "") : "slug-will-appear-here"}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                                Classification
                                            </label>
                                            <select
                                                value={editFormData.categoryId || ""}
                                                onChange={(e) => setEditFormData({
                                                    ...editFormData,
                                                    categoryId: e.target.value,
                                                    categoryName: categories.find(c => c.id === e.target.value)?.name
                                                })}
                                                className={`w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm p-3 border text-slate-900 text-sm font-bold transition-all ${editFormData._fieldErrors?.categoryName ? 'border-rose-300 ring-rose-500/10' : ''}`}
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {editFormData._fieldErrors?.categoryName && (
                                                <p className="text-[9px] font-black text-rose-500 uppercase mt-2 tracking-widest">{editFormData._fieldErrors.categoryName}</p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                                Ref Number / Technical Specification
                                            </label>
                                            <input
                                                type="text"
                                                value={editFormData.categorySpecification || ""}
                                                onChange={(e) => setEditFormData({ ...editFormData, categorySpecification: e.target.value })}
                                                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm p-3 border text-slate-900 text-sm font-bold transition-all"
                                                placeholder="e.g. Model Reference"
                                            />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                                                Operational Narrative
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={editFormData.description || ""}
                                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                                className="w-full border-slate-200 bg-slate-50/50 rounded-xl shadow-sm p-4 border text-slate-900 text-sm font-medium leading-relaxed transition-all resize-none"
                                                placeholder="Brief product overview..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Media Documentation */}
                                <div className={`bg-white p-6 rounded-2xl shadow-sm border ${editFormData._fieldErrors?.images ? 'border-rose-300 ring-4 ring-rose-500/5' : 'border-slate-100'}`}>
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="space-y-1">
                                            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-[#284b8c] rounded-full" />
                                                Media Documentation
                                            </h2>
                                            {editFormData._fieldErrors?.images && (
                                                <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-3.5">{editFormData._fieldErrors.images}</p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setIsMediaPickerOpen(true)}
                                            className="text-[10px] font-black uppercase tracking-widest bg-[#284b8c] text-white px-5 py-2.5 rounded-xl hover:bg-[#5e9baf] transition-all shadow-lg flex items-center gap-2"
                                        >
                                            <ImageIcon className="h-3.5 w-3.5" />
                                            Select Images
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                        {(!editFormData.images || editFormData.images.length === 0) ? (
                                            <div className="col-span-full py-12 border-2 border-dashed border-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-200">
                                                <p className="text-[10px] font-black uppercase tracking-widest">No Visuals Indexed</p>
                                            </div>
                                        ) : (
                                            editFormData.images.map((url: string, index: number) => {
                                                const isValidUrl = url && (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://'));
                                                return (
                                                    <div key={index} className="group relative aspect-square rounded-xl border border-slate-100 overflow-hidden shadow-sm bg-slate-100">
                                                        {isValidUrl ? (
                                                            <Image
                                                                src={url}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                                sizes="100px"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-300 p-2 text-center">
                                                                <ImageIcon className="h-6 w-6 mb-1 opacity-20" />
                                                                <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">Invalid Source</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newImages = [...editFormData.images];
                                                                    newImages.splice(index, 1);
                                                                    setEditFormData({ ...editFormData, images: newImages });
                                                                }}
                                                                className="p-1.5 bg-rose-500 text-white rounded-lg shadow-lg hover:scale-110 transition-transform"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                {/* Section 3: Technical Parameters & Status */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className={`md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border ${editFormData._fieldErrors?.specifications ? 'border-rose-300 ring-4 ring-rose-500/5' : 'border-slate-100'}`}>
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="space-y-1">
                                                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                    <div className="w-1.5 h-6 bg-[#5e9baf] rounded-full" />
                                                    Technical Parameters
                                                </h2>
                                                {editFormData._fieldErrors?.specifications && (
                                                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-3.5">{editFormData._fieldErrors.specifications}</p>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newKey = `Property ${Object.keys(editFormData.specifications || {}).length + 1}`;
                                                    setEditFormData({
                                                        ...editFormData,
                                                        specifications: { ...(editFormData.specifications || {}), [newKey]: "" },
                                                    });
                                                }}
                                                className="text-[9px] font-black uppercase tracking-widest text-[#284b8c] hover:underline"
                                            >
                                                + Add Spec
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {Object.entries(editFormData.specifications || {}).map(([key, value], index) => (
                                                <div key={index} className="flex gap-3 items-center">
                                                    <input
                                                        type="text"
                                                        value={key}
                                                        onChange={(e) => {
                                                            const newKey = e.target.value;
                                                            const newSpecs = { ...editFormData.specifications };
                                                            if (newKey !== key) {
                                                                newSpecs[newKey] = value;
                                                                delete newSpecs[key];
                                                                setEditFormData({ ...editFormData, specifications: newSpecs });
                                                            }
                                                        }}
                                                        className="flex-1 border-slate-100 bg-slate-50/50 rounded-lg p-2.5 border text-[11px] font-black text-slate-500 uppercase tracking-tight"
                                                        placeholder="Attribute"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={String(value)}
                                                        onChange={(e) => {
                                                            setEditFormData({
                                                                ...editFormData,
                                                                specifications: { ...editFormData.specifications, [key]: e.target.value },
                                                            });
                                                        }}
                                                        className="flex-[2] border-slate-200 bg-white rounded-lg p-2.5 border text-[12px] text-slate-900 font-bold"
                                                        placeholder="Value"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newSpecs = { ...editFormData.specifications };
                                                            delete newSpecs[key];
                                                            setEditFormData({ ...editFormData, specifications: newSpecs });
                                                        }}
                                                        className="text-slate-200 hover:text-rose-500 transition-colors"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sidebar Dash */}
                                    <div className="space-y-6">
                                        <div className="bg-[#284b8c] p-8 rounded-3xl shadow-xl shadow-[#284b8c]/20 text-white">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">Status Dashboard</h3>
                                            <div className="space-y-5">
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="opacity-50">State</span>
                                                    <span className="font-black">BATCH_IDLE</span>
                                                </div>
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="opacity-50">Specs Indexed</span>
                                                    <span className="font-black">{Object.keys(editFormData.specifications || {}).length}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={saveEdit}
                                                className="w-full mt-8 py-5 bg-white text-[#284b8c] rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-emerald-400 hover:text-white transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
                                            >
                                                <Save className="h-4 w-4" />
                                                Deploy Changes
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="w-full py-5 border border-slate-100 bg-white rounded-3xl text-slate-400 font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                                        >
                                            <X className="h-4 w-4" />
                                            Abort Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <MediaPickerModal
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                selectedUrls={editFormData?.images || []}
                onSelect={(urls) => setEditFormData({ ...editFormData, images: urls })}
            />
        </div >
    );
}
