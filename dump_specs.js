const mysql = require('mysql2/promise');

async function run() {
  const pool = mysql.createPool({
    uri: "mysql://root:Ventures1111@209.38.120.144:3306/besmak_india",
    connectionLimit: 1,
    waitForConnections: true
  });
  try {
    const [rows] = await pool.query('SELECT name, specifications FROM product WHERE specifications IS NOT NULL LIMIT 20');
    console.log(JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();
