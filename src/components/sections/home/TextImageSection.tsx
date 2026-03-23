"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TextImageSectionProps {
  content?: {
    header?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
    imagePosition?: "left" | "right";
    bgColor?: string;
  };
}

export default function TextImageSection({ content }: TextImageSectionProps) {
  const {
    header = "Our Heritage",
    title = "Modern Manufacturing. Precision Engineering. Proven Legacy.",
    description = "For over 30 years, Besmak has supported India's industrial growth\nthrough innovation, quality and resilience. Rooted in India with a\nglobal outlook, we continue to adapt to evolving manufacturing\nneeds while contributing to the spirit of Make in India, backed by\nstrong engineering expertise and trusted industry partnerships.",
    imageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070",
    imagePosition = "right",
    bgColor = "bg-slate-50/50",
  } = content || {};

  const isLeft = imagePosition === "left";

  const descriptionLines = description.split(/\\n|\n/g);

  return (
    <section
      className={`py-10 md:py-16 relative overflow-hidden ${bgColor}`}
    >
      {/* Decorative Blueprint Background Pattern */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-70">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-blue-300/10 blur-[100px]"
        />
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "32px 32px"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px]" 
        />
      </div> */}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px] relative z-10 perspective-1000">
        <motion.div 
          initial={{ opacity: 0, y: 40, rotateX: 5 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
        >
          {/* ========== TITLE COLUMN (LEFT) ========== */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center">
            {header && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-primary/10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                  <span className="text-primary text-[13px] font-bold tracking-[0.2em] uppercase">
                    {header}
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2, delayChildren: 0.1 },
                },
                hidden: {},
              }}
            >
              <h2 
                className="font-black tracking-tighter text-black w-full"
                style={{ fontSize: "clamp(32px, 14vw, 32px)", lineHeight: "1.23" }}
              >
                {title.split(". ").map((part, i, arr) => {
                  if (!part) return null;

                  return (
                    <span
                      key={i}
                      className="block md:inline-block md:mr-[0.3em] overflow-hidden align-bottom pb-4 -mb-4 pt-2 -mt-2"
                    >
                      <motion.span
                        className="block md:inline-block origin-left"
                        variants={{
                          hidden: {
                            y: "120%",
                            opacity: 0,
                            rotateZ: 5,
                            scale: 0.95,
                          },
                          visible: {
                            y: "0%",
                            opacity: 1,
                            rotateZ: 0,
                            scale: 1,
                            transition: {
                              type: "spring",
                              bounce: 0.15,
                              duration: 1.2,
                            },
                          },
                        }}
                      >
                        <span className="relative text-black transition-colors duration-500">
                          {part}
                          {i < arr.length - 1 && (
                            <span className="font-black inline-block ml-1 opacity-90 drop-shadow-sm">
                              .
                            </span>
                          )}
                        </span>
                      </motion.span>
                    </span>
                  );
                })}
              </h2>
            </motion.div>
          </div>

          {/* ========== DESCRIPTION COLUMN (RIGHT) ========== */}
          <div className="w-full lg:w-[65%] flex flex-col justify-center mt-10 lg:mt-0 xl:pl-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2, delayChildren: 0.6 },
                },
                hidden: {},
              }}
              className="group text-[18px] text-gray-600 leading-[1.8] font-medium border-l-4 border-primary/20 pl-6 lg:pl-10 py-6 relative bg-white/30 backdrop-blur-md rounded-r-3xl transition-all duration-700 hover:bg-white/60 hover:shadow-[10px_0_50px_rgba(0,167,88,0.06)] hover:border-primary/40"
            >
              {/* Sweeping Animated Progress Line */}
              <motion.div 
                initial={{ height: "0%" }}
                whileInView={{ height: "50%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.6 }}
                className="absolute top-0 -left-[4px] w-[4px] bg-linear-to-b from-primary via-primary to-transparent rounded-full shadow-[0_0_15px_rgba(0,167,88,0.5)]" 
              />
              {/* Continuous Scanning Laser over the line */}
              <motion.div 
                animate={{ y: [0, 80, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-0 -left-[4px] w-[4px] h-16 bg-white rounded-full mix-blend-overlay shadow-[0_0_12px_white]"
              />

              {descriptionLines.map((line, index) => (
                <motion.p
                  key={index}
                  className="mb-6 last:mb-0"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
