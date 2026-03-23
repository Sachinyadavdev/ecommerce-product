const fs = require('fs');
const path = require('path');

/**
 * Deep scan of src directory for Vercel Blob URLs
 */
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.next')) {
                results = results.concat(walk(file));
            }
        } else {
            // Scan all text-based source files
            if (file.match(/\.(tsx|ts|js|jsx|css|json|html|md)$/)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
const urls = new Set();
// Regex to catch Vercel Blob URLs with both unique prefixes found in grep
const blobRegex = /https:\/\/[a-z0-9.]+\.public\.blob\.vercel-storage\.com\/[^\s\"\'\)\`]+/g;

files.forEach(f => {
    try {
        const content = fs.readFileSync(f, 'utf8');
        const matches = content.match(blobRegex);
        if (matches) {
            matches.forEach(m => {
                // Remove trailing punctuation or closing brackets that might be caught
                const cleanUrl = m.replace(/[\,\|\)\}\]]$/, '');
                urls.add(cleanUrl);
            });
        }
    } catch (err) {
        // Skip files that can't be read
    }
});

const output = Array.from(urls).sort();
const outputPath = path.join(process.cwd(), 'src/lib/media-code-references.json');

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Deep scan complete. Found ${output.length} unique media references in code.`);
console.log(`Saved to: ${outputPath}`);
