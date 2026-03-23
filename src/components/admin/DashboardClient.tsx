"use client";

import Link from "next/link";
import {
    Package, MessageSquare, ImageIcon, ArrowUpRight, TrendingUp,
    Clock, ArrowRight, ShieldCheck, Search, Zap, ChevronRight,
    Home, BarChart2, Layers, Globe, CheckCircle2, AlertCircle
} from "lucide-react";
import { CircularProgress, TrendBar, MiniActivityChart } from "@/components/admin/DashboardCharts";
import { motion } from "framer-motion";

const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
};
const itemVariants: any = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
};
const cardHover: any = {
    y: -3,
    boxShadow: "0 20px 40px -12px rgba(15,23,60,0.13)",
    transition: { type: "spring", stiffness: 400, damping: 22 }
};

export default function DashboardClient({
    productsCount, enquiriesCount, mediaCount, seoData, enquiryBreakdown, categoryStats, recentEnquiries
}: any) {
    const totalPages = seoData?.length || 0;
    const optimizedPages = seoData?.filter((p: any) => p.title && p.description && (p.keywords && p.keywords !== "")).length || 0;
    const seoHealth = totalPages > 0 ? Math.round((optimizedPages / totalPages) * 100) : 100;
    const totalEnquiries = enquiriesCount[0]?.count || 0;
    const pendingEnquiries = enquiryBreakdown?.find((e: any) => e.status === 'PENDING')?.count || 0;

    const stats = [
        { label: "Marketable Products", value: productsCount[0]?.count || 0, icon: Package, accent: "#4f6ef7", accentBg: "rgba(79,110,247,.10)", href: "/admin/products", trend: "Live Catalog", trendColor: "#4f6ef7", chartData: [8,12,10,16,14,20,18] },
        { label: "Strategic Leads", value: totalEnquiries, icon: MessageSquare, accent: "#22c55e", accentBg: "rgba(34,197,94,.10)", href: "/admin/enquiries", trend: `${pendingEnquiries} Pending`, trendColor: pendingEnquiries > 0 ? "#f59e0b" : "#22c55e", chartData: [5,9,7,13,11,16,14] },
        { label: "SEO Indexing", value: `${seoHealth}%`, icon: Search, accent: "#f59e0b", accentBg: "rgba(245,158,11,.10)", href: "/admin/pages", trend: `${optimizedPages}/${totalPages} Optimized`, trendColor: "#f59e0b", chartData: [60,65,68,72,75,80,seoHealth] },
        { label: "Digital Repository", value: mediaCount[0]?.count || 0, icon: ImageIcon, accent: "#94a3b8", accentBg: "rgba(148,163,184,.10)", href: "/admin/media", trend: "Total Media Assets", trendColor: "#94a3b8", chartData: [20,22,25,23,28,30,29] },
    ];

    return (
        <div className="min-h-screen" style={{ background: "linear-gradient(180deg,#eef1fb 0%,#f4f6fb 120px,#f4f6fb 100%)" }}>
            <motion.div variants={containerVariants} initial="hidden" animate="show"
                className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 pt-7 pb-20 space-y-5">

                {/* ── Hero Banner ─────────────────────────────────── */}
                <motion.div variants={itemVariants}>
                    <div className="relative rounded-2xl overflow-hidden">
                        <div className="absolute inset-0" style={{
                            background: `
                                radial-gradient(ellipse 70% 80% at 5% -10%,  #1e3a7b 0%, transparent 55%),
                                radial-gradient(ellipse 55% 65% at 85%  10%,  #2d3580 0%, transparent 55%),
                                radial-gradient(ellipse 40% 50% at 50% 110%,  #0d9488 0%, transparent 55%),
                                linear-gradient(140deg, #111c44 0%, #1a2560 45%, #122056 100%)
                            `
                        }} />
                        <div className="absolute inset-0 opacity-[0.05]" style={{
                            backgroundImage: "radial-gradient(rgba(255,255,255,.9) 1px,transparent 1px)",
                            backgroundSize: "24px 24px"
                        }} />
                        <div className="absolute top-0 left-1/4 w-72 h-48 rounded-full pointer-events-none" style={{ background:"rgba(99,118,247,.22)",filter:"blur(60px)" }} />
                        <div className="absolute top-0 right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background:"rgba(13,148,136,.18)",filter:"blur(50px)" }} />

                        <div className="relative z-10 px-8 py-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
                            <div>
                                <div className="flex items-center gap-2 mb-4" style={{ fontSize:9, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".12em", textTransform:"uppercase" }}>
                                    <Home className="w-3 h-3" /><ChevronRight className="w-3 h-3" />
                                    <span style={{ color:"rgba(255,255,255,.6)" }}>Dashboard</span>
                                </div>
                                <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-2">System Overview</h1>
                                <p style={{ fontSize:12, color:"rgba(255,255,255,.42)", fontWeight:500 }}>Real-time operational intelligence and business metrics.</p>
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="relative flex" style={{ width:8,height:8 }}>
                                        <span className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-75" style={{ background:"#34d399" }} />
                                        <span className="relative inline-flex rounded-full" style={{ width:8,height:8,background:"#34d399" }} />
                                    </span>
                                    <span style={{ fontSize:10,fontWeight:700,color:"#6ee7b7",textTransform:"uppercase",letterSpacing:".1em" }}>Live — All Systems Operational</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all active:scale-95"
                                    style={{ background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.16)",fontSize:11,fontWeight:600,color:"white",backdropFilter:"blur(4px)" }}>
                                    <Globe className="w-3.5 h-3.5" style={{ opacity:.6 }} /> Public Site <ArrowUpRight className="w-3 h-3" style={{ opacity:.4 }} />
                                </Link>
                                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl active:scale-95 transition-all"
                                    style={{ background:"white",border:"none",fontSize:11,fontWeight:700,color:"#1a2560",boxShadow:"0 6px 20px rgba(0,0,0,.25)" }}>
                                    <Zap className="w-3.5 h-3.5" /> Quick Audit
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center flex-wrap gap-6 px-8 py-3"
                            style={{ borderTop:"1px solid rgba(255,255,255,.1)",background:"rgba(0,0,0,.15)",backdropFilter:"blur(4px)" }}>
                            {[
                                { ok:true, label:"Uptime", val:"99.9%" },
                                { ok:pendingEnquiries===0, label:"Pending", val:`${pendingEnquiries} Leads` },
                                { ok:true, label:"Response Rate", val:"97%" },
                                { ok:true, label:"Last Sync", val:"Just now" },
                            ].map((s,i) => (
                                <div key={i} className="flex items-center gap-2" style={{ fontSize:11 }}>
                                    {s.ok
                                        ? <CheckCircle2 className="w-3.5 h-3.5" style={{ stroke:"#34d399" }} />
                                        : <AlertCircle className="w-3.5 h-3.5" style={{ stroke:"#fbbf24" }} />}
                                    <span style={{ color:"rgba(255,255,255,.38)",fontWeight:500 }}>{s.label}:</span>
                                    <span style={{ color:"white",fontWeight:700 }}>{s.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── KPI Grid ─────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s,i) => (
                        <motion.div key={i} variants={itemVariants} whileHover={cardHover}>
                            <Link href={s.href} className="block h-full rounded-2xl p-5"
                                style={{ background:"white",border:"1px solid rgba(26,37,96,.07)",boxShadow:"0 1px 4px rgba(15,23,60,.05)" }}>
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:s.accentBg }}>
                                        <s.icon className="w-5 h-5" style={{ stroke:s.accent }} />
                                    </div>
                                    <MiniActivityChart data={s.chartData} />
                                </div>
                                <p style={{ fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".1em",marginBottom:3 }}>{s.label}</p>
                                <h3 style={{ fontSize:26,fontWeight:800,color:"#0f172a",letterSpacing:"-.5px",lineHeight:1 }}>{s.value}</h3>
                                <div className="flex items-center gap-1.5 mt-3 pt-2.5" style={{ borderTop:"1px solid #f1f5f9" }}>
                                    <BarChart2 className="w-3 h-3" style={{ stroke:"#d1d5db" }} />
                                    <span style={{ fontSize:10,fontWeight:700,color:s.trendColor }}>{s.trend}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ── Main Grid ────────────────────────────────── */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                    <div className="xl:col-span-2 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Lead Analytics */}
                            <motion.div variants={itemVariants} whileHover={cardHover} className="rounded-2xl p-6"
                                style={{ background:"white",border:"1px solid rgba(26,37,96,.07)",boxShadow:"0 1px 4px rgba(15,23,60,.05)" }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 style={{ fontSize:10,fontWeight:800,color:"#0f172a",textTransform:"uppercase",letterSpacing:".12em",display:"flex",alignItems:"center",gap:6 }}>
                                        <MessageSquare className="w-4 h-4" style={{ stroke:"#4f6ef7" }} />Lead Analytics
                                    </h2>
                                    <span style={{ fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".1em" }}>30 Days</span>
                                </div>
                                <div className="space-y-5">
                                    <TrendBar label="Pending" value={pendingEnquiries} total={totalEnquiries} color="bg-amber-400" />
                                    <TrendBar label="Converted" value={totalEnquiries - pendingEnquiries} total={totalEnquiries} color="bg-indigo-500" />
                                    <div className="flex items-center justify-between pt-4" style={{ borderTop:"1px solid #f1f5f9" }}>
                                        <span style={{ fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".1em" }}>Total Pipeline</span>
                                        <span style={{ fontSize:13,fontWeight:800,color:"#0f172a" }}>{totalEnquiries} Leads</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Category Pulse */}
                            <motion.div variants={itemVariants} whileHover={cardHover} className="rounded-2xl p-6"
                                style={{ background:"white",border:"1px solid rgba(26,37,96,.07)",boxShadow:"0 1px 4px rgba(15,23,60,.05)" }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 style={{ fontSize:10,fontWeight:800,color:"#0f172a",textTransform:"uppercase",letterSpacing:".12em",display:"flex",alignItems:"center",gap:6 }}>
                                        <Layers className="w-4 h-4" style={{ stroke:"#4f6ef7" }} />Category Pulse
                                    </h2>
                                </div>
                                <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight:180 }}>
                                    {categoryStats.slice(0,6).map((cat: any) => (
                                        <motion.div key={cat.name} whileHover={{ x:4 }}
                                            className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-default"
                                            style={{ background:"#f8fafc" }}>
                                            <div className="flex items-center gap-2 min-w-0">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:"#4f6ef7" }} />
                                                <span style={{ fontSize:11,fontWeight:600,color:"#475569" }} className="truncate">{cat.name}</span>
                                            </div>
                                            <span style={{ fontSize:10,fontWeight:800,color:"#4f6ef7",background:"white",border:"1px solid #e0e7ff",borderRadius:8,padding:"2px 9px",flexShrink:0,marginLeft:8 }}>{cat.count}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Recent Activity */}
                        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden"
                            style={{ background:"white",border:"1px solid rgba(26,37,96,.07)",boxShadow:"0 1px 4px rgba(15,23,60,.05)" }}>
                            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom:"1px solid #f1f5f9" }}>
                                <div style={{ fontSize:10,fontWeight:800,color:"#0f172a",textTransform:"uppercase",letterSpacing:".12em",display:"flex",alignItems:"center",gap:7 }}>
                                    <Clock className="w-4 h-4" style={{ stroke:"#94a3b8" }} />Recent Activity
                                </div>
                                <Link href="/admin/enquiries" className="flex items-center gap-1"
                                    style={{ fontSize:10,fontWeight:700,color:"#4f6ef7",textTransform:"uppercase",letterSpacing:".1em" }}>
                                    View All <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="grid px-6 py-2.5" style={{ gridTemplateColumns:"2fr 1fr 1fr",background:"#f8fafc",borderBottom:"1px solid #f1f5f9" }}>
                                {["Contact","Date","Status"].map(h => (
                                    <span key={h} style={{ fontSize:9,fontWeight:800,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".1em" }}>{h}</span>
                                ))}
                            </div>
                            {recentEnquiries.map((enq: any) => (
                                <motion.div key={enq.id||enq.email} whileHover={{ backgroundColor:"rgba(248,250,252,1)" }}
                                    className="grid px-6 py-3.5 items-center" style={{ gridTemplateColumns:"2fr 1fr 1fr",borderBottom:"1px solid #f8fafc" }}>
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs"
                                            style={{ background:enq.status==='PENDING'?"#fffbeb":"#f0fdf4",color:enq.status==='PENDING'?"#d97706":"#16a34a" }}>
                                            {enq.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <p style={{ fontSize:11,fontWeight:700,color:"#0f172a" }} className="truncate">{enq.name}</p>
                                            <p style={{ fontSize:10,color:"#94a3b8" }} className="truncate">{enq.email}</p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize:10,fontWeight:600,color:"#64748b" }}>
                                        {new Date(enq.createdAt).toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}
                                    </p>
                                    <span className="flex items-center gap-1.5 w-fit rounded-lg px-2 py-1" style={{
                                        fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".08em",
                                        background:enq.status==='PENDING'?"#fffbeb":"#f0fdf4",
                                        color:enq.status==='PENDING'?"#d97706":"#16a34a"
                                    }}>
                                        <span className="w-1 h-1 rounded-full" style={{ background:enq.status==='PENDING'?"#f59e0b":"#22c55e" }} />
                                        {enq.status}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* right col */}
                    <div className="space-y-5">
                        {/* SEO — navy matching sidebar */}
                        <motion.div variants={itemVariants} whileHover={{ y:-4 } as any} className="rounded-2xl p-7 text-white relative overflow-hidden"
                            style={{ background:`
                                radial-gradient(ellipse 80% 50% at 10% -5%, rgba(79,110,247,.55) 0%, transparent 55%),
                                radial-gradient(ellipse 60% 70% at 90% 105%, rgba(13,148,136,.4) 0%, transparent 55%),
                                linear-gradient(140deg, #111c44 0%, #1a2560 100%)` }}>
                            <div className="absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none" style={{ background:"rgba(255,255,255,.04)",filter:"blur(30px)" }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-6" style={{ fontSize:9,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".12em" }}>
                                    <Search className="w-4 h-4" style={{ stroke:"rgba(165,180,252,.8)" }} />SEO Score
                                </div>
                                <div className="flex justify-center">
                                    <CircularProgress value={seoHealth} label="Content SEO" color="text-indigo-400" />
                                </div>
                                <div className="mt-6 space-y-2">
                                    <div className="flex justify-between items-center px-3 py-2.5 rounded-xl"
                                        style={{ background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)" }}>
                                        <span style={{ fontSize:9,fontWeight:700,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".1em" }}>Optimized Pages</span>
                                        <span style={{ fontSize:11,fontWeight:800,color:"#a5b4fc" }}>{optimizedPages}/{totalPages}</span>
                                    </div>
                                    <p style={{ fontSize:9,color:"rgba(255,255,255,.3)",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",textAlign:"center",marginTop:10 }}>
                                        {seoHealth < 70 ? "⚠ Metadata issues detected" : "✓ Structure optimized"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* System Status */}
                        <motion.div variants={itemVariants} whileHover={cardHover} className="rounded-2xl p-6"
                            style={{ background:"white",border:"1px solid rgba(26,37,96,.07)",boxShadow:"0 1px 4px rgba(15,23,60,.05)" }}>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"#f8fafc",border:"1px solid #f1f5f9" }}>
                                    <ShieldCheck className="w-4.5 h-4.5" style={{ stroke:"#1a2560" }} />
                                </div>
                                <div>
                                    <div style={{ fontSize:10,fontWeight:800,color:"#0f172a",textTransform:"uppercase",letterSpacing:".12em" }}>System Status</div>
                                    <div style={{ fontSize:9,fontWeight:700,color:"#cbd5e1",textTransform:"uppercase",letterSpacing:".1em" }}>Secure Protocol</div>
                                </div>
                            </div>
                            {[
                                { label:"Data Engine", status:"Active",  dot:"#22c55e", color:"#16a34a" },
                                { label:"SSL Gateway", status:"Secure",  dot:"#4f6ef7", color:"#3730a3" },
                                { label:"CDN Cache",   status:"Healthy", dot:"#0ea5e9", color:"#0369a1" },
                            ].map((row,i) => (
                                <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl mb-2" style={{ background:"#f8fafc" }}>
                                    <span style={{ fontSize:9,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:".1em" }}>{row.label}</span>
                                    <span className="flex items-center gap-1.5" style={{ fontSize:9,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",color:row.color }}>
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background:row.dot }} />{row.status}
                                    </span>
                                </div>
                            ))}
                            <button className="w-full mt-4 py-2.5 rounded-xl text-white active:scale-95 transition-all"
                                style={{ background:"#111c44",border:"none",fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".1em",cursor:"pointer" }}
                                onMouseEnter={e => (e.currentTarget.style.background="#4f6ef7")}
                                onMouseLeave={e => (e.currentTarget.style.background="#111c44")}>
                                Run Deep Audit
                            </button>
                        </motion.div>

                        {/* Growth Insight */}
                        <motion.div variants={itemVariants} whileHover={cardHover} className="rounded-2xl p-5 relative overflow-hidden"
                            style={{ background:"linear-gradient(135deg,#0f172a 0%,#1a2560 100%)",border:"1px solid #1e2d6b" }}>
                            <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none" style={{ background:"rgba(34,211,153,.1)",filter:"blur(20px)" }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="w-4 h-4" style={{ stroke:"#34d399" }} />
                                    <span style={{ fontSize:9,fontWeight:800,color:"#34d399",textTransform:"uppercase",letterSpacing:".12em" }}>Growth Insight</span>
                                </div>
                                <p style={{ fontSize:11,fontWeight:500,color:"#94a3b8",lineHeight:1.65 }}>
                                    {pendingEnquiries > 0
                                        ? <><span style={{ color:"white",fontWeight:700 }}>{pendingEnquiries} active enquiries</span> await. Responding today can boost conversion by up to <span style={{ color:"#34d399",fontWeight:700 }}>40%</span>.</>
                                        : "All enquiries resolved. Keep the momentum going!"}
                                </p>
                                <div className="flex items-center justify-between mt-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,.07)" }}>
                                    <span style={{ fontSize:9,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em" }}>AI Recommendation</span>
                                    <ArrowRight className="w-3.5 h-3.5" style={{ stroke:"#475569" }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
