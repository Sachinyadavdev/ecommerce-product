"use client";

import { motion } from "framer-motion";
import { Users, Award, Briefcase, TrendingUp, Settings } from "lucide-react";

interface TeamRole {
  title: string;
  description: string;
  icon: string;
}

interface StampingTeamProps {
  content?: {
    title?: string;
    achievement?: string;
    backgroundImage?: string;

    // Flat mapping for 4 roles
    role1Title?: string;
    role1Desc?: string;
    role1Icon?: string;

    role2Title?: string;
    role2Desc?: string;
    role2Icon?: string;

    role3Title?: string;
    role3Desc?: string;
    role3Icon?: string;

    role4Title?: string;
    role4Desc?: string;
    role4Icon?: string;

    // Old Array Fallback
    roles?: TeamRole[];
  };
}

const defaultRoles: TeamRole[] = [
  {
    title: "Design & Engineering",
    description:
      "Responsible for developing high-precision tools and process optimization.",
    icon: "Briefcase",
  },
  {
    title: "Operations",
    description:
      "The backbone ensuring seamless production and high-efficiency output.",
    icon: "Settings",
  },
  {
    title: "Sales",
    description: "Focused on client relationships and market demands.",
    icon: "TrendingUp",
  },
  {
    title: "Quality Control",
    description:
      "Committed to upholding the highest standards before reaching customers.",
    icon: "Award",
  },
];

const iconMap: Record<string, any> = {
  Users,
  Award,
  Briefcase,
  TrendingUp,
  Settings,
};

export default function StampingTeam({ content }: StampingTeamProps) {
  // Map flat CMS fields
  const cmsRoles: TeamRole[] = [
    {
      title: content?.role1Title || defaultRoles[0].title,
      description: content?.role1Desc || defaultRoles[0].description,
      icon: content?.role1Icon || defaultRoles[0].icon,
    },
    {
      title: content?.role2Title || defaultRoles[1].title,
      description: content?.role2Desc || defaultRoles[1].description,
      icon: content?.role2Icon || defaultRoles[1].icon,
    },
    {
      title: content?.role3Title || defaultRoles[2].title,
      description: content?.role3Desc || defaultRoles[2].description,
      icon: content?.role3Icon || defaultRoles[2].icon,
    },
    {
      title: content?.role4Title || defaultRoles[3].title,
      description: content?.role4Desc || defaultRoles[3].description,
      icon: content?.role4Icon || defaultRoles[3].icon,
    },
  ];

  const hasCmsData = !!(content?.role1Title || content?.role2Title);

  const {
    title = "Our Team Strength",
    achievement = "Parts accuracy tolerance of 0.02mm – A mark of our expertise.",
    backgroundImage = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
  } = content || {};

  const displayRoles = hasCmsData ? cmsRoles : content?.roles || defaultRoles;

  const achievementMain = achievement.split(" – ")[0] || achievement;
  const achievementSub = achievement.includes(" – ")
    ? achievement.split(" – ")[1]
    : "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const as any },
    },
  };

  return (
    <section
      className="py-10 md:py-16 text-white site-content relative overflow-hidden bg-slate-950 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-slate-950/10 backdrop-blur-[1px] z-0" />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary-rgb),0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,transparent,black_50%,transparent)] pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column: Stat Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[45%] xl:w-1/2 relative"
          >
            <div className="bg-[#3D5C97]/20 backdrop-blur-3xl p-10 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] border border-[#3D5C97]/30 relative overflow-hidden text-center shadow-[0_0_80px_-15px_rgba(0,0,0,0.5)] group hover:border-[#3D5C97]/50 transition-colors duration-500">
              {/* Inner Glow Array */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#3D5C97]/50 to-transparent opacity-50" />
              <div className="absolute bottom-0 inset-x-0 h-1 bg-linear-to-r from-[#3D5C97]/0 via-[#3D5C97]/20 to-[#3D5C97]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3D5C97]/30 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <Users
                  size={56}
                  className="mx-auto mb-10 text-[#3D5C97] opacity-90 group-hover:scale-110 transition-transform duration-500"
                  strokeWidth={1.5}
                />

                <h3 className="text-xl md:text-2xl font-bold text-slate-100 tracking-widest uppercase mb-4">
                  Strength of
                </h3>

                <div className="text-7xl md:text-8xl lg:text-[100px] leading-none font-black mb-8 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  100+
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Professionals
                </h3>
              </div>
            </div>

            {/* Achievement Badge (Moved outside of overflow-hidden container to prevent clipping) */}
            <div className="mt-8 lg:mt-0 lg:absolute lg:-bottom-8 lg:left-1/2 lg:-translate-x-1/2 z-20 flex justify-center w-full">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white text-slate-900 px-6 py-4 md:px-8 md:py-5 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] font-bold flex flex-col md:flex-row items-center gap-3 md:gap-4 md:whitespace-nowrap border border-slate-100 mx-auto w-fit"
              >
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <Award size={24} />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-lg md:text-xl tracking-tight">
                    {achievementMain}
                  </div>
                  {achievementSub && (
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                      {achievementSub}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Roles Grid */}
          <div className="w-full lg:w-[55%] xl:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-12 tracking-tight leading-tight"
            >
              {title}
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {displayRoles.map((role, idx) => {
                const Icon = iconMap[role.icon] || Briefcase;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{
                      y: -6,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    className="p-8 rounded-4xl bg-[#3D5C97]/20 backdrop-blur-3xl border border-[#3D5C97]/30 hover:border-[#3D5C97]/50 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0">
                      {/* <Icon size={120} /> */}
                    </div>

                    <div className="w-14 h-14 bg-[#3D5C97]/40 border border-[#3D5C97]/50 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-[#3D5C97] group-hover:text-white transition-colors duration-300 relative z-10 shrink-0">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>

                    <div className="relative z-10 mt-auto">
                      <h4 className="font-bold text-2xl text-white mb-3 tracking-tight group-hover:text-blue-200 transition-colors">
                        {role.title}
                      </h4>
                      <p className="text-slate-200 font-light text-sm md:text-base leading-relaxed group-hover:text-slate-100 transition-colors">
                        {role.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
