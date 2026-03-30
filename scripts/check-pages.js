const { createPool } = require("mysql2/promise");
require("dotenv").config();

async function check() {
  const url = process.env.DATABASE_URL;
  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  try {
    const [pages] = await pool.execute("SELECT * FROM pages");
    console.log("Pages:", JSON.stringify(pages, null, 2));
  } catch (error) {
    console.error("Check failed:", error);
  } finally {
    await pool.end();
  }
}

check();
