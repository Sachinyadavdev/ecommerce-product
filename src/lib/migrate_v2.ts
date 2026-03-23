
import { query } from "./db";
import dotenv from "dotenv";

dotenv.config();

async function migrate() {
  console.log("🚀 Starting database migration...");
  try {
    // Add notes column to enquiry table
    try {
        await query("ALTER TABLE enquiry ADD COLUMN notes JSON;");
        console.log("✅ Successfully added 'notes' column to 'enquiry' table.");
    } catch (error: any) {
        if (error.code === 'ER_DUP_COLUMN_NAME') {
            console.log("ℹ️ Column 'notes' already exists in 'enquiry' table.");
        } else {
            throw error;
        }
    }

    // Initialize available_colors setting if not present
    const colors = await query("SELECT id FROM site_settings WHERE id = 'available_colors'");
    if (colors.length === 0) {
        await query("INSERT INTO site_settings (id, value, updatedAt) VALUES ('available_colors', 'Black,Natural,White,Blue,Yellow,Green,Red', NOW())");
        console.log("✅ Initialized 'available_colors' in site_settings.");
    }

  } catch (error: any) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    process.exit(0);
  }
}

migrate();
