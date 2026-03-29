"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

interface FooterProps {
  settings?: Record<string, string>;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const verticals = settings?.footer_verticals
    ? JSON.parse(settings.footer_verticals)
    : [
        { title: "Connection Systems", href: "/verticals/connection-systems" },
        {
          title: "Engineering Products",
          href: "/verticals/engineering-products",
        },
        { title: "Precision Stamping", href: "/verticals/precision-stamping" },
        { title: "CNH Moulds", href: "/verticals/cnh-moulds" },
      ];

  const products = settings?.footer_products
    ? JSON.parse(settings.footer_products)
    : [
        { title: "Connectors", href: "/products/connectors" },
        { title: "Fuse Box", href: "/products/fuse-box" },
        { title: "Terminals", href: "/products/terminals" },
        { title: "Relay", href: "/products/relay" },
        { title: "Dummy Plugs", href: "/products/dummy-plugs" },
        { title: "Cable TUF", href: "/products/cable-tuf" },
        { title: "Cover", href: "/products/cover" },
        { title: "Clips", href: "/products/clips" },
      ];

  const legal = settings?.footer_legal
    ? JSON.parse(settings.footer_legal)
    : [
        { title: "Terms of Service", href: "/terms" },
        { title: "Privacy Policy", href: "/privacy" },
      ];

  const socials = settings?.footer_socials
    ? JSON.parse(settings.footer_socials)
    : [
        { platform: "linkedin", url: "https://linkedin.com" },
        { platform: "youtube", url: "https://youtube.com" },
      ];

  const fontFamily = settings?.footer_font_family
    ? `'${settings.footer_font_family}', sans-serif`
    : "var(--font-body)";

  const bgColor = settings?.footer_bg_color || "#284b8c";
  const headingSize = settings?.footer_heading_size
    ? `${settings.footer_heading_size}px`
    : "12px";

  const contactAddress =
    settings?.footer_contact_address ||
    "Besmak Components Private Limited, Plot No. A-45, SIPCOT Industrial Growth Centre, Oragadam, Kanchipuram – 602118, Tamil Nadu, India.";
  const contactPhone = settings?.footer_contact_phone || "+91 44 6712 3333";
  const contactEmail =
    settings?.footer_contact_email || "sales@besmakindia.com";

  const headingVerticals = settings?.footer_heading_verticals || "Verticals";
  const headingProducts = settings?.footer_heading_products || "Products";
  const headingLegal = settings?.footer_heading_legal || "Legal Information";
  const headingContact = settings?.footer_heading_contact || "Contact";

  const getSocialIcon = (platform: string) => {
    const iconClass = "w-4 h-4";
    switch (platform) {
      case "linkedin":
        return <Linkedin className={iconClass} />;
      case "youtube":
        return <Youtube className={iconClass} />;
      case "facebook":
        return <Facebook className={iconClass} />;
      case "twitter":
        return <Twitter className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <footer
      style={{ fontFamily }}
      className="text-white/90 pt-24 md:pt-32 pb-8 overflow-hidden relative"
    >
      {/* Dynamic Shifting Gradient Background */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br bg-[length:200%_200%] animate-gradient-shift"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${bgColor}, #1e3a7a, ${bgColor})`,
        }}
      />

      {/* Floating Glowing Orbs (WOW Elements) */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] animate-float-medium" />
        <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)] animate-float-fast" />
      </div> */}

      {/* Premium High-Tech Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12] animate-bg-drift"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Breathing Central Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] animate-glow-breathe" />

      {/* Single Animated Top Wave */}
      <div className="absolute top-0 left-0 w-full leading-[0] z-10 pointer-events-none">
        <svg
          className="relative block w-full h-[20px] md:h-[35px] rotate-180"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="#fcfdfe"
              className="animate-wave"
            />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .parallax > use {
          animation: move-forever 20s cubic-bezier(0.55, 0.5, 0.45, 0.5)
            infinite;
        }
        .animate-gradient-shift {
          animation: gradientShift 15s ease infinite;
        }
        .animate-bg-drift {
          animation: drift 100s linear infinite;
        }
        .animate-glow-breathe {
          animation: breathe 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 25s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float 18s ease-in-out infinite reverse;
          animation-delay: -5s;
        }
        .animate-float-fast {
          animation: float 12s ease-in-out infinite;
          animation-delay: -2s;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes drift {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 400px 400px;
          }
        }
        @keyframes breathe {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(50px, -30px);
          }
          66% {
            transform: translate(-30px, 40px);
          }
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>

      <div className="px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Brand & Socials */}
          <div className="lg:col-span-4 space-y-4 flex flex-col items-center text-center">
            <Link
              href="/"
              className="inline-block bg-white p-1.5 rounded shadow-sm"
            >
              <Image
                src={settings?.logo_url || "/images/Besmak-Logo.png"}
                alt="Besmak Logo"
                width={140}
                height={40}
                className="h-auto"
              />
            </Link>
            <p className="text-white/80 text-sm max-w-xs leading-relaxed">
              Precision engineering and connection systems for global automotive
              and industrial sectors.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {socials.map((social: any, idx: number) => {
                const IconComponent = getSocialIcon(social.platform);

                // Hide the icon if the URL is not provided, empty, or a placeholder '#'
                if (
                  !IconComponent ||
                  !social.url ||
                  social.url.trim() === "" ||
                  social.url === "#"
                ) {
                  return null;
                }

                return (
                  <motion.a
                    key={social.platform || idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#183a8b] transition-all"
                    aria-label={social.platform}
                  >
                    {IconComponent}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Vertical Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              className="text-white font-bold uppercase tracking-wider opacity-60"
              style={{ fontSize: headingSize }}
            >
              {headingVerticals}
            </h4>
            <ul className="space-y-2 text-[15px] text-white/80">
              {verticals.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white/70 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              className="text-white font-bold uppercase tracking-wider opacity-60"
              style={{ fontSize: headingSize }}
            >
              {headingProducts}
            </h4>
            <ul className="space-y-2 text-[15px] text-white/80">
              {products.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white/70 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-3">
            <h4
              className="text-white font-bold uppercase tracking-wider opacity-60"
              style={{ fontSize: headingSize }}
            >
              {headingContact}
            </h4>
            <div className="space-y-4 text-[15px] text-white/80">
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-white/70 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Besmak Components Private Limited,
                  <br />
                  Plot No. A-45, SIPCOT Industrial Growth Centre,
                  <br />
                  Oragadam, <br />
                  Kanchipuram – 602118,
                  <br />
                  Tamil Nadu,
                  <br />
                  India.
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-white/70" />
                  <span>{contactPhone}</span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/70" />
                  <span>{contactEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] opacity-70">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <p>© {currentYear} Besmak India Pvt. Ltd.</p>
            <div className="flex gap-4">
              <h4 className="hidden" style={{ fontSize: headingSize }}>
                {headingLegal}
              </h4>
              {legal.map((link: any, idx: number) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="hover:text-white transition-colors underline underline-offset-2"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted by</span>
            <Link
              href="https://imaginetventures.com"
              target="_blank"
              className="font-semibold hover:text-white transition-colors"
            >
              Sachin Yadav
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
