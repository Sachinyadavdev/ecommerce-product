import { query } from './src/lib/db.ts';

async function main() {
  try {
    const columns = await query('SHOW COLUMNS FROM category');
    console.log(JSON.stringify(columns, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
