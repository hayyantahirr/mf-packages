const fs = require("fs");
const path = require("path");

let sharp;
try {
  sharp = require("sharp");
} catch (e) {
  console.error("Error: 'sharp' is not installed. Please run 'npm install -D sharp' first.");
  process.exit(1);
}

const SAMPLES_DIR = path.join(__dirname, "../public/printing_sample");
const MAX_WIDTH = 1600; // Limit maximum resolution to standard high-quality desktop size
const WEBP_QUALITY = 80; // 80% WebP quality is highly optimized and virtually indistinguishable from 100%

async function getFileSize(filePath) {
  const stats = await fs.promises.stat(filePath);
  return stats.size;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function optimizeDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  
  let totalSaved = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const { saved, count } = await optimizeDir(fullPath);
      totalSaved += saved;
      totalCount += count;
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // Optimize JPG, JPEG, and PNG files
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
        const webpPath = fullPath.substring(0, fullPath.lastIndexOf(".")) + ".webp";
        
        try {
          const originalSize = await getFileSize(fullPath);
          console.log(`Optimizing: ${entry.name} (${formatBytes(originalSize)}) ...`);

          // Perform resizing and WebP conversion
          await sharp(fullPath)
            .resize({
              width: MAX_WIDTH,
              withoutEnlargement: true, // Don't enlarge if image is smaller than MAX_WIDTH
            })
            .webp({ quality: WEBP_QUALITY })
            .toFile(webpPath);

          const newSize = await getFileSize(webpPath);
          const savedBytes = originalSize - newSize;
          totalSaved += savedBytes;
          totalCount++;

          // Delete the original heavy file
          await fs.promises.unlink(fullPath);

          const pctSaved = ((savedBytes / originalSize) * 100).toFixed(1);
          console.log(`  -> Saved as ${path.basename(webpPath)} (${formatBytes(newSize)}). Reduced by ${pctSaved}%!`);
        } catch (err) {
          console.error(`Failed to optimize ${entry.name}:`, err);
        }
      }
    }
  }

  return { saved: totalSaved, count: totalCount };
}

async function main() {
  console.log(`Starting image optimization under: ${SAMPLES_DIR}`);
  if (!fs.existsSync(SAMPLES_DIR)) {
    console.error("Printing samples directory not found!");
    return;
  }
  
  const startTime = Date.now();
  const { saved, count } = await optimizeDir(SAMPLES_DIR);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n====================================");
  console.log(`Optimization Completed in ${duration}s!`);
  console.log(`Optimized ${count} images.`);
  console.log(`Total storage size reduced by: ${formatBytes(saved)}`);
  console.log("====================================");
}

main().catch(console.error);
