import SectionRenderer from "@/components/sections/SectionRenderer";
import { query } from "@/lib/db";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/ui/PageHeader";
import LinkedInFeed from "@/components/sections/events/LinkedInFeed";
import EventsList from "@/components/sections/events/EventsList";

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
  return Array.isArray(sections) ? sections : [];
}

export default async function EventsPage() {
  const sections = await getPageSections();
  const hasEventsList = sections.some((s: any) => s.type === "events-list");
  const hasLinkedIn = sections.some((s: any) => s.type === "linkedin-feed");
  const hasPageHeader = sections.some((s: any) => s.type === "page-header" || s.type === "events-hero");

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Default Header if no dynamic header section is found */}
      {!hasPageHeader && (
        <PageHeader 
          title="Events & Exhibitions"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Events" }
          ]}
          backgroundImg="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
        />
      )}
      
      {/* Dynamic Content Sections from Admin CMS */}
      {sections.length > 0 && (
        <div className="flex-1">
          {sections.map((section: any) => (
            <SectionRenderer key={section.id} section={section} readonly={true} />
          ))}
        </div>
      )}

      {/* Fallback to dynamic Events List and LinkedIn Feed if not already added as sections */}
      {sections.length === 0 && (
        <div className="flex-1">
          {!hasEventsList && (
            <EventsList upcoming={[]} ongoing={[]} past={[]} />
          )}
          {!hasLinkedIn && (
            <div className="bg-white">
              <LinkedInFeed />
            </div>
          )}
        </div>
      )}

      {/* If sections were added but certain core parts were missed, we can still show them at the end */}
      {sections.length > 0 && (
        <>
          {!hasEventsList && <EventsList upcoming={[]} ongoing={[]} past={[]} />}
          {!hasLinkedIn && (
            <div className="bg-white">
              <LinkedInFeed />
            </div>
          )}
        </>
      )}
    </div>
  );
}
