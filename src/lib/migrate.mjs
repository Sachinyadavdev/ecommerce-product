
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const pool = createPool({
  uri: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log("🚀 Starting database migration...");
  try {
    const [results] = await pool.query("ALTER TABLE category ADD COLUMN active_filters JSON;");
    console.log("✅ Successfully added 'active_filters' column to 'category' table.");
  } catch (error) {
    if (error.code === 'ER_DUP_COLUMN_NAME') {
      console.log("ℹ️ Column 'active_filters' already exists.");
    } else {
      console.error("❌ Migration failed:", error.message);
    }
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrate();
