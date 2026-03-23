const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');

async function run() {
    try {
        const conn = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await conn.execute('SELECT value FROM site_settings WHERE id = "main_menu"');
        if (rows.length > 0) {
            fs.writeFileSync('full_menu.json', rows[0].value, 'utf8');
            console.log('Successfully wrote full_menu.json');
        } else {
            console.log('main_menu not found');
        }
        await conn.end();
    } catch (error) {
        console.error('Error:', error);
    }
}
run();
