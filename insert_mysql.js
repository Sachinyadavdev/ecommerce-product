require('dotenv').config();
const { query } = require('./src/lib/db');

async function run() {
  try {
    const p = await query("SELECT id FROM pages WHERE slug = 'engineering-products'");
    if (p.length === 0) {
      console.log('Page not found');
      return;
    }
    const pageId = p[0].id;
    
    const cap = await query("SELECT id, sortOrder FROM page_sections WHERE pageId = ? AND type = 'ep-capabilities'", [pageId]);
    if (cap.length === 0) {
      console.log('Capabilities section not found');
      return;
    }
    
    const sortOrder = cap[0].sortOrder;
    
    await query("UPDATE page_sections SET sortOrder = sortOrder + 1 WHERE pageId = ? AND sortOrder > ?", [pageId, sortOrder]);
    
    await query(`
      INSERT INTO page_sections (id, pageId, type, sortOrder, isActive, content, createdAt, updatedAt) 
      VALUES (UUID(), ?, 'ep-image-carousel', ?, 1, '{}', NOW(), NOW())
    `, [pageId, sortOrder + 1]);
    
    console.log('Successfully inserted ep-image-carousel section via mysql2');
  } catch(err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

run();
