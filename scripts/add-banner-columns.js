const { createPool } = require("mysql2/promise");
require("dotenv").config();

async function addBannerColumns() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not defined in .env");
    process.exit(1);
  }

  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });

  try {
    const runQuery = async (label, sql) => {
      try {
        console.log(label);
        await pool.execute(sql);
        console.log(`Success: ${label}`);
      } catch (err) {
        if (err.errno === 1060) {
          console.log(`Column already exists: ${label}`);
        } else {
          throw err;
        }
      }
    };

    await runQuery("Adding bannerImage to 'pages'", "ALTER TABLE pages ADD COLUMN bannerImage TEXT AFTER keywords");
    await runQuery("Adding bannerImage to 'category'", "ALTER TABLE category ADD COLUMN bannerImage TEXT AFTER image");
    await runQuery("Adding bannerImage to 'product'", "ALTER TABLE product ADD COLUMN bannerImage TEXT AFTER images");

    console.log("Migration completed successfully.");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await pool.end();
  }
}

addBannerColumns();
