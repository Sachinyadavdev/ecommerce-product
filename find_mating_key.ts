import { query } from './src/lib/db';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  try {
    const products = await query('SELECT name, specifications FROM product WHERE specifications IS NOT NULL');
    for (const p of products) {
      if (typeof p.specifications === 'string') {
        const specs = JSON.parse(p.specifications);
        const keys = Object.keys(specs);
        const matingKey = keys.find(k => {
          const kl = k.toLowerCase();
          return (kl.includes('mate') || kl.includes('mating')) && !kl.includes('material');
        });
        if (matingKey) {
          console.log(`Found mating key "${matingKey}" in product "${p.name}":`, specs[matingKey]);
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

run();
