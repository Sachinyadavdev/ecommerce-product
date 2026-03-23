"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, User, Award, CheckCircle2, X, Briefcase, ChevronRight, ExternalLink } from "lucide-react";
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
        image: "",
        bio: "Visionary leader with decades of experience driving Besmak's strategic growth and setting industry benchmarks in automotive component manufacturing.",
        linkedin: "",
      },
      {
        name: "Rajesh R",
        designation: "Director",
        image: "",
        bio: "Co-founder and Director guiding Besmak's operational and business expansion with deep expertise in precision engineering and customer relations.",
        linkedin: "",
      },
    ],
  },
];

// Get initials from name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Distinct soft accent colors for each category
const categoryAccents = [
  { bg: "from-red-50 to-orange-50", icon: "bg-red-100 text-red-600", border: "border-red-200", badge: "bg-red-50 text-red-600" },
  { bg: "from-blue-50 to-indigo-50", icon: "bg-blue-100 text-blue-600", border: "border-blue-200", badge: "bg-blue-50 text-blue-600" },
  { bg: "from-emerald-50 to-teal-50", icon: "bg-emerald-100 text-emerald-600", border: "border-emerald-200", badge: "bg-emerald-50 text-emerald-600" },
  { bg: "from-amber-50 to-yellow-50", icon: "bg-amber-100 text-amber-600", border: "border-amber-200", badge: "bg-amber-50 text-amber-600" },
  { bg: "from-purple-50 to-violet-50", icon: "bg-purple-100 text-purple-600", border: "border-purple-200", badge: "bg-purple-50 text-purple-600" },
];

export default function CoreTeamMembers({ content }: CoreTeamMembersProps) {
  // Merge flat CMS keys (e.g. member_1_1_image, member_1_2_linkedin) into the
  // default categories so that values saved through the editor are reflected.
  const categories: TeamCategory[] = defaultCategories.map(
    (category, catIdx) => ({
      ...category,
      members: category.members.map((member, memIdx) => {
        const prefix = `member_${catIdx + 1}_${memIdx + 1}`;
        return {
          ...member,
          image:    (content as any)?.[`${prefix}_image`]    ?? member.image,
          linkedin: (content as any)?.[`${prefix}_linkedin`] ?? member.linkedin,
          bio:      (content as any)?.[`${prefix}_bio`]      ?? member.bio,
        };
      }),
    })
  );
  const [selectedMember, setSelectedMember] = useState<(TeamMember & { categoryTitle: string; accent: typeof categoryAccents[0] }) | null>(null);

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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-primary, #e60026) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-slate-50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Categories */}
        <div className="space-y-20">
          {categories.map((category, idx) => {
            const accent = categoryAccents[idx % categoryAccents.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
              >
                {/* Category Label */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl ${accent.icon} flex items-center justify-center shrink-0 shadow-sm`}>
                    {getIcon(category.icon, "w-6 h-6")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{category.title}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{category.members.length} {category.members.length === 1 ? "member" : "members"}</p>
                  </div>
                  <div className="flex-1 h-px bg-slate-100 ml-4 hidden sm:block" />
                </div>

                {/* Member Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {category.members.map((member, mIdx) => (
                    <motion.button
                      key={mIdx}
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.07 * mIdx }}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      onClick={() => setSelectedMember({ ...member, categoryTitle: category.title, accent })}
                      className="group relative text-left bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-primary/20 transition-all duration-300 overflow-hidden cursor-pointer w-full"
                    >
                      {/* Top accent strip */}
                      <div className={`h-1 w-full bg-linear-to-r from-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      <div className="p-6">
                        {/* Avatar row */}
                        <div className="mb-5 flex items-start justify-between gap-2">
                          <div className="relative shrink-0">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-md group-hover:ring-primary/30 transition-all duration-300"
                              />
                            ) : (
                              <div className={`w-16 h-16 rounded-2xl ${accent.icon} flex items-center justify-center text-lg font-bold shadow-sm`}>
                                {getInitials(member.name)}
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`p-1.5 rounded-lg ${accent.icon} opacity-70 hover:opacity-100 transition-all duration-200 hover:scale-110`}
                                title="View LinkedIn Profile"
                              >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            <div className={`p-1.5 rounded-lg ${accent.icon} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-snug mb-1.5">
                          {member.name}
                        </h4>
                        <p className="text-xs font-medium text-slate-400 leading-snug line-clamp-2">
                          {member.designation}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Profile Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Background */}
              <div className={`relative h-36 bg-linear-to-br ${selectedMember.accent.bg} flex items-end pb-0`}>
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/30 blur-xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute top-3 left-5 w-10 h-10 rounded-full bg-white/40 blur-md" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>

              {/* Avatar — overlapping header */}
              <div className="relative flex justify-center">
                <div className="absolute -top-12 flex flex-col items-center">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                    />
                  ) : (
                    <div className={`w-24 h-24 rounded-2xl ${selectedMember.accent.icon} flex items-center justify-center text-2xl font-extrabold shadow-xl ring-4 ring-white`}>
                      {getInitials(selectedMember.name)}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 pb-8 px-7 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${selectedMember.accent.badge}`}>
                    <Briefcase className="w-3 h-3" />
                    {selectedMember.categoryTitle}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-1.5 tracking-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary mb-5">
                    {selectedMember.designation}
                  </p>
                  <div className="w-10 h-0.5 bg-slate-200 mx-auto mb-5 rounded-full" />
                  {selectedMember.bio && (
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {selectedMember.bio}
                    </p>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md ${selectedMember.accent.icon}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      View LinkedIn Profile
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
