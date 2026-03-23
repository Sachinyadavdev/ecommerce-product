"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  LogOut,
  Settings,
  Image as ImageIcon,
  Layers,
  Menu as MenuIcon,
  PanelBottom,
  User,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Monitor,
  Database,
  PenTool,
  Menu,
  CalendarDays,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  children?: { label: string; href: string }[];
}

const menuGroups: { label: string; items: MenuItem[] }[] = [
  {
    label: "Root Configuration",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
      { id: "settings", label: "Global Settings", icon: Settings, href: "/admin/settings" },
    ]
  },
  {
    label: "Global Administrative Directives",
    items: [
      { id: "enquiries", label: "Strategic Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
      { id: "products", label: "Catalog Management", icon: Package, children: [
          { label: "All Products", href: "/admin/products" },
          { label: "Categories", href: "/admin/categories" },
        ] 
      },
      { id: "pages", label: "Dynamic Pages", icon: PenTool, href: "/admin/pages" },
      { id: "events", label: "Events Management", icon: CalendarDays, href: "/admin/events" },
      { id: "social-posts", label: "Social Feed", icon: Share2, href: "/admin/social-posts" },
    ]
  },
  {
    label: "System Settings",
    items: [
      { id: "media", label: "Asset Repository", icon: ImageIcon, href: "/admin/media" },
      { id: "layout", label: "Layout Control", icon: Monitor, children: [
          { label: "Header & Menu", href: "/admin/header-menu" },
          { label: "Footer System", href: "/admin/footer" },
        ] 
      },
    ]
  }
];

export default function AdminSidebar({ 
  signOutAction,
  settings 
}: { 
  signOutAction: () => Promise<void>;
  settings?: Record<string, string>;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);

  // Auto-open submenu if child is active
  useEffect(() => {
    menuGroups.forEach(group => {
        group.items.forEach(item => {
            if (item.children?.some(child => pathname.startsWith(child.href))) {
                setOpenSubMenus(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
            }
        });
    });
  }, [pathname]);

  const toggleSubMenu = (id: string) => {
    setOpenSubMenus(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const clinicalBlue = "#61a0b3";
  const brandBlue = "#284b8c";

  return (
    <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 300 }}
        className="bg-gradient-to-b from-[#284b8c] to-[#1a2345] h-screen sticky top-0 flex flex-col border-r border-white/5 shadow-2xl z-50 overflow-hidden"
    >
      {/* Brand Identity / Toggle */}
      <div className={`p-6 flex items-center justify-between transition-all ${isCollapsed ? 'justify-center px-2' : ''}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10 transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-14 h-14 p-1' : 'w-full h-20 p-1'}`}>
              <Image 
                src={settings?.logo_url || "/images/Besmak-Logo.png"} 
                alt="Besmak Logo" 
                width={200} 
                height={80}
                className="object-contain w-full h-full transition-transform group-hover:scale-105"
              />
          </div>
          {!isCollapsed && (
            <div className="hidden"> {/* Keep structure for potential future text but hide for now as per request */}
                <h1 className="text-xl font-black text-[#61a0b3] tracking-tight leading-none">BESMAK</h1>
                <p className="text-[10px] font-black text-[#61a0b3] uppercase tracking-[0.2em] mt-1.5 underline decoration-[#61a0b3]/30 underline-offset-4">Enterprise</p>
            </div>
          )}
        </Link>
        {!isCollapsed && (
          <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-all ml-2"
          >
              <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Search/Toggle Button for Collapsed State */}
      {isCollapsed && (
        <div className="px-4 mb-4">
          <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-full aspect-square rounded-xl bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
          >
              <Menu className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-hide pt-2">
        {menuGroups.flatMap(group => group.items).map((item) => {
            const hasChildren = !!item.children;
            const isSubOpen = openSubMenus.includes(item.id);
            const isActive = item.href ? pathname.startsWith(item.href) : item.children?.some(c => pathname.startsWith(c.href));

            return (
                <div key={item.id} className="space-y-1">
                    {item.href ? (
                        <Link
                            href={item.href}
                            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                isActive 
                                ? 'bg-[#284b8c] text-white shadow-lg shadow-[#284b8c]/20' 
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:text-[#5e9baf]'}`} />
                            {!isCollapsed && (
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-[12px] font-bold truncate">{item.label}</p>
                                </div>
                            )}
                            {!isCollapsed && isActive && (
                                <motion.div 
                                    layoutId="active-indicator" 
                                    className="w-1.5 h-1.5 rounded-full bg-[#5e9baf] shadow-[0_0_8px_#5e9baf]"
                                />
                            )}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-[#1a2345] text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-2xl z-[100] whitespace-nowrap">
                                    {item.label}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a2345] border-l border-b border-white/10 rotate-45" />
                                </div>
                            )}
                        </Link>
                    ) : (
                        <div className="relative group">
                            <button
                                onClick={() => toggleSubMenu(item.id)}
                                className={`w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-white/5 text-white' 
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                } ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                <item.icon className={`w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${isActive ? 'text-[#5e9baf]' : 'group-hover:text-[#5e9baf]'}`} />
                                {!isCollapsed && (
                                    <>
                                        <div className="flex-1 text-left overflow-hidden">
                                            <p className={`text-[12px] font-bold truncate ${isActive ? 'text-white' : ''}`}>{item.label}</p>
                                        </div>
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-white/30 ${isSubOpen ? 'rotate-180 text-white' : ''}`} />
                                    </>
                                )}
                            </button>

                            {/* Tooltip for collapsed state dropdown */}
                            {isCollapsed && (
                                <div className="absolute left-full top-0 ml-4 px-3 py-2 bg-[#1a2345] text-white text-[10px] font-black uppercase tracking-widest rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 shadow-2xl z-[100] whitespace-nowrap">
                                    {item.label}
                                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#1a2345] border-l border-b border-white/10 rotate-45" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Submenu items */}
                    <AnimatePresence initial={false}>
                        {!isCollapsed && hasChildren && isSubOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden space-y-1 ml-8 pl-3 border-l border-white/10"
                            >
                                {item.children?.map((child, idx) => {
                                    const isChildActive = pathname.startsWith(child.href);
                                    return (
                                        <Link
                                            key={idx}
                                            href={child.href}
                                            className={`block py-1.5 text-[11px] font-bold transition-colors ${
                                                isChildActive ? 'text-[#5e9baf]' : 'text-white/30 hover:text-[#5e9baf]'
                                            }`}
                                        >
                                            {child.label}
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 mt-auto">
        <div className={`bg-white/5 rounded-xl p-4 space-y-4 border border-white/5 backdrop-blur-sm transition-all ${isCollapsed ? 'p-2' : ''}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70">
                    <User className="w-5 h-5" />
                </div>
                {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-white truncate">Administrator</p>
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Global Access</p>
                    </div>
                )}
            </div>
            
            {!isCollapsed && (
                <form action={signOutAction} className="pt-2">
                    <button className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/20 text-rose-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all group border border-rose-500/30">
                        <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Log Out
                    </button>
                </form>
            )}
        </div>
      </div>
    </motion.aside>
  );
}
