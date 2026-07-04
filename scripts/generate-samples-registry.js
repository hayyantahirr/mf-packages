const fs = require("fs");
const path = require("path");

const SAMPLES_DIR = path.join(__dirname, "../public/printing_sample");
const REGISTRY_FILE = path.join(__dirname, "../component/printing/samples-registry.json");
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

async function main() {
  console.log(`Scanning printing samples under: ${SAMPLES_DIR}`);
  if (!fs.existsSync(SAMPLES_DIR)) {
    console.error("Printing samples directory not found!");
    return;
  }

  const registry = {};

  const folders = await fs.promises.readdir(SAMPLES_DIR, { withFileTypes: true });
  for (const folder of folders) {
    if (folder.isDirectory()) {
      const methodId = folder.name; // e.g., "gravure"
      registry[methodId] = [];
      
      const folderPath = path.join(SAMPLES_DIR, folder.name);
      const files = await fs.promises.readdir(folderPath, { withFileTypes: true });
      for (const file of files) {
        if (file.isFile()) {
          const ext = path.extname(file.name).toLowerCase();
          if (ALLOWED_EXTENSIONS.includes(ext)) {
            // Path relative to public directory (which maps to root / in Next.js)
            const publicPath = `/printing_sample/${folder.name}/${file.name}`;
            registry[methodId].push(publicPath);
          }
        }
      }
      console.log(`Found ${registry[methodId].length} images in folder '${methodId}'`);
    }
  }

  // Create component directory if it doesn't exist
  const registryDir = path.dirname(REGISTRY_FILE);
  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true });
  }

  await fs.promises.writeFile(REGISTRY_FILE, JSON.stringify(registry, null, 2));
  console.log(`Successfully generated registry at: ${REGISTRY_FILE}`);
}

main().catch(console.error);
