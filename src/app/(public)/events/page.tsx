import SectionRenderer from "@/components/sections/SectionRenderer";
import { query } from "@/lib/db";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("events");
}

async function getPageSections() {
  const sections = await query(`
    SELECT ps.* 
    FROM page_sections ps
    JOIN pages p ON ps.pageId = p.id
    WHERE p.slug = 'events' AND ps.isActive = TRUE
    ORDER BY ps.sortOrder ASC
  `);
  return sections;
}
import PageHeader from "@/components/ui/PageHeader";
import LinkedInFeed from "@/components/sections/events/LinkedInFeed";
import EventsList from "@/components/sections/events/EventsList";

export default async function EventsPage() {
  const sections = await getPageSections();
  const hasEventsList = Array.isArray(sections) && sections.some((s: any) => s.type === "events-list");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <PageHeader 
        title="Events & Exhibitions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events" }
        ]}
        backgroundImg="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
      />
      
      <div className="flex-1">
        {Array.isArray(sections) && sections.length > 0 && (
          sections
            .filter((section: any) => section.type !== "events-hero" && section.type !== "events-list")
            .map((section: any) => (
              <SectionRenderer key={section.id} section={section} readonly={true} />
            ))
        )}
        
        {!hasEventsList && (
          <EventsList upcoming={[]} ongoing={[]} past={[]} />
        )}

        {/* Dynamic Events List from DB if exists */}
        {hasEventsList && sections.filter((s: any) => s.type === "events-list").map((section: any) => (
          <SectionRenderer key={section.id} section={section} readonly={true} />
        ))}
        
        {/* Automated LinkedIn Feed */}
        <div className="bg-white">
          <LinkedInFeed />
        </div>
      </div>
    </div>
  );
}
