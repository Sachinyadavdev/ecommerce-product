"use client";

import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { DEFAULT_LOGOS, ClientLogoType } from "./ClientsSection";

export interface NewsImage {
  url: string;
  title: string;
  date?: string;
}

interface AnimatedStatBlockProps {
  label: string;
  stat: string;
}

function AnimatedStatBlock({
  label,
  stat,
  isVertical,
}: AnimatedStatBlockProps & { isVertical?: boolean }) {
  const baseClasses =
    "flex flex-col z-20 pointer-events-auto bg-black/15 backdrop-blur-md bg-linear-to-br from-white/10 to-transparent border border-white/20 p-4 lg:p-6 rounded-2xl lg:rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.2)] max-w-max backdrop-saturate-150 transition-all duration-500 hover:scale-[1.03] hover:bg-black/25 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:border-white/30 cursor-default group";

  if (isVertical) {
    return (
      <div
        className="z-20 pointer-events-auto bg-black/15 backdrop-blur-md bg-linear-to-br from-white/10 to-transparent border border-white/20 px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] max-w-max backdrop-saturate-150 transition-all duration-500 hover:scale-[1.03] hover:bg-black/25 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:border-white/30 cursor-default group flex flex-row items-center gap-2 md:gap-3 mx-auto"
      >
        <div className="text-[9px] md:text-[11px] font-bold text-white/80 tracking-[0.2em] uppercase drop-shadow-sm transition-colors group-hover:text-white whitespace-nowrap">
          {label}
        </div>
        <div className="text-white font-black text-sm sm:text-lg md:text-xl lg:text-2xl leading-none tracking-tight drop-shadow-md whitespace-nowrap">
          {stat}
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} relative self-start items-start text-left hover:-translate-y-1`}>
      <div className="text-[10px] lg:text-[12px] font-bold text-white/90 tracking-[0.2em] uppercase mb-1 drop-shadow-sm transition-colors group-hover:text-white">
        {label}
      </div>
      <div className="text-white font-black text-xl lg:text-3xl leading-[1.1] tracking-tight drop-shadow-md">
        {stat}
      </div>
    </div>
  );
}

function LogoFloatingGrid({ logos, titleInfo }: { logos: ClientLogoType[], titleInfo: { label: string, stat: string } }) {
  const displayLogos = logos.slice(0, 16);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center px-2 sm:px-4">
      {/* Title Badge resting purely in flex layout above grid */}
      <div className="mb-6 md:mb-10 pointer-events-auto">
        <AnimatedStatBlock label={titleInfo.label} stat={titleInfo.stat} isVertical={true} />
      </div>

      {/* Container aligned to center on desktop, up to 16 logos */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3 lg:gap-4 w-full max-w-[320px] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {displayLogos.map((logo, idx) => (
          <div
            key={idx}
            className="group/logo relative bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 rounded-md sm:rounded-lg md:rounded-xl p-1 md:p-2 flex items-center justify-center w-full h-[52px] sm:h-[60px] md:h-16 lg:h-20 xl:h-24 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-white/30 pointer-events-auto overflow-hidden animate-in fade-in slide-in-from-bottom-8"
            style={{
              animationDelay: `${idx * 50}ms`,
              animationFillMode: "both",
            }}
          >
            {/* Glossy inner reflection */}
            <div className="absolute inset-0 bg-linear-to-b from-white/20 via-white/5 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain opacity-90 group-hover/logo:opacity-100 scale-100 md:scale-125 group-hover/logo:scale-110 md:group-hover/logo:scale-[1.4] transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface NewsCollageProps {
  images: NewsImage[];
  clientLogos?: ClientLogoType[];
}

export default function NewsCollage({ images, clientLogos }: NewsCollageProps) {
  const imagesToShow = images.slice(0, 6);

  // Use passed clientLogos. If not provided or not enough, pad with DEFAULT_LOGOS sequentially up to 16
  const finalLogos =
    clientLogos && clientLogos.length > 0
      ? [...clientLogos, ...DEFAULT_LOGOS, ...DEFAULT_LOGOS].slice(0, 16)
      : [...DEFAULT_LOGOS, ...DEFAULT_LOGOS].slice(0, 16);

  const getStatInfo = (titleText: string, index: number) => {
    const t = (titleText || "").toLowerCase();

    // Explicitly define the 6 core stats, matching string first, falling back to index
    if (t.includes("legacy") || index === 0)
      return { label: "Legacy & Experience", stat: "30+ Years" };
    if (t.includes("workforce") || t.includes("people") || index === 1)
      return { label: "Workforce Strength", stat: "460+ People" };
    if (t.includes("production") || index === 2)
      return { label: "Production Capability", stat: "1500+ Products" };
    if (t.includes("machine") || t.includes("equipment") || index === 3)
      return { label: "Powered By", stat: "70+ Machines" };
    if (t.includes("technology") || t.includes("quality") || index === 4)
      return { label: "Technology & Quality", stat: "600+ Moulds" };
    if (t.includes("customers") || t.includes("350") || index === 5)
      return { label: "Trusted By", stat: "350+ Customers" };

    return { label: "Key Insight", stat: titleText };
  };

  return (
    <div className="w-full mt-0 pb-0">
      <div className="w-full mx-auto flex flex-col items-center">
        <ScrollStack
          useWindowScroll={true}
          itemStackDistance={0}
          blurAmount={0}
          stackPosition="15%"
          baseScale={1}
          itemScale={0}
        >
          {imagesToShow.map((image, i) => {
            const info = getStatInfo(image.title, i);
            return (
              <ScrollStackItem
                key={i}
                itemClassName="!p-0 bg-slate-900 rounded-2xl md:rounded-3xl overflow-hidden !h-[50vh] md:!h-[75vh] w-full border-none"
              >
                <div className="w-full h-full relative group/slide">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover/slide:scale-105"
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    priority={i === 0}
                  />

                  {/* Gradient removed to keep the image original and bright */}
                  <div className="absolute inset-0 flex flex-col justify-start p-4 md:p-6 lg:p-8 z-30 pointer-events-none">
                    {i !== 5 && (
                      <AnimatedStatBlock
                        label={info.label}
                        stat={info.stat}
                        isVertical={false}
                      />
                    )}
                    {image.date && (
                      <p className="mt-4 text-[12px] md:text-sm font-bold text-[#00d670]/80 tracking-[0.2em] uppercase">
                        {image.date}
                      </p>
                    )}
                  </div>

                  {/* Floating Logo Grid for the last slide */}
                  {i === 5 && <LogoFloatingGrid logos={finalLogos} titleInfo={info} />}

                  {/* Premium inner glow */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none z-40" />
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </div>
  );
}
