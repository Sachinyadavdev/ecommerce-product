import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DATABASE_URL || '';
const isLocal = url.includes('localhost') || url.includes('127.0.0.1');

const pool = createPool({
  uri: url,
  ssl: !isLocal ? { rejectUnauthorized: false } : undefined
});

async function migrate() {
  console.log("🚀 Adding 'status' column to events table...");
  try {
    try {
      await pool.query(
        "ALTER TABLE events ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'upcoming' AFTER isActive"
      );
      console.log("✅ Added 'status' column to 'events' table.");
    } catch (err) {
      if (err.code === 'ER_DUP_COLUMN_NAME') {
        console.log("ℹ️  Column 'status' already exists.");
      } else throw err;
    }
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrate();
