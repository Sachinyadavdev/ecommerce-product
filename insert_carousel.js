const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath);

db.get("SELECT id FROM pages WHERE slug = 'engineering-products'", (err, page) => {
  if (err) {
    console.error("Error finding page:", err);
    return;
  }
  if (!page) {
    console.log('Page not found');
    return;
  }
  
  console.log(`Found page ID: ${page.id}`);

  db.all("SELECT id, sortOrder FROM page_sections WHERE pageId = ? AND type = 'ep-capabilities'", [page.id], (err, rows) => {
    if (err) {
      console.error("Error finding section:", err);
      return;
    }
    if (rows.length === 0) {
      console.log('Capabilities section not found');
      return;
    }
    
    const capSortOrder = rows[0].sortOrder;
    console.log(`Capabilities sortOrder: ${capSortOrder}`);

    // Push subsequent sections down
    db.run("UPDATE page_sections SET sortOrder = sortOrder + 1 WHERE pageId = ? AND sortOrder > ?", [page.id, capSortOrder], function(err) {
      if (err) {
        console.error("Error updating sortOrders:", err);
        return;
      }
      
      // Insert the new carousel section
      db.run("INSERT INTO page_sections (id, pageId, type, sortOrder, isActive, content, createdAt, updatedAt) VALUES (?, ?, 'ep-image-carousel', ?, 1, '{}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", 
        [Math.random().toString(36).substr(2, 9), page.id, capSortOrder + 1], 
        function(err) {
          if (err) {
            console.error("Error inserting new section:", err);
            return;
          }
          console.log('Successfully added ep-image-carousel after ep-capabilities');
          db.close();
        }
      );
    });
  });
});
