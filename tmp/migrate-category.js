const { createPool } = require("mysql2/promise");
require("dotenv").config();

async function migrateCategoryTable() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  const addColumnSafe = async (col, definition) => {
    try {
      await pool.execute(`ALTER TABLE category ADD COLUMN ${col} ${definition}`);
      console.log(`Column '${col}' added.`);
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log(`Column '${col}' already exists, skipping.`);
      } else {
        throw e;
      }
    }
  };

  try {
    await addColumnSafe("image", "VARCHAR(1024) NULL");
    await addColumnSafe("description", "TEXT NULL");
    console.log("Migration complete.");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrateCategoryTable();
