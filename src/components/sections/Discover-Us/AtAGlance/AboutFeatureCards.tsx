"use client";

import React from "react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  theme: "blue" | "green" | "red";
}

interface AboutFeatureCardsProps {
  content?: {
    card1Icon?: string;
    card1Title?: string;
    card1Description?: string;
    card1Tags?: string;
    card1Theme?: string;
    card2Icon?: string;
    card2Title?: string;
    card2Description?: string;
    card2Tags?: string;
    card2Theme?: string;
    card3Icon?: string;
    card3Title?: string;
    card3Description?: string;
    card3Tags?: string;
    card3Theme?: string;
    /** @deprecated use flat fields */
    cards?: FeatureCard[];
  };
}

const themeColors = {
  blue: {
    border: "border-t-[#183b7a]",
    icon: "text-[#183b7a]",
  },
  green: {
    border: "border-t-[#1a8b54]",
    icon: "text-[#1a8b54]",
  },
  red: {
    border: "border-t-[#c83232]",
    icon: "text-[#c83232]",
  },
};

export default function AboutFeatureCards({ content }: AboutFeatureCardsProps) {
  const defaultCards: FeatureCard[] = [
    {
      icon: "Briefcase",
      title: "CONNECTORS",
      description:
        "Equipped with Tool Design, Validation and Manufacturing – high end connectors from 1-pole to 20-pole, PCB mounting and wire-to-wire assemblies meeting industry-specified quality expectations.",
      tags: ["60M / month", "1-20 pole"],
      theme: "blue",
    },
    {
      icon: "Wrench",
      title: "SPECIAL CUSTOMISED PARTS",
      description:
        "Leveraging stamping and moulding capabilities, we develop precision insert moulded parts for Sensors, Actuators, Turbo Chargers, Body Control Modules, and Socket Chargers for EVs.",
      tags: ["EV Ready", "Insert Moulded"],
      theme: "green",
    },
    {
      icon: "Zap",
      title: "TERMINALS",
      description:
        "High Speed Stamping Line for manufacture of Terminals and Stamped parts. Tooling to Production capability with dedicated vendor base supporting special coatings like gold and silver.",
      tags: ["60M / month", "Gold / Silver coat"],
      theme: "red",
    },
  ];

  const cards: FeatureCard[] = [
    {
      icon: content?.card1Icon || defaultCards[0].icon,
      title: content?.card1Title || defaultCards[0].title,
      description: content?.card1Description || defaultCards[0].description,
      tags: content?.card1Tags?.split("\n").filter(Boolean) || defaultCards[0].tags,
      theme: (content?.card1Theme as any) || defaultCards[0].theme,
    },
    {
      icon: content?.card2Icon || defaultCards[1].icon,
      title: content?.card2Title || defaultCards[1].title,
      description: content?.card2Description || defaultCards[1].description,
      tags: content?.card2Tags?.split("\n").filter(Boolean) || defaultCards[1].tags,
      theme: (content?.card2Theme as any) || defaultCards[1].theme,
    },
    {
      icon: content?.card3Icon || defaultCards[2].icon,
      title: content?.card3Title || defaultCards[2].title,
      description: content?.card3Description || defaultCards[2].description,
      tags: content?.card3Tags?.split("\n").filter(Boolean) || defaultCards[2].tags,
      theme: (content?.card3Theme as any) || defaultCards[2].theme,
    },
  ];

  const renderIcon = (iconName: string, className: string) => {
    const formattedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    // @ts-ignore
    const IconComponent = LucideIcons[formattedIconName] || LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <IconComponent className={className} strokeWidth={1.5} size={28} />;
  };

  return (
    <section className="py-16 bg-[#F8FAFC] w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border-t-[6px] flex flex-col h-full ${themeColors[card.theme].border} transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:scale-[1.02] group`}
            >
              <div className="mb-6">
                <div className="w-16 h-14 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {renderIcon(card.icon, themeColors[card.theme].icon)}
                </div>
              </div>

              <h3 className="text-[#0c234a] text-xl font-bold tracking-wide uppercase mb-4">
                {card.title}
              </h3>

              <p className="text-[#64748B] leading-relaxed mb-8 flex-grow text-[15px]">
                {card.description}
              </p>

              <div className="flex flex-wrap gap-2 lg:gap-3 mt-auto pt-4">
                {card.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="bg-[#F4F7FB] text-[#0c234a] px-5 py-2 rounded-full text-sm font-bold shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
