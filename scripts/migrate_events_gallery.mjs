import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function migrate() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    console.log("Adding 'gallery' column to events table...");

    // Add gallery column (JSON array of strings)
    await connection.execute(`
      ALTER TABLE events
      ADD COLUMN gallery JSON DEFAULT NULL
    `);

    console.log("Successfully added 'gallery' column!");
  } catch (error) {
    // If it's a "Duplicate column name" error, ignore it
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.log("'gallery' column already exists in events table. Skipping.");
    } else {
      console.error("Migration failed:", error);
    }
  } finally {
    await connection.end();
  }
}

migrate();
