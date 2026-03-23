const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
    try {
        const conn = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('--- DB Content START ---');
        const [rows] = await conn.execute('SELECT `id`, `value` FROM site_settings WHERE `id` = "main_menu"');
        if (rows.length === 0) {
            console.log('main_menu NOT FOUND in site_settings');
            const [allRows] = await conn.execute('SELECT `id` FROM site_settings LIMIT 10');
            console.log('Available keys in site_settings:', allRows.map(r => r.id));
        } else {
            console.log(JSON.stringify(JSON.parse(rows[0].value), null, 2));
        }
        console.log('--- DB Content END ---');
        await conn.end();
    } catch (error) {
        console.error('Error:', error);
    }
}
run();
