import { query } from "./src/lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function migrateCareerSections() {
  console.log("Migrating career sections to new format...");

  // 1. Update/Create Career Hero
  await query(`
    UPDATE page_sections 
    SET type = 'career-hero', 
        content = JSON_OBJECT('bannerImage', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2850'),
        sortOrder = 1
    WHERE id = 'career-section-1'
  `);

  // 2. Insert Career Intro (New)
  const introExists: any = await query(`SELECT id FROM page_sections WHERE id = 'career-intro-1'`);
  if (introExists.length === 0) {
    await query(`
      INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
      VALUES (
        'career-intro-1',
        'career-page',
        'career-intro',
        JSON_OBJECT(
          'title', 'Careers | Besmak India',
          'line1', 'At Besmak India, we believe our people are our greatest asset and foster a culture of continuous learning.',
          'line2', 'We are constantly looking for passionate individuals who are ready to take on challenges in manufacturing.',
          'line3', 'Whether you are an experienced professional or just starting your career, we offer great growth opportunities.',
          'line4', 'Explore open positions below or submit your resume for future consideration. We''d love to hear from you.'
        ),
        2,
        TRUE
      )
    `);
  }

  // 3. Update Career Form
  await query(`
    UPDATE page_sections 
    SET type = 'career-form', 
        content = JSON_OBJECT('title', 'Apply Now'),
        sortOrder = 3
    WHERE id = 'career-form-section-1'
  `);

  console.log("Migration complete.");
  process.exit(0);
}

migrateCareerSections().catch(err => {
  console.error(err);
  process.exit(1);
});
