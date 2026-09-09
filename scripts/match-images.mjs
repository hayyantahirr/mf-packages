import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const firebaseConfig = {
  apiKey: envVars.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: envVars.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Simple string normalization for matching
function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log("Fetching products from Firestore...");
  let products = [];
  try {
    const snapshot = await getDocs(collection(db, "products"));
    products = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
  } catch (e) {
    console.error("Failed to fetch products. Are Firestore rules blocking read?", e.message);
    process.exit(1);
  }
  
  console.log(`Fetched ${products.length} products.`);

  const imagesDir = 'public/All Sizes Pouches';
  const files = fs.readdirSync(imagesDir);
  
  const imageNames = files
    .filter(f => f.endsWith('.jpg'))
    .map(f => f.replace('.jpg', ''))
    .filter(name => isNaN(name)); // filter out strictly numerical names

  console.log(`Found ${imageNames.length} named images to process.\n`);

  const matches = [];
  const unmatched = [];
  const multipleMatches = [];

  imageNames.forEach(imgName => {
    const normImg = normalize(imgName);
    
    // Find matching products
    const possibleMatches = products.filter(p => {
      if (!p.name) return false;
      const normProd = normalize(p.name);
      return normProd === normImg || normProd.includes(normImg) || normImg.includes(normProd);
    });

    if (possibleMatches.length === 1) {
      matches.push({ image: imgName, product: possibleMatches[0].name, id: possibleMatches[0].id });
    } else if (possibleMatches.length > 1) {
      multipleMatches.push({ image: imgName, matches: possibleMatches.map(p => p.name) });
    } else {
      unmatched.push(imgName);
    }
  });

  console.log("=== EXACT / CLEAR MATCHES ===");
  matches.forEach(m => console.log(`[Image] ${m.image}  =>  [Product] ${m.product}`));

  console.log("\n=== AMBIGUOUS (Multiple Matches) ===");
  multipleMatches.forEach(m => console.log(`[Image] ${m.image}  =>  [Matches] ${m.matches.join(', ')}`));

  console.log("\n=== UNMATCHED IMAGES ===");
  unmatched.forEach(m => console.log(`[Image] ${m}`));
  
  // Output JSON for the agent to easily read if needed
  fs.writeFileSync('scripts/match-results.json', JSON.stringify({ matches, multipleMatches, unmatched }, null, 2));
  console.log("Done.");
  process.exit(0);
}

run().catch(console.error);
