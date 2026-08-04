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
  { regex: /(?<!dark:)bg-white\/(\d+)/g, replacement: 'bg-white/$1 dark:bg-[#060D1E]/$1' },
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
console.log('Done opacity/invert passes');
