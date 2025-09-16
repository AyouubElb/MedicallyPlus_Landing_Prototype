// make-dist.js
const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const items = fs.readdirSync(src, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);
    if (item.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
  return true;
}

const candidates = ['dist', 'build', 'out', 'public'];
let copied = false;

for (const name of candidates) {
  if (name === 'dist' && fs.existsSync('dist')) {
    console.log('dist already exists — nothing to do.');
    copied = true;
    break;
  }
  if (fs.existsSync(name)) {
    console.log(`Found "${name}". Copying its contents to "dist"...`);
    copyDir(name, 'dist');
    copied = true;
    break;
  }
}

if (!copied) {
  console.error('No build output found. I looked for: ' + candidates.join(', '));
  process.exit(1);
}
console.log('dist folder is ready.');
