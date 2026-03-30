"use client";

import { motion } from "framer-motion";
import { CheckCircle, Globe, Sprout } from "lucide-react";
import SMResponsibleSection from "./SMResponsibleSection";
import SMWindEnergySection from "./SMWindEnergySection";
import SMCommitmentSection from "./SMCommitmentSection";
import GreenCultureSection from "./GreenCultureSection";
import EditableWrapper from "@/components/cms/EditableWrapper";


interface SMCtaSectionProps {
  content?: {
    s6_subtitle?: string;
    s6_title?: string;
    s6_desc1?: string;
    s6_desc2?: string;
    s8_subtitle?: string;
    s8_title?: string;
    s8_description?: string;
    s8_badgeText?: string;
    wind_title?: string;
    wind_desc?: string;
    wind_impact?: string;
    wind_pledgeTitle?: string;
    wind_pledgeSubtitle?: string;
    wind_img1?: string;
    wind_img2?: string;
    wind_img3?: string;
  };
  sectionId?: string;
  onUpdate?: () => void;
  readonly?: boolean;
}

const pillars = [
  "Improve energy efficiency",
  "Reduce carbon footprint",
  "Enhance operational resilience",
  "Build a sustainable future for the next generation",
];

export default function SMCtaSection({ content, sectionId, onUpdate, readonly = false }: SMCtaSectionProps) {
  const {
    s6_subtitle = "Integrated Approach",
    s6_title = "A Holistic Framework for Sustainability",
    s6_desc1 = "What sets Besmak apart is our integrated approach to sustainability. Rather than treating green initiatives as isolated activities, we embed sustainability into our operational framework.",
    s6_desc2 = "From energy sourcing and infrastructure planning to employee engagement and community initiatives, every aspect of our organisation is aligned with our environmental goals.",
    s8_subtitle = "Join Our Mission",
    s8_title = "Build a Greener Tomorrow, Together",
    s8_description = "Sustainability is a journey that requires collective effort. At Besmak, we are proud of the progress we have made, but we also recognise that there is more to be done.\n\nWe invite our partners, employees and stakeholders to join us in this journey as we continue to grow responsibly and contribute towards a cleaner, greener planet.",
    s8_badgeText = "Join our Green Initiative",
    wind_title = "A Broader Clean Energy Mix",
    wind_desc = "We’re also sourcing clean energy through Power Purchase Agreements with Wind Energy producers.",
    wind_impact = "Less fossil fuel. More forward momentum.",
    wind_pledgeTitle = "Green Today, Greener Tomorrow",
    wind_pledgeSubtitle = "Pledge for the planet",
    wind_img1 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/wind-farm-1.png",
    wind_img2 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/solar-panel-3.png",
    wind_img3 = "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/tree-plantation-2.png"
  } = content || {};

  return (
    <section className="py-0 bg-white relative overflow-hidden">
      {/* Background Decor for Section 6 */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-[#284b8c]/5 blur-[160px] pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#284b8c 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section 6: Integrated Approach */}
        <div className="py-24 border-t border-[#284b8c]/10 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#284b8c]/20 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left Content (Straight) */}
            <div className="relative py-4">
              <div className="flex items-center gap-6 mb-8 group">
                <div className="w-1.5 h-12 bg-[#284b8c] rounded-full group-hover:bg-[#00A758] transition-colors duration-500" />
                <div className="bg-[#284b8c]/5 px-5 py-2 rounded-[10px] border border-[#284b8c]/10 backdrop-blur-sm">
                  <span className="text-[#284b8c] font-black tracking-[0.4em] text-xs uppercase">{s6_subtitle}</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#284b8c] tracking-tighter leading-[1.1] mb-10">
                {s6_title.split('Sustainability')[0]}<span className="text-[#00A758]">Sustainability</span>
              </h2>
              
              <div className="space-y-6 max-w-xl">
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  {s6_desc1}
                </p>
                <p className="text-xl text-slate-600 font-light leading-relaxed">
                  {s6_desc2}
                </p>
              </div>
            </div>
            
            {/* Right 'Editor' Content (The Checklist Card) */}
            <div className="relative group lg:mt-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A758]/10 to-[#284b8c]/10 rounded-[10px] blur-2xl opacity-50 transition-opacity" />
              <div className="relative bg-white/80 backdrop-blur-md p-10 rounded-[10px] border border-slate-100 shadow-xl overflow-hidden">
                <p className="text-[#284b8c] font-black text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-[#00A758]" /> Our Pillars of Excellence
                </p>
                
                <ul className="grid grid-cols-1 gap-6">
                  {pillars.map((p, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#00A758]/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-[#00A758]" />
                      </div>
                      <span className="text-slate-800 font-bold leading-tight">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 6.5: Clean Energy Mix (Wind) - Wrapped in EditableWrapper for intuitive editing */}
      <EditableWrapper
        sectionId={sectionId || ""}
        type="sm-cta-section"
        content={content}
        onUpdate={onUpdate}
        readonly={readonly}
      >
        <SMWindEnergySection 
          content={{
            title: wind_title,
            description: wind_desc,
            impact: wind_impact,
            pledgeTitle: wind_pledgeTitle,
            pledgeSubtitle: wind_pledgeSubtitle,
            image1: wind_img1,
            image2: wind_img2,
            image3: wind_img3
          }} 
        />
      </EditableWrapper>

      {/* Section 7: Driving Responsible Manufacturing */}
      <SMResponsibleSection />

      {/* Re-open Container for Section 8 */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section 8: Join Us Section (Split Layout) */}
        <div className="py-24 border-t border-[#284b8c]/10 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#284b8c]/20 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Content (Straight) */}
            <div className="relative py-4">
              <div className="flex items-center gap-6 mb-8 group">
                <div className="w-1.5 h-12 bg-[#284b8c] rounded-full group-hover:bg-[#00A758] transition-colors duration-500" />
                <div className="bg-[#284b8c]/5 px-5 py-2 rounded-[10px] border border-[#284b8c]/10 backdrop-blur-sm">
                  <span className="text-[#284b8c] font-black tracking-[0.4em] text-xs uppercase">{s8_subtitle}</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#284b8c] tracking-tighter leading-[1.1] mb-10">
                {s8_title.split('Greener')[0]}<span className="text-[#00A758]">Greener</span> tomorrow, together
              </h2>
              
              <div className="space-y-6 max-w-xl">
                {s8_description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-xl text-slate-600 font-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Right 'Editor' Content (The Icon/Visual Card) */}
            <div className="relative lg:mt-0">
              <div className="bg-[#00A758] rounded-[10px] p-16 relative overflow-hidden shadow-2xl group">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A758] to-[#008f4c]" />
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-3xl opacity-50" />
                
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 rounded-[10px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Sprout className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white/80 font-black text-xs uppercase tracking-[0.3em] mb-4 text-center">Our Commitment</p>
                  <p className="text-white text-lg lg:text-3xl font-black text-center leading-[1.6] tracking-tight mx-auto max-w-2xl">
                    Together, we are growing change
                    <br />
                    one step, one initiative and
                    <br />
                    one sapling at a time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
