"use client";

import { useState } from "react";
import { X, Save, Loader2, Layout, Info, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

interface ContactHeroEditorProps {
  sectionId: string;
  content: {
    bgImage?: string;
    topTitle?: string;
    mainTitle?: string;
    description?: string;
    btn1Text?: string;
    btn1Url?: string;
    btn2Text?: string;
    btn2Url?: string;
    contactTitle?: string;
    phoneLabel?: string;
    phoneValue?: string;
    emailLabel?: string;
    emailValue?: string;
    addressLabel?: string;
    addressValue?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function ContactHeroEditor({
  sectionId,
  content,
  onClose,
  onSave,
}: ContactHeroEditorProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: string) => {
    setEditedContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/cms/sections/${sectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) throw new Error("Failed to save changes");

      toast.success("Contact Hero updated successfully");
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-black text-left">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] border border-gray-100 overflow-hidden text-left">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Contact Hero</h2>
            <p className="text-sm text-gray-500 text-left">Manage hero text, glass box content, and background</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-10 text-left">
          
          {/* Main Hero Content */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-[#3b82f6] border-b pb-2">
              <Layout className="h-5 w-5" />
              <h3 className="font-bold uppercase text-xs tracking-wider">Main Content</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Top Title (Blue Text)</label>
                <input
                  type="text"
                  value={editedContent.topTitle || ""}
                  onChange={(e) => handleChange("topTitle", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Main Title (White Sub-heading)</label>
                <input
                  type="text"
                  value={editedContent.mainTitle || ""}
                  onChange={(e) => handleChange("mainTitle", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea
                  value={editedContent.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm min-h-[100px]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Background Image URL</label>
                <input
                  type="text"
                  value={editedContent.bgImage || ""}
                  onChange={(e) => handleChange("bgImage", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Button 1 Text</label>
                <input
                  type="text"
                  value={editedContent.btn1Text || ""}
                  onChange={(e) => handleChange("btn1Text", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Button 1 URL</label>
                <input
                  type="text"
                  value={editedContent.btn1Url || ""}
                  onChange={(e) => handleChange("btn1Url", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Button 2 Text</label>
                <input
                  type="text"
                  value={editedContent.btn2Text || ""}
                  onChange={(e) => handleChange("btn2Text", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Button 2 URL</label>
                <input
                  type="text"
                  value={editedContent.btn2Url || ""}
                  onChange={(e) => handleChange("btn2Url", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          </section>

          {/* Floating Glass Box Content */}
          <section className="space-y-6 pt-10 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[#3b82f6] border-b pb-2">
              <Info className="h-5 w-5" />
              <h3 className="font-bold uppercase text-xs tracking-wider">Floating Contact Box</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Box Title</label>
                <input
                  type="text"
                  value={editedContent.contactTitle || ""}
                  onChange={(e) => handleChange("contactTitle", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-bold"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Phone Details</span>
                </div>
                <div className="space-y-3">
                  <input
                    placeholder="Label (e.g. Phone)"
                    type="text"
                    value={editedContent.phoneLabel || ""}
                    onChange={(e) => handleChange("phoneLabel", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    placeholder="Value"
                    type="text"
                    value={editedContent.phoneValue || ""}
                    onChange={(e) => handleChange("phoneValue", e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Email Details</span>
                </div>
                <div className="space-y-3">
                  <input
                    placeholder="Label (e.g. Email)"
                    type="text"
                    value={editedContent.emailLabel || ""}
                    onChange={(e) => handleChange("emailLabel", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <input
                    placeholder="Value"
                    type="text"
                    value={editedContent.emailValue || ""}
                    onChange={(e) => handleChange("emailValue", e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-semibold"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 md:col-span-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Address Details</span>
                </div>
                <div className="space-y-3">
                  <input
                    placeholder="Label (e.g. Address)"
                    type="text"
                    value={editedContent.addressLabel || ""}
                    onChange={(e) => handleChange("addressLabel", e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  />
                  <textarea
                    placeholder="Value"
                    value={editedContent.addressValue || ""}
                    onChange={(e) => handleChange("addressValue", e.target.value)}
                    className="w-full p-2.5 border border-gray-300 rounded-lg text-sm font-semibold min-h-[60px]"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#3b82f6] text-white font-semibold rounded-xl hover:bg-[#2563eb] disabled:opacity-50 flex items-center shadow-lg transition-all"
          >
            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
