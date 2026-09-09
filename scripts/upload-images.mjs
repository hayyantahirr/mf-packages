import fs from 'fs';
import path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const cloudName = envVars.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = envVars.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
  console.error("Missing Cloudinary configuration in .env.local");
  process.exit(1);
}

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

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const explicitMappings = {
  "Brown Kraft paper pouch": "Brown Kraft Paper Standup Pouch ",
  "White Kraft paper pouch": "White Kraft Paper Standup Pouch ",
  "Front Transparent & Back copper gold Standup Pouch": "Front Transparent & Back Copper Gold Aluminium Pouch",
  "Front Transparent & Back pure gold Standup Pouch": "Front Transparent & Back Pure Gold Aluminium Pouch"
};

async function uploadToCloudinary(filePath, fileName) {
  const buffer = fs.readFileSync(filePath);
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  const formData = new FormData();
  formData.append('file', blob, fileName);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Cloudinary error: ${JSON.stringify(data)}`);
  }
  return data.secure_url;
}

async function run() {
  console.log("Fetching products from Firestore...");
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
  console.log(`Fetched ${products.length} product variations.`);

  const imagesDir = 'public/All Sizes Pouches';
  const files = fs.readdirSync(imagesDir);
  
  const imagesToProcess = files
    .filter(f => f.endsWith('.jpg'))
    .filter(f => isNaN(f.replace('.jpg', '')));

  console.log(`Found ${imagesToProcess.length} named images to process.\n`);

  let updatedCount = 0;

  for (const fileName of imagesToProcess) {
    const imgName = fileName.replace('.jpg', '');
    const normImg = normalize(imgName);
    
    // Find matching products
    const possibleMatches = products.filter(p => {
      if (!p.name) return false;
      
      // Explicit Mapping Check
      if (explicitMappings[imgName] === p.name) return true;
      if (explicitMappings[imgName]) return false; // if it has explicit mapping but this isn't it, skip.

      const normProd = normalize(p.name);
      return normProd === normImg || normProd.includes(normImg) || normImg.includes(normProd);
    });

    if (possibleMatches.length > 0) {
      console.log(`\n[Processing] ${fileName}`);
      console.log(`Found ${possibleMatches.length} matching product variations for: ${imgName}`);
      
      try {
        console.log("  -> Uploading to Cloudinary...");
        const secureUrl = await uploadToCloudinary(path.join(imagesDir, fileName), fileName);
        console.log(`  -> Upload successful: ${secureUrl}`);
        
        console.log("  -> Updating Firestore...");
        for (const p of possibleMatches) {
          const docRef = doc(db, 'products', p.id);
          await updateDoc(docRef, { mainImage: secureUrl });
          updatedCount++;
        }
        console.log(`  -> Successfully updated Firestore for product: ${possibleMatches[0].name}`);
      } catch (err) {
        console.error(`  -> ERROR processing ${fileName}:`, err.message);
      }
    } else {
      console.log(`\n[Skipped] No matches found for: ${imgName}`);
    }
  }

  console.log(`\nDone. Successfully updated ${updatedCount} product documents.`);
  process.exit(0);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
