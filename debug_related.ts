import { query } from './src/lib/db';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    const products = await query('SELECT name, specifications FROM product WHERE slug = "4fk-250-fhcl-rib"');
    console.log(JSON.stringify(products, null, 2));
  } catch (err) {
    console.error(err);
  }
}

run();
