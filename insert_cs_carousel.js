const mysql = require('mysql2/promise');
const crypto = require('crypto');

async function run() {
  try {
    const connection = await mysql.createConnection({
      host: '209.38.120.144',
      user: 'root',
      password: 'Ventures1111',
      database: 'besmak_india'
    });

    const [rows] = await connection.execute('SELECT id, type, sortOrder FROM page_sections WHERE pageId = "connection-systems" ORDER BY sortOrder ASC');
    console.log('Current section order for connection-systems:');
    console.log(rows);
    
    // Check if cs-image-carousel already exists
    const existing = rows.find(r => r.type === 'cs-image-carousel');
    if (existing) {
        console.log('cs-image-carousel already exists, skipping insertion.');
        await connection.end();
        return;
    }

    const capRow = rows.find(r => r.type === 'cs-capabilities');
    
    if (capRow) {
      const targetOrderIndex = capRow.sortOrder + 1;
      
      console.log(`Shifting existing sections down at or above index ${targetOrderIndex}...`);
      await connection.execute('UPDATE page_sections SET sortOrder = sortOrder + 1 WHERE pageId = "connection-systems" AND sortOrder >= ?', [targetOrderIndex]);
      
      const newContent = JSON.stringify({
        title: "State-of-the-Art Infrastructure",
        subtitle: "Manufacturing Showcase",
        image1Src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
        image1Alt: "Advanced Precision Molding",
        image2Src: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=1200",
        image2Alt: "High-Volume Production Lines",
        image3Src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
        image3Alt: "Manufacturing Components",
        image4Src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200",
        image4Alt: "Automated Assembly"
      });
      
      console.log(`Inserting cs-image-carousel at sortOrder ${targetOrderIndex}...`);
      const newId = crypto.randomUUID();
      await connection.execute(
        'INSERT INTO page_sections (id, pageId, type, sortOrder, isActive, content) VALUES (?, ?, ?, ?, ?, ?)',
        [newId, 'connection-systems', 'cs-image-carousel', targetOrderIndex, 1, newContent]
      );
      
      console.log('Insertion successful!');
    } else {
      console.log('Error: Could not find cs-capabilities row to determine insertion point.');
    }
    
    await connection.end();
  } catch (error) {
    console.error("Database operation failed:", error);
  }
}

run();
