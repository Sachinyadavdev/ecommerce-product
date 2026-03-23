const mysql = require('mysql2/promise');
require('dotenv').config();

const NEW_IMAGES = {
    // Discover Us
    "At a Glance": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/At%20a%20Glance.png",
        href: "/about-us/at-a-glance"
    },
    "Core Team": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CoreTeam.png",
        href: "/about-us/core-team"
    },
    "Our Values & Governance": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Our%20Values%20%26%20Governance.png",
        href: "/about-us/values-governance"
    },
    "Partnerships": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Partnerships.png",
        href: "/about-us/partnerships"
    },
    // Divisions
    "Connection Systems": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Connection%20system.png",
        href: "/verticals/connection-systems"
    },
    "Engineering Products": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Engineering%20Products.png",
        href: "/verticals/engineering-products"
    },
    "Precision Stamping": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/Precision%20Stamping.png",
        href: "/verticals/precision-stamping"
    },
    "CNH Moulds": {
        image: "https://fohffyjhcwci6coi.public.blob.vercel-storage.com/CNH%20MOULDS.png",
        href: "/verticals/cnh-moulds"
    }
};

async function run() {
    try {
        const conn = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connected to database');

        const [rows] = await conn.execute('SELECT value FROM site_settings WHERE id = "main_menu"');
        if (rows.length === 0) {
            console.error('main_menu setting not found');
            await conn.end();
            return;
        }

        let menu = JSON.parse(rows[0].value);

        menu = menu.map(section => {
            // Normalize section titles just in case
            if (section.title === "Discover Us") {
                section.image = NEW_IMAGES["At a Glance"].image;
            }
            if (section.title === "Divisions") {
                section.image = NEW_IMAGES["Connection Systems"].image;
            }

            if (section.child) {
                section.child = section.child.map(child => {
                    const normalizedName = child.name.trim();
                    const update = NEW_IMAGES[normalizedName];
                    
                    if (update) {
                        console.log(`Updating ${normalizedName}...`);
                        child.name = normalizedName; // Normalize the name in DB too
                        child.image = update.image;
                        child.href = update.href;
                    } else {
                        console.log(`No update found for: "${child.name}" (normalized: "${normalizedName}")`);
                    }
                    return child;
                });
            }
            return section;
        });

        await conn.execute('UPDATE site_settings SET value = ? WHERE id = "main_menu"', [JSON.stringify(menu)]);
        console.log('Successfully updated main_menu in database');

        await conn.end();
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
