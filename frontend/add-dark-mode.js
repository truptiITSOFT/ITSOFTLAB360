const fs = require('fs');
const path = require('path');

const files = [
  'src/app/LightModeHome.tsx',
  'src/app/home/components/HeroSection.tsx',
  'src/app/home/components/SolutionsGrid.tsx',
  'src/app/home/components/EcosystemShowcase.tsx',
  'src/app/home/components/WorkflowSection.tsx',
  'src/app/home/components/BenefitsSection.tsx',
  'src/app/home/components/FranchisePromo.tsx',
  'src/app/home/components/FinalCTA.tsx',
  'src/app/home/components/Footer.tsx'
].map(f => path.join(__dirname, f));

const replacements = [
  { regex: /(?<!dark:)bg-\[#FBFAF5\]/g, replacement: 'bg-[#FBFAF5] dark:bg-[#030816]' },
  { regex: /(?<!dark:)bg-white(?!\/)/g, replacement: 'bg-white dark:bg-[#0A1125]' },
  { regex: /(?<!dark:)bg-slate-50/g, replacement: 'bg-slate-50 dark:bg-[#030816]' },
  { regex: /(?<!dark:)bg-gray-50/g, replacement: 'bg-gray-50 dark:bg-[#030816]' },
  { regex: /(?<!dark:)text-\[#111A4A\]/g, replacement: 'text-[#111A4A] dark:text-white' },
  { regex: /(?<!dark:)text-\[#15172B\]/g, replacement: 'text-[#15172B] dark:text-gray-100' },
  { regex: /(?<!dark:)text-\[#15172B\]\/80/g, replacement: 'text-[#15172B]/80 dark:text-gray-300' },
  { regex: /(?<!dark:)text-slate-900/g, replacement: 'text-slate-900 dark:text-gray-100' },
  { regex: /(?<!dark:)text-gray-900/g, replacement: 'text-gray-900 dark:text-gray-100' },
  { regex: /(?<!dark:)text-slate-800/g, replacement: 'text-slate-800 dark:text-gray-200' },
  { regex: /(?<!dark:)text-gray-800/g, replacement: 'text-gray-800 dark:text-gray-200' },
  { regex: /(?<!dark:)text-slate-700/g, replacement: 'text-slate-700 dark:text-gray-200' },
  { regex: /(?<!dark:)text-gray-700/g, replacement: 'text-gray-700 dark:text-gray-200' },
  { regex: /(?<!dark:)text-slate-600/g, replacement: 'text-slate-600 dark:text-gray-300' },
  { regex: /(?<!dark:)text-gray-600/g, replacement: 'text-gray-600 dark:text-gray-300' },
  { regex: /(?<!dark:)text-slate-500/g, replacement: 'text-slate-500 dark:text-gray-400' },
  { regex: /(?<!dark:)text-gray-500/g, replacement: 'text-gray-500 dark:text-gray-400' },
  { regex: /(?<!dark:)border-gray-100/g, replacement: 'border-gray-100 dark:border-white/5' },
  { regex: /(?<!dark:)border-gray-200/g, replacement: 'border-gray-200 dark:border-white/10' },
  { regex: /(?<!dark:)border-slate-100/g, replacement: 'border-slate-100 dark:border-white/5' },
  { regex: /(?<!dark:)border-slate-200/g, replacement: 'border-slate-200 dark:border-white/10' },
  { regex: /(?<!dark:)shadow-sm/g, replacement: 'shadow-sm dark:shadow-none' },
  { regex: /(?<!dark:)shadow-md/g, replacement: 'shadow-md dark:shadow-none' },
  { regex: /(?<!dark:)shadow-lg/g, replacement: 'shadow-lg dark:shadow-none' },
  { regex: /(?<!dark:)shadow-xl/g, replacement: 'shadow-xl dark:shadow-none' },
  { regex: /(?<!dark:)border-\[#111A4A\]\/10/g, replacement: 'border-[#111A4A]/10 dark:border-white/10' },
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    replacements.forEach(r => {
      content = content.replace(r.regex, r.replacement);
    });

    if (content !== original) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log('Modified:', file);
    }
  } else {
    console.log('Not found:', file);
  }
});
console.log('Done');
