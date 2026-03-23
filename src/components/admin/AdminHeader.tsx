"use client";

import { usePathname } from "next/navigation";
import { ChevronRight, Home, Bell, Search, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const [prevCount, setPrevCount] = useState<number>(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/admin/notifications/count');
        if (res.ok) {
          const data = await res.json();
          setNotificationCount(data.count);
          if (data.count > prevCount) {
             // Handle "new" state if needed, but the pulse animation will trigger on count > 0
          }
          setPrevCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [prevCount]);

  return (
    <header className="sticky top-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-10 flex items-center justify-between z-40 transition-all">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 group">
        <Link 
            href="/admin/dashboard" 
            className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-[#284b8c] hover:text-white transition-all border border-slate-100 flex items-center justify-center hover:shadow-lg hover:shadow-[#284b8c]/20"
        >
            <Home className="w-4 h-4" />
        </Link>
        
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

          if (segment === "admin") return null;

          return (
            <div key={href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-300" />
              <Link
                href={href}
                className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                  isLast ? "text-[#284b8c] px-3 py-1.5 bg-[#284b8c]/5 rounded-lg" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Global Actions */}
      <div className="flex items-center gap-5">
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 group focus-within:ring-4 focus-within:ring-[#284b8c]/5 focus-within:border-[#284b8c] transition-all">
            <Search className="w-4 h-4 transition-colors group-focus-within:text-[#284b8c]" />
            <input 
                type="text" 
                placeholder="Global search system..." 
                className="bg-transparent text-[11px] font-bold outline-none placeholder:text-slate-300 w-48"
            />
        </div>

        <div className="flex items-center gap-3 border-l border-slate-100 pl-5">
            <Link 
                href="/admin/enquiries"
                className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[#284b8c] transition-all"
            >
                <motion.div
                    animate={notificationCount > 0 ? {
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ 
                        repeat: notificationCount > 0 ? Infinity : 0, 
                        duration: 1.5,
                        repeatDelay: 2
                    }}
                >
                    <Bell className="w-5 h-5" />
                </motion.div>
                
                <AnimatePresence>
                    {notificationCount > 0 && (
                        <motion.span 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white shadow-lg"
                        >
                            {notificationCount > 99 ? '99+' : notificationCount}
                        </motion.span>
                    )}
                </AnimatePresence>
            </Link>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#284b8c]/5 text-[#284b8c] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#284b8c]/10">
                <Zap className="w-3.5 h-3.5 fill-[#284b8c]" />
                System Live
            </div>
        </div>
      </div>
    </header>
  );
}
