import { query } from "./src/lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

async function checkCareerPage() {
  console.log("Checking for 'career' page in pages table...");
  const pages: any = await query(`SELECT id, title, slug, isActive FROM pages WHERE slug = 'career'`);
  console.log("Pages:", pages);

  if (pages.length > 0) {
    const pageId = pages[0].id;
    console.log(`\nChecking page_sections for pageId = ${pageId}`);
    const sections: any = await query(`SELECT id, type, isActive, sortOrder, content FROM page_sections WHERE pageId = ?`, [pageId]);
    console.log("Sections for career page:");
    sections.forEach((s: any) => {
        console.log(`- ID: ${s.id}, Type: ${s.type}, IsActive: ${s.isActive}, SortOrder: ${s.sortOrder}`);
        console.log(`  Content:`, s.content);
    });
  } else {
    console.log("\nSearching for any 'career' related pages by title/slug:");
    const anyPages: any = await query(`SELECT id, title, slug, isActive FROM pages WHERE slug LIKE '%career%' OR title LIKE '%career%'`);
    console.log("Other career pages:", anyPages);
  }

  console.log("\nSearching for any career sections globally in page_sections:");
  const globalSections: any = await query(`SELECT id, pageId, type, isActive, sortOrder, content FROM page_sections WHERE type LIKE '%career%'`);
  console.log("Global career sections:");
  globalSections.forEach((s: any) => {
        console.log(`- ID: ${s.id}, PageId: ${s.pageId}, Type: ${s.type}, IsActive: ${s.isActive}, SortOrder: ${s.sortOrder}`);
        console.log(`  Content:`, s.content);
  });


  process.exit(0);
}

checkCareerPage().catch(err => {
  console.error(err);
  process.exit(1);
});
