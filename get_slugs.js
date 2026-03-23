const { createPool } = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

async function run() {
  const url = process.env.DATABASE_URL;
  const pool = createPool({
    uri: url,
    ssl: url.includes("ssl=false") ? undefined : { rejectUnauthorized: false },
  });
  try {
    const [res] = await pool.execute('SELECT id, slug FROM pages');
    console.log(JSON.stringify(res));
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
  }
}
run();
