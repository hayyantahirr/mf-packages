const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://mfpackages.com';
const PROJECT_ID = 'mf-packages-ccd62';

// Clean helper to encode URL path segments
function encodePathSegment(segment) {
  return encodeURIComponent(segment)
    .replace(/%20/g, '+') // Keep URL matching clean if space is handled as plus, or keep %20
    .replace(/%2F/g, '/');
}

// Custom URL encoder for our shop routes (using standard encodeURIComponent)
function getProductSlug(name) {
  return encodeURIComponent(name);
}

// Fetch documents from Firestore REST API
async function fetchCollection(collectionName) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionName}?pageSize=300`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Firestore REST API response not ok for ${collectionName}: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.documents || [];
  } catch (error) {
    console.error(`Error fetching collection ${collectionName} from Firestore REST:`, error);
    return [];
  }
}

async function main() {
  console.log('--- Generating SEO Files ---');
  
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Define Static Pages
  const sitemapEntries = [
    { loc: `${DOMAIN}/`, lastmod: todayStr, changefreq: 'daily', priority: '1.0' },
    { loc: `${DOMAIN}/about`, lastmod: todayStr, changefreq: 'monthly', priority: '0.8' },
    { loc: `${DOMAIN}/blogs`, lastmod: todayStr, changefreq: 'daily', priority: '0.8' },
    { loc: `${DOMAIN}/contact`, lastmod: todayStr, changefreq: 'monthly', priority: '0.8' },
    { loc: `${DOMAIN}/printing`, lastmod: todayStr, changefreq: 'weekly', priority: '0.9' },
    { loc: `${DOMAIN}/shop`, lastmod: todayStr, changefreq: 'daily', priority: '0.9' }
  ];

  // 2. Fetch and generate Dynamic Blog Pages
  console.log('Fetching blogs from Firestore...');
  const blogDocs = await fetchCollection('blogs');
  console.log(`Found ${blogDocs.length} blogs.`);
  blogDocs.forEach(doc => {
    const id = doc.name.split('/').pop();
    const lastmod = doc.updateTime ? doc.updateTime.split('T')[0] : todayStr;
    sitemapEntries.push({
      loc: `${DOMAIN}/blogs/${id}`,
      lastmod: lastmod,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  // 3. Fetch and generate Dynamic Product Collections & Variations
  console.log('Fetching products from Firestore...');
  const productDocs = await fetchCollection('products');
  console.log(`Found ${productDocs.length} product variations.`);
  
  const uniqueProductNames = new Set();
  
  productDocs.forEach(doc => {
    const fields = doc.fields || {};
    const name = fields.name?.stringValue;
    if (!name) return;

    const id = doc.name.split('/').pop();
    const lastmod = doc.updateTime ? doc.updateTime.split('T')[0] : todayStr;
    const escapedName = getProductSlug(name);

    // Track unique collections for /shop/[productName]
    if (!uniqueProductNames.has(name)) {
      uniqueProductNames.add(name);
      sitemapEntries.push({
        loc: `${DOMAIN}/shop/${escapedName}`,
        lastmod: lastmod,
        changefreq: 'weekly',
        priority: '0.8'
      });
    }

    // Individual variation detail page /shop/[productName]/[productId]
    sitemapEntries.push({
      loc: `${DOMAIN}/shop/${escapedName}/${id}`,
      lastmod: lastmod,
      changefreq: 'weekly',
      priority: '0.6'
    });
  });

  console.log(`Total sitemap entries compiled: ${sitemapEntries.length}`);

  // 4. Construct sitemap.xml
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  sitemapEntries.forEach(entry => {
    xml += '  <url>\n';
    // XML escaping for safety
    const escapedLoc = entry.loc.replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
    xml += `    <loc>${escapedLoc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  xml += '</urlset>\n';

  // 5. Construct robots.txt
  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Private Pages to Block
Disallow: /admin
Disallow: /dashboard
Disallow: /api/
Disallow: /login
Disallow: /drafts/

Sitemap: ${DOMAIN}/sitemap.xml
`;

  // 6. Write Files to public/ and root directory
  const rootSitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  const rootRobotsPath = path.join(__dirname, '..', 'robots.txt');
  const publicSitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  const publicRobotsPath = path.join(__dirname, '..', 'public', 'robots.txt');

  try {
    fs.writeFileSync(rootSitemapPath, xml, 'utf8');
    fs.writeFileSync(rootRobotsPath, robots, 'utf8');
    console.log(`Saved sitemap.xml and robots.txt to root directory.`);

    // Ensure public folder exists
    const publicDir = path.dirname(publicSitemapPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    fs.writeFileSync(publicSitemapPath, xml, 'utf8');
    fs.writeFileSync(publicRobotsPath, robots, 'utf8');
    console.log(`Saved sitemap.xml and robots.txt to public/ directory.`);
  } catch (err) {
    console.error('Error writing SEO files:', err);
    process.exit(1);
  }

  // 7. Validate XML Formatting
  console.log('\n--- Validating sitemap.xml ---');
  try {
    // Simple basic checks in JS (matching open/close tags)
    if (!xml.startsWith('<?xml') || !xml.includes('</urlset>')) {
      throw new Error('Sitemap XML structure is incomplete.');
    }
    
    const urlCount = (xml.match(/<url>/g) || []).length;
    const closeUrlCount = (xml.match(/<\/url>/g) || []).length;
    if (urlCount !== closeUrlCount || urlCount === 0) {
      throw new Error(`Tag mismatch: <url> count (${urlCount}) does not match </url> count (${closeUrlCount}).`);
    }

    console.log('✓ JS Validation Passed: XML tags match, header/footer structure correct.');
  } catch (validationErr) {
    console.error('✗ JS Validation Failed:', validationErr.message);
    process.exit(1);
  }

  console.log('SEO Generation Complete!');
}

main();
