import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DivisionsListProps {
  content?: {
    title?: string;
    subtitle?: string;
  };
}

export default function DivisionsList({ content }: DivisionsListProps) {
  const {
    title = "Our Divisions",
    subtitle = "Specialized expertise across multiple industrial sectors, delivering precision at every scale."
  } = content || {};

  const divisions = [
    {
      title: "Connection Systems",
      slug: "connection-systems",
      description:
        "Leading providers of high-performance electrical connectors and wiring solutions for automotive and industrial applications.",
      features: [
        "Custom Wiring Harnesses",
        "Automotive Connectors",
        "Precision Molding",
      ],
    },
    {
      title: "Engineering Products Division",
      slug: "engineering-products",
      description:
        "Specialized engineering solutions for complex industrial challenges, focused on durability and performance.",
      features: ["Prototyping", "Material Testing", "Industrial Design"],
    },
    {
      title: "Precision Stamping Manufacturing",
      slug: "precision-stamping",
      description:
        "High-volume precision metal stamping services with micron-level accuracy for diverse global industries.",
      features: ["Metal Stamping", "Die Design", "Surface Finishing"],
    },
    {
      title: "CNH Moulds",
      slug: "cnh-moulds",
      description:
        "Expert mold design and manufacturing for plastic injection molding and die-casting processes.",
      features: ["Injection Molding", "Mold Maintenance", "High-Tech Tooling"],
    },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20"
        >
          <div className="w-20 h-1 bg-[#1e3a8a] mb-8 rounded-full" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] tracking-tight leading-tight mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((division, idx) => (
            <motion.div
              key={division.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-900 transition-colors">
                {division.title}
              </h3>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {division.description}
              </p>
              <div className="mb-10">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">
                  Core Expertise
                </h4>
                <ul className="grid grid-cols-1 gap-3">
                  {division.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-500 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/verticals/${division.slug}`}
                className="inline-flex items-center text-blue-900 font-bold hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
