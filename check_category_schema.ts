import { query } from './src/lib/db';
import dotenv from 'dotenv';
dotenv.config();

async function checkSchema() {
  try {
    const columns = await query('DESCRIBE category');
    console.log(JSON.stringify(columns, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkSchema();
