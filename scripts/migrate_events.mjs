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
  console.log("🚀 Starting Events table migration...");
  try {
    // Create events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id          VARCHAR(36) PRIMARY KEY,
        slug        VARCHAR(255) UNIQUE NOT NULL,
        title       VARCHAR(255) NOT NULL,
        subtitle    TEXT,
        description LONGTEXT,
        location    VARCHAR(255),
        startDate   DATE NOT NULL,
        endDate     DATE,
        thumbnail   VARCHAR(2048),
        bannerImage VARCHAR(2048),
        tags        TEXT,
        isActive    TINYINT(1) NOT NULL DEFAULT 1,
        createdAt   DATETIME NOT NULL,
        updatedAt   DATETIME NOT NULL
      )
    `);
    console.log("✅ 'events' table created (or already exists).");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

migrate();
