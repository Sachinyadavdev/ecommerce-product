"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LayoutGrid, History, Globe, Lightbulb, Link as LinkIcon, Building2, Settings, Hammer, Cpu, ArrowRight, Users, Eye, Cable, Component, Sparkles, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  settings?: Record<string, string>;
}

const ICON_MAP: Record<string, { icon: any; color: string; bg: string }> = {
  "at a glance": { icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
  "core team": { icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  "our history": { icon: BookOpen, color: "text-amber-600", bg: "bg-amber-50" },
  "global presence": { icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50" },
  "innovation & quality": { icon: Sparkles, color: "text-orange-600", bg: "bg-orange-50" },
  "partnerships": { icon: LinkIcon, color: "text-cyan-600", bg: "bg-cyan-50" },
  "connection systems": { icon: Cable, color: "text-blue-600", bg: "bg-blue-50" },
  "infrastructure solutions": { icon: Building2, color: "text-purple-600", bg: "bg-purple-50" },
  "precision components": { icon: Component, color: "text-rose-600", bg: "bg-rose-50" },
  "tool room": { icon: Hammer, color: "text-slate-600", bg: "bg-slate-50" },
  "automation & tech": { icon: Cpu, color: "text-violet-600", bg: "bg-violet-50" },
  "automation & technology": { icon: Cpu, color: "text-violet-600", bg: "bg-violet-50" }
};

const DEFAULT_MENU = [
  {
    title: "Discover Us",
    child: [
      { name: "At a Glance", href: "/about-us/at-a-glance", icon: Eye, description: "A comprehensive look at our vision and impact.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/At%20a%20Glance.png", imageTitle: "", imageDescription: "" },
      { name: "Core Team", href: "/about-us/core-team", icon: Users, description: "Meet the experts behind Besmak India.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CoreTeam.png", imageTitle: "", imageDescription: "" },
      { name: "Our Values & Governance", href: "/about-us/values-governance", icon: BookOpen, description: "Decades of manufacturing excellence.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Our%20Values%20%26%20Governance.png", imageTitle: "", imageDescription: "" },
      { name: "Partnerships", href: "/about-us/partnerships", icon: Globe, description: "Serving clients across international borders.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Partnerships.png", imageTitle: "", imageDescription: "" },
    ],
    image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/At%20a%20Glance.png",
    tagline: "Building a legacy of precision and trust.",
  },
  {
    title: "Divisions",
    child: [
      { name: "Connection Systems", href: "/verticals/connection-systems", icon: Cable, description: "Advanced industrial connectivity solutions.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Connection%20system.png", imageTitle: "", imageDescription: "" },
      { name: "Engineering Products", href: "/verticals/engineering-products", icon: Building2, description: "Precision engineering and industrial products.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Engineering%20Products.png", imageTitle: "", imageDescription: "" },
      { name: "Precision Stamping", href: "/verticals/precision-stamping", icon: Component, description: "High-tolerance metal stamping solutions.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Precision%20Stamping.png", imageTitle: "", imageDescription: "" },
      { name: "CNH Moulds", href: "/verticals/cnh-moulds", icon: Hammer, description: "Smart mold design and manufacturing.", image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CNH%20MOULDS.png", imageTitle: "", imageDescription: "" },
    ],
    image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Connection%20system.png",
    tagline: "Integrated engineering at every level.",
  },
  { title: "Products", href: "/products" },
  {
    title: "Infrastructure",
    child: [
      { name: "Tool Room", href: "/infrastructure/tool-room", icon: Hammer, description: "Where design meets physical precision.", image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop", imageTitle: "", imageDescription: "" },
      { name: "Automation & Tech", href: "/infrastructure/automation-technology", icon: Cpu, description: "Smart systems for smart manufacturing.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop", imageTitle: "", imageDescription: "" },
    ],
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5fee1227?q=80&w=800&auto=format&fit=crop",
    tagline: "Cutting-edge technology at our core.",
  },
  { title: "Events", href: "/events" },
  { title: "CSR", href: "/csr" },
  { title: "Contact Us", href: "/contact" },
];

const Header = ({ settings }: HeaderProps) => {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [hoverTitle, setHoverTitle] = useState<string | null>(null);
  const [hoverDescription, setHoverDescription] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  let menu = DEFAULT_MENU;
  if (settings?.main_menu) {
    try {
      menu = JSON.parse(settings.main_menu);
    } catch (e) {
      console.error("Failed to parse main_menu setting", e);
    }
  }
  const logoUrl = settings?.logo_url || "/images/Besmak-Logo.png";
  const headerHeight = settings?.header_height
    ? parseInt(settings.header_height)
    : 24;

  const logoSize = settings?.logo_size ? parseInt(settings.logo_size) / 100 : 1;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setExpandedMenu(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (title: string) => {
    if (expandedMenu === title) {
      setExpandedMenu(null);
      setHoverImage(null);
    } else {
      setExpandedMenu(title);
      const activeMenu = menu.find((item: any) => item.title === title);
      // Initialize hover state with the first sub-item's data or the main menu data
      const firstSubItem = activeMenu?.child?.[0];
      setHoverImage(firstSubItem?.image || activeMenu?.image || null);
      setHoverTitle(firstSubItem?.imageTitle || null);
      setHoverDescription(firstSubItem?.imageDescription || null);
    }
  };

  const getSubItemIcon = (subItem: any) => {
    // If subItem already has a React component icon
    if (subItem.icon && typeof subItem.icon !== 'string') return subItem.icon;
    
    // Otherwise look up in ICON_MAP (case-insensitive)
    const normalizedName = (subItem.name || "").toLowerCase();
    const iconData = ICON_MAP[normalizedName];
    
    if (iconData) return iconData.icon;
    
    // Default fallback
    return LayoutGrid;
  };
  const isHeaderLocked = scrolled || !!expandedMenu;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${isHeaderLocked 
        ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border-b border-slate-200/50" 
        : "border-b border-slate-100 shadow-sm"
      }`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div ref={navRef} className="w-full px-4 lg:px-6 xl:px-10">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-4 lg:py-0" style={{ height: scrolled ? '70px' : '85px', transition: 'all 0.4s ease' }}>
          {/* Logo Section */}
          <Link href="/" className="shrink-0 flex items-center group">
            <div
              className="relative transition-all duration-500"
              style={{
                height: scrolled ? '38px' : '48px',
                transform: `scale(${logoSize})`,
                transformOrigin: "left center",
              }}
            >
              <Image
                src={logoUrl}
                alt="Besmak Logo"
                width={200}
                height={60}
                className="object-contain h-full w-auto transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          {/* Navigation Section - Grouped Right */}
          <nav className="hidden lg:flex items-center ml-auto lg:mr-2 xl:mr-6">
            <ul className="flex items-center lg:gap-0 xl:gap-2">
              {menu.map((item: any) => (
                <li key={item.title} className="relative group/nav">
                  {item.child ? (
                    <button
                      onMouseEnter={() => {
                        setExpandedMenu(item.title);
                        const activeMenu = menu.find((m: any) => m.title === item.title);
                        const firstSubItem = activeMenu?.child?.[0];
                        setHoverImage(firstSubItem?.image || activeMenu?.image || null);
                        setHoverTitle(firstSubItem?.imageTitle || null);
                        setHoverDescription(firstSubItem?.imageDescription || null);
                      }}
                      className={`px-2 xl:px-4 py-4 flex items-center gap-1 xl:gap-1.5 text-[11px] xl:text-[14px] font-bold uppercase tracking-wider transition-all relative ${
                        expandedMenu === item.title || pathname.startsWith(item.href || "")
                          ? "text-primary"
                          : "text-primary/80 hover:text-primary"
                      }`}
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          expandedMenu === item.title ? "rotate-180" : "group-hover/nav:translate-y-0.5"
                        }`}
                      />
                      <span className={`absolute bottom-3 left-3 right-3 h-0.5 bg-primary transition-all duration-300 ${
                        expandedMenu === item.title ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover/nav:opacity-100 group-hover/nav:scale-x-100"
                      }`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onMouseEnter={() => {
                        setExpandedMenu(null);
                        setHoverImage(null);
                      }}
                      className={`px-2 xl:px-4 py-4 inline-block text-[11px] xl:text-[14px] font-bold uppercase tracking-wider transition-all relative ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-primary/80 hover:text-primary"
                      }`}
                    >
                      {item.title}
                      <span className={`absolute bottom-3 left-3 right-3 h-0.5 bg-primary transition-all duration-300 ${
                        pathname === item.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover/nav:opacity-100 group-hover/nav:scale-x-100"
                      }`} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Row Section */}
          <div className="flex items-center gap-4">
            <Link
              href="/e-catalog"
              className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 xl:px-5 py-2 xl:py-2.5 bg-primary text-white rounded-[10px] font-bold text-[11px] xl:text-[13px] uppercase tracking-widest transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 active:scale-95 group"
            >
              <span className="relative z-10">e-Catalog</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full transition-transform group-hover:scale-150" />
            </Link>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden p-2.5 transition-all rounded-xl ${
                !scrolled && !expandedMenu ? "text-primary bg-primary/5" : "text-gray-700 bg-gray-50 hover:text-primary"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Modern Mega Menu Enhancement - Screenshot Sycned Version */}
        <AnimatePresence mode="wait">
          {expandedMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onMouseLeave={() => {
                setExpandedMenu(null);
                setHoverImage(null);
                setHoverTitle(null);
                setHoverDescription(null);
              }}
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full w-full max-w-4xl px-4 z-10"
            >
              <div className="bg-[#f8fafc] rounded-b-xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] border border-gray-100/50 border-t-0 overflow-hidden">
                <div className="grid grid-cols-12">
                  {/* Left Section - Vertical Nav List (6/12) */}
                  <div className="col-span-12 lg:col-span-6 p-6 border-r border-gray-100/30 flex flex-col justify-start">
                    <div className="mb-6 pl-2">
                      <motion.h3 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3"
                      >
                        {expandedMenu}
                        <div className="h-px flex-1 bg-linear-to-r from-primary/10 to-transparent" />
                      </motion.h3>
                    </div>
                    
                    <ul className="space-y-1">
                      {menu
                        .find((m: any) => m.title === expandedMenu)
                        ?.child?.map((subItem: any, idx: number) => {
                          const Icon = getSubItemIcon(subItem);
                          const iconData = ICON_MAP[subItem.name.toLowerCase()] || { color: "text-primary", bg: "bg-primary/5" };
                          
                          return (
                            <motion.li 
                              key={subItem.name}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.03 + 0.1 }}
                              className="border-b border-slate-200/60 last:border-0"
                            >
                              <Link
                                href={subItem.href}
                                onMouseEnter={() => {
                                  if (subItem.image) setHoverImage(subItem.image);
                                  setHoverTitle(subItem.imageTitle || null);
                                  setHoverDescription(subItem.imageDescription || null);
                                }}
                                onClick={() => {
                                  setExpandedMenu(null);
                                  setHoverImage(null);
                                  setHoverTitle(null);
                                  setHoverDescription(null);
                                }}
                                className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-400 ${
                                  pathname === subItem.href
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-600 hover:bg-white hover:shadow-md hover:shadow-slate-200/50 hover:text-primary"
                                }`}
                              >
                                <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-400 ${
                                  pathname === subItem.href
                                    ? "bg-white/20 text-white"
                                    : `${iconData.bg} ${iconData.color}`
                                }`}>
                                  {Icon && <Icon className="w-5 h-5" />}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[14px] font-bold tracking-tight">
                                    {subItem.name}
                                  </span>
                                  {subItem.description && (
                                    <span className={`text-[11px] font-medium transition-colors line-clamp-1 ${
                                      pathname === subItem.href ? "text-white/70" : "text-slate-400"
                                    }`}>
                                      {subItem.description}
                                    </span>
                                  )}
                                </div>
                                <ArrowRight className={`ml-auto w-3.5 h-3.5 transition-all duration-400 translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ${
                                  pathname === subItem.href ? "text-white" : "text-primary/30"
                                }`} />
                              </Link>
                            </motion.li>
                          );
                        })}
                    </ul>
                  </div>

                  {/* Right Section - Premium Featured Promo Card (6/12) */}
                  <div className="col-span-12 lg:col-span-6 p-6 flex items-start justify-start bg-slate-50/20">
                    {(() => {
                      const activeMenu = menu.find((m: any) => m.title === expandedMenu);
                      if (!activeMenu) return null;
                      return (
                        <motion.div 
                          initial={{ scale: 0.97, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="w-full bg-white rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50 overflow-hidden flex flex-col group/featured"
                        >
                          {/* Image Header */}
                          <div className="relative h-48 md:h-52 overflow-hidden bg-slate-100">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={hoverImage || activeMenu.image}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeOut" as const }}
                                className="absolute inset-0"
                              >
                                <Image
                                  src={hoverImage || activeMenu.image || "/images/placeholder.png"}
                                  alt={activeMenu.title}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover/featured:scale-110"
                                  priority
                                />
                              </motion.div>
                            </AnimatePresence>
                            {/* Decorative HUD */}
                            <div className="absolute top-4 right-4">
                              <div className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm rounded-lg text-[8px] font-black text-white uppercase tracking-widest">Featured</div>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                          </div>
                          
                          {/* Content Body */}
                           <div className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="space-y-2">
                               <h4 className="text-xl font-black text-primary tracking-tight">
                                {hoverTitle || `${activeMenu.title} Solutions`}
                              </h4>
                              <p className="text-slate-500 font-medium leading-relaxed max-w-[240px] mx-auto text-[11px]">
                                {hoverDescription || activeMenu.tagline || "Providing innovative engineering solutions."}
                              </p>
                            </div>
                            
                            <Link 
                              href={activeMenu.href || activeMenu.child?.[0]?.href || "#"}
                              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-wider shadow-md shadow-primary/20 hover:bg-primary/95 transition-all duration-300"
                            >
                              Learn More
                              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            </Link>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Mobile Navigation Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-[#f8fafc] lg:hidden animate-in slide-in-from-right duration-500 flex flex-col h-dvh overflow-hidden">
          <div className="flex-none bg-[#f8fafc]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 z-10">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              <div className="relative h-12">
                <Image
                  src={logoUrl}
                  alt="Besmak Logo"
                  width={180}
                  height={60}
                  className="object-contain h-full w-auto"
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-3 text-gray-900 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-10 overscroll-contain" data-lenis-prevent>
              <nav className="space-y-10">
                {menu.map((item: any) => (
                  <div key={item.title} className="space-y-6">
                    {item.child ? (
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/40 mb-6 flex items-center gap-2">
                          {item.title}
                          <div className="h-px flex-1 bg-primary/10" />
                        </h4>
                        <div className="grid grid-cols-1 pl-2">
                          {item.child.map((subItem: any, subIdx: number) => {
                            const Icon = getSubItemIcon(subItem);
                            const iconData = ICON_MAP[subItem.name.toLowerCase()] || { color: "text-primary", bg: "bg-primary/5" };
                            
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className={`text-xl font-bold text-gray-800 hover:text-primary transition-all flex items-center justify-between group py-5 ${
                                  subIdx !== item.child.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`p-2.5 rounded-xl ${iconData.bg} ${iconData.color}`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <span>{subItem.name}</span>
                                </div>
                                <ChevronDown className="-rotate-90 w-5 h-5 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl font-black text-gray-900 flex items-center justify-between group"
                      >
                        <span>{item.title}</span>
                        <ChevronDown className="-rotate-90 w-6 h-6 opacity-10 group-hover:opacity-100 transition-all" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex-none p-8 border-t border-gray-100 space-y-4 bg-gray-50/50">
              <Link
                href="/e-catalog"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-white rounded-[10px] font-black text-[15px] uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all"
              >
                e-Catalog
                <ChevronDown className="-rotate-90 w-5 h-5 opacity-50" />
              </Link>
              <p className="text-center text-[10px] uppercase font-black tracking-widest text-gray-400">© 2024 Besmak Components Pvt. Ltd.</p>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;
