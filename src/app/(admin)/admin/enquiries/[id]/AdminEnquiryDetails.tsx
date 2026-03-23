"use client";

import { useState } from "react";
import { 
  History, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  Phone, 
  Mail, 
  Building2, 
  Briefcase,
  Layers,
  Send,
  User,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ProductDetail {
  id: string;
  name: string;
  slug: string | null;
  categorySlug: string | null;
  color?: string | null;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  notes?: any;
  createdAt: string;
  products: ProductDetail[];
}

interface AdminEnquiryDetailsProps {
  initialEnquiry: Enquiry;
}

export default function AdminEnquiryDetails({ initialEnquiry }: AdminEnquiryDetailsProps) {
  const [enquiry, setEnquiry] = useState(initialEnquiry);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newNote, setNewNote] = useState("");

  const notes = typeof enquiry.notes === 'string' ? JSON.parse(enquiry.notes || "[]") : (enquiry.notes || []);

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const resp = await fetch(`/api/enquiry/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!resp.ok) throw new Error("Failed to update status");

      setEnquiry(prev => ({ ...prev, status: newStatus as any }));
      toast.success(`Enquiry marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteObj = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date().toISOString(),
      author: "Admin"
    };

    const updatedNotes = [noteObj, ...notes];

    setIsUpdating(true);
    try {
      const resp = await fetch(`/api/enquiry/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: updatedNotes }),
      });

      if (!resp.ok) throw new Error("Failed to add note");

      setEnquiry(prev => ({ ...prev, notes: updatedNotes }));
      setNewNote("");
      toast.success("Note added to timeline");
    } catch (err: any) {
      toast.error(err.message || "Failed to add note");
    } finally {
      setIsUpdating(false);
    }
  };

  const statusColors = {
    PENDING: "bg-amber-50 text-amber-600 border-amber-100",
    IN_PROGRESS: "bg-[#61a0b3]/10 text-[#61a0b3] border-[#61a0b3]/20",
    COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-100"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
      {/* LEFT: Main Content (2/3) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Customer Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 group transition-all hover:border-[#61a0b3]/30">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-[#61a0b3] transition-colors">
                    <User className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                    <p className="text-[13px] font-bold text-slate-700">{enquiry.name}</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 group transition-all hover:border-[#61a0b3]/30">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-[#61a0b3] transition-colors">
                    <Mail className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</p>
                    <p className="text-[13px] font-bold text-slate-700">{enquiry.email}</p>
                </div>
            </div>
            {enquiry.phone && (
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 group transition-all hover:border-[#61a0b3]/30">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-[#61a0b3] transition-colors">
                        <Phone className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone</p>
                        <p className="text-[13px] font-bold text-slate-700">{enquiry.phone}</p>
                    </div>
                </div>
            )}
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4 group transition-all hover:border-[#61a0b3]/30">
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-[#61a0b3] transition-colors">
                    <Activity className="w-4 h-4" />
                </div>
                <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Submission</p>
                    <p className="text-[13px] font-bold text-slate-700">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>

        {/* Product Interest - Enhanced with Links - MOVED HERE */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-5">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                    <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-[#61a0b3] uppercase tracking-widest">Requested Technical Assets</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {(enquiry as any).products && (enquiry as any).products.length > 0 ? (
                    (enquiry as any).products.map((target: any, idx: number) => {
                        const productUrl = target.slug && target.categorySlug ? `/products/${target.categorySlug}/${target.slug}` : null;
                        return (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 group hover:border-[#61a0b3]/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center font-black text-[#61a0b3] text-xs border border-slate-100 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="space-y-0.5">
                                        {productUrl ? (
                                            <a 
                                                href={productUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-[13px] font-black text-slate-700 hover:text-[#61a0b3] flex items-center gap-1.5 underline decoration-[#61a0b3]/20 underline-offset-4"
                                            >
                                                {target.name}
                                                <Activity className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        ) : (
                                            <p className="text-[13px] font-black text-slate-400">{target.name} (No Link)</p>
                                        )}
                                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Verified System Configuration</p>
                                    </div>
                                </div>
                                {target.color && (
                                    <div className="px-4 py-1.5 bg-[#61a0b3] text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#61a0b3]/20 animate-in fade-in zoom-in duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Color: {target.color}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 group transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center font-black text-[#61a0b3] text-xs border border-slate-100 shadow-sm">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                                {(enquiry as any).productSlug && (enquiry as any).categorySlug ? (
                                    <a 
                                        href={`/products/${(enquiry as any).categorySlug}/${(enquiry as any).productSlug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] font-black text-slate-700 hover:text-[#61a0b3] underline decoration-[#61a0b3]/20 underline-offset-4"
                                    >
                                        {enquiry.productName || "General Interest"}
                                    </a>
                                ) : (
                                    <p className="text-[13px] font-black text-slate-400">{enquiry.productName || "General Interest"}</p>
                                )}
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Primary Interest Vector</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Message Content */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-5">
                <div className="w-8 h-8 bg-[#61a0b3]/10 rounded-lg flex items-center justify-center text-[#61a0b3]">
                    <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-[#61a0b3] uppercase tracking-widest">Customer Message</h3>
            </div>
            
            <div className="space-y-6">
                <div className="bg-slate-50/50 p-5 rounded-xl text-slate-600 font-medium leading-[1.7] text-[13px] whitespace-pre-wrap border border-slate-100">
                    {enquiry.message.split('--- Client Info ---')[0].trim() || "No message provided."}
                </div>

                <div className="grid grid-cols-2 gap-8 pt-2">
                    <div className="space-y-3">
                        <h4 className="text-[9px] font-black text-[#61a0b3]/50 uppercase tracking-[0.2em] mb-4">Organizational Context</h4>
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2.5 text-[12px] font-bold text-slate-700">
                                <Building2 className="w-3.5 h-3.5 text-[#61a0b3]/30" />
                                <span className="text-slate-400">Company:</span> {(enquiry as any).message?.match(/Company: (.*)/)?.[1] || "N/A"}
                            </div>
                            <div className="flex items-center gap-2.5 text-[12px] font-bold text-slate-700">
                                <Briefcase className="w-3.5 h-3.5 text-[#61a0b3]/30" />
                                <span className="text-slate-400">Industry:</span> {(enquiry as any).message?.match(/Industry: (.*)/)?.[1] || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* RIGHT: Actions & Timeline */}
      <div className="space-y-6">
        
        {/* Status Hub */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 space-y-6">
            <div className="space-y-2">
                <p className="text-[9px] font-black text-[#61a0b3] uppercase tracking-widest">State Vector</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                    statusColors[enquiry.status] || "bg-slate-50"
                }`}>
                    {enquiry.status === 'PENDING' ? <Clock className="w-3.5 h-3.5" /> :
                     enquiry.status === 'IN_PROGRESS' ? <Activity className="w-3.5 h-3.5 animate-pulse" /> :
                     <CheckCircle2 className="w-3.5 h-3.5" />}
                    {enquiry.status.replace('_', ' ')}
                </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50">
                <button 
                    onClick={() => handleStatusUpdate('IN_PROGRESS')}
                    disabled={isUpdating || enquiry.status === 'IN_PROGRESS'}
                    className="w-full py-3.5 bg-slate-800 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 active:scale-95"
                >
                    Transition to Processing
                </button>
                <button 
                    onClick={() => handleStatusUpdate('COMPLETED')}
                    disabled={isUpdating || enquiry.status === 'COMPLETED'}
                    className="w-full py-3.5 bg-emerald-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-emerald-500/10"
                >
                    Finalize Request
                </button>
                {enquiry.status !== 'PENDING' && (
                    <button 
                        onClick={() => handleStatusUpdate('PENDING')}
                        disabled={isUpdating}
                        className="w-full py-2 text-slate-300 hover:text-[#61a0b3] text-[9px] font-black uppercase tracking-widest transition-all"
                    >
                        Revert to Initial
                    </button>
                )}
            </div>
        </div>

        {/* Clinical History Log */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col max-h-[600px] overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                <div className="flex items-center gap-2 text-[#61a0b3]">
                    <History className="w-4 h-4" />
                    <h4 className="text-xs font-black uppercase tracking-widest">Protocol Log</h4>
                </div>
                <span className="text-[8px] font-black text-slate-300 bg-white px-2 py-1 rounded border border-slate-100">{notes.length} entries</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                <form onSubmit={handleAddNote} className="relative">
                    <textarea 
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Observation entry..."
                        className="w-full p-4 pb-10 bg-slate-50 border border-slate-100 rounded-xl text-[12px] font-medium focus:ring-4 focus:ring-[#61a0b3]/5 focus:border-[#61a0b3] outline-none transition-all resize-none"
                    />
                    <button 
                        type="submit"
                        disabled={isUpdating || !newNote.trim()}
                        className="absolute bottom-2.5 right-2.5 p-1.5 bg-[#61a0b3] text-white rounded-lg hover:bg-[#528a9b] disabled:opacity-30 transition-all active:scale-90"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </form>

                <div className="space-y-6 pt-4 relative">
                    <div className="absolute left-[11px] top-6 bottom-0 w-px bg-slate-100" />
                    
                    {notes.map((note: any) => (
                        <div key={note.id} className="relative pl-10">
                            <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center z-10 shadow-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#61a0b3]/40" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-black text-[#61a0b3] uppercase">{note.author}</span>
                                    <span className="text-[8px] font-bold text-slate-300 uppercase">{new Date(note.timestamp).toLocaleDateString()}</span>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-600 font-medium border border-slate-100/50 shadow-sm leading-relaxed">
                                    {note.text}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="relative pl-10">
                        <div className="absolute left-0 top-1 w-6 h-6 bg-[#61a0b3]/10 border-2 border-[#61a0b3]/20 rounded-full flex items-center justify-center z-10">
                            <Clock className="w-2.5 h-2.5 text-[#61a0b3]" />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-emerald-600 uppercase">System</span>
                                <span className="text-[8px] font-bold text-slate-300 uppercase">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="bg-emerald-50/40 p-3 rounded-xl rounded-tl-none text-[10px] text-emerald-700 font-bold border border-emerald-100/50">
                                Protocol Initialized
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
