const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({
    uri: "mysql://root:Ventures1111@209.38.120.144:3306/besmak_india",
    connectionLimit: 1
  });
  try {
    const [rows] = await pool.query('SELECT name, specifications FROM product WHERE name LIKE "%4FK 250 FHCL-RIB%" LIMIT 1');
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
