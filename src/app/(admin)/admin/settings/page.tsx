"use client";

import { useState, useEffect } from "react";
import {
  Palette,
  ImageIcon,
  Lock,
  Mail,
  Save,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  Settings2,
  Layout,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Type,
  Maximize2,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    primary_color: "#183a8b",
    logo_url: "/images/Besmak-Logo.png",
  });
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");

  const tabs = [
    { id: "appearance", label: "Brand Identity", icon: Palette, desc: "Visuals & Logo" },
    { id: "typography", label: "Typography", icon: Type, desc: "Global Typeface" },
    { id: "enquiry", label: "Operations", icon: MessageSquare, desc: "Workflow Logic" },
    { id: "security", label: "Security", icon: ShieldCheck, desc: "Access Control" },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) throw new Error("Failed to fetch settings");
      const data = await res.json();
      setSettings((prev) => ({ ...prev, ...data }));
    } catch (error) {
      toast.error("Error loading settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      toast.success("Identity settings updated");
      window.dispatchEvent(new CustomEvent("site-settings-updated", { detail: settings }));
    } catch (error) {
      toast.error("Error saving configuration");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.password && profile.password !== profile.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: profile.email || undefined,
          password: profile.password || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Update failed");
      }

      toast.success("Security profile updated");
      setProfile({ email: "", password: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <RefreshCw className="h-10 w-10 text-[#61a0b3] animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Vertical Tabs */}
        <nav className="flex flex-col gap-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                            isActive 
                            ? 'bg-[#284b8c] text-white shadow-xl shadow-[#284b8c]/20' 
                            : 'text-slate-400 hover:bg-white hover:text-[#284b8c] hover:shadow-sm'
                        }`}
                    >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100/50 group-hover:bg-[#284b8c]/5 text-slate-400'
                        }`}>
                            <tab.icon className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                        </div>
                        <div className="text-left flex-1">
                            <p className="text-[13px] font-black tracking-tight">{tab.label}</p>
                            <p className={`text-[10px] font-bold uppercase tracking-widest opacity-40`}>{tab.desc}</p>
                        </div>
                        {isActive && (
                            <motion.div layoutId="setting-active" className="w-1.5 h-5 bg-white rounded-full" />
                        )}
                    </button>
                );
            })}
        </nav>

        {/* Content Area - Seamless UI */}
        <main className="min-h-[500px] bg-white rounded-xl border border-slate-100/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] p-6 md:p-8 overflow-hidden relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'appearance' && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#5e9baf]/10 rounded-xl flex items-center justify-center text-[#5e9baf]">
                                    <Palette className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#5e9baf] tracking-tight">Brand Identity</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Logo & Visual Language</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                                {/* Logo Asset */}
                                <div className="space-y-8">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Global Identity Asset</label>
                                    <div className="bg-slate-50/50 p-8 rounded-xl border border-slate-100 flex flex-col items-center gap-6 group">
                                        <div className="relative p-4 bg-white rounded-xl shadow-sm border border-slate-100 transition-transform group-hover:scale-105 duration-500">
                                            <img src={settings.logo_url} alt="Site Logo" className="max-h-20 object-contain" />
                                        </div>
                                        <button
                                            onClick={() => setIsMediaModalOpen(true)}
                                            className="px-6 py-3 bg-white text-[#284b8c] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-slate-100"
                                        >
                                            <RefreshCw className="h-3.5 w-3.5" />
                                            Rotate Archive Asset
                                        </button>
                                    </div>
                                </div>

                                {/* Color System */}
                                <div className="space-y-8">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Primary Accent Token</label>
                                    <div className="bg-slate-50/50 p-8 rounded-xl border border-slate-100 space-y-10">
                                        <div className="flex items-center gap-8">
                                            <div 
                                                className="w-24 h-24 rounded-xl shadow-lg border-4 border-white shrink-0"
                                                style={{ backgroundColor: settings.primary_color }}
                                            />
                                            <div className="grow space-y-4">
                                                <input
                                                    type="text"
                                                    value={settings.primary_color}
                                                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                                    className="w-full px-5 py-4 bg-white border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#284b8c]/5 outline-none font-black text-[#284b8c] uppercase tracking-widest text-sm"
                                                />
                                                <input
                                                    type="color"
                                                    value={settings.primary_color}
                                                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                                                    className="w-full h-3 rounded-full cursor-pointer bg-slate-200 overflow-hidden appearance-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'typography' && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#5e9baf]/10 rounded-xl flex items-center justify-center text-[#5e9baf]">
                                    <Type className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#5e9baf] tracking-tight">Typography Engine</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Font Family & Hierarchies</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title Typeface</label>
                                    <select
                                        value={settings.heading_font || "Inter"}
                                        onChange={(e) => setSettings({ ...settings, heading_font: e.target.value })}
                                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#61a0b3]/5 outline-none text-sm font-bold text-[#284b8c] appearance-none cursor-pointer"
                                    >
                                        {["Gilroy", "Inter", "Roboto", "Montserrat", "Poppins", "Lato"].sort().map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Body Typeface</label>
                                    <select
                                        value={settings.body_font || "Inter"}
                                        onChange={(e) => setSettings({ ...settings, body_font: e.target.value })}
                                        className="w-full p-5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#61a0b3]/5 outline-none text-sm font-bold text-[#284b8c] appearance-none cursor-pointer"
                                    >
                                        {["Gilroy", "Inter", "Roboto", "Montserrat", "Poppins", "Lato"].sort().map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { id: "h1", label: "Hero Title", min: 24, max: 80, default: 48 },
                                    { id: "h2", label: "Heading 02", min: 20, max: 64, default: 36 },
                                    { id: "h3", label: "Subheading", min: 18, max: 48, default: 24 },
                                    { id: "body", label: "Standard Body", min: 12, max: 20, default: 16 }
                                ].map((h) => (
                                    <div key={h.id} className="p-6 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{h.label}</label>
                                            <span className="text-xl font-black text-[#284b8c]">{settings[h.id === 'body' ? 'body_font_size' : `${h.id}_font_size`] || h.default}px</span>
                                        </div>
                                        <input
                                            type="range"
                                            min={h.min}
                                            max={h.max}
                                            value={settings[h.id === 'body' ? 'body_font_size' : `${h.id}_font_size`] || h.default}
                                            onChange={(e) => setSettings({ ...settings, [h.id === 'body' ? 'body_font_size' : `${h.id}_font_size`]: e.target.value })}
                                            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#284b8c]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'enquiry' && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-[#5e9baf]/10 rounded-xl flex items-center justify-center text-[#5e9baf]">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#5e9baf] tracking-tight">Inquiry Infrastructure</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lead Flow & Technical Attributes</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Component Color Registry</label>
                                    <textarea
                                        value={settings.available_colors || ""}
                                        onChange={(e) => setSettings({ ...settings, available_colors: e.target.value })}
                                        rows={4}
                                        placeholder="Comma separated attributes..."
                                        className="w-full p-8 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-[#284b8c] focus:ring-4 focus:ring-[#61a0b3]/5 outline-none resize-none transition-all placeholder:text-slate-300"
                                    />
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-50 ml-4 max-w-sm">
                                        These define the technical options in the product configuration workflow.
                                    </p>
                                </div>

                                <div className="pt-10 border-t border-slate-100 space-y-6">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Cross-Link Intelligence</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['category', 'series_gender'].map(logic => (
                                            <button
                                                key={logic}
                                                onClick={() => setSettings({ ...settings, related_product_logic: logic })}
                                                className={`p-6 rounded-xl border-2 transition-all text-left group overflow-hidden relative ${
                                                    settings.related_product_logic === logic 
                                                    ? 'bg-[#284b8c]/5 border-[#284b8c]/20 shadow-[#284b8c]/5' 
                                                    : 'bg-white border-slate-50 hover:bg-slate-50'
                                                }`}
                                            >
                                                <div className="relative z-10 flex flex-col gap-3">
                                                    <p className={`text-[12px] font-black uppercase tracking-widest ${settings.related_product_logic === logic ? 'text-[#284b8c]' : 'text-slate-400'}`}>
                                                        {logic === 'category' ? 'Categorical Logic' : 'Technical Matrix'}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-slate-500/70 leading-relaxed">
                                                        {logic === 'category' 
                                                            ? 'Strict adherence to product category hierarchies.' 
                                                            : 'Complex matching based on gender and series technicalities.'}
                                                    </p>
                                                </div>
                                                {settings.related_product_logic === logic && (
                                                    <motion.div layoutId="logic-active" className="absolute top-0 right-0 w-12 h-12 bg-[#284b8c] text-white flex items-center justify-center rounded-bl-3xl">
                                                        <ShieldCheck className="w-5 h-5" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#5e9baf]/10 rounded-xl flex items-center justify-center text-[#5e9baf]">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-[#5e9baf] tracking-tight">Identity Protection</h2>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Credentials & Root Access</p>
                                </div>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-12">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Administrative Identifier</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="Primary admin email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#61a0b3]/5 outline-none text-sm font-bold text-[#284b8c]"
                                            />
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" />
                                        </div>
                                    </div>
                                    <div className="bg-[#1a2345] rounded-xl p-6 text-white flex gap-5 items-center shadow-2xl">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                            <Lock className="w-5 h-5 text-[#61a0b3]" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#61a0b3] leading-none mb-1.5">Protocol Warning</p>
                                            <p className="text-[10px] font-bold text-white/50 leading-relaxed max-w-[220px]">
                                                Credential rotation requires manual bypass for all active distributed sessions.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">New Access Secret</label>
                                        <div className="relative group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Complex alphanumeric only"
                                                value={profile.password}
                                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                                className="w-full px-12 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#61a0b3]/5 outline-none text-sm font-bold text-[#284b8c]"
                                            />
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 transition-colors group-focus-within:text-[#61a0b3]" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#61a0b3] transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Verify Directives</label>
                                        <div className="relative group">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Match the secret exactly"
                                                value={profile.confirmPassword}
                                                onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
                                                className="w-full px-12 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-[#61a0b3]/5 outline-none text-sm font-bold text-[#284b8c]"
                                            />
                                            <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 transition-colors group-focus-within:text-[#61a0b3]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8">
                                    <button
                                        type="submit"
                                        disabled={isSavingProfile}
                                        className="px-10 py-4 bg-[#284b8c] text-white rounded-xl font-black text-[12px] uppercase tracking-widest flex items-center gap-3 shadow-[0_25px_50px_-12px_rgba(40,75,140,0.3)] hover:bg-[#1a2345] hover:shadow-black/20 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSavingProfile ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                                        Initialize Security Patch
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Sticky Save Button for Site Settings */}
            {(activeTab === 'appearance' || activeTab === 'typography' || activeTab === 'enquiry') && (
                <div className="absolute top-8 right-8">
                    <button
                        onClick={handleSaveSettings}
                        disabled={isSavingSettings}
                        className="px-6 py-3 bg-[#284b8c] text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[#284b8c]/20 hover:shadow-[#284b8c]/40 hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isSavingSettings ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        Commit Changes
                    </button>
                </div>
            )}
        </main>
      </div>

      <MediaPickerModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        selectedUrls={[settings.logo_url]}
        onSelect={(urls) => setSettings({ ...settings, logo_url: urls[0] })}
        multiple={false}
      />
    </div>
  );
}
