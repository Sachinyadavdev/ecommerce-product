"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Play, Activity, FileCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface CertificationProps {
  content?: {
    title?: string;
    description?: string;
    videoUrl?: string;
    certificateImageUrl?: string;
    subtitle?: string;
  };
}

export default function TestingCertification({ content }: CertificationProps) {
  const {
    title = "Global Standard Validation",
    subtitle = "NABL Accredited & ILAC MRA Recognised",
    description = "Our laboratory undergoes rigorous third-party assessments to maintain the highest standards of technical competence. This certification is a testament to our commitment to precision and global compliance.",
    videoUrl = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/_Besmak%20NABL%20Certification%20video%20video.mp4",
    certificateImageUrl = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak%20NABL%20Certification%20img1.png",
  } = content || {};

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full opacity-50" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header: Centered & Clean */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8"
          >
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-[10px] font-black tracking-[0.3em] text-slate-400 uppercase">{subtitle}</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase mb-10">
            {title.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary decoration-emerald-500/20 underline underline-offset-8" : ""}>
                {word}{" "}
              </span>
            ))}
          </h2>

          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Media Showcase: No Overlaps, Pure Visibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Video Player Segment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(14,165,233,0.1)] group cursor-pointer" onClick={togglePlay}>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                loop
                autoPlay
                muted
                playsInline
              />

              {/* Subtle Indicator (Autoplay Active) */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Live Preview</span>
              </div>
            </div>

            <div className="flex items-start justify-between px-6">
              <div className="flex items-center gap-3">
                <Activity size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Laboratory Showcase Video</span>
              </div>
              <span className="text-[10px] font-mono text-slate-300 uppercase">Ref: NABL-V1</span>
            </div>

            {/* Related Data Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pt-8 border-t border-slate-50">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-[10px] font-black text-slate-900  uppercase tracking-widest">Precision Calibration</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed  tracking-wider font-medium">High-accuracy measurement systems for zero-error results</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black text-slate-900  uppercase tracking-widest">Real-time Monitoring</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed  tracking-wider font-medium">Continuous digital oversight of all testing parameters</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Global Compliance</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed  tracking-wider font-medium">Strict adherence to international NABL & ILAC standards</p>
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="flex gap-12">
              <div>
                <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Issue Date</span>
                <span className="text-slate-600 font-bold">07/06/2025</span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Scope</span>
                <span className="text-slate-600 font-bold">Mechanical & Chemical</span>
              </div>
              <div>
                <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Status</span>
                <span className="text-emerald-500 font-black tracking-widest uppercase">Verified</span>
              </div>
              {/* <Image 
            src="/images/nabl-logo.png" 
            alt="NABL Logo" 
            width={100} 
            height={40} 
            className="opacity-50 grayscale hover:grayscale-0 transition-all duration-500" 
          /> */}
            </div>
          </motion.div>

          {/* Certificate Image Segment */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative aspect-[4/5.5] md:aspect-video lg:aspect-[4/5.5] rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.1)] group">
              <Image
                src={certificateImageUrl}
                alt="NABL Certification"
                fill
                className="object-contain p-4 md:p-8"
              />

              {/* Interaction Overlay - Subtle */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <FileCheck size={16} className="text-primary" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accreditation Certificate Card</span>
              </div>
              {/* <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:text-emerald-500 transition-colors">
                Enlarge <ExternalLink size={12} />
              </button> */}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
