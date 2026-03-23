"use client";

import NewsHighlights, { NewsItem } from "./NewsHighlights";
import NewsCollage, { NewsImage } from "./NewsCollage";
import { ClientLogo } from "./ClientsSection";

export interface NewsSectionProps {
  content?: {
    title?: string;
    newsItems?: NewsItem[];
    featuredBoxText?: string;
    images?: NewsImage[];
    backgroundImage?: string;
    clientLogos?: ClientLogo[];
  };
}

const defaultNewsItems: NewsItem[] = [
  {
    title: "Strong Manufacturing Expertise",
    description:
      "Besmak is a globally preferred manufacturer specializing in automobile connection systems, wiring harness components, precision plastic parts, stamping tools, and injection moulds, supported by advanced manufacturing technologies.",
    link: "#",
  },
  {
    title: "High Production Capability",
    description:
      "The company has the capacity to produce over 3.2 million parts per day, supported by automated assembly lines, precision tooling, and digitally controlled manufacturing systems.",
    link: "#",
  },
  {
    title: "Trusted by Global Automotive Clients",
    description:
      "Besmak is a preferred partner for OEMs and plays a key role in the automotive wiring harness supply chain, providing high-quality and reliable components.",
    link: "#",
  },
];

const defaultImages: NewsImage[] = [
  {
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
    title: "Legacy & Experience",
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    title: "Workforce Strength",
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    title: "Production Capability",
  },
  {
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2070",
    title: "Machines",
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070",
    title: "Technology & Quality",
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    title: "350+ Customers",
  },
];

export default function NewsSection({ content }: NewsSectionProps) {
  const {
    title = "Key Highlights of Besmak",
    newsItems = defaultNewsItems,
    featuredBoxText = "Besmak continues to achieve major milestones through technology upgrades, new product developments, automation, ESG initiatives, and global certifications, positioning itself as a future-ready manufacturing company.",
    images: passedImages,
    backgroundImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    clientLogos,
  } = content || {};

  const images = [
    ...(passedImages || []),
    ...defaultImages.slice((passedImages || []).length),
  ].slice(0, 6);

  return (
    <section className="bg-slate-50 py-10 md:py-16 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-[20%] -mb-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] relative z-10">
        <div className="flex flex-col w-full gap-8 lg:gap-16">
          <NewsCollage 
            images={images} 
            clientLogos={clientLogos}
          />
          <NewsHighlights 
            title={title} 
            newsItems={newsItems} 
            featuredBoxText={featuredBoxText} 
            backgroundImage={backgroundImage}
          />
        </div>
      </div>
    </section>
  );
}
