"use client";

import { motion } from "framer-motion";
import { Factory, Construction, Cpu, ArrowRight } from "lucide-react";

interface InfrastructureItem {
  title: string;
  size: string;
  location: string;
  status?: string;
}

interface EngineeringInfrastructureProps {
  content?: {
    title?: string;
    description?: string;
    image?: string;
    items?: InfrastructureItem[];
    techTitle?: string;
    techDescription?: string;
    item1Title?: string;
    item1Size?: string;
    item1Location?: string;
    item1Status?: string;
    item2Title?: string;
    item2Size?: string;
    item2Location?: string;
    item2Status?: string;
    item3Title?: string;
    item3Size?: string;
    item3Location?: string;
    item3Status?: string;
  };
}

const defaultItems: InfrastructureItem[] = [
  {
    title: "Manufacturing Plant 1",
    size: "30,000 sq. ft.",
    location: "Chennai, Tamil Nadu",
    status: "Active",
  },
  {
    title: "Manufacturing Plant 2",
    size: "40,000 sq. ft.",
    location: "Sanand, Gujarat",
    status: "Active",
  },
  {
    title: "Plant 3 (Upcoming)",
    size: "30,000 sq. ft.",
    location: "Orgadam, Chennai (April 2025)",
    status: "In Progress",
  },
];

export default function EngineeringInfrastructure({
  content,
}: EngineeringInfrastructureProps) {
  // Use pre-seeded items array if it exists as fallback
  const baseItems = content?.items || defaultItems;

  const cmsItems: InfrastructureItem[] = [
    {
      title:
        content?.item1Title !== undefined
          ? content.item1Title
          : baseItems[0].title,
      size:
        content?.item1Size !== undefined
          ? content.item1Size
          : baseItems[0].size,
      location:
        content?.item1Location !== undefined
          ? content.item1Location
          : baseItems[0].location,
      status:
        content?.item1Status !== undefined
          ? content.item1Status
          : baseItems[0].status,
    },
    {
      title:
        content?.item2Title !== undefined
          ? content.item2Title
          : baseItems[1].title,
      size:
        content?.item2Size !== undefined
          ? content.item2Size
          : baseItems[1].size,
      location:
        content?.item2Location !== undefined
          ? content.item2Location
          : baseItems[1].location,
      status:
        content?.item2Status !== undefined
          ? content.item2Status
          : baseItems[1].status,
    },
    {
      title:
        content?.item3Title !== undefined
          ? content.item3Title
          : baseItems[2].title,
      size:
        content?.item3Size !== undefined
          ? content.item3Size
          : baseItems[2].size,
      location:
        content?.item3Location !== undefined
          ? content.item3Location
          : baseItems[2].location,
      status:
        content?.item3Status !== undefined
          ? content.item3Status
          : baseItems[2].status,
    },
  ];

  const hasCmsData = Object.keys(content || {}).some((key) =>
    key.match(/^item[1-3]/),
  );

  const {
    title = "Infrastructure & Facilities",
    description = "Our manufacturing infrastructure includes modern, fully equipped facilities strategically located to serve the automotive hub. We operate with a commitment to maintaining world-class standards across all locations.",
    image = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/hero-bg-blueprint.jpg", // Placeholder
    techTitle = "Advanced Machinery",
    techDescription = "Equipped with horizontal and vertical molding machines ranging from 40 to 450 tons. Each machine features 3-Axis robots with dual-side access for seamless insert placement and part picking, ensuring peak efficiency.",
  } = content || {};

  const displayItems = hasCmsData ? cmsItems : content?.items || defaultItems;

  return (
    <section className="py-24 md:py-32 bg-white site-content overflow-hidden relative border-t border-slate-100">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-120 h-120 bg-slate-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-160 h-160 bg-primary/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 xl:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                Global Facilities
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
              {title}
            </h2>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
              {description}
            </p>

            <div className="space-y-4">
              {displayItems.map((item, idx) => {
                const isUpcoming =
                  item.title.includes("Upcoming") ||
                  item.status === "In Progress";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Hover subtle gradient */}
                    <div className="absolute -inset-1 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full ease-in-out" />

                    <div
                      className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors duration-300 relative z-10 ${isUpcoming ? "bg-amber-50 text-amber-500 group-hover:bg-amber-100" : "bg-slate-50 text-primary group-hover:bg-primary/10"}`}
                    >
                      {isUpcoming ? (
                        <Construction size={24} strokeWidth={1.5} />
                      ) : (
                        <Factory size={24} strokeWidth={1.5} />
                      )}
                    </div>

                    <div className="flex-1 relative z-10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors text-[1.05rem]">
                          {item.title}
                        </h4>
                        {item.status && (
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isUpcoming ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}
                          >
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                        {item.size}{" "}
                        <span className="w-1 h-1 rounded-full bg-slate-300" />{" "}
                        {item.location}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Interactive Visual/Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-7 relative"
          >
            <div className="relative w-full aspect-[4/3] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 group">
              {image ? (
                <>
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <img
                    src={image}
                    alt="Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover scale-[1.15] md:scale-[1.2] group-hover:scale-[1.25] group-hover:-rotate-1 transition-transform duration-1000 ease-out"
                  />
                  {/* Subtle vignette/gradient for text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                </>
              ) : (
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                  <Factory size={64} opacity={0.5} />
                </div>
              )}

              {/* Overlapping Tech Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-6 right-6 left-6 md:bottom-8 md:right-8 md:w-3/4 lg:w-[85%] bg-white/20 hover:bg-white/30 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border border-white/40 z-20 group/tech overflow-hidden"
              >
                {/* Accent glow behind card */}
                <div className="absolute -inset-4 bg-primary/20 blur-2xl -z-10 rounded-full opacity-0 group-hover/tech:opacity-100 transition-opacity duration-500" />

                {/* Glossy Reflection Highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white to-transparent opacity-60" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/30 shadow-inner flex items-center justify-center text-primary border border-white/50 group-hover/tech:bg-primary group-hover/tech:text-white transition-all duration-300">
                    <Cpu
                      size={28}
                      strokeWidth={1.5}
                      className="group-hover/tech:animate-pulse"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black whitespace-nowrap mb-2 tracking-tight group-hover/tech:text-primary transition-colors">
                      {techTitle}
                    </h3>
                    <p className="whitespace-wrap leading-relaxed text-sm lg:text-base font-medium">
                      {techDescription}
                    </p>

                    <button className="mt-4 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest group/btn">
                      Explore Machinery
                      <ArrowRight
                        size={16}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
