const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SAMPLES_DIR = path.join(__dirname, "../public");
const SRC_DIRS = [
  path.join(__dirname, "../app"),
  path.join(__dirname, "../component"),
  path.join(__dirname, "../config")
];

const MAX_WIDTH = 1600;
const QUALITY = 80;

const renameMap = {};

// Helper to check if a directory is one of the target public directories
function shouldProcessSvg(dirPath) {
  const normalized = dirPath.replace(/\\/g, "/");
  return normalized.includes("/public/categories") || normalized.includes("/public/hero-ai-images");
}

async function optimizeImage(filePath, dirPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const baseName = path.basename(filename, ext);
  
  // Decide if we should process this file
  let shouldProcess = false;
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    shouldProcess = true;
  } else if (ext === ".svg" && shouldProcessSvg(dirPath)) {
    // Only optimize SVG if it's in categories or hero-ai-images (we know they are base64 heavy rasters)
    shouldProcess = true;
  }

  if (!shouldProcess) return;

  // Skip favicon/manifest system files to avoid breaking browser metadata
  if (
    filename.startsWith("favicon") || 
    filename.includes("manifest") || 
    filename.startsWith("apple-icon") ||
    filename.startsWith("icon")
  ) {
    return;
  }

  const webpName = baseName + ".webp";
  const webpPath = path.join(dirPath, webpName);

  try {
    const stats = await fs.promises.stat(filePath);
    const originalSize = stats.size;
    console.log(`Optimizing: ${path.relative(SAMPLES_DIR, filePath)} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);

    await sharp(filePath)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true
      })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newStats = await fs.promises.stat(webpPath);
    const newSize = newStats.size;

    console.log(`  -> Saved as ${webpName} (${(newSize / 1024).toFixed(2)} KB). Saved ${((1 - newSize / originalSize) * 100).toFixed(1)}%`);

    // Delete original file
    await fs.promises.unlink(filePath);

    // Save mapping for search-and-replace
    renameMap[filename] = webpName;
  } catch (err) {
    console.error(`Failed to optimize ${filename}:`, err);
  }
}

async function walkDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip favicon-for-public directory
      if (entry.name === "favicon-for-public") continue;
      await walkDir(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath, dir, entry.name);
    }
  }
}

async function updateReferences(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await updateReferences(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".js", ".jsx", ".css", ".json"].includes(ext)) {
        let content = await fs.promises.readFile(fullPath, "utf8");
        let modified = false;

        for (const [oldName, newName] of Object.entries(renameMap)) {
          if (content.includes(oldName)) {
            // Replace occurrences
            content = content.split(oldName).join(newName);
            modified = true;
            console.log(`  Reference replaced in: ${path.relative(path.join(__dirname, ".."), fullPath)} [${oldName} -> ${newName}]`);
          }
        }

        if (modified) {
          await fs.promises.writeFile(fullPath, content, "utf8");
        }
      }
    }
  }
}

async function main() {
  console.log("Starting full site image optimization...");
  await walkDir(SAMPLES_DIR);

  console.log("\nImage optimization complete. Updating codebase references...");
  
  for (const srcDir of SRC_DIRS) {
    if (fs.existsSync(srcDir)) {
      console.log(`Scanning references in ${path.basename(srcDir)}...`);
      await updateReferences(srcDir);
    }
  }

  console.log("\nAll references updated successfully!");
}

main().catch(console.error);
