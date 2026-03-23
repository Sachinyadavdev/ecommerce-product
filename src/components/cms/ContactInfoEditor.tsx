"use client";

import { useState } from "react";
import { X, Save, Loader2, Warehouse, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

interface ContactInfoEditorProps {
  sectionId: string;
  content: {
    heading?: string;
    wh1_title?: string;
    wh1_city?: string;
    wh1_badge?: string;
    wh1_address?: string;
    wh1_phone?: string;
    wh1_email?: string;
    wh2_title?: string;
    wh2_city?: string;
    wh2_badge?: string;
    wh2_address?: string;
    wh2_phone?: string;
    wh2_email?: string;
    wh3_title?: string;
    wh3_city?: string;
    wh3_badge?: string;
    wh3_address?: string;
    wh3_phone?: string;
    wh3_email?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function ContactInfoEditor({
  sectionId,
  content,
  onClose,
  onSave,
}: ContactInfoEditorProps) {
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

      toast.success("Contact info updated successfully");
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-black">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Warehouse Infrastructure</h2>
            <p className="text-sm text-gray-500">Manage heading and individual warehouse details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#1e2a6b] border-b pb-2">
              <Warehouse className="h-5 w-5" />
              <h3 className="font-bold uppercase text-xs tracking-wider">General Information</h3>
            </div>
            <div className="space-y-1.5 max-w-md">
              <label className="text-xs font-bold text-gray-500 uppercase">Main Heading</label>
              <input
                type="text"
                value={editedContent.heading || ""}
                onChange={(e) => handleChange("heading", e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <section key={i} className="space-y-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 text-[#1e2a6b] border-b border-gray-200 pb-2">
                  <span className="bg-[#1e2a6b] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </span>
                  <h3 className="font-bold uppercase text-xs tracking-wider">Warehouse {i}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`wh${i}_title`] || ""}
                      onChange={(e) => handleChange(`wh${i}_title`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Badge (e.g. Pune)</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`wh${i}_badge`] || ""}
                      onChange={(e) => handleChange(`wh${i}_badge`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">City/State</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`wh${i}_city`] || ""}
                      onChange={(e) => handleChange(`wh${i}_city`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                    <textarea
                      value={(editedContent as any)[`wh${i}_address`] || ""}
                      onChange={(e) => handleChange(`wh${i}_address`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-gray-200">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Contact (Optional)</label>
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 bg-white px-2 border border-gray-200 rounded-lg">
                         <Phone size={14} className="text-gray-400" />
                         <input
                          type="text"
                          value={(editedContent as any)[`wh${i}_phone`] || ""}
                          onChange={(e) => handleChange(`wh${i}_phone`, e.target.value)}
                          className="w-full py-1.5 text-xs outline-none"
                          placeholder="Phone number"
                        />
                       </div>
                       <div className="flex items-center gap-2 bg-white px-2 border border-gray-200 rounded-lg">
                         <Mail size={14} className="text-gray-400" />
                         <input
                          type="text"
                          value={(editedContent as any)[`wh${i}_email`] || ""}
                          onChange={(e) => handleChange(`wh${i}_email`, e.target.value)}
                          className="w-full py-1.5 text-xs outline-none"
                          placeholder="Email address"
                        />
                       </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#1e2a6b] text-white font-semibold rounded-xl hover:bg-[#2a3a8b] disabled:opacity-50 flex items-center shadow-lg transition-all active:scale-95"
          >
            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
