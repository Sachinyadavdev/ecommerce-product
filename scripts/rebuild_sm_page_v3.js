
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    const [pages] = await connection.execute('SELECT id FROM pages WHERE slug = "sustainable-manufacturing"');
    if (pages.length === 0) { console.log('Page not found'); return; }
    const pageId = pages[0].id;

    await connection.execute('DELETE FROM page_sections WHERE pageId = ?', [pageId]);
    console.log('Cleared existing sections');

    const now = new Date();
    const sections = [
      {
        id: 'sm-hero-v3',
        type: 'sustainable-hero',
        sortOrder: 1,
        content: JSON.stringify({
          title: 'Sustainable Manufacturing at Besmak',
          subtitle: 'RENEWABLE · RESPONSIBLE · RESILIENT',
          breadcrumbs: [
            { label: 'Home', url: '/' },
            { label: 'Capabilities' },
            { label: 'Sustainable Manufacturing' },
          ],
          bgImage: '/images/sustainable_manufacturing_hero.png',
        }),
      },
      {
        id: 'sm-commitment-v3',
        type: 'sm-commitment-section',
        sortOrder: 2,
        content: JSON.stringify({
          image1: '/images/sustainability_commitment.png',
          image2: '/images/engineering_infrastructure_premium.png',
        }),
      },
      {
        id: 'sm-clean-energy-v3',
        type: 'clean-energy-section',
        sortOrder: 3,
        content: JSON.stringify({
          image: '/images/sustainable_manufacturing_hero.png',
        }),
      },
      {
        id: 'sm-green-culture-v3',
        type: 'green-culture-section',
        sortOrder: 4,
        content: JSON.stringify({
          image1: '/images/engineering_infrastructure_premium.png',
          image2: '/images/sustainability_commitment.png',
        }),
      },
      {
        id: 'sm-impact-v3',
        type: 'measurable-impact-section',
        sortOrder: 5,
        content: JSON.stringify({}),
      },
      {
        id: 'sm-cta-v3',
        type: 'sm-cta-section',
        sortOrder: 6,
        content: JSON.stringify({}),
      },
    ];

    for (const s of sections) {
      await connection.execute(
        'INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 1, ?, ?)',
        [s.id, pageId, s.type, s.content, s.sortOrder, now, now]
      );
      console.log('Inserted:', s.type);
    }
    console.log('Done! Full page rebuilt.');
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}
run();
