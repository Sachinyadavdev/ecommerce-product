const { query } = require('./src/lib/db');

async function checkSpecs() {
  try {
    const products = await query('SELECT name, specifications FROM product WHERE specifications IS NOT NULL LIMIT 50');
    console.log(JSON.stringify(products, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkSpecs();
