// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Static validation check. Next.js requires static references (process.env.VAR_NAME)
// to correctly inline environment variables into the client-side bundle.
const missingVars = [];
if (!firebaseConfig.apiKey) missingVars.push("NEXT_PUBLIC_FIREBASE_API_KEY");
if (!firebaseConfig.authDomain) missingVars.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
if (!firebaseConfig.projectId) missingVars.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
if (!firebaseConfig.storageBucket) missingVars.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
if (!firebaseConfig.messagingSenderId) missingVars.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
if (!firebaseConfig.appId) missingVars.push("NEXT_PUBLIC_FIREBASE_APP_ID");
// Also check for other critical environment variables
if (!process.env.NEXT_PUBLIC_CURRENCY_API_KEY) missingVars.push("NEXT_PUBLIC_CURRENCY_API_KEY");
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) missingVars.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) missingVars.push("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");

if (missingVars.length > 0) {
  throw new Error(`Missing Environment Variables: ${missingVars.join(", ")}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };