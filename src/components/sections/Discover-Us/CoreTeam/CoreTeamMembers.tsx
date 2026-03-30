"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, User, Award, CheckCircle2, X, Briefcase, ChevronRight, ExternalLink, Linkedin, ArrowRight } from "lucide-react";
import React, { useState } from "react";

interface TeamMember {
  name: string;
  designation: string;
  image?: string;
  bio?: string;
  linkedin?: string;
}

interface TeamCategory {
  title: string;
  icon: string;
  members: TeamMember[];
}

interface CoreTeamMembersProps {
  content?: {
    title?: string;
    subtitle?: string;
    categories?: TeamCategory[];
  };
}

const defaultCategories: TeamCategory[] = [
  {
    title: "Leadership",
    icon: "award",
    members: [
      {
        name: "Hema Hari",
        designation: "Managing Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        bio: "Visionary leader with decades of experience driving Besmak's strategic growth and setting industry benchmarks in automotive component manufacturing. Under her guidance, Besmak has expanded its global footprint while maintaining a core focus on precision engineering and sustainable manufacturing practices.",
        linkedin: "https://linkedin.com",
      },
      {
        name: "Rajesh R",
        designation: "Director",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        bio: "Co-founder and Director guiding Besmak's operational and business expansion with deep expertise in precision engineering and customer relations. Rajesh's strategic insight into market trends and commitment to technological innovation has been pivotal in Besmak's journey toward excellence.",
        linkedin: "https://linkedin.com",
      },
    ],
  },
  {
    title: "Senior Management",
    icon: "users",
    members: [
      { name: "BRM Rao", designation: "Chief Operating Officer", bio: "Driving operational excellence across all manufacturing plants." },
      { name: "Senthilnath P K", designation: "VP – Technical", bio: "Leading technical innovation and product development strategies." },
      { name: "Kannan M", designation: "Quality DGM", bio: "Ensuring world-class quality standards and compliance." },
      { name: "Vinod Kumar", designation: "HR & Admin HOD", bio: "Nurturing talent and building a high-performance culture." },
    ],
  },
  {
    title: "Functional Heads",
    icon: "settings",
    members: [
      { name: "Singaravelu", designation: "Finance Head" },
      { name: "Ramprasath", designation: "ED Divisional Head" },
      { name: "Rama Kuladeep", designation: "CS Divisional Head" },
      { name: "Sudeep", designation: "Stamping Divisional Head" },
    ],
  },
  {
    title: "Operations",
    icon: "layers",
    members: [
      { name: "Durairaj", designation: "Accounts" },
      { name: "Ravindran K", designation: "IT & Digitalization" },
      { name: "Sivakumar R", designation: "Purchase / Stores HOD" },
      { name: "Navaneetha Krishnan", designation: "Production / PPC / Maintenance HOD" },
    ],
  },
  {
    title: "Technical",
    icon: "tool",
    members: [
      { name: "Aba Samuel", designation: "Technical Expert (Connector)" },
      { name: "Rangarajan S", designation: "E & D Product Design HOD" },
      { name: "Ranjith Kumar", designation: "PMG Sr. Manager" },
      { name: "Suresh", designation: "Tool Room GM" },
    ],
  },
];

// Get initials from name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const categoryAccents = [
  { bg: "from-slate-50 to-white", icon: "bg-primary/10 text-primary", border: "border-slate-100", badge: "bg-primary/5 text-primary" },
  { bg: "from-blue-50 to-white", icon: "bg-blue-100 text-blue-600", border: "border-blue-100", badge: "bg-blue-50 text-blue-600" },
  { bg: "from-emerald-50 to-white", icon: "bg-emerald-100 text-emerald-600", border: "border-emerald-100", badge: "bg-emerald-50 text-emerald-600" },
  { bg: "from-amber-50 to-white", icon: "bg-amber-100 text-amber-600", border: "border-amber-100", badge: "bg-amber-50 text-amber-600" },
];

