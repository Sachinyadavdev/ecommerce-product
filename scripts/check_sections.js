
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL not found in .env');
    return;
  }
  const connection = await mysql.createConnection(url);
  
  try {
    const [pages] = await connection.execute('SELECT id FROM pages WHERE slug = "sustainable-manufacturing"');
    if (pages.length === 0) {
      console.log('Page not found');
      return;
    }
    const pageId = pages[0].id;
    const [sections] = await connection.execute('SELECT id, type, content FROM page_sections WHERE pageId = ? ORDER BY sortOrder', [pageId]);
    console.log(JSON.stringify(sections, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}
run();
