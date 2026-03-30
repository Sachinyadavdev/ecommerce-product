"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

interface LSRMouldingDetailProps {
  content?: {
    title?: string;
    breadcrumbs?: Array<{ label: string; url?: string }>;
    bgImage?: string;
    subtitle?: string;
    description?: string;
    section1Title?: string;
    whyLsrTitle?: string;
    whyLsrIntro?: string;
    highlights?: string[];
    opportunitiesTitle?: string;
    opportunitiesDesc1?: string;
    opportunitiesDesc2?: string;
    image?: string;
  };
}

const defaultHighlights = [
  "High thermal stability and flexibility",
  "Strong resistance to chemicals and harsh environments",
  "Suitable for sensitive and specialised applications",
  "Durable and reliable for long-term use",
  "Ideal for sealing, insulation and connection system components",
];

export default function LSRMouldingDetail({ content }: LSRMouldingDetailProps) {
  const {
    title = "Liquid Silicone Rubber (LSR) Moulding",
    breadcrumbs = [
      { label: "Home", url: "/" },
      { label: "Connection Systems", url: "/connection-systems" },
      { label: "LSR Moulding" },
    ],
    bgImage = "/lsr-moulding-facility.png",
    subtitle = "Precision. Performance. Possibility.",
    description = "At Besmak Components Pvt. Ltd., we are introducing our Liquid Silicone Rubber (LSR) and Liquid Injection Moulding (LIM) capabilities as an important step in strengthening our precision manufacturing in India.\n\nOur facility is equipped with a vertical injection moulding machine, along with a dosing system and robotic support. This setup ensures smooth material flow, better control, and consistent production of high-quality components, even for complex designs.\n\nThis investment is not just about expanding capacity. It reflects our focus on adopting better technology and delivering reliable connection systems.",
    section1Title = "Strengthening Precision Manufacturing with Advanced LSR Capabilities",
    whyLsrTitle = "Why LSR at Besmak?",
    whyLsrIntro = "Our LSR moulding capability is designed to produce high-performance, precision components with higher dimensional accuracy and stability.",
    highlights = defaultHighlights,
    opportunitiesTitle = "Creating New Opportunities and Value",
    opportunitiesDesc1 = "We are excited about the new opportunities this brings to our business. It enables us to handle more advanced and high-precision projects with confidence.",
    opportunitiesDesc2 = "Our customers will benefit from improved quality, faster delivery and reliable performance — creating greater value for our partners and clients.",
    image = "/lsr-moulding-facility.png",
  } = content || {};

  const paragraphs = description.split("\n\n");
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  const stats = [
    { value: "0.3 mm", label: "Min. LSR Wall" },
    { value: "0.6 mm", label: "Min. NBR Wall" },
    { value: "100%", label: "Defect-Free" },
    { value: "3-Axis", label: "Robotic Support" },
  ];

  return (
    <>
      {/* ── HERO BANNER ── */}
      <div className="w-full min-h-[calc(100vh-85px)] flex items-center relative mt-[85px] overflow-hidden">
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
          {/* Light premium gradient overlay matching Machinery style */}
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-transparent z-10" />
        </motion.div>

        {/* Animated shimmer sweep */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-white/0 via-white/6 to-white/0"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />

        <div className="container relative z-20 px-6 mx-auto">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-primary uppercase border-l-4 border-primary bg-primary/5">
                {subtitle}
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

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-slate-700 max-w-2xl leading-relaxed font-medium italic border-l-2 border-primary/20 pl-6"
            >
              {paragraphs[0]}
            </motion.p>
          </div>
        </div>

        {/* Decorative line matching Machinery style */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-transparent z-30" 
        />
      </div>



      {/* ── BODY ── */}
      <section className="py-10 md:py-16 bg-slate-50 relative overflow-hidden">
        {/* Connection Systems style grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">

          {/* Section 1: Description + Image */}
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
                <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Our Capabilities</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight"
              >
                {section1Title}
              </motion.h2>

              <div className="space-y-4">
                {paragraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    className="text-xl text-slate-600 font-light leading-relaxed"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] as any }}
              className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image src={image} alt="LSR Facility" fill className="object-cover transition-transform duration-[2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent" />
            </motion.div>
          </div>

          {/* Section 2: Why LSR + Opportunities */}
          <div className="max-w-3xl mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase">Material & Value</span>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Why LSR Card */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } } }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="h-full bg-white border border-slate-100 p-10 rounded-3xl shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{whyLsrTitle}</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-6">{whyLsrIntro}</p>
                <ul className="space-y-3">
                  {highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-slate-600 font-light leading-relaxed pt-1.5">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="absolute bottom-8 right-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 text-slate-900 font-black text-6xl pointer-events-none">01</div>
              </div>
              <div className="absolute inset-x-10 bottom-0 h-4 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Opportunities card */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } } }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col gap-6"
            >
              <div className="flex-1 bg-white border border-slate-100 p-10 rounded-3xl shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-primary/20">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-primary transition-colors">{opportunitiesTitle}</h3>
                <p className="text-slate-600 leading-relaxed font-light mb-4">{opportunitiesDesc1}</p>
                <p className="text-slate-600 leading-relaxed font-light">{opportunitiesDesc2}</p>
                <div className="absolute bottom-8 right-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-300 text-slate-900 font-black text-6xl pointer-events-none">02</div>
              </div>

              {/* Accent card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden cursor-default"
              >
                <motion.div
                  className="absolute -right-6 -bottom-6 opacity-10"
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  <CheckCircle2 size={120} />
                </motion.div>
                <h4 className="text-xl font-extrabold tracking-tight mb-2 relative z-10">Ready for High-Precision Manufacturing</h4>
                <p className="text-white/75 font-light leading-relaxed relative z-10">
                  Our LSR facility is operational with robotic assistance and precision dosing — built for the next generation of connection system components.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
