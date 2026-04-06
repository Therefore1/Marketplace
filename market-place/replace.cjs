const fs = require('fs');
let code = fs.readFileSync('src/components/Products.jsx', 'utf8');

const regex = /<button className="(w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary\/20)">\s*<span className="material-symbols-outlined">(shopping_cart|info)<\/span>\s*<\/button>/g;

code = code.replace(regex, (match, classes, icon) => {
    return `<Link to="/cart" className="${classes}">
                    <span className="material-symbols-outlined">${icon}</span>
                  </Link>`;
});

fs.writeFileSync('src/components/Products.jsx', code);
console.log('Replaced');
