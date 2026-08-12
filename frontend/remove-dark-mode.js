const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.push(path.join(__dirname, 'tailwind.config.ts'));

let totalReplaced = 0;

files.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Regex to remove dark mode classes: dark:something
  // Matches "dark:" followed by non-space, non-quote characters
  // E.g., dark:text-white, dark:hover:bg-[#123], dark:bg-white/10
  // It handles replacing them with an empty string, leaving other classes intact.
  const newContent = content.replace(/\bdark:[^\s"'`]+/g, '');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    totalReplaced++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Total files updated: ${totalReplaced}`);
