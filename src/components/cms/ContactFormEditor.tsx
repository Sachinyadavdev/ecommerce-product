"use client";

import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ContactFormEditorProps {
  sectionId: string;
  content: {
    topText?: string;
    heading?: string;
    description?: string;
    div1_name?: string;
    div2_name?: string;
    div3_name?: string;
    div4_name?: string;
    nameLabel?: string;
    emailLabel?: string;
    subjectLabel?: string;
    mobileLabel?: string;
    addressLabel?: string;
    messageLabel?: string;
    buttonText?: string;
  };
  onClose: () => void;
  onSave: () => void;
}

export default function ContactFormEditor({
  sectionId,
  content,
  onClose,
  onSave,
}: ContactFormEditorProps) {
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

      toast.success("Contact form updated successfully");
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header - Matches Screenshot */}
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#1e2a6b]">
            Edit contact-form Section
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Content - Simple Stacked Layout like Screenshot */}
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Top Text</label>
            <input
              type="text"
              value={editedContent.topText || ""}
              onChange={(e) => handleChange("topText", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Heading</label>
            <input
              type="text"
              value={editedContent.heading || ""}
              onChange={(e) => handleChange("heading", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Description</label>
            <textarea
              value={editedContent.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] text-black"
            />
          </div>

          <div className="pt-4 border-t space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Division Names</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Division {i} Name</label>
                  <input
                    type="text"
                    value={(editedContent as any)[`div${i}_name`] || ""}
                    onChange={(e) => handleChange(`div${i}_name`, e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Form Field Labels</h3>
            <div className="space-y-4">
              {[
                { label: "Name Label", field: "nameLabel" },
                { label: "Email Label", field: "emailLabel" },
                { label: "Subject Label", field: "subjectLabel" },
                { label: "Mobile Label", field: "mobileLabel" },
                { label: "Address Label", field: "addressLabel" },
                { label: "Message Label", field: "messageLabel" },
                { label: "Submit Button Text", field: "buttonText" },
              ].map((item) => (
                <div key={item.field} className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">{item.label}</label>
                  <input
                    type="text"
                    value={(editedContent as any)[item.field] || ""}
                    onChange={(e) => handleChange(item.field, e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Matches Screenshot Style */}
        <div className="p-6 border-t bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center shadow-lg transition-all active:scale-95"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
