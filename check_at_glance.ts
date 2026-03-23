import { query } from './src/lib/db';
async function run() {
  const page = await query("SELECT id FROM pages WHERE slug = 'at-a-glance'");
  console.log('page:', page);
  if (page.length) {
    const sections = await query("SELECT type, content FROM page_sections WHERE pageId = ?", [page[0].id]);
    console.log('sections:', sections);
  }
}
run();
