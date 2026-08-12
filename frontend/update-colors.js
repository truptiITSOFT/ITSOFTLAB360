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
      if (file.endsWith('.tsx') && !file.includes('LightModeHome.tsx') && !file.includes('home\\components') && !file.includes('home/components')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/app'));

// Adding src/components to the search path to catch global components (Header, ChatWidget, etc)
const componentFiles = walk(path.join(__dirname, 'src/components'));
const allFiles = [...files, ...componentFiles];

const replacements = [
  // Primary Brand Color (Coral Red)
  { regex: /(?<!dark:)bg-blue-600/g, replacement: 'bg-[#EB3158]' },
  { regex: /(?<!dark:)bg-blue-500(?![\/\w])/g, replacement: 'bg-[#EB3158]' }, // match bg-blue-500 but not bg-blue-500/10
  { regex: /(?<!dark:)hover:bg-blue-500/g, replacement: 'hover:bg-[#d6274d]' },
  { regex: /(?<!dark:)hover:bg-blue-600/g, replacement: 'hover:bg-[#d6274d]' },
  { regex: /(?<!dark:)hover:bg-blue-700/g, replacement: 'hover:bg-[#d6274d]' },
  { regex: /(?<!dark:)text-blue-600/g, replacement: 'text-[#EB3158]' },
  { regex: /(?<!dark:)text-blue-500/g, replacement: 'text-[#EB3158]' },
  { regex: /(?<!dark:)border-blue-500(?!\/)/g, replacement: 'border-[#EB3158]/50' },
  { regex: /(?<!dark:)border-blue-600(?!\/)/g, replacement: 'border-[#EB3158]/50' },
  
  // Glows / Accents
  { regex: /(?<!dark:)bg-blue-500\/10/g, replacement: 'bg-[#EB3158]/10' },
  { regex: /(?<!dark:)bg-blue-600\/10/g, replacement: 'bg-[#EB3158]/10' },
  { regex: /(?<!dark:)bg-blue-600\/20/g, replacement: 'bg-[#EB3158]/20' },
  { regex: /(?<!dark:)text-blue-400/g, replacement: 'text-[#EB3158]' }, // For glowing text
  
  // Secondary glow (Purple to Yellow)
  { regex: /(?<!dark:)bg-purple-600\/10/g, replacement: 'bg-[#F5C842]/10' },
  
  // Typography (Navy Blue / Deep Slate)
  { regex: /(?<!dark:)text-slate-900/g, replacement: 'text-[#111A4A]' },
  { regex: /(?<!dark:)text-gray-900/g, replacement: 'text-[#111A4A]' },
  { regex: /(?<!dark:)text-slate-800/g, replacement: 'text-[#15172B]' },
  { regex: /(?<!dark:)text-gray-800/g, replacement: 'text-[#15172B]' },
  { regex: /(?<!dark:)text-slate-600/g, replacement: 'text-[#15172B]/80' },
  { regex: /(?<!dark:)text-gray-600/g, replacement: 'text-[#15172B]/80' },
  { regex: /(?<!dark:)text-slate-500/g, replacement: 'text-[#15172B]/60' },
  { regex: /(?<!dark:)text-gray-500/g, replacement: 'text-[#15172B]/60' },
  
  // Background & Borders
  { regex: /(?<!dark:)border-gray-200/g, replacement: 'border-[#111A4A]/10' },
  { regex: /(?<!dark:)border-slate-200/g, replacement: 'border-[#111A4A]/10' },
];

let modifiedCount = 0;

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  replacements.forEach(r => {
    content = content.replace(r.regex, r.replacement);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Modified:', file);
    modifiedCount++;
  }
});

console.log(`Done updating colors in ${modifiedCount} files`);

