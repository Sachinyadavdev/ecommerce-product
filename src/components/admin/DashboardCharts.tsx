"use client";

import { motion } from "framer-motion";

export const CircularProgress = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative group">
            <svg className="w-24 h-24 transform -rotate-90">
                <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-white/10"
                />
                <motion.circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={color}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white tracking-tighter">{value}%</span>
            </div>
            <p className="mt-2 text-[10px] font-bold text-white/40 uppercase tracking-widest text-center truncate max-w-[120px]">{label}</p>
        </div>
    );
};

export const TrendBar = ({ label, value, total, color }: { label: string; value: number; total: number; color: string }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end px-0.5 gap-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate min-w-0 flex-1">{label}</span>
                <span className="text-[11px] font-bold text-slate-900 flex-shrink-0">{value}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    );
};

export const MiniActivityChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data, 1);
    return (
        <div className="flex items-end gap-1 h-6">
            {data.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${(v / max) * 100}%`, opacity: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    className="w-1 bg-indigo-100 group-hover:bg-indigo-400 rounded-sm transition-colors"
                />
            ))}
        </div>
    );
};
