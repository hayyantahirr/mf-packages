const fs = require("fs");
const path = require("path");

let heicConvert;
try {
  heicConvert = require("heic-convert");
} catch (e) {
  console.error("Error: 'heic-convert' is not installed. Please run 'npm install -D heic-convert' first.");
  process.exit(1);
}

const SAMPLES_DIR = path.join(__dirname, "../public/printing_sample");

async function convertDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await convertDir(fullPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".heic")) {
      const jpgPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + ".jpg";
      console.log(`Converting: ${entry.name} ...`);
      try {
        const inputBuffer = await fs.promises.readFile(fullPath);
        const outputBuffer = await heicConvert({
          buffer: inputBuffer,
          format: "JPEG",
          quality: 0.8, // 80% quality is a sweet spot for web size vs clarity
        });
        await fs.promises.writeFile(jpgPath, outputBuffer);
        await fs.promises.unlink(fullPath);
        console.log(`Successfully converted to ${path.basename(jpgPath)}`);
      } catch (err) {
        console.error(`Failed to convert ${entry.name}:`, err);
      }
    }
  }
}

async function main() {
  console.log(`Scanning printing samples under: ${SAMPLES_DIR}`);
  if (!fs.existsSync(SAMPLES_DIR)) {
    console.error("Printing samples directory not found!");
    return;
  }
  await convertDir(SAMPLES_DIR);
  console.log("HEIC to JPG conversion complete!");
}

main().catch(console.error);
