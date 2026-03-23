import { query } from './src/lib/db';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  try {
    // Check if column already exists
    const columns: any = await query('DESCRIBE category');
    const hasOrder = columns.some((col: any) => col.Field === 'display_order');
    
    if (!hasOrder) {
      console.log('Adding display_order column...');
      await query('ALTER TABLE category ADD COLUMN display_order INT DEFAULT 0');
      console.log('Column added successfully.');
    } else {
      console.log('Column display_order already exists.');
    }
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
