import { query } from "./src/lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" }); // fallback

async function seedCoreTeamSections() {
  console.log("Resetting core-team-page-id sections...");
  await query(`DELETE FROM page_sections WHERE pageId = 'core-team-page-id'`);
  
  console.log("Adding sections to core-team-page-id...");
  
  // 1. Core Team Hero (New Simple Blue Hero)
  await query(`
    INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
    VALUES (
      'core-team-hero-1',
      'core-team-page-id',
      'core-team-hero',
      JSON_OBJECT(
        'title', 'Core Team',
        'description', 'Meet the experts driving our engineering excellence and manufacturing innovation.'
      ),
      1,
      TRUE
    )
  `);

  // 2. Core Team Overview (The complex animated section, formerly the Hero)
  await query(`
    INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
    VALUES (
      'core-team-overview-1',
      'core-team-page-id',
      'core-team-overview',
      JSON_OBJECT(
        'tagline', 'Our Core Team',
        'title', 'The Minds Behind Our Engineering Excellence',
        'description', 'At Besmak Components Pvt. Ltd., our strength lies in the expertise, vision, and dedication of our core team. Built on a foundation of technocrats and industry professionals, our leadership brings together decades of experience in automotive component manufacturing, tool design, and precision engineering.\\n\\nFrom strategy to execution, our team plays a critical role in driving innovation, ensuring operational excellence, and delivering consistent value to our customers.',
        'section1Title', 'Leadership with Vision and Experience',
        'section1Desc', 'Founded by industry experts with deep knowledge in injection mould design and manufacturing, Besmak has grown under strong leadership that emphasizes customer relationships, technical excellence, and long-term growth.\\n\\nOur leaders continue to guide the organization with a forward-thinking approach, adapting to evolving automotive trends including electric vehicle components and advanced connectivity solutions.',
        'section2Title', 'Committed to Quality and Customer Success',
        'section2Desc', 'Driven by a shared commitment to quality, our leadership ensures that every project is executed with precision—from concept to delivery.\\n\\nBy working closely with customers and partners, the core team ensures seamless project execution, reliable supply, and solutions tailored to evolving industry needs.'
      ),
      2,
      TRUE
    )
  `);

  // 3. Core Team Members
  const membersContent = {
    title: "Meet Our Core Team",
    categories: [
      {
        title: "Leadership",
        icon: "award",
        members: [
          { name: "Hema Hari", designation: "Managing Director" },
          { name: "Rajesh R", designation: "Director" },
        ],
      },
      {
        title: "Senior Management",
        icon: "users",
        members: [
          { name: "BRM Rao", designation: "Chief Operating Officer (COO)" },
          { name: "Senthilnath P K", designation: "Vice President – Technical" },
          { name: "Kannan M", designation: "Quality DGM" },
          { name: "Vinod Kumar", designation: "HR & Admin HOD" },
        ],
      },
      {
        title: "Functional & Divisional Heads",
        icon: "layers",
        members: [
          { name: "Singaravelu", designation: "Finance Head" },
          { name: "Ramprasath", designation: "ED Divisional Head" },
          { name: "Rama Kuladeep", designation: "CS Divisional Head" },
          { name: "Sudeep", designation: "Stamping Divisional Head" },
        ],
      },
      {
        title: "Operations & Department Leads",
        icon: "settings",
        members: [
          { name: "Durairaj", designation: "Accounts" },
          { name: "Ravindran K", designation: "IT & Digitalization" },
          { name: "Sivakumar R", designation: "Purchase / Stores HOD" },
          { name: "Navaneetha Krishnan", designation: "Production / PPC / Maintenance HOD" },
        ],
      },
      {
        title: "Technical & Engineering Team",
        icon: "tool",
        members: [
          { name: "Aba Samuel", designation: "Technical Expert (Connector)" },
          { name: "Rangarajan S", designation: "E & D Product Design HOD" },
          { name: "Ranjith Kumar", designation: "PMG Sr. Manager" },
          { name: "Suresh", designation: "Tool Room GM" },
        ],
      },
    ]
  };

  const membersJsonStr = JSON.stringify(membersContent);

  await query('INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?)', [
      'core-team-members-1',
      'core-team-page-id',
      'core-team-members',
      membersJsonStr,
      3,
      true
  ]);

  console.log("Successfully inserted core-team-page-id sections.");

  process.exit(0);
}

seedCoreTeamSections().catch(err => {
  console.error(err);
  process.exit(1);
});
