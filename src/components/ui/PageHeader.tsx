"use client";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import React, { Fragment } from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  backgroundImg?: string;
}

export default function PageHeader({
  title,
  breadcrumbs,
  backgroundImg = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/at%20a%20glance%20bannner.png"
}: PageHeaderProps) {
  return (
    <div className="relative min-h-[180px] md:min-h-[210px] bg-[#EEF2FF] flex items-center overflow-hidden mb-0 pt-20 md:pt-24">
      {/* Background Image - Light shade integration */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 brightness-110"
        style={{ backgroundImage: `url('${backgroundImg}')` }}
      />

      {/* Light gradient for a clean, premium feel */}
      <div className="absolute inset-0 bg-linear-to-r from-[#EEF2FF]/95 via-[#EEF2FF]/40 to-transparent" />

      {/* Multi-layered Animated Waves - Bottom Mask */}
      <div className="absolute -bottom-[1px] left-0 w-full leading-[0] z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[20px] md:h-[35px]"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="header-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#header-wave"
              x="48"
              y="7"
              fill="#f8fafc"
              className="animate-wave"
            />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .parallax > use {
          animation: move-forever 20s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>

      <div className="relative z-30 container mx-auto px-6 max-w-7xl pb-4">
        {title && (
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary tracking-tight leading-tight uppercase">
              {title}
            </h1>
          </div>
        )}

        <nav className="inline-flex items-center flex-wrap gap-2 text-[10px] md:text-[11px] font-black text-primary/60 uppercase tracking-[0.2em]">
          <Link href="/" className="flex items-center gap-1.5 hover:text-primary transition-colors group">
            <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-primary" />
            <span className="hidden sm:inline">HOME</span>
          </Link>

          {breadcrumbs.filter(crumb => crumb.label.toUpperCase() !== "HOME").map((crumb, index) => (
            <Fragment key={`${index}-${crumb.label}`}>
              <ChevronRight className="w-3.5 h-3.5 text-primary/20 shrink-0" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label.toUpperCase()}
                </Link>
              ) : (
                <span className="text-primary font-black truncate max-w-[200px] sm:max-w-none">
                  {crumb.label.toUpperCase()}
                </span>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}
