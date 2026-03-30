import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL must be defined");
    process.exit(1);
  }

  const connection = await createConnection(url);

  try {
    const pageId = "ttv02o7brpd";
    const sectionType = "terms-services";
    const content = JSON.stringify({
      title: "Terms and Services",
      lastUpdated: "October 2023",
      body: "<p>Welcome to our terms and services page. Please read these terms carefully.</p>"
    });

    // Check if it already exists
    const [rows]: any = await connection.query(
      `SELECT * FROM page_sections WHERE pageId = ? AND type = ?`,
      [pageId, sectionType]
    );

    if (rows.length > 0) {
      console.log("Section already exists. Updating it instead.");
      await connection.query(
        `UPDATE page_sections SET content = ? WHERE id = ?`,
        [content, rows[0].id]
      );
      console.log(`Updated section ${rows[0].id}`);
    } else {
      const id = "sect_" + Math.random().toString(36).substr(2, 9);
      await connection.query(
        `INSERT INTO page_sections (id, pageId, type, content, sortOrder, isActive) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, pageId, sectionType, content, 1, 1]
      );
      console.log(`Inserted section ${id}`);
    }
  } catch (error) {
    console.error("Error inserting section:", error);
  } finally {
    await connection.end();
  }
}

main();