export default function CoreTeamMembers({ content }: CoreTeamMembersProps) {
  // Merge flat CMS keys into categories.
  const categories: TeamCategory[] = defaultCategories.map((category, catIdx) => {
    const catNum = catIdx + 1;
    const mergedMembers: TeamMember[] = [];

    category.members.forEach((defaultMember, memIdx) => {
      const prefix = `member_${catNum}_${memIdx + 1}`;
      mergedMembers.push({
        ...defaultMember,
        name:        (content as any)?.[`${prefix}_name`]        ?? defaultMember.name,
        designation: (content as any)?.[`${prefix}_designation`] ?? defaultMember.designation,
        image:       (content as any)?.[`${prefix}_image`]       ?? defaultMember.image,
        linkedin:    (content as any)?.[`${prefix}_linkedin`]    ?? defaultMember.linkedin,
        bio:         (content as any)?.[`${prefix}_bio`]         ?? defaultMember.bio,
      });
    });

    let extraIdx = category.members.length + 1;
    while ((content as any)?.[`member_${catNum}_${extraIdx}_name`] || (content as any)?.[`member_${catNum}_${extraIdx}_image` ] || (content as any)?.[`member_${catNum}_${extraIdx}_designation` ]) {
      const prefix = `member_${catNum}_${extraIdx}`;
      mergedMembers.push({
        name:        (content as any)?.[`${prefix}_name`]        ?? "New Member",
        designation: (content as any)?.[`${prefix}_designation`] ?? "Position",
        image:       (content as any)?.[`${prefix}_image`]       ?? "",
        linkedin:    (content as any)?.[`${prefix}_linkedin`]    ?? "",
        bio:         (content as any)?.[`${prefix}_bio`]         ?? "",
      });
      extraIdx++;
    }

    return { ...category, members: mergedMembers };
  }).filter((category, catIdx) => {
    const catNum = catIdx + 1;
    return !(content as any)?.[`category_${catNum}_hide` ];
  });

  const [selectedMember, setSelectedMember] = useState<(TeamMember & { categoryTitle: string; accent: typeof categoryAccents[0] }) | null>(null);

  const leadershipCategory = categories.find(c => c.title === "Leadership");
  const otherCategories = categories.filter(c => c.title !== "Leadership");

  const getIcon = (iconName: string, className?: string) => {
    switch (iconName) {
      case "award": return <Award className={className} />;
      case "users": return <Users className={className} />;
      case "settings": return <CheckCircle2 className={className} />;
      case "layers": return <Users className={className} />;
      case "tool": return <User className={className} />;
      default: return <User className={className} />;
    }
  };

  return (
    <section className="pt-10 md:pt-16 pb-2 md:pb-4 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-slate-200 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10 space-y-16 md:space-y-24">
        
        {/* Leadership Section - TCS Style High Impact */}
        {leadershipCategory && (
          <div>
            <div className="flex items-center gap-4 mb-16 px-4 md:px-0">
              <span className="h-px bg-slate-200 flex-1" />
              <h2 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">Strategic Leadership</h2>
              <span className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="space-y-32">
              {leadershipCategory.members.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" as const }}
                  className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
                >
                  {/* Image Side */}
                  <div className="w-full md:w-1/2 aspect-4/5 md:aspect-square relative group overflow-hidden rounded-2xl md:rounded-4xl">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-4xl font-light text-slate-300">
                        {getInitials(member.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-2">
                       <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-slate-400 uppercase">
                        {member.designation}
                      </p>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {member.name}
                      </h3>
                    </div>
                    
                    <div className="w-16 h-1 bg-primary" />
                    
                    <p className="text-lg text-slate-600 leading-relaxed font-light max-w-xl">
                      {member.bio}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-6">
                      <button 
                        onClick={() => setSelectedMember({ ...member, categoryTitle: "Leadership", accent: categoryAccents[0] })}
                        className="group flex items-center gap-3 text-sm font-bold text-slate-900 hover:text-primary transition-colors duration-300"
                      >
                        READ MORE ABOUT {member.name.split(' ')[0].toUpperCase()}
                        <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </button>

                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all duration-300"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Categories - Refined Grid */}
        <div className="space-y-16 md:space-y-24">
          {otherCategories.map((category, idx) => {
            const accent = categoryAccents[(idx + 1) % categoryAccents.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-6 mb-12">
                  <div className={`w-14 h-14 rounded-2xl ${accent.icon} flex items-center justify-center shadow-xs`}>
                    {getIcon(category.icon, "w-7 h-7")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{category.title}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1 uppercase tracking-widest">{category.members.length} MEMBERS</p>
                  </div>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.members.map((member, mIdx) => (
                    <motion.div
                      key={mIdx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: mIdx * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-3xl border border-slate-100 p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-transparent transition-all duration-500 cursor-pointer"
                      onClick={() => setSelectedMember({ ...member, categoryTitle: category.title, accent })}
                    >
                      <div className="space-y-6">
                        {/* Avatar */}
                        <div className="relative inline-block">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-20 h-20 rounded-4xl object-cover ring-4 ring-slate-50 transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className={`w-20 h-20 rounded-4xl ${accent.icon} flex items-center justify-center text-xl font-bold shadow-xs transition-transform duration-500 group-hover:scale-110`}>
                              {getInitials(member.name)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary border-4 border-white" />
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                          <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors duration-300 tracking-tight leading-tight">
                            {member.name}
                          </h4>
                          <p className="text-sm font-bold text-slate-400 leading-snug uppercase tracking-wider">
                            {member.designation}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                          VIEW PROFILE <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Profile Detail Modal - Premium Style */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto bg-slate-50 relative">
                {selectedMember.image ? (
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${selectedMember.accent.icon} flex items-center justify-center text-4xl font-bold`}>
                    {getInitials(selectedMember.name)}
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 relative flex flex-col justify-center">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                      {selectedMember.categoryTitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                      {selectedMember.name}
                    </h3>
                    <p className="text-base font-bold text-slate-400 uppercase tracking-wide">
                      {selectedMember.designation}
                    </p>
                  </div>

                  <div className="w-12 h-1 bg-slate-100 rounded-full" />

                  {selectedMember.bio && (
                    <p className="text-slate-500 leading-relaxed font-light text-lg">
                      {selectedMember.bio}
                    </p>
                  )}

                  <div className="pt-4 flex items-center gap-4">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect on LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
