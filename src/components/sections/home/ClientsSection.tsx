"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────────── */

export interface ClientLogo {
  id: string;
  src: string; // image URL
  alt: string; // company name / alt text
  href?: string; // optional link
}

interface ClientsSectionProps {
  content?: {
    title?: string;
    /** JSON string of ClientLogo[] so it works with the generic CMS editor */
    logos?: string;
    bgColor?: string;
  };
}

/* ── Default logos ──────────────────────────────────────────────── */

export type { ClientLogo as ClientLogoType }; // Export type alias if needed, or just export the interface

export const DEFAULT_LOGOS: ClientLogo[] = [
  {
    id: "zf",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/0caeda75379e6d94fc370b49d13786101387a09f.png",
    alt: "ZF",
    href: "https://www.zf.com",
  },
  {
    id: "visteon",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/728ca0b425ca9efb8155972a1d09f875115de503.png",
    alt: "Visteon",
    href: "https://www.visteon.com",
  },
  {
    id: "napino",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/628434809ce02eaee5033a39870e4b4e2417f5d4.png",
    alt: "Napino",
    href: "https://www.napino.com",
  },
  {
    id: "motherson",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/628434809ce02eaee5033a39870e4b4e2417f5d4.png",
    alt: "Motherson",
    href: "https://www.motherson.com",
  },
  {
    id: "minda",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/628434809ce02eaee5033a39870e4b4e2417f5d4.png",
    alt: "Spark Minda",
    href: "https://www.sparkminda.com",
  },
  {
    id: "fme",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/79e64bd20614bf98312b9fb1ba0a61424a2fe91d.png",
    alt: "FME",
    href: "https://www.furukawa.co.jp",
  },
  {
    id: "kautex",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/8501ffaf7dddf6ec4c5b9359076ba86ac92575b6.png",
    alt: "Kautex",
    href: "https://www.kautex-textron.com",
  },
  {
    id: "aptiv",
    src: "https://cvnvhpmvk12hdosq.public.blob.vercel-storage.com/5a3a8de98f1fc61b4268e466744fba8061fb7ab5.png",
    alt: "Aptiv",
    href: "https://www.aptiv.com",
  },
];

/* ── Component ─────────────────────────────────────────────────── */

export default function ClientsSection({ content }: ClientsSectionProps) {
  const {
    title = "Our Clients",
    logos: logosJson,
  } = content || {};

  /* Parse logos from JSON string (CMS stores arrays as JSON) */
  let logos: ClientLogo[] = DEFAULT_LOGOS;
  if (logosJson) {
    try {
      const parsed = JSON.parse(logosJson);
      if (Array.isArray(parsed) && parsed.length > 0) logos = parsed;
    } catch {
      /* ignore parse errors */
    }
  }

  // Duplicate the list multiple times to ensure the screen is filled and scrolling is seamless
  const track = [...logos, ...logos, ...logos, ...logos];

  return (
    <section
      className="relative py-10 md:py-16 overflow-hidden flex flex-col items-center justify-center bg-[#e4edf7]"
      aria-label="Our Clients"
    >
      {/* ── Background Separation Textures ── */}
      {/* Soft Blueprint / Engineering Grid Texture with vertical edge fading */}
      {/* <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
             backgroundSize: '4rem 4rem',
             maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
           }} 
      /> */}
      
      {/* Ambient Lighting to make the background feel dimensional */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2 mix-blend-multiply pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] relative z-10 w-full">
        {/* ── Premium Header ── */}
        <div className="text-center mb-4 md:mb-6 max-w-3xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[10px] bg-white border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)] mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#284b8c]" />
            <span className="text-[10px] md:text-[11px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-linear-to-r from-[#284b8c] to-[#00a758]">
              Trusted By Global Leaders
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#284b8c] tracking-tight leading-[1.1] mb-5 drop-shadow-sm">
            {title}
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            Collaborating with the world's most innovative automotive and engineering brands to drive the core of modern mobility.
          </motion.p>
        </div>

        {/* ── Seamless Marquee Ticker ── */}
        <div className="cs-ticker relative w-full overflow-hidden mask-edges pt-6 pb-2 md:pt-10 md:pb-2 mt-4 md:mt-8" aria-hidden="true">
          <div className="cs-track flex items-center pr-8 w-max">
            {track.map((logo, i) => {
              const innerContent = (
                <div className="relative shrink-0 w-44 md:w-56 h-28 md:h-36 bg-white rounded-2xl md:rounded-[2rem] shadow-[0_8px_25px_rgba(0,0,0,0.04)] border border-slate-100/50 flex items-center justify-center p-6 md:p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(40,75,140,0.12)] hover:border-[#284b8c]/20 group">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain p-6 md:p-8 filter grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                    unoptimized
                  />
                </div>
              );

              return (
                <div key={`${logo.id}-${i}`} className="mx-3 md:mx-4">
                  {logo.href ? (
                    <a
                      href={logo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={-1}
                      className="block focus:outline-hidden"
                    >
                      {innerContent}
                    </a>
                  ) : (
                    innerContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Styles for Ticker ── */}
      <style jsx>{`
        /* Ticker viewport — masks overflow */
        .mask-edges {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        /* Seamless Scrolling Animation */
        .cs-track {
          animation: cs-scroll 60s linear infinite;
        }

        /* Pause on hover for interaction */
        .cs-ticker:hover .cs-track {
          animation-play-state: paused;
        }

        /* Moving exactly half the width since we quadrupled the array, translating by -25% gives us a perfect loop seamlessly matching the 4x array */
        @keyframes cs-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .cs-track {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
}
