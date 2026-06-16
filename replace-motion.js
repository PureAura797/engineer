const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

function updateCodeReferences(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateCodeReferences(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.tsx', '.ts'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Skip if already has LazyMotion (e.g. SmoothScrollProvider) to avoid messing it up if it uses motion
        // Actually, SmoothScrollProvider doesn't import motion.
        
        let newContent = content;
        
        // Replace imports: import { motion, AnimatePresence } from "framer-motion" -> import { m, AnimatePresence } from "framer-motion"
        newContent = newContent.replace(/import\s+{([^}]*)\bmotion\b([^}]*)}\s+from\s+['"]framer-motion['"]/g, (match, p1, p2) => {
          return `import {${p1}m${p2}} from "framer-motion"`;
        });
        
        // Replace tags
        newContent = newContent.replace(/<motion\./g, '<m.');
        newContent = newContent.replace(/<\/motion\./g, '</m.');
        // Also handling AnimatePresence if needed, but it stays the same.
        // Also motion(Component) to m(Component)
        newContent = newContent.replace(/\bmotion\(/g, 'm(');
        
        // If there's motion.div( without brackets (styled-components style), replace too
        // Framer motion uses motion.div, motion.span.
        
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated references in ${fullPath}`);
        }
      }
    }
  }
}

console.log("Starting motion to m replacement...");
updateCodeReferences(SRC_DIR);
console.log("Done!");
