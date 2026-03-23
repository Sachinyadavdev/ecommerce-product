import SectionRenderer from "@/components/sections/SectionRenderer";
import { query } from "@/lib/db";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("divisions");
}

async function getPageSections() {
  const sections = await query(`
    SELECT ps.* 
    FROM page_sections ps
    JOIN pages p ON ps.pageId = p.id
    WHERE p.slug = 'divisions' AND ps.isActive = TRUE
    ORDER BY ps.sortOrder ASC
  `);
  return sections;
}

export default async function DivisionsPage() {
  const sections = await getPageSections();

  return (
    <div className="flex flex-col min-h-screen">
      {sections.length > 0 ? (
        sections.map((section: any) => (
          <SectionRenderer key={section.id} section={section} />
        ))
      ) : (
        <div className="py-20 text-center text-slate-400">
          No content found for this page.
        </div>
      )}
    </div>
  );
}
