const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const HEX_REGEX = /#(00[dD]4[fF]{2}|00[bB]8[dD]4)/g;
// Replace rgba with exactly rgb values
const RGBA_REGEX = /rgba\(\s*0\s*,\s*212\s*,\s*255\s*,\s*([^)]+)\)/g;

walkDir(srcDir, (filePath) => {
  // Skip the one file we don't want to change
  if (filePath.endsWith('CodingPlatforms.jsx')) {
    console.log(`Skipping: ${filePath}`);
    return;
  }
  
  // Only target JSX and CSS files
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.css')) return;

  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  let changed = false;

  if (HEX_REGEX.test(newContent)) {
    newContent = newContent.replace(HEX_REGEX, 'var(--color-neon)');
    changed = true;
  }

  if (RGBA_REGEX.test(newContent)) {
    newContent = newContent.replace(RGBA_REGEX, 'rgba(var(--neon-rgb), $1)');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
});
