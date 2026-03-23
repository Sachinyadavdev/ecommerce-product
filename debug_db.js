const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
    try {
        const conn = await mysql.createConnection(process.env.DATABASE_URL);
        const [rows] = await conn.execute('SELECT `value` FROM site_settings WHERE `id` = ?', ['main_menu']);
        
        if (rows.length === 0) {
            console.log('NOT_FOUND');
        } else {
            console.log(rows[0].value);
        }
        await conn.end();
    } catch (error) {
        console.error(error);
    }
}
run();
