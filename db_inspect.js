const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({
    uri: "mysql://root:Ventures1111@209.38.120.144:3306/besmak_india",
    connectionLimit: 1
  });
  try {
    const [rows] = await pool.query('SELECT name, specifications FROM product WHERE name LIKE "%Housing%" OR name LIKE "%Connector%" LIMIT 100');
    for (const p of rows) {
      if (p.specifications) {
        let specs;
        try {
          specs = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications;
        } catch (e) { continue; }
        
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
  } finally {
    await pool.end();
  }
}

run();
