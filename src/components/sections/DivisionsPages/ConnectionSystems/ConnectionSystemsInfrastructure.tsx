"use client";

import { motion } from "framer-motion";
import { Factory, Cog, Battery, FlaskConical } from "lucide-react";

interface InfrastructureItem {
  title: string;
  description: string;
  icon: string;
}

interface ConnectionSystemsInfrastructureProps {
  content?: {
    title?: string;
    items?: InfrastructureItem[];
    image1?: string;
    image2?: string;
    item1Title?: string;
    item1Description?: string;
    item1Icon?: string;
    item2Title?: string;
    item2Description?: string;
    item2Icon?: string;
    item3Title?: string;
    item3Description?: string;
    item3Icon?: string;
    item4Title?: string;
    item4Description?: string;
    item4Icon?: string;
  };
}

const defaultItems: InfrastructureItem[] = [
  {
    title: "State-of-the-Art Plants",
    description: "Three manufacturing facilities in Chennai and Sanand with over 100,000 sq. ft. floor space and strategic warehouses.",
    icon: "Factory"
  },
  {
    title: "Advanced Machinery",
    description: "69 injection molding machines (40 to 450 tons) and stamping presses (15 to 110 tons) with OEE monitoring and SAP integration.",
    icon: "Cog"
  },
  {
    title: "Reliable Power Systems",
    description: "Operated on 80% renewable energy with 100% UPS back-up for uninterrupted production.",
    icon: "Battery"
  },
  {
    title: "Testing & Quality Control",
    description: "House a DVP Lab performing 51 out of 52 mandated tests. NABL-accredited and IATF 16949:2016 compliant.",
    icon: "FlaskConical"
  }
];

const iconMap: any = { Factory, Cog, Battery, FlaskConical };

export default function ConnectionSystemsInfrastructure({ content }: ConnectionSystemsInfrastructureProps) {
  // Use flattened fields if provided, otherwise fallback to content.items or defaultItems
  const cmsItems: InfrastructureItem[] = [
    {
      title: content?.item1Title || defaultItems[0].title,
      description: content?.item1Description || defaultItems[0].description,
      icon: content?.item1Icon || defaultItems[0].icon,
    },
    {
      title: content?.item2Title || defaultItems[1].title,
      description: content?.item2Description || defaultItems[1].description,
      icon: content?.item2Icon || defaultItems[1].icon,
    },
    {
      title: content?.item3Title || defaultItems[2].title,
      description: content?.item3Description || defaultItems[2].description,
      icon: content?.item3Icon || defaultItems[2].icon,
    },
    {
      title: content?.item4Title || defaultItems[3].title,
      description: content?.item4Description || defaultItems[3].description,
      icon: content?.item4Icon || defaultItems[3].icon,
    },
  ];

  const hasCmsData = content?.item1Title || content?.item2Title || content?.item3Title || content?.item4Title;

  const {
    title = "Infrastructure & Manufacturing Facilities",
    items = hasCmsData ? cmsItems : (content?.items || defaultItems),
  } = content || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden site-content">
      {/* Texture & Decorative Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/2 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/2 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              className="h-1 bg-primary mb-6 rounded-full" 
            />
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h2>
          </div>
          <div className="hidden lg:block">
             <p className="text-slate-400 font-medium tracking-[0.2em] uppercase text-xs">Technical Excellence / Infrastructure</p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
        >
          {items.map((item: InfrastructureItem, idx: number) => {
            const Icon = iconMap[item.icon] || Factory;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-10 right-10 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-full" />
                
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                  <div className="shrink-0 w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-inner">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                       <span className="text-primary/40 font-black text-sm tabular-nums tracking-tighter">0{idx + 1}</span>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[17px] font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Subtle background icon */}
                <div className="absolute top-6 right-6 text-slate-50 group-hover:text-primary/5 transition-colors duration-500">
                   <Icon size={80} strokeWidth={1} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
