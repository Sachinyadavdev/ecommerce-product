const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log('Ensuring global product detail page entry exists...');
  
  const [rows] = await connection.execute('SELECT id FROM pages WHERE slug = ?', ['product-detail']);
  
  if (rows.length === 0) {
    const id = Math.random().toString(36).substring(2, 15);
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await connection.execute(
      'INSERT INTO pages (id, slug, title, description, keywords, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, 'product-detail', 'Product Detail Global', 'Global settings for product detail pages', 'products, details', 1, now, now]
    );
    console.log('Created product-detail page entry.');
  } else {
    console.log('product-detail page entry already exists.');
  }

  await connection.end();
}

migrate().catch(console.error);
