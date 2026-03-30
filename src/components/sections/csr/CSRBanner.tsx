"use client";

import React from "react";
import Link from "next/link";

interface CSRBannerProps {
  content?: {
    image?: string;
    video?: string;
    title?: string;
    tagline?: string;
    bgImage?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
  };
}

export default function CSRBanner({ content }: CSRBannerProps) {
  const {
    title = "CSR",
    breadcrumbs = [
      { label: "Home", url: "/" },
      { label: "Discover Us" },
      { label: "CSR" },
    ],

    bgImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Besmak%20CSR-Banner.png",


  } = content || {};

  return (
    <div
      className="w-full h-[400px] flex items-center relative bg-cover bg-center bg-no-repeat mt-[85px]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-[16px] mb-2 flex items-center gap-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-white mx-1">/</span>}
              {crumb.url ? (
                <Link
                  href={crumb.url}
                  className="text-white font-bold hover:text-[#ffffff] transition-colors cursor-pointer"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#ffffff] font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>

        <h1 className="text-[45px]! font-bold text-white tracking-tight mt-2">
          {title}
        </h1>
      </div>
    </div>
  );
}
