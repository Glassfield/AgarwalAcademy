// generate-sitemap.js
// Usage: node generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Load keyword slugs
const slugsPath = path.join(__dirname, 'src', 'pages', 'seo', 'KeywordPages', 'keywordSlugs.js');
const slugsFile = fs.readFileSync(slugsPath, 'utf-8');
const match = slugsFile.match(/export const keywordSlugs = \[(.*)\];/s);
if (!match) {
  console.error('Could not find keywordSlugs array in keywordSlugs.js');
  process.exit(1);
}
const slugsRaw = match[1]
  .split(',')
  .map(s => s.trim().replace(/^"|"$/g, ''))
  .filter(Boolean);

const staticUrls = [
  { loc: '', priority: '1.0', changefreq: 'daily' },
  { loc: 'find-tutors', priority: '0.9', changefreq: 'daily' },
  { loc: 'tutor-registration', priority: '0.8', changefreq: 'weekly' },
  { loc: 'about', priority: '0.7', changefreq: 'monthly' },
  { loc: 'contact', priority: '0.7', changefreq: 'monthly' },
  { loc: 'maths-tuition', priority: '0.8', changefreq: 'weekly' },
  { loc: 'physics-tuition', priority: '0.8', changefreq: 'weekly' },
  { loc: 'chemistry-tuition', priority: '0.8', changefreq: 'weekly' },
  { loc: 'biology-tuition', priority: '0.8', changefreq: 'weekly' },
  { loc: 'english-tuition', priority: '0.8', changefreq: 'weekly' },
];

const today = new Date().toISOString().slice(0, 10);
const baseUrl = 'https://agarwalacademy.in/';

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const url of staticUrls) {
  xml += `  <url>\n    <loc>${baseUrl}${url.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>\n`;
}

for (const slug of slugsRaw) {
  xml += `  <url>\n    <loc>${baseUrl}${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
}

xml += '</urlset>\n';

// Write to public and dist
fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xml);
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.writeFileSync(path.join(__dirname, 'dist', 'sitemap.xml'), xml);
}

console.log('Sitemap generated with', slugsRaw.length, 'keyword URLs.');
