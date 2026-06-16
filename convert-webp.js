const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');
const SRC_DIR = path.join(__dirname, 'src');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const newPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        console.log(`Converting ${fullPath} to ${newPath}`);
        try {
          await sharp(fullPath)
            .webp({ quality: 85 })
            .toFile(newPath);
          fs.unlinkSync(fullPath);
          console.log(`Deleted original: ${fullPath}`);
        } catch (e) {
          console.error(`Failed to convert ${fullPath}:`, e);
        }
      }
    }
  }
}

function updateCodeReferences(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateCodeReferences(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.tsx', '.ts', '.css', '.md'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content.replace(/\.png/g, '.webp')
                               .replace(/\.jpg/g, '.webp')
                               .replace(/\.jpeg/g, '.webp');
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated references in ${fullPath}`);
        }
      }
    }
  }
}

async function run() {
  console.log("Starting WebP conversion...");
  await processDirectory(PUBLIC_DIR);
  console.log("Updating code references...");
  updateCodeReferences(SRC_DIR);
  updateCodeReferences(path.join(__dirname, 'public')); // in case there are HTML or JSON files
  console.log("Done!");
}

run();
