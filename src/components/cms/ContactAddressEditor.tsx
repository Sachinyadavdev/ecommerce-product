"use client";

import { useState } from "react";
import { X, Save, Loader2, Factory, MapPin, Monitor } from "lucide-react";
import { toast } from "sonner";

interface ContactAddressEditorProps {
  sectionId: string;
  content: {
    topText?: string;
    heading?: string;
    bgHeading?: string;
    card1_header?: string;
    card1_title?: string;
    card1_city?: string;
    card1_address?: string;
    card1_phone?: string;
    card1_email?: string;
    card1_footer?: string;
    card2_header?: string;
    card2_title?: string;
    card2_city?: string;
    card2_address?: string;
    card2_footer?: string;
    card3_header?: string;
    card3_title?: string;
    card3_city?: string;
    card3_address?: string;
    card3_footer?: string;
    bottom_header?: string;
    bottom_address?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function ContactAddressEditor({
  sectionId,
  content,
  onClose,
  onSave,
}: ContactAddressEditorProps) {
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

      toast.success("Manufacturing facilities updated successfully");
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Manufacturing Facilities</h2>
            <p className="text-sm text-gray-500">Manage plant addresses, contact details, and bottom banner</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-10">
          {/* General Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#1e2a6b] border-b pb-2">
              <Factory className="h-5 w-5" />
              <h3 className="font-bold uppercase text-xs tracking-wider">General Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Top Text</label>
                <input
                  type="text"
                  value={editedContent.topText || ""}
                  onChange={(e) => handleChange("topText", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Heading</label>
                <input
                  type="text"
                  value={editedContent.heading || ""}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Background Text (e.g. WORKS)</label>
                <input
                  type="text"
                  value={editedContent.bgHeading || ""}
                  onChange={(e) => handleChange("bgHeading", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
            </div>
          </section>

          {/* Plants Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <section key={i} className="space-y-5 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 text-[#1e2a6b] border-b border-gray-200 pb-2">
                  <span className="bg-[#1e2a6b] text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </span>
                  <h3 className="font-bold uppercase text-xs tracking-wider">Plant {i}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase">Badge (e.g. UNIT II)</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`card${i}_header`] || ""}
                      onChange={(e) => handleChange(`card${i}_header`, e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`card${i}_title`] || ""}
                      onChange={(e) => handleChange(`card${i}_title`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">City/State</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`card${i}_city`] || ""}
                      onChange={(e) => handleChange(`card${i}_city`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Address</label>
                    <textarea
                      value={(editedContent as any)[`card${i}_address`] || ""}
                      onChange={(e) => handleChange(`card${i}_address`, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-1.5 pt-2 border-t border-gray-200">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Footer Label</label>
                    <input
                      type="text"
                      value={(editedContent as any)[`card${i}_footer`] || ""}
                      onChange={(e) => handleChange(`card${i}_footer`, e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-xs bg-white"
                      placeholder="e.g. West India Unit"
                    />
                  </div>

                  {i === 1 && (
                    <div className="space-y-3 pt-2 border-t border-gray-200">
                      <div className="flex items-center gap-2 bg-white px-2 border border-gray-200 rounded-lg">
                        <MapPin size={14} className="text-gray-400" />
                        <input
                         type="text"
                         value={editedContent.card1_phone || ""}
                         onChange={(e) => handleChange("card1_phone", e.target.value)}
                         className="w-full py-1.5 text-xs outline-none"
                         placeholder="Phone number"
                       />
                      </div>
                      <div className="flex items-center gap-2 bg-white px-2 border border-gray-200 rounded-lg">
                        <Factory size={14} className="text-gray-400" />
                        <input
                         type="text"
                         value={editedContent.card1_email || ""}
                         onChange={(e) => handleChange("card1_email", e.target.value)}
                         className="w-full py-1.5 text-xs outline-none"
                         placeholder="Email address"
                       />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Bottom Banner Section */}
          <section className="space-y-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[#1e2a6b] border-b pb-2">
              <Monitor className="h-5 w-5" />
              <h3 className="font-bold uppercase text-xs tracking-wider">Bottom Banner (Design Office)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Banner Header</label>
                <input
                  type="text"
                  value={editedContent.bottom_header || ""}
                  onChange={(e) => handleChange("bottom_header", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Banner Address</label>
                <input
                  type="text"
                  value={editedContent.bottom_address || ""}
                  onChange={(e) => handleChange("bottom_address", e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-white"
                />
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
            className="px-6 py-2.5 bg-[#1e2a6b] text-white font-semibold rounded-xl hover:bg-[#2a3a8b] disabled:opacity-50 flex items-center shadow-lg transition-all"
          >
            {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
