
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const url = process.env.DATABASE_URL;
  const connection = await mysql.createConnection(url);
  
  try {
    const sectionId = 'sm-commitment-z9x2';
    const newTitle = 'Powering Manufacturing with Sustainable Energy';
    const newDescription = `At Besmak, sustainability is not just an initiative — it is a core principle that drives how we operate, innovate and grow. As a responsible manufacturing organisation, we are committed to reducing our environmental footprint by adopting clean energy solutions, promoting green practices and fostering a culture of environmental responsibility across all our units.\n\nOur approach goes beyond compliance. We actively invest in renewable energy, encourage employee participation in green initiatives and continuously work towards building a future-ready, environmentally conscious manufacturing ecosystem.`;
    
    // Get existing content to preserve images and stats
    const [rows] = await connection.execute('SELECT content FROM page_sections WHERE id = ?', [sectionId]);
    if (rows.length === 0) {
      console.log('Section not found');
      return;
    }
    
    const content = typeof rows[0].content === 'string' ? JSON.parse(rows[0].content) : rows[0].content;
    content.title = newTitle;
    content.description = newDescription;
    
    await connection.execute('UPDATE page_sections SET content = ? WHERE id = ?', [JSON.stringify(content), sectionId]);
    console.log('Successfully updated section', sectionId);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}
run();
