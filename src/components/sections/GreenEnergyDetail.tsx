"use client";

import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Sun,
  Wind,
  Factory,
  TreePine,
  Users,
  Zap,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

interface GreenEnergyDetailProps {
  content?: {
    title?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
    bgImage?: string;
    description1?: string;
    description2?: string;
    initiativesTitle?: string;
    initiatives?: string[];
    esgTitle?: string;
    esgItems?: string[];
    usageTitle?: string;
    usageItems?: string[];
    sustainabilityTitle?: string;
    sustainabilityItems?: string[];
    workplaceTitle?: string;
    workplaceItems?: string[];
    efficiencyTitle?: string;
    efficiencyItems?: string[];
    otherTitle?: string;
    otherItems?: string[];
    image?: string;
  };
}

function parseBold(text: string) {
  return text.split(/(\*\*.*?\*\*)/).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold text-slate-900">{p.slice(2, -2)}</strong>
    ) : p
  );
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface CardDef { title: string; items: string[]; icon: React.ElementType; index: number }

function InfoCard({ title, items, icon: Icon, index }: CardDef) {
  return (
    <motion.div
      custom={index}
      variants={ITEM_VARIANTS}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="h-full bg-white border border-slate-100 p-10 rounded-3xl shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20">
        {/* Icon */}
        <div className="relative mb-8">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-transform duration-500"
          >
            <Icon size={32} />
          </motion.div>
          <div className="absolute inset-0 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{title}</h3>

        <ul className="space-y-2">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              className="flex items-start gap-2 text-slate-600 font-light leading-relaxed"
            >
              <CheckCircle2 className="w-4 h-4 text-primary/50 mt-0.5 shrink-0" />
              <span>{parseBold(item)}</span>
            </motion.li>
          ))}
        </ul>

        {/* Number watermark */}
        <div className="absolute bottom-8 right-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 text-slate-900 font-black text-6xl pointer-events-none">
          0{index + 1}
        </div>
      </div>
      <div className="absolute inset-x-10 bottom-0 h-4 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function GreenEnergyDetail({ content }: GreenEnergyDetailProps) {
  const {
    title = "Driving Sustainability Through Green Energy",
    breadcrumbs = [{ label: "Home", url: "/" }, { label: "Green Energy" }],
    bgImage = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/green-energy-industrial.png",
    description1 = "Besmak Components is committed to reducing its environmental impact by adopting green energy solutions. By using cleaner energy sources, we aim to lower carbon emissions and support sustainable manufacturing practices.",
    description2 = "Our focus on energy efficiency and responsible resource usage helps us operate in an eco-friendly manner while maintaining high production standards. This approach reflects our commitment to a greener future and responsible industrial growth in India.",
    initiativesTitle = "Green Energy Initiatives",
    initiatives = [
      "Committed to eco-friendly and environmentally friendly practices",
      "Focus on green energy initiatives",
      "40% of power consumption from solar energy",
      "20% of power consumption from wind energy",
      "Reduced dependence on conventional power sources",
      "Lower carbon emissions",
      "Supports sustainable manufacturing",
      "Contributes to a greener future",
    ],
    esgTitle = "Besmak Toward ESG",
    esgItems = [
      "Focus on Environmental, Social, and Governance (ESG) initiatives",
      "Use of **Factory Rooftop Solar Energy**",
      "Adoption of **Wind Green Energy**",
      "Use of **Solar Green Energy**",
    ],
    usageTitle = "Energy Usage (2023–2024)",
    usageItems = [
      "Total green energy usage: 90%",
      "83% from solar and wind energy sources",
      "10% from the main power grid",
      "7% from factory rooftop solar",
    ],
    sustainabilityTitle = "Sustainability Initiatives",
    sustainabilityItems = [
      "Climate change strategy with tracking of over 2,000 plants",
      "Minimum 1 sapling planted per employee per year",
      "Growth rate of plants monitored over the last 3 years",
    ],
    workplaceTitle = "Workplace & Social Responsibility",
    workplaceItems = [
      "Gender equality ratio (Men: Women) – 75:25",
      "Target to improve diversity to 65:35",
    ],
    efficiencyTitle = "Operational Efficiency",
    efficiencyItems = ["All equipment, including production machines, runs on UPS support"],
    otherTitle = "Other Initiatives",
    otherItems = ["Participation in the Ecovadis survey"],
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/green-energy-industrial.png",
  } = content || {};

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const stats = [
    { value: "90%", label: "Total Green Energy", icon: Leaf },
    { value: "40%", label: "Solar Power", icon: Sun },
    { value: "20%", label: "Wind Power", icon: Wind },
    { value: "83%", label: "Solar & Wind", icon: BarChart3 },
  ];

  const cards = [
    { title: initiativesTitle, items: initiatives, icon: Wind },
    { title: esgTitle, items: esgItems, icon: Factory },
    { title: usageTitle, items: usageItems, icon: Sun },
    { title: sustainabilityTitle, items: sustainabilityItems, icon: TreePine },
    { title: workplaceTitle, items: workplaceItems, icon: Users },
    { title: efficiencyTitle, items: [...efficiencyItems, ...otherItems.map(o => `${otherTitle}: ${o}`)], icon: Zap },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full h-screen min-h-[calc(100vh-85px)] overflow-hidden flex items-center bg-slate-50 mt-[85px]">
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" as const }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          {/* Machinery hero gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent z-10" />
        </motion.div>

        <div className="container relative z-20 px-6 mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase border-l-4 border-primary bg-primary/5">
                Sustainability & Energy
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-primary leading-[1.05] tracking-tighter"
            >
              {title}
            </motion.h1>
          </div>
        </div>

        {/* Decorative line */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-transparent z-30" 
        />
      </section>



      {/* ── BODY ── */}
      <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden">
        {/* Connection Systems style background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">

          {/* Description + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-[2px] w-12 bg-primary" />
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Our Commitment</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight"
              >
                Powering Progress <span className="text-primary">Sustainably</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light leading-relaxed mb-4"
              >
                {description1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 font-light leading-relaxed"
              >
                {description2}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image src={image} alt="Green Energy at Besmak" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-slate-900">90% Green Energy — 2023–24</span>
              </div>
            </motion.div>
          </div>

          {/* Cards section header */}
          <div className="max-w-3xl mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Key Initiatives & Data</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight"
            >
              Our Sustainability Impact
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 font-light leading-relaxed"
            >
              From solar to wind energy, ESG governance to workplace diversity — here's how Besmak is building a responsible and sustainable future.
            </motion.p>
          </div>

          {/* 3-col stagger grid */}
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {cards.map((c, i) => (
              <InfoCard key={i} {...c} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
