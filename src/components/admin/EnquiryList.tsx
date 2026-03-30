"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Factory,
  Laptop,
  Mail,
  Phone,
  Building2,
  Briefcase,
  X,
  Eye,
  CheckCircle2,
  Clock,
  Loader2,
  Trash2,
  Activity,
  Inbox,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  productSummary?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
}

interface EnquiryListProps {
  initialEnquiries: Enquiry[];
}

export default function EnquiryList({ initialEnquiries }: EnquiryListProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/enquiry/export");
      if (!res.ok) throw new Error("Failed to fetch enquiries for export");

      const data = await res.json();

      if (data.length === 0) {
        toast.error("No enquiries found to export");
        return;
      }

      // Map to the Excel format
      const exportData = data.map((enq: any) => ({
        "Date": new Date(enq.createdAt).toLocaleString(),
        "ID": enq.id,
        "Name": enq.name,
        "Email": enq.email,
        "Phone": enq.phone || "N/A",
        "Company": enq.extractedCompany || "N/A",
        "Industry": enq.extractedIndustry || "N/A",
        "Product Summary": enq.productSummary || "N/A",
        "Status": enq.status,
        "Message": enq.message
      }));

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");

      const fileName = `besmak_enquiries_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success(`Exported ${data.length} enquiries to Excel`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export enquiries");
    } finally {
      setIsExporting(false);
    }
  };

  const handleStatusToggle = async (e: React.MouseEvent, enquiry: Enquiry) => {
    e.stopPropagation();
    const newStatus = enquiry.status === "PENDING" ? "IN_PROGRESS" :
      enquiry.status === "IN_PROGRESS" ? "COMPLETED" : "PENDING";
    setIsUpdating(enquiry.id);

    try {
      const resp = await fetch(`/api/enquiry/${enquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!resp.ok) throw new Error("Failed to update status");

      setEnquiries((prev) =>
        prev.map((enq) =>
          enq.id === enquiry.id ? { ...enq, status: newStatus } : enq,
        ),
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsUpdating(null);
    }
  };

  const statusConfig = {
    PENDING: { color: "bg-amber-50 text-amber-600 border-amber-100", icon: Clock },
    IN_PROGRESS: { color: "bg-[#5e9baf]/10 text-[#5e9baf] border-[#5e9baf]/20", icon: Activity },
    COMPLETED: { color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: CheckCircle2 }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-[#5e9baf] hover:text-[#5e9baf] transition-all shadow-sm text-[10px] font-black uppercase tracking-widest active:scale-95 shrink-0 disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {isExporting ? "Exporting..." : "Export to Excel"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-50">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Entry Log
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Subject Identity
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Communication Path
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Org Context
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Technical Asset Focus
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  State Vector
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-300">
                      <Inbox className="w-10 h-10 opacity-20" />
                      <p className="font-bold text-[11px] uppercase tracking-widest pt-2">No enquiry vectors detected</p>
                    </div>
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => {
                  const StatusIcon = (statusConfig[enquiry.status] || statusConfig.PENDING).icon;

                  return (
                    <tr
                      key={enquiry.id}
                      onClick={() => router.push(`/admin/enquiries/${enquiry.id}`)}
                      className="hover:bg-slate-50/50 transition-all group cursor-pointer"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">
                            {new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">
                            {new Date(enquiry.createdAt).toLocaleTimeString(undefined, {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-[13px] font-black text-slate-800 group-hover:text-[#5e9baf] transition-colors leading-none mb-1">
                          {enquiry.name}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                          Protocol: {enquiry.id.slice(0, 8)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                            <Mail className="w-3 h-3 text-slate-300" />
                            {enquiry.email}
                          </div>
                          {enquiry.phone && (
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                              <Phone className="w-3 h-3 text-slate-300" />
                              {enquiry.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <div className="text-[11px] font-black text-slate-700 flex items-center gap-1.5 uppercase tracking-tight">
                            <Building2 className="w-3.5 h-3.5 text-[#5e9baf]/30" />
                            {enquiry.message?.match(/Company: (.*)/)?.[1] || "N/A"}
                          </div>
                          <div className="text-[9px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                            <Briefcase className="w-3 h-3 text-slate-300" />
                            {enquiry.message?.match(/Industry: (.*)/)?.[1] || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-[#5e9baf] border border-slate-100 group-hover:border-[#5e9baf]/30 transition-all">
                            <Activity className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col max-w-[200px]">
                            <span className="text-[12px] font-black text-slate-700 truncate">
                              {enquiry.productSummary || "General Protocol Inquiry"}
                            </span>
                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em]">Verified Asset Stream</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <button
                          disabled={isUpdating === enquiry.id}
                          onClick={(e) => handleStatusToggle(e, enquiry)}
                          className={`px-3 py-1.5 inline-flex items-center gap-2 text-[9px] font-black rounded-lg uppercase tracking-[0.15em] transition-all border ${statusConfig[enquiry.status]?.color?.replace('#61a0b3', '#5e9baf') || "bg-slate-50 border-slate-100"
                            }`}
                        >
                          {isUpdating === enquiry.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <StatusIcon className={`w-3 h-3 ${enquiry.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`} />
                          )}
                          {enquiry.status.replace('_', ' ')}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
                            className="p-2 bg-white text-slate-400 hover:text-[#5e9baf] hover:shadow-lg hover:shadow-[#5e9baf]/10 border border-slate-100 rounded-lg transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
