const { createPool } = require("mysql2/promise");
require("dotenv").config();

async function redesignMachinery() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not defined in .env");
    process.exit(1);
  }

  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  const pageId = 'f0lc4y5qato'; // Machinery & Equipments Page ID

  console.log(`Starting redesign of page sections for page ID: ${pageId}...`);

  try {
    // 1. Delete existing sections for this page
    await pool.execute('DELETE FROM page_sections WHERE pageId = ?', [pageId]);
    console.log(`Deleted existing sections for ${pageId}`);

    // 2. Define the new modular sections (matching SectionRenderer.tsx types)
    const sections = [
      {
        type: 'machinery-hero',
        sortOrder: 10,
        content: JSON.stringify({
          title: "Machinery & Equipments",
          bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070",
          breadcrumbs: [
            { label: "Home", url: "/" },
            { label: "Manufacturing" },
            { label: "Machinery & Equipments" }
          ]
        })
      },
      {
        type: 'machinery-capacity',
        sortOrder: 20,
        content: JSON.stringify({
          title: "Manufacturing Footprint",
          subtitle: "Global Operations",
          expansionNote: "Additional plant setup is currently in progress to expand operations",
          sanandCapacity: "20,000 sq. ft.",
          chennaiCapacity: "40,000 sq. ft."
        })
      },
      {
        type: 'machinery-injection',
        sortOrder: 30,
        content: JSON.stringify({
          microTitle: "High Speed Micro Injection Moulding",
          microDescription: "Implemented in 2025–26, our all-electric systems provide extreme precision for miniature connector parts.",
          lsrTitle: "LSR (Liquid Silicone Rubber) Moulding",
          lsrDescription: "Advanced male & female connector components with self-lubricating properties and 0.3mm thin-wall capability."
        })
      },
      {
        type: 'machinery-stamping',
        sortOrder: 40,
        content: JSON.stringify({
          title: "Technology Enhancement in Stamping",
          subtitle: "Engineering Core",
          line1Title: "High Tonnage Stamping Line",
          line1Specs: "25T – 160T",
          line2Title: "High-Speed Stamping Press",
          line2Specs: "Up to 2,000 SPM"
        })
      },
      {
        type: 'machinery-plating',
        sortOrder: 50,
        content: JSON.stringify({
          title: "Technology Enhancement in Plating (50,000 sq. ft.)",
          subtitle: "Automation Scale",
          summaryStatement: "This setup ensures Besmak delivers high precision, consistency, and scalable manufacturing across injection moulding, stamping, and plating operations."
        })
      }
    ];

    // 3. Insert new sections
    for (const section of sections) {
      const id = 'sec_' + Math.random().toString(36).substring(2, 10);
      await pool.execute(
        'INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, 1)',
        [id, pageId, section.type, section.content, section.sortOrder]
      );
      console.log(`Created section: ${section.type}`);
    }

    console.log("Machinery page redesign seeding complete!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
}

redesignMachinery();
