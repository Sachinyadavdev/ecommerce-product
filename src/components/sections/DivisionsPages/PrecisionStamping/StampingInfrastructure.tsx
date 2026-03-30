"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

interface Machine {
  brand: string;
  specs: string;
  description: string;
}

interface StampingInfrastructureProps {
  content?: {
    title?: string;
    description?: string;
    backgroundImage?: string;
    
    // Flat mapping for machines
    mac1Brand?: string;
    mac1Specs?: string;
    mac1Description?: string;
    
    mac2Brand?: string;
    mac2Specs?: string;
    mac2Description?: string;
    
    mac3Brand?: string;
    mac3Specs?: string;
    mac3Description?: string;
    
    mac4Brand?: string;
    mac4Specs?: string;
    mac4Description?: string;
    
    // Old Array Fallback
    machines?: Machine[];
  };
}

const defaultMachines: Machine[] = [
  { brand: "BRUDERER (50T & 25T)", specs: "Up to 1200 SPM", description: "Known for high precision BDC accuracy, ideal for intricate and high-volume production." },
  { brand: "SEYI-45T", specs: "High Reliability", description: "Engineered for consistency and precision in metal stamping applications." },
  { brand: "ISIS-25T", specs: "Micro-Precision", description: "Specifically designed for smaller, high-accuracy components." },
  { brand: "NIDEC", specs: "Knuckle Link Motion", description: "Latest technology with slower BDC slide movement and QDC Technology." }
];

export default function StampingInfrastructure({ content }: StampingInfrastructureProps) {
  // Map flat CMS fields
  const cmsMachines: Machine[] = [
    { 
      brand: content?.mac1Brand || defaultMachines[0].brand, 
      specs: content?.mac1Specs || defaultMachines[0].specs, 
      description: content?.mac1Description || defaultMachines[0].description 
    },
    { 
      brand: content?.mac2Brand || defaultMachines[1].brand, 
      specs: content?.mac2Specs || defaultMachines[1].specs, 
      description: content?.mac2Description || defaultMachines[1].description 
    },
    { 
      brand: content?.mac3Brand || defaultMachines[2].brand, 
      specs: content?.mac3Specs || defaultMachines[2].specs, 
      description: content?.mac3Description || defaultMachines[2].description 
    },
    { 
      brand: content?.mac4Brand || defaultMachines[3].brand, 
      specs: content?.mac4Specs || defaultMachines[3].specs, 
      description: content?.mac4Description || defaultMachines[3].description 
    }
  ];

  const hasCmsData = content?.mac1Brand || content?.mac2Brand;

  const {
    title = "Cutting-Edge Stamping Machinery",
    description = "We operate ten high-speed stamping machines, each offering unique specifications to accommodate diverse manufacturing requirements.",
    backgroundImage = "https://images.unsplash.com/photo-1565155986835-f7166e51e6c3?q=80&w=2940&auto=format&fit=crop"
  } = content || {};

  const displayMachines = hasCmsData ? cmsMachines : (content?.machines || defaultMachines);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section 
      className="relative py-10 md:py-16 bg-slate-950 text-white site-content overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Premium Dark Glassmorphic Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-0" />
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_70%)] opacity-10 pointer-events-none z-0 mix-blend-screen" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-white drop-shadow-md"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
            className="text-xl md:text-2xl text-white font-light leading-relaxed drop-shadow-sm"
          >
            {description}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {displayMachines.map((mac, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white/4 backdrop-blur-xl border border-white/10 hover:border-primary/40 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.15)] transition-all duration-500 group overflow-hidden relative"
            >
              {/* Subtle top glare effect */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4 sm:gap-0">
                  <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{mac.brand}</h4>
                  <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/20 shrink-0">
                    {mac.specs}
                  </span>
                </div>
                <p className="text-white leading-relaxed font-light text-[15px] md:text-lg">
                  {mac.description}
                </p>
              </div>
              
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-primary/10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 blur-[2px] group-hover:blur-none pointer-events-none">
                <Cpu size={140} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
