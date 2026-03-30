
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  try {
    // Get page id
    const [pages] = await connection.execute('SELECT id FROM pages WHERE slug = "sustainable-manufacturing"');
    if (pages.length === 0) { console.log('Page not found'); return; }
    const pageId = pages[0].id;

    // Clear all existing sections for this page
    await connection.execute('DELETE FROM page_sections WHERE pageId = ?', [pageId]);
    console.log('Cleared existing sections');

    const now = new Date();
    const sections = [
      {
        id: 'sm-hero-v2',
        type: 'sustainable-hero',
        sortOrder: 1,
        content: JSON.stringify({
          title: 'Sustainable Manufacturing',
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
        id: 'sm-commitment-v2',
        type: 'green-energy-commitment',
        sortOrder: 2,
        content: JSON.stringify({
          title: 'Powering Manufacturing with Sustainable Energy',
          tagline: 'ESG & Social Responsibility',
          description: 'At Besmak, sustainability is not just an initiative — it is a core principle that drives how we operate, innovate and grow. As a responsible manufacturing organisation, we are committed to reducing our environmental footprint by adopting clean energy solutions, promoting green practices and fostering a culture of environmental responsibility across all our units.\n\nOur approach goes beyond compliance. We actively invest in renewable energy, encourage employee participation in green initiatives and continuously work towards building a future-ready, environmentally conscious manufacturing ecosystem.',
          mainImage: '/images/sustainability_commitment.png',
          secondaryImage: '/images/engineering_infrastructure_premium.png',
        }),
      },
      {
        id: 'sm-solar-v2',
        type: 'solar-energy-section',
        sortOrder: 3,
        content: JSON.stringify({
          title: 'Solar Power at Our Manufacturing Units',
          description: 'Besmak has installed a 500 KW solar power plant across its manufacturing facilities. This initiative is a significant step towards reducing dependency on conventional energy and lowering carbon emissions in our operations. Solar energy now powers a substantial portion of our daily manufacturing energy requirements.',
          image: '/images/sustainable_manufacturing_hero.png',
        }),
      },
      {
        id: 'sm-plantation-v2',
        type: 'tree-plantation-section',
        sortOrder: 4,
        content: JSON.stringify({
          title: 'Tree Plantation Drive',
          description: 'As part of our commitment to environmental responsibility, Besmak actively organises tree plantation drives across its facilities and surrounding communities. Our team members — from all levels — participate in planting saplings to contribute to a greener ecosystem, reduce our carbon footprint, and inspire a culture of environmental stewardship within the organisation.',
          image1: '/images/sustainability_commitment.png',
          image2: '/images/engineering_infrastructure_premium.png',
        }),
      },
      {
        id: 'sm-initiatives-v2',
        type: 'green-initiatives-section',
        sortOrder: 5,
        content: JSON.stringify({
          title: 'Our Environmental Initiatives',
          description: 'Besmak is committed to a comprehensive approach to sustainability — integrating environmental responsibility into every aspect of our operations.',
        }),
      },
    ];

    for (const s of sections) {
      await connection.execute(
        'INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 1, ?, ?)',
        [s.id, pageId, s.type, s.content, s.sortOrder, now, now]
      );
      console.log('Inserted section:', s.type);
    }

    console.log('Done! All sections updated.');
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}
run();
