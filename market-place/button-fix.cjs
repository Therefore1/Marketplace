const fs = require('fs');
let code = fs.readFileSync('src/components/Products.jsx', 'utf8');

if (!code.includes("import { Link }")) {
  code = code.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';");
}

const blockRegex = /<button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary\/20">\s*<span className="material-symbols-outlined">(shopping_cart|info)<\/span>\s*<\/button>/g;

let count = 0;
code = code.replace(blockRegex, (match, iconName) => {
    count++;
    return `<div className="flex items-center gap-2">
                    <Link to="/product/${count}" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    ${match}
                  </div>`;
});

fs.writeFileSync('src/components/Products.jsx', code);
console.log('Replaced ' + count + ' buttons');
