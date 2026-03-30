"use client";

import { useQueryBasket } from "@/context/QueryBasketContext";
import { X, Trash2, Send, Loader2, RefreshCw, ShieldCheck, ArrowLeft, Inbox, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { getSafeImageSrc } from "@/lib/image-utils";

interface CaptchaData {
  question: string;
  token: string;
}

export default function EnquiryBasketPage() {
  const { basket, removeFromBasket, clearBasket } = useQueryBasket();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<CaptchaData | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    message: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captcha) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          products: basket.map((p) => ({ id: p.id, color: p.color })),
          captchaToken: captcha.token,
          captchaAnswer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send enquiry");
      }

      setIsSuccess(true);
      clearBasket();
      toast.success("Enquiry sent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
      fetchCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-xl shadow-2xl border border-slate-100 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-primary tracking-tight uppercase">Enquiry Sent!</h2>
          <p className="text-slate-500 font-bold text-[11px] uppercase tracking-wider leading-relaxed">
            Thank you for your interest. <br/> Our technical team will review your <br/> requirements within 24-48 business hours.
          </p>
          <div className="pt-4">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#3f863e] transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Continue Browsing
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-body">
      <PageHeader 
        title="Enquiry Basket"
        breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Enquiry Basket", href: "/enquiry-basket" }
        ]}
        backgroundImg="https://fohffyjhcwci6coi.public.blob.vercel-storage.com/at%20a%20glance%20bannner.png"
      />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {basket.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-8"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <Inbox className="w-10 h-10" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-primary uppercase tracking-widest">Your basket is empty</h3>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] max-w-sm mx-auto">Explore our premium industrial range</p>
            </div>
            <Link 
              href="/products" 
              className="px-8 py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Catalog
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left: Product List */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-primary tracking-tight">Selected Assets ({basket.length})</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Review your technical requirements</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode="popLayout">
                        {basket.map((product) => (
                            <motion.div
                                layout
                                key={product.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="group bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-8 transition-all hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:border-primary/10 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/5 group-hover:bg-primary transition-colors" />
                                
                                <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-50 relative">
                                    <img
                                        src={getSafeImageSrc(product.image)}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="grow min-w-0 space-y-1.5">
                                    <div className="flex items-center gap-3">
                                        <span className="px-2.5 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                                            {product.categoryName}
                                        </span>
                                        {product.color && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 px-2.5 py-1 rounded-lg">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                Color: {product.color}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-lg font-black text-primary tracking-tight">
                                        {product.name}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium">Ref #ID: {product.id.slice(0, 8)}...</p>
                                </div>

                                <button
                                    onClick={() => removeFromBasket(product.id)}
                                    className="p-3 text-slate-300 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-lg transition-all active:scale-90"
                                    title="Remove from query"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: Enquiry Form */}
            <div className="lg:sticky lg:top-8 bg-white/80 backdrop-blur-md rounded-xl border border-slate-100 shadow-[0_30px_70px_-20px_rgba(0,70,155,0.05)] overflow-hidden">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-primary text-white rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
                        <Send className="w-3 h-3" />
                        Finalize Enquiry
                    </div>
                    <h3 className="text-lg font-black text-primary tracking-tight uppercase">Technical Request</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Specialized quote & data</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1">Full Name *</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your full name"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-[13px] font-bold text-primary transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1">Email *</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-[13px] font-bold text-primary transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1">Phone</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-[13px] font-bold text-primary transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1">Company</label>
                            <input
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Your organization"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-[13px] font-bold text-primary transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-black text-primary/40 uppercase tracking-widest ml-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={2}
                                placeholder="Additional requirements..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-[13px] font-bold text-primary transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Captcha */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Security Check</span>
                            <button type="button" onClick={fetchCaptcha} className="text-primary/40 hover:text-primary transition-colors">
                                <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-grow px-4 py-2 bg-white border border-slate-200 rounded-lg font-black text-primary text-xs shadow-sm flex items-center justify-center">
                                {captcha ? captcha.question : "..."}
                            </div>
                            <input
                                required
                                value={captchaAnswer}
                                onChange={(e) => setCaptchaAnswer(e.target.value)}
                                placeholder="Ans"
                                className="w-16 px-2 py-2 bg-white border border-slate-200 rounded-lg text-center focus:border-primary outline-none font-black text-primary text-xs shadow-sm"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center gap-3">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </div>
                        ) : "Submit Enquiry"}
                    </button>
                </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
