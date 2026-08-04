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
  { regex: /(?<!dark:)from-\[#EEF0FF\]\/60/g, replacement: 'from-[#EEF0FF]/60 dark:from-[#060D1E]' },
  { regex: /(?<!dark:)to-\[#FBFAF5\]/g, replacement: 'to-[#FBFAF5] dark:to-[#030816]' },
  { regex: /(?<!dark:)bg-\[#F5C842\]\/5/g, replacement: 'bg-[#F5C842]/5 dark:bg-[#F5C842]/20' }, // Increase opacity of glowing elements
  { regex: /(?<!dark:)text-\[#111A4A\]\/80/g, replacement: 'text-[#111A4A]/80 dark:text-gray-200' },
  { regex: /(?<!dark:)border-\[#111A4A\]/g, replacement: 'border-[#111A4A] dark:border-white' },
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
  }
});
console.log('Done gradients pass');
