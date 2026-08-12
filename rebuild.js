const fs = require('fs');
const https = require('https');

const targetFile = 'frontend/src/components/franchise/IndiaNetwork.tsx';

const newCities = const CITIES = [
  { name: "Delhi", top: "26%", left: "32%" },
  { name: "Mumbai", top: "57%", left: "17%" },
  { name: "Bengaluru", top: "75%", left: "30%" },
  { name: "Hyderabad", top: "61%", left: "34%" },
  { name: "Pune", top: "59%", left: "20%" },
  { name: "Ahmedabad", top: "45%", left: "14%" },
  { name: "Jaipur", top: "33%", left: "26%" },
  { name: "Kolkata", top: "47%", left: "62%" },
  { name: "Chennai", top: "73%", left: "38%" },
  { name: "Indore", top: "48%", left: "26%" },
];\n\nconst REGIONAL_PARTNERS = [\n  { top: "32%", left: "38%" }, { top: "34%", left: "39%" }, { top: "48%", left: "32%" },\n  { top: "45%", left: "28%" }, { top: "51%", left: "17%" }, { top: "48%", left: "16%" },\n  { top: "48%", left: "11%" }, { top: "22%", left: "31%" }, { top: "21%", left: "29%" },\n  { top: "19%", left: "26%" }, { top: "31%", left: "34%" }, { top: "38%", left: "45%" },\n  { top: "39%", left: "51%" }, { top: "45%", left: "52%" }, { top: "52%", left: "54%" },\n  { top: "38%", left: "74%" }, { top: "82%", left: "29%" }, { top: "86%", left: "31%" },\n  { top: "79%", left: "32%" }, { top: "82%", left: "34%" }, { top: "76%", left: "28%" },\n  { top: "73%", left: "24%" }, { top: "67%", left: "25%" }, { top: "66%", left: "19%" },\n  { top: "55%", left: "20%" }, { top: "56%", left: "24%" }, { top: "62%", left: "26%" },\n  { top: "48%", left: "44%" }, { top: "44%", left: "35%" }, { top: "36%", left: "32%" },\n  { top: "35%", left: "20%" }, { top: "40%", left: "19%" }, { top: "30%", left: "21%" },\n  { top: "20%", left: "27%" }, { top: "24%", left: "34%" }, { top: "22%", left: "33%" },\n  { top: "11%", left: "27%" }, { top: "14%", left: "28%" }, { top: "60%", left: "48%" },\n  { top: "64%", left: "43%" }, { top: "71%", left: "39%" }\n];;

const newStats = <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">\n                <span className="text-blue-400 font-bold text-xl">{CITIES.length}</span>\n              </div>\n              <p className="text-sm text-blue-100 font-medium">Major Cities Covered</p>\n            </div>\n            <div className="flex items-center gap-4">\n              <div className="w-12 h-12 rounded-full bg-[#EB3158]/20 flex items-center justify-center border border-[#EB3158]/50">\n                <span className="text-[#EB3158] font-bold text-xl">{CITIES.length + REGIONAL_PARTNERS.length}+</span>\n              </div>\n              <p className="text-sm text-blue-100 font-medium">Active Regional Partners</p>;

const newNodes = {/* Regional Partner Nodes */}\n            {REGIONAL_PARTNERS.map((partner, i) => (\n              <motion.div\n                key={\partner-\\}\n                initial={{ opacity: 0, scale: 0 }}\n                whileInView={{ opacity: 0.6, scale: 1 }}\n                viewport={{ once: true }}\n                transition={{ type: "spring", delay: 0.8 + (i * 0.02) }}\n                className="absolute flex items-center justify-center z-0"\n                style={{ top: partner.top, left: partner.left, transform: 'translate(-50%, -50%)' }}\n              >\n                <div className={\ounded-full h-1 w-1 md:h-1.5 md:w-1.5 \\}></div>\n              </motion.div>\n            ))}\n\n            {/* City Nodes */};

https.get('https://raw.githubusercontent.com/djaiss/mapsicon/master/all/in/vector.svg', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/<path d="([^"]+)"/);
    if(m) {
      const path = m[1].replace(/\n/g, ' ');
      let c = fs.readFileSync(targetFile, 'utf8');
      
      c = c.replace(/const CITIES = \[\s*\{[\s\S]*?\];/m, newCities);
      
      c = c.replace(/<div className="w-12 h-12 rounded-full bg-blue-500\/20 flex items-center justify-center border border-blue-500\/50">[\s\S]*?<p className="text-sm text-blue-100 font-medium">Active Regional Partners<\/p>/m, newStats);
      
      c = c.replace(/<svg viewBox="0 0 100 100"[\s\S]*?<\/svg>/m, 
<svg viewBox="0 0 1024 1024" className="w-full h-full drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" fill="rgba(59,130,246,0.05)" stroke="rgba(59,130,246,0.4)" strokeWidth="15">
                <path d="+path+" />
              </g>
            </svg>);

      c = c.replace(/\{\/\* City Nodes \*\/\}/m, newNodes);

      fs.writeFileSync(targetFile, c, 'utf8');
      console.log('Success');
    }
  });
});
