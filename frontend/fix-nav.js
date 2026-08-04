const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app');

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach((file) => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  // Skip layout.tsx since we are going to modify it manually
  if (file.endsWith('layout.tsx')) return;

  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Remove imports
  content = content.replace(/import\s+Header\s+from\s+["'].*Header["'];?\n?/g, '');
  content = content.replace(/import\s+StickyHeader\s+from\s+["'].*StickyHeader["'];?\n?/g, '');
  
  // Remove component tags
  content = content.replace(/<Header\s*\/>\n?/g, '');
  content = content.replace(/<StickyHeader\s*\/>\n?/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Modified:', file);
  }
});
console.log('Done');
