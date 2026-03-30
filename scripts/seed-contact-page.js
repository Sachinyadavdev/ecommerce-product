const { createPool } = require("mysql2/promise");
require("dotenv").config();

async function seed() {
  const url = process.env.DATABASE_URL;
  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  const now = new Date().toISOString().slice(0, 19).replace("T", " ");

  const page = {
    id: "contact-page",
    slug: "contact-us",
    title: "Contact Us | Besmak India",
    description: "At Besmak Components Pvt Ltd, we believe every project begins with a conversation. Whether you’re exploring new components, seeking technical support, or looking for a long-term strategic partner, our team is ready to assist you.",
    sections: [
      {
        id: "contact-hero-1",
        type: "contact-hero",
        content: {
          bgImage: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Contactpage-bannerimage.png",
          topTitle: "Let's Build the Future, Together",
          mainTitle: "Let's Build Something Amazing Together",
          description: "At Besmak Components Pvt Ltd, we believe every project begins with a conversation. Whether you’re exploring new components, seeking technical support, or looking for a long-term strategic partner, our team is ready to assist you.",
          btn1Text: "Call Now",
          btn1Url: "tel:+914467123333",
          btn2Text: "Live Chat",
          btn2Url: "#",
          contactTitle: "Contact Information",
          phoneLabel: "Phone",
          phoneValue: "+91 44 6712 3333",
          emailLabel: "Email",
          emailValue: "sales@besmakindia.com",
          addressLabel: "Address",
          addressValue: "Besmak Components Private Limited,\nPlot No. A-45, SIPCOT Industrial Growth Centre,\nOragadam,\nKanchipuram – 602118,\nTamil Nadu, India."
        },
        order: 0,
      },
      {
        id: "contact-address-1",
        type: "contact-address",
        content: {
          heading: "Manufacturing Locations",
          bgHeading: "WORKS",
          card1_header: "HEAD OFFICE & UNIT I",
          card1_title: "Oragadam",
          card1_city: "Kanchipuram, Tamil Nadu",
          card1_address: "Plot No. A-45, SIPCOT Industrial Growth Center,\nOragadam Industrial Corridor,\nOragadam, Sriperumbudur Taluka,\nKanchipuram – 602118\nTamil Nadu, India",
          card1_footer: "Chennai Manufacturing Unit",
          card2_header: "UNIT II",
          card2_title: "Athipet",
          card2_city: "Chennai, Tamil Nadu",
          card2_address: "No.1, Ganesh Road,\nNageswara Rao Road Extn,\nAthipet,\nChennai - 600058\nTamil Nadu, India",
          card2_footer: "Chennai Manufacturing Unit",
          card3_header: "UNIT III",
          card3_title: "Sanand",
          card3_city: "Ahmedabad, Gujarat",
          card3_address: "Survey No. 627/B,\nOpp. Virochannagar Railway Station,\nNear Khoraj Village,\nSanand Taluka,\nAhmedabad – 382170\nGujarat, India",
          card3_footer: "West India Manufacturing Unit",
          bottom_header: "DESIGN STUDIO CENTER - CHENNAI",
          bottom_address: "The Executive Zone Private Limited,\nShakthi Towers, Ground Floor, Tower 1, No. 766, Anna Salai, Chennai - 600002, Tamil Nadu"
        },
        order: 1,
      },
      {
        id: "contact-info-1",
        type: "contact-info",
        content: {
          heading: "3 Warehouses",
          wh1_title: "WH — 01",
          wh1_city: "Kanchipuram, Tamil Nadu",
          wh1_badge: "ORAGADAM",
          wh1_address: "Plot No. 16, Venkateswara Nagar,\nStage III Mettupalayam Village,\nOragadam Industrial Area,\nSriperumbudur Taluka,\nKanchipuram – 602118\nTamil Nadu, India",
          wh2_title: "WH — 02",
          wh2_city: "Pune, Maharashtra",
          wh2_badge: "PUNE",
          wh2_address: "Door No. 1, Gate No. 201,\nVillage Chimball,\nKhed Taluka,\nPune – 410 501\nMaharashtra, India",
          wh3_title: "WH — 03",
          wh3_city: "Gurgaon, Haryana",
          wh3_badge: "GURGAON",
          wh3_address: "Killa No. 15, Khasra No. 1531,\nVillage Kheri Dhoula,\nNH-48, Opp. Grozz Toll,\nGurgaon – 122004\nHaryana, India"
        },
        order: 2,
      },
      {
        id: "contact-form-1",
        type: "contact-form",
        content: {
          topText: "PRODUCT ENQUIRY",
          heading: "Tell us about your requirements",
          description: "Whether you need automotive connectors, terminals or complete wiring harness solutions — our team responds promptly.",
          buttonText: "SEND ENQUIRY",
          nameLabel: "YOUR NAME",
          emailLabel: "EMAIL ADDRESS",
          subjectLabel: "SUBJECT",
          mobileLabel: "MOBILE NUMBER",
          addressLabel: "YOUR ADDRESS",
          messageLabel: "MESSAGE"
        },
        order: 3,
      }
    ],
  };

  try {
    console.log(`Seeding page: ${page.slug}...`);
    await pool.execute(
      `INSERT INTO pages (id, slug, title, description, keywords, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), updatedAt=VALUES(updatedAt)`,
      [page.id, page.slug, page.title, page.description, "", now, now],
    );

    for (const section of page.sections) {
      console.log(`  Seeding section: ${section.type}...`);
      await pool.execute(
        `INSERT INTO page_sections (id, pageId, type, content, sortOrder, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?) 
         ON DUPLICATE KEY UPDATE content=VALUES(content), sortOrder=VALUES(sortOrder), updatedAt=VALUES(updatedAt)`,
        [
          section.id,
          page.id,
          section.type,
          JSON.stringify(section.content),
          section.order,
          now,
          now,
        ],
      );
    }
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
