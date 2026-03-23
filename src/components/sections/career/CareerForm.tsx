"use client";

import { useState, useEffect, FormEvent } from "react";
import { Loader2, RefreshCw, Send, Paperclip } from "lucide-react";
import { toast } from "sonner";

interface CaptchaData {
  question: string;
  token: string;
}

interface FormField {
  id: string;
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea" | "file";
  placeholder: string;
  required: boolean;
}

interface CareerFormProps {
  content?: {
    title?: string;
    fields?: string;
  };
}

const DEFAULT_FIELDS: FormField[] = [
  { id: "f1", label: "First Name", name: "firstName", type: "text", placeholder: "John", required: true },
  { id: "f2", label: "Last Name", name: "lastName", type: "text", placeholder: "Doe", required: true },
  { id: "f3", label: "Email Address", name: "email", type: "email", placeholder: "john@example.com", required: true },
  { id: "f4", label: "Phone Number", name: "phone", type: "tel", placeholder: "+91 9XXXX XXXXX", required: true },
  { id: "f5", label: "Message", name: "message", type: "textarea", placeholder: "Tell us about yourself...", required: true },
  { id: "f6", label: "Resume / Portfolio", name: "file", type: "file", placeholder: "", required: false },
];

export default function CareerForm({ content }: CareerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [files, setFiles] = useState<Record<string, File>>({});
  
  const fields: FormField[] = (() => {
    try {
      return content?.fields ? JSON.parse(content.fields) : DEFAULT_FIELDS;
    } catch {
      return DEFAULT_FIELDS;
    }
  })();

  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach(f => {
      if (f.type !== "file") initial[f.name] = "";
    });
    return initial;
  });

  const fetchCaptcha = async () => {
    try {
      const resp = await fetch("/api/captcha");
      const data = await resp.json();
      setCaptcha(data);
      setCaptchaAnswer("");
    } catch (e) {
      toast.error("Failed to load captcha");
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(prev => ({ ...prev, [name]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!captcha) return;

    setIsSubmitting(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      Object.entries(files).forEach(([key, file]) => {
        submitData.append(key, file);
      });
      submitData.append("captchaToken", captcha.token);
      submitData.append("captchaAnswer", captchaAnswer);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Application submitted successfully! We'll get back to you soon.");
      
      const resetData: Record<string, string> = {};
      fields.forEach(f => { if (f.type !== "file") resetData[f.name] = ""; });
      setFormData(resetData);
      setFiles({});
      fetchCaptcha();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
      fetchCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center uppercase tracking-wide">
            {content?.title || "Apply Now"}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.id} className={`space-y-2 ${field.type === "textarea" || field.type === "file" ? "md:col-span-2" : ""}`}>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">
                    {field.label} {field.required ? "*" : ""}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none text-black placeholder:text-gray-400"
                      placeholder={field.placeholder}
                    />
                  ) : field.type === "file" ? (
                    <div className="relative">
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(field.name, e)}
                        className="hidden"
                        id={`file-${field.id}`}
                        accept=".pdf,.doc,.docx,.png,.jpg"
                        required={field.required}
                      />
                      <label 
                        htmlFor={`file-${field.id}`}
                        className="w-full flex items-center gap-3 px-5 py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 focus-within:border-primary transition-colors"
                      >
                        <Paperclip className="w-5 h-5 text-gray-400" />
                        <span className="text-sm text-primary/80 font-medium truncate">
                          {files[field.name] ? files[field.name].name : field.placeholder || "Click to attach a file..."}
                        </span>
                      </label>
                    </div>
                  ) : (
                    <input
                      required={field.required}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all text-black placeholder:text-gray-400"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Captcha Section */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl font-black text-primary text-sm shadow-sm select-none">
                  {captcha ? captcha.question : "..."}
                </div>
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="p-2 text-primary/40 hover:text-primary transition-colors focus:outline-none"
                  title="Refresh Captcha"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="grow">
                <input
                  required
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  placeholder="Calculate answer"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none text-sm font-bold text-black placeholder:text-gray-400 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative overflow-hidden group bg-primary text-white py-5 rounded-2xl font-black text-[14px] uppercase tracking-widest shadow-[0_20px_40px_-10px_rgba(0,70,155,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(0,70,155,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
