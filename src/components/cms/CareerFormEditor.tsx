"use client";

import { useState } from "react";
import { X, Save, Loader2, Plus, Trash2, GripVertical, Type, Hash, Type as TextIcon, Phone, Mail, FileText, File as FileIcon } from "lucide-react";
import { toast } from "sonner";

export type FieldType = "text" | "email" | "tel" | "textarea" | "file";

interface FormField {
    id: string;
    label: string;
    name: string;
    type: FieldType;
    placeholder: string;
    required: boolean;
}

interface CareerFormEditorProps {
    sectionId: string;
    content: {
        title?: string;
        fields?: string; // JSON string of FormField[]
    };
    onClose: () => void;
    onSave: () => void;
}

const DEFAULT_FIELDS: FormField[] = [
    { id: "f1", label: "First Name", name: "firstName", type: "text", placeholder: "John", required: true },
    { id: "f2", label: "Last Name", name: "lastName", type: "text", placeholder: "Doe", required: true },
    { id: "f3", label: "Email Address", name: "email", type: "email", placeholder: "john@example.com", required: true },
    { id: "f4", label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 9XXXX XXXXX", required: true },
    { id: "f5", label: "Message", name: "message", type: "textarea", placeholder: "Tell us about yourself...", required: true },
    { id: "f6", label: "Resume / Portfolio", name: "file", type: "file", placeholder: "", required: false },
];

const FIELD_TYPES: { value: FieldType; label: string; icon: any }[] = [
    { value: "text", label: "Text", icon: TextIcon },
    { value: "email", label: "Email", icon: Mail },
    { value: "tel", label: "Phone", icon: Phone },
    { value: "textarea", label: "Long Text", icon: FileText },
    { value: "file", label: "File Upload", icon: FileIcon },
];

export default function CareerFormEditor({
    sectionId,
    content,
    onClose,
    onSave,
}: CareerFormEditorProps) {
    const [title, setTitle] = useState(content.title ?? "Apply Now");
    const [isSaving, setIsSaving] = useState(false);

    const parseFields = (): FormField[] => {
        try {
            const parsed = content.fields ? JSON.parse(content.fields) : DEFAULT_FIELDS;
            return Array.isArray(parsed) ? parsed : DEFAULT_FIELDS;
        } catch {
            return DEFAULT_FIELDS;
        }
    };

    const [fields, setFields] = useState<FormField[]>(parseFields);

    const addField = () => {
        const id = `field-${Date.now()}`;
        setFields((prev) => [
            ...prev,
            { id, label: "New Field", name: `field_${prev.length + 1}`, type: "text", placeholder: "", required: false },
        ]);
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const updatedContent = {
                title,
                fields: JSON.stringify(fields),
            };

            const res = await fetch(`/api/cms/sections/${sectionId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: updatedContent }),
            });

            if (!res.ok) throw new Error("Failed to save");
            toast.success("Career form updated!");
            onSave();
        } catch {
            toast.error("Error saving changes");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden max-h-[92vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b bg-gray-50 flex items-center justify-between flex-shrink-0">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Edit Career Form</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Manage form fields and title</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Form Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded-xl text-black text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-800">Form Fields</h3>
                            <button
                                onClick={addField}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow"
                            >
                                <Plus className="h-4 w-4" />
                                Add Field
                            </button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="h-4 w-4 text-gray-300" />
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Field {index + 1}</span>
                                        </div>
                                        <button onClick={() => removeField(field.id)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase">Label</label>
                                            <input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase">Data Name (Slug)</label>
                                            <input
                                                type="text"
                                                value={field.name}
                                                onChange={(e) => updateField(field.id, { name: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase">Type</label>
                                            <select
                                                value={field.type}
                                                onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                                                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {FIELD_TYPES.map(t => (
                                                    <option key={t.value} value={t.value}>{t.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase">Placeholder</label>
                                            <input
                                                type="text"
                                                value={field.placeholder}
                                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="checkbox"
                                                id={`req-${field.id}`}
                                                checked={field.required}
                                                onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`req-${field.id}`} className="text-xs font-semibold text-gray-700 cursor-pointer">Required Field</label>
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
                        className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
