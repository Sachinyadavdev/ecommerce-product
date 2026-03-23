const { createPool } = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" }); // fallback

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not defined in environment variables.");
    process.exit(1);
  }

  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  const pageId = '7dnzxaec4p2';
  
  console.log(`Resetting sections for page ID ${pageId}...`);
  
  try {
    await pool.execute(`DELETE FROM page_sections WHERE pageId = ?`, [pageId]);
    
    console.log(`Adding sections for page ID ${pageId}...`);
    
    const sections = [
      {
        id: 'partnerships-hero-1',
        type: 'partnerships-hero',
        content: {
          title: "Strong Partnerships. Smarter Automotive Solutions.",
          breadcrumbs: [
            { label: "Home", url: "/" },
            { label: "Discover Us" },
            { label: "Partnerships" }
          ],
          bgImage: "https://images.unsplash.com/photo-1521295121683-b7d7293b0dfb?q=80&w=2000&auto=format&fit=crop"
        },
        sortOrder: 1
      },
      {
        id: 'partnerships-intro-1',
        type: 'partnerships-intro',
        content: {
          tagline: "At Besmak Components Pvt. Ltd., partnerships are at the core of our growth and innovation.",
          description: "Over the years, we have built strong, long-term relationships with leading automotive OEMs, Tier-1 suppliers, and industry partners, enabling us to deliver high-quality, precision-engineered solutions across the automotive ecosystem.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
          stats: [
            { label: "Years of Excellence", value: "35+", icon: "Trophy" },
            { label: "Global Partners", value: "100+", icon: "Globe" },
            { label: "Precision Components", value: "5000+", icon: "Zap" }
          ]
        },
        sortOrder: 2
      },
      {
        id: 'industry-leaders-1',
        type: 'industry-leaders',
        content: {
          title: "Collaborating with Industry Leaders",
          description: "We are proud to partner with globally recognized automotive and technology leaders, supporting their requirements in connectors, terminals, and precision components. Our key customers and partners include organizations such as:",
          partners: [
            { name: "Bosch", iconType: "Cpu" },
            { name: "Aptiv", iconType: "Zap" },
            { name: "Visteon", iconType: "Gauge" },
            { name: "Hella", iconType: "Zap" },
            { name: "Danfoss", iconType: "Settings" },
            { name: "Yazaki", iconType: "Component" },
            { name: "Motherson", iconType: "Layers" },
            { name: "Minda Group", iconType: "Settings" },
            { name: "Fujikura", iconType: "Component" },
            { name: "TI Automotive", iconType: "Car" },
            { name: "WABCO", iconType: "Truck" },
            { name: "Kautex Textron", iconType: "Database" }
          ]
        },
        sortOrder: 3
      },
      {
        id: 'ecosystem-integration-1',
        type: 'ecosystem-integration',
        content: {
          title: "OEM & Tier-1 Ecosystem Integration",
          description: "Besmak plays a vital role in the automotive supply chain by working closely with Tier-1 wiring harness manufacturers and system integrators, who in turn supply major automotive brands.",
          oems: [
            { name: "Tata Motors" },
            { name: "Hyundai" },
            { name: "Honda" },
            { name: "Suzuki" },
            { name: "Mahindra" },
            { name: "Toyota" },
            { name: "Ford" }
          ]
        },
        sortOrder: 4
      },
      {
        id: 'engineering-collaboration-1',
        type: 'engineering-collaboration',
        content: {
          title: "Engineering Collaboration & Co-Development",
          description: "Our partnerships go beyond supply—we actively collaborate with customers from the early stages of product development.",
          points: [
            { title: "Joint product design and development", description: "Collaborating from the early stages of product development to ensure optimal design." },
            { title: "Tooling and prototyping support", description: "Rapid prototyping and specialized tool design for new automotive applications." },
            { title: "Custom solutions for complex automotive applications", description: "Engineering tailor-made components for unique requirements." },
            { title: "Continuous improvement through feedback and innovation", description: "Constantly evolving based on customer feedback and industry trends." }
          ]
        },
        sortOrder: 5
      },
      {
        id: 'global-network-1',
        type: 'global-network',
        content: {
          title: "Global & Domestic Network",
          description: "With a growing footprint across India and expanding global reach, Besmak supports customers across diverse segments and regions.",
          areas: [
            { title: "Two-wheeler and four-wheeler segments", icon: "🚗" },
            { title: "Electric vehicle (EV) applications", icon: "⚡" },
            { title: "Advanced automotive electronics and connectivity systems", icon: "📡" }
          ]
        },
        sortOrder: 6
      },
      {
        id: 'supplier-partnerships-1',
        type: 'supplier-partnerships',
        content: {
          title: "Supplier & Vendor Partnerships",
          description: "We maintain strong relationships with our supplier network to ensure consistent quality and operational excellence.",
          benefits: [
            "High-quality raw materials and components",
            "Advanced coating and finishing technologies",
            "Reliable and efficient supply chain operations"
          ]
        },
        sortOrder: 7
      },
      {
        id: 'industry-engagement-1',
        type: 'industry-engagement',
        content: {
          title: "Industry Associations & Engagement",
          items: [
            { title: "Automotive component ecosystems", icon: "🏢" },
            { title: "Industry exhibitions and technical forums", icon: "🌐" },
            { title: "Technology and innovation networks", icon: "💡" }
          ]
        },
        sortOrder: 8
      }
    ];

    for (const section of sections) {
      await pool.execute(
        `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive) 
         VALUES (?, ?, ?, ?, ?, TRUE)`,
        [section.id, pageId, section.type, JSON.stringify(section.content), section.sortOrder]
      );
    }

    console.log("Successfully inserted partnership sections.");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await pool.end();
  }
}

seed();
