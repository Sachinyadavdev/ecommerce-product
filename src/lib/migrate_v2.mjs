
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const url = process.env.DATABASE_URL || '';
const isLocal = url.includes('localhost') || url.includes('127.0.0.1');

const pool = createPool({
  uri: url,
  ssl: !isLocal ? { rejectUnauthorized: false } : undefined
});

async function migrate() {
  console.log("🚀 Starting database migration (MJS)...");
  try {
    // Add notes column to enquiry table
    try {
        await pool.query("ALTER TABLE enquiry ADD COLUMN notes JSON;");
        console.log("✅ Successfully added 'notes' column to 'enquiry' table.");
    } catch (error) {
        if (error.code === 'ER_DUP_COLUMN_NAME') {
            console.log("ℹ️ Column 'notes' already exists in 'enquiry' table.");
        } else {
            throw error;
        }
    }

    // Initialize available_colors setting if not present
    const [rows] = await pool.query("SELECT id FROM site_settings WHERE id = 'available_colors'");
    if (rows.length === 0) {
        await pool.query("INSERT INTO site_settings (id, value, updatedAt) VALUES ('available_colors', 'Black,Natural,White,Blue,Yellow,Green,Red', NOW())");
        console.log("✅ Initialized 'available_colors' in site_settings.");
    }

  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrate();
