
import { query } from "./db";
import dotenv from "dotenv";

dotenv.config();

async function migrate() {
  console.log("🚀 Starting database migration...");
  try {
    await query("ALTER TABLE category ADD COLUMN active_filters JSON;");
    console.log("✅ Successfully added 'active_filters' column to 'category' table.");
  } catch (error: any) {
    if (error.code === 'ER_DUP_COLUMN_NAME') {
      console.log("ℹ️ Column 'active_filters' already exists.");
    } else {
      console.error("❌ Migration failed:", error.message);
    }
  } finally {
    process.exit(0);
  }
}

migrate();
