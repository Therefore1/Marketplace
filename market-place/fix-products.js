const fs = require('fs');
let code = fs.readFileSync('src/components/Products.jsx', 'utf8');

// Fix the container flex
code = code.replace(/className="group bg-surface-container-lowest/g, 'className="group flex flex-col h-full bg-surface-container-lowest');
code = code.replace(/<div className="p-5 flex flex-col h-full">/g, '<div className="p-5 flex flex-col flex-1">');

// Fix the prices
code = code.replace(/\$124,500/g, '1 245 000 DH');
code = code.replace(/\$42\.00 \/ bag/g, '420 DH / sac');
code = code.replace(/\$899\.00/g, '8 990 DH');
code = code.replace(/\$12,000/g, '120 000 DH');
code = code.replace(/\$155\.00/g, '1 550 DH');
code = code.replace(/\$2\.50 \/ unit/g, '25 DH / unité');
code = code.replace(/\$45,000/g, '450 000 DH');
code = code.replace(/\$650,000/g, '6 500 000 DH');

fs.writeFileSync('src/components/Products.jsx', code);
console.log('Done!');
