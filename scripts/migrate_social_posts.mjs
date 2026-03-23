import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const dbConfig = {
  uri: process.env.DATABASE_URL,
};

async function migrate_social_posts() {
  console.log('Connecting to database:', dbConfig.uri);
  try {
    const connection = await mysql.createConnection(dbConfig.uri);
    
    console.log('Creating social_posts table...');
    
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS social_posts (
        id VARCHAR(36) PRIMARY KEY,
        platform VARCHAR(50) NOT NULL,
        embedHtml TEXT NOT NULL,
        title VARCHAR(255) DEFAULT NULL,
        isActive BOOLEAN DEFAULT true,
        sortOrder INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('social_posts table verified/created successfully.');
    
    await connection.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate_social_posts();
