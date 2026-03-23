import { query } from "./src/lib/db";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const PAGE_ID = "82yle51rzi2";

async function seedValuesGovernanceSections() {
  console.log(`Resetting sections for page ${PAGE_ID}...`);
  await query(`DELETE FROM page_sections WHERE pageId = '${PAGE_ID}'`);

  console.log("Inserting sections...");

  // 1. Hero
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-hero-1",
      PAGE_ID,
      "vg-hero",
      JSON.stringify({
        title: "Our Values & Governance",
        bgImage:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
      }),
      1,
      true,
    ]
  );

  // 2. Core Values
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-core-values-1",
      PAGE_ID,
      "vg-core-values",
      JSON.stringify({
        tagline: "Our Foundation",
        title: "Our Core Values",
        subtitle: "The principles that shape every decision, every product, and every partnership.",
        value1Title: "Integrity & Ethics",
        value1Desc:
          "We conduct our business with the highest standards of honesty and ethical practices. Every decision we make reflects our commitment to fairness, compliance, and long-term trust.",
        value2Title: "Quality Excellence",
        value2Desc:
          "Quality is at the heart of everything we do. From design to delivery, we follow stringent quality systems to ensure our products meet global automotive standards and exceed customer expectations.",
        value3Title: "Customer Commitment",
        value3Desc:
          "We believe in building lasting relationships with our customers by delivering reliable, customized, and value-driven solutions. Our approach is collaborative, responsive, and performance-focused.",
        value4Title: "Innovation & Continuous Improvement",
        value4Desc:
          "We continuously invest in technology, processes, and people to drive innovation. Our focus on improvement enables us to adapt to evolving industry needs, including electric mobility and advanced connectivity.",
        value5Title: "Teamwork & Respect",
        value5Desc:
          "Our people are our strength. We foster a culture of collaboration, mutual respect, and continuous learning to empower our teams and drive organizational success.",
      }),
      2,
      true,
    ]
  );

  // 3. Corporate Governance
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-corporate-governance-1",
      PAGE_ID,
      "vg-corporate-governance",
      JSON.stringify({
        tagline: "How We Operate",
        title: "Corporate Governance",
        description:
          "Besmak follows structured governance practices to ensure operational excellence and responsible business conduct:",
        item1: "Strong leadership oversight and strategic direction",
        item2: "Transparent decision-making processes",
        item3: "Compliance with industry regulations and standards",
        item4: "Risk management and process control systems",
        item5: "Ethical business conduct across all operations",
        closingStatement:
          "Our governance framework ensures that we consistently deliver value while maintaining the trust of our customers, partners, and stakeholders.",
        bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      }),
      3,
      true,
    ]
  );

  // 4. Awards & Quality
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-awards-quality-1",
      PAGE_ID,
      "vg-awards-quality",
      JSON.stringify({
        awardsTagline: "Recognition",
        awardsTitle: "Awards & Recognitions",
        awardsDescription:
          "Over the years, Besmak has been recognized for its commitment to quality, delivery performance, and customer satisfaction.",
        award1: "Preferred Supplier Recognition from leading automotive OEMs and Tier-1 companies",
        award2: "Excellence in Quality & Delivery Performance awards",
        award3: "Recognition for consistent supply chain reliability and on-time delivery",
        award4: "Appreciation awards for customer support and technical collaboration",
        awardImage1: "https://images.unsplash.com/photo-1599596851608-b1fb9e1bd420?q=80&w=600&auto=format&fit=crop",
        awardImage2: "https://images.unsplash.com/photo-1581335965415-321356f6fffe?q=80&w=600&auto=format&fit=crop",
        awardImage3: "https://images.unsplash.com/photo-1591122266014-998fc028fa60?q=80&w=600&auto=format&fit=crop",
        awardImage4: "https://images.unsplash.com/photo-1496247749665-49cfddb9a5c7?q=80&w=600&auto=format&fit=crop",
        qualityTagline: "Our Standards",
        qualityTitle: "Quality Policy",
        qualityCommitment:
          "We are committed to delivering products and services that consistently meet customer expectations and applicable standards.",
        qualityItem1: 'Focus on "doing it right the first time"',
        qualityItem2: "Continuous improvement in products, processes, and systems",
        qualityItem3: "Enhancing customer satisfaction through quality and reliability",
        qualityItem4: "Adherence to global automotive quality standards",
        objectivesTitle: "Quality Objectives",
        objective1: "Continuous improvement in product quality and delivery performance",
        objective2: "Strengthening design, process, and technological capabilities",
        objective3: "Enhancing employee skills through training and development",
        objective4: "Maintaining high standards in safety and operational efficiency",
        certsTitle: "Certifications",
        cert1Name: "IATF 16949",
        cert1Label: "Automotive Quality Management System",
        cert1Image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=800&auto=format&fit=crop",
        cert2Name: "ISO 9001",
        cert2Label: "Quality Management Systems",
        cert2Image: "https://images.unsplash.com/photo-1629424707254-8c01a2ba9ab1?q=80&w=800&auto=format&fit=crop",
        cert3Name: "SQ Mark",
        cert3Label: "SQ Mark Certification",
        cert3Image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        cert4Name: "Industry Standards",
        cert4Label: "Compliance with automotive industry standards and best practices",
        cert4Image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      }),
      4,
      true,
    ]
  );

  // 5. EMS & Safety
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-ems-safety-1",
      PAGE_ID,
      "vg-ems-safety",
      JSON.stringify({
        heroTagline: "Responsibility",
        heroTitle: "EMS & Safety",
        heroSubtitle:
          "Committed to Environmental Responsibility and Workplace Safety",
        emsTitle: "Environmental Management System (EMS)",
        emsDescription:
          "We follow structured environmental practices to ensure sustainable manufacturing and responsible resource utilization.",
        emsItem1: "Reducing environmental impact through efficient manufacturing processes",
        emsItem2: "Optimizing energy consumption across production and facility operations",
        emsItem3: "Minimizing waste generation and promoting recycling initiatives",
        emsItem4: "Responsible handling and disposal of industrial materials",
        emsItem5: "Compliance with all applicable environmental regulations and standards",
        safetyTitle: "Health & Safety at Workplace",
        safetyDescription:
          "Safety is a core priority at Besmak. We are committed to providing a safe and healthy work environment for all employees, contractors, and stakeholders.",
        safetyItem1: "Implementation of strict safety protocols across all production units",
        safetyItem2: "Regular safety training and awareness programs for employees",
        safetyItem3: "Use of appropriate personal protective equipment (PPE)",
        safetyItem4: "Hazard identification and risk assessment processes",
        safetyItem5: "Emergency preparedness and response systems",
        processSafetyTitle: "Process Safety & Compliance",
        processSafetyItem1: "Standardized operating procedures (SOPs) for all critical processes",
        processSafetyItem2: "Periodic safety audits and inspections",
        processSafetyItem3: "Compliance with industry safety norms and guidelines",
        processSafetyItem4: "Continuous improvement through feedback and incident analysis",
        wellbeingTitle: "Employee Well-being & Engagement",
        wellbeingItem1: "Promoting employee health and well-being",
        wellbeingItem2: "Encouraging participation in safety programs",
        wellbeingItem3: "Building awareness through regular communication and training",
        wellbeingItem4: "Creating a culture where safety is everyone's responsibility",
      }),
      5,
      true,
    ]
  );

  // 6. Commitment
  await query(
    `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      "vg-commitment-1",
      PAGE_ID,
      "vg-commitment",
      JSON.stringify({
        title: "Commitment to Excellence",
        description:
          "At Besmak, our values and governance practices are not just principles—they are embedded in our everyday operations. They enable us to deliver precision, performance, and trust across every product and partnership.",
        ctaText: "Contact Us",
        ctaLink: "/contact",
      }),
      6,
      true,
    ]
  );

  console.log("✅ All sections seeded successfully for page", PAGE_ID);
  process.exit(0);
}

seedValuesGovernanceSections().catch((err) => {
  console.error(err);
  process.exit(1);
});
