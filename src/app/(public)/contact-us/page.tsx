import SectionRenderer from "@/components/sections/SectionRenderer";
import { query } from "@/lib/db";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactAddress from "@/components/sections/contact/ContactAddress";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactForm from "@/components/sections/contact/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact-us");
}

async function getPageSections() {
  const sections = await query(`
    SELECT ps.* 
    FROM page_sections ps
    JOIN pages p ON ps.pageId = p.id
    WHERE p.slug = 'contact-us' AND ps.isActive = TRUE
    ORDER BY ps.sortOrder ASC
  `);
  return sections;
}

export default async function ContactPage() {
  const sections = await getPageSections();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Besmak India",
    image: "https://besmak.com/logo.png",
    url: "https://besmak.com",
    telephone: "+91-44-24501234",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Besmak India Manufacturing Plant",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  return (
    <>
      <ContactHero content={{}} />
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactAddress />
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <div className="flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {sections.length > 0 ? (
          sections.map((section: any) => (
            <SectionRenderer key={section.id} section={section} />
          ))
        ) : (
          // Fallback or empty state if no sections in DB yet
          <div className="py-20 text-center text-slate-400">
            No content found for this page.
          </div>
        )}
      </div>
    </>
  );
}
