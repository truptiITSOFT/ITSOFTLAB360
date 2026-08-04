const fs = require('fs');
const path = require('path');

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach((file) => {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/app'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Find <main className="..."> and remove background/text classes
  content = content.replace(/(<main\s+className="[^"]*min-h-screen[^"]*")/, (match) => {
    return match
      .replace(/\sbg-slate-50/g, '')
      .replace(/\sbg-gray-50/g, '')
      .replace(/\sbg-white/g, '')
      .replace(/\sbg-\[#FBFAF5\]/g, '')
      .replace(/\sbg-\[#020617\]/g, '')
      .replace(/\sbg-\[#030816\]/g, '')
      .replace(/\sbg-slate-900/g, '')
      .replace(/\sdark:bg-\[#020617\]/g, '')
      .replace(/\sdark:bg-\[#030816\]/g, '')
      .replace(/\sdark:bg-\[#0a1125\]/g, '')
      .replace(/\sdark:bg-slate-900/g, '')
      .replace(/\stext-\[#15172B\]/g, '')
      .replace(/\stext-slate-900/g, '')
      .replace(/\sdark:text-white/g, '')
      .replace(/\sdark:text-gray-100/g, '');
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Modified:', file);
  }
});
console.log('Done stripping main backgrounds');
