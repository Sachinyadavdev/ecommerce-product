"use client";

import { useState } from "react";
import { X, Save, Loader2, Plus, Trash2, Type, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface TextStyle {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    color: string;
    textAlign: "left" | "center" | "right";
}

interface ContentItem {
    id: string;
    text: string;
    style: TextStyle;
}

interface CareerIntroEditorProps {
    sectionId: string;
    content: any;
    onClose: () => void;
    onSave: () => void;
}

const DEFAULT_STYLE: TextStyle = {
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "32px",
    color: "#4B5563",
    textAlign: "center"
};

const TITLE_DEFAULT_STYLE: TextStyle = {
    fontSize: "36px",
    fontWeight: "900",
    lineHeight: "1.2",
    color: "#00469B",
    textAlign: "center"
};

export default function CareerIntroEditor({
    sectionId,
    content,
    onClose,
    onSave,
}: CareerIntroEditorProps) {
    const [isSaving, setIsSaving] = useState(false);

    // Initial state setup
    const initialTitle = typeof content.title === 'string' 
        ? { text: content.title, style: { ...TITLE_DEFAULT_STYLE } }
        : content.title || { text: "Careers | Besmak India", style: { ...TITLE_DEFAULT_STYLE } };

    const initialParagraphs = Array.isArray(content.paragraphs) 
        ? content.paragraphs 
        : [
            { id: "p1", text: content.line1 || "", style: { ...DEFAULT_STYLE } },
            { id: "p2", text: content.line2 || "", style: { ...DEFAULT_STYLE } },
            { id: "p3", text: content.line3 || "", style: { ...DEFAULT_STYLE } },
            { id: "p4", text: content.line4 || "", style: { ...DEFAULT_STYLE } },
        ].filter(p => p.text);

    const [title, setTitle] = useState(initialTitle);
    const [paragraphs, setParagraphs] = useState<ContentItem[]>(initialParagraphs);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const updatedContent = {
                ...content,
                title,
                paragraphs,
            };

            const res = await fetch(`/api/cms/sections/${sectionId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: updatedContent }),
            });

            if (!res.ok) throw new Error("Failed to save");
            toast.success("Career section updated!");
            onSave();
        } catch {
            toast.error("Error saving changes");
        } finally {
            setIsSaving(false);
        }
    };

    const updateParagraph = (id: string, updates: Partial<ContentItem>) => {
        setParagraphs(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const updateParagraphStyle = (id: string, styleUpdates: Partial<TextStyle>) => {
        setParagraphs(prev => prev.map(p => p.id === id ? { ...p, style: { ...p.style, ...styleUpdates } } : p));
    };

    const addParagraph = () => {
        const id = `p-${Date.now()}`;
        setParagraphs(prev => [...prev, { id, text: "New paragraph text...", style: { ...DEFAULT_STYLE } }]);
    };

    const removeParagraph = (id: string) => {
        setParagraphs(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[92vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Edit Career Content & CSS</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Customize text and styles per element</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    
                    {/* Title Section */}
                    <div className="space-y-4 border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/30 rounded-r-xl p-4">
                        <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Main Title</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={title.text}
                                onChange={(e) => setTitle({ ...title, text: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-xl text-black text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Section Title"
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Font Size</label>
                                    <input type="text" value={title.style.fontSize} onChange={(e) => setTitle({...title, style: {...title.style, fontSize: e.target.value}})} className="w-full p-2 border border-gray-300 rounded-lg text-xs text-black" placeholder="36px" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Weight</label>
                                    <select value={title.style.fontWeight} onChange={(e) => setTitle({...title, style: {...title.style, fontWeight: e.target.value}})} className="w-full p-2 border border-gray-300 rounded-lg text-xs text-black">
                                        <option value="400">Regular (400)</option>
                                        <option value="500">Medium (500)</option>
                                        <option value="600">Semibold (600)</option>
                                        <option value="700">Bold (700)</option>
                                        <option value="900">Black (900)</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Color</label>
                                    <input type="color" value={title.style.color} onChange={(e) => setTitle({...title, style: {...title.style, color: e.target.value}})} className="w-full h-8 border border-gray-300 rounded-lg" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Align</label>
                                    <div className="flex bg-gray-100 rounded-lg p-0.5">
                                        {["left", "center", "right"].map(align => (
                                            <button key={align} onClick={() => setTitle({...title, style: {...title.style, textAlign: align as any}})} className={`flex-1 text-[10px] py-1 rounded-md transition-all ${title.style.textAlign === align ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-400 font-medium'}`}>{align}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Paragraphs Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Paragraphs</h3>
                            <button onClick={addParagraph} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm">
                                <Plus className="h-4 w-4" /> Add Paragraph
                            </button>
                        </div>

                        <div className="space-y-6">
                            {paragraphs.map((p, idx) => (
                                <div key={p.id} className="group border border-gray-200 rounded-2xl p-4 bg-white hover:border-blue-300 transition-all shadow-sm">
                                    <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Paragraph {idx+1}</span>
                                        <button onClick={() => removeParagraph(p.id)} className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <textarea
                                            value={p.text}
                                            onChange={(e) => updateParagraph(p.id, { text: e.target.value })}
                                            className="w-full p-3 border border-gray-200 rounded-xl text-black text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                                            placeholder="Write content here..."
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Font Size</label>
                                                <input type="text" value={p.style.fontSize} onChange={(e) => updateParagraphStyle(p.id, { fontSize: e.target.value })} className="w-full p-2 border border-gray-200 rounded-lg text-xs text-black" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Line Height</label>
                                                <input type="text" value={p.style.lineHeight} onChange={(e) => updateParagraphStyle(p.id, { lineHeight: e.target.value })} className="w-full p-2 border border-gray-200 rounded-lg text-xs text-black" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Weight</label>
                                                <select value={p.style.fontWeight} onChange={(e) => updateParagraphStyle(p.id, { fontWeight: e.target.value })} className="w-full p-2 border border-gray-200 rounded-lg text-xs text-black">
                                                    <option value="400">Normal (400)</option>
                                                    <option value="500">Medium (500)</option>
                                                    <option value="600">Semibold (600)</option>
                                                    <option value="700">Bold (700)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Align</label>
                                                <div className="flex bg-gray-50 rounded-lg p-0.5 border">
                                                    {["left", "center", "right"].map(align => (
                                                        <button key={align} onClick={() => updateParagraphStyle(p.id, { textAlign: align as any })} className={`flex-1 text-[10px] py-1 rounded-md transition-all ${p.style.textAlign === align ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-400 font-medium'}`}>{align}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3 flex-shrink-0">
                    <button onClick={onClose} className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 shadow-lg transition-all active:scale-95"
                    >
                        {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
