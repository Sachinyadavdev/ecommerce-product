import { query } from "./src/lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

async function seedCareerFormSection() {
  console.log("Checking if career-form-section already exists...");
  const sections: any = await query(`SELECT id FROM page_sections WHERE id = 'career-form-section-1'`);
  
  if (sections.length > 0) {
      console.log("Section already exists. Ignoring.");
  } else {
    console.log("Adding career-form-section to career page...");
    await query(`
      INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
      VALUES (
        'career-form-section-1',
        'career-page',
        'career-form-section',
        JSON_OBJECT(),
        2,
        TRUE
      )
    `);
    console.log("Successfully inserted career-form-section.");
  }

  process.exit(0);
}

seedCareerFormSection().catch(err => {
  console.error(err);
  process.exit(1);
});
