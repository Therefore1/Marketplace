const fs = require('fs');

// UPDATE HOME.JSX
let homeData = fs.readFileSync('src/components/Home.jsx', 'utf8');

homeData = homeData.replace(
  "import React from 'react';",
  "import React from 'react';\nimport { Link } from 'react-router-dom';"
);

homeData = homeData.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">[\s\S]*?<\/div>/,
  `<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link to="/products" state={{ category: 'Plantes' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">eco</span>
                <span className="font-bold text-on-surface-variant">Plantes</span>
              </div>
            </Link>
            <Link to="/products" state={{ category: 'Semences' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-primary-container/10 rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">grass</span>
                <span className="font-bold text-on-surface-variant">Semences</span>
              </div>
            </Link>
            <Link to="/products" state={{ category: 'Engrais' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">science</span>
                <span className="font-bold text-on-surface-variant">Engrais</span>
              </div>
            </Link>
            <Link to="/products" state={{ category: 'Matériel' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">handyman</span>
                <span className="font-bold text-on-surface-variant">Matériel</span>
              </div>
            </Link>
            <Link to="/products" state={{ category: 'Phytosanitaires' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">pest_control</span>
                <span className="font-bold text-on-surface-variant">Phytosanitaires</span>
              </div>
            </Link>
            <Link to="/products" state={{ category: 'Capteurs IoT' }} className="group relative aspect-square lg:aspect-auto lg:h-64 bg-tertiary-container/10 rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-3">sensors</span>
                <span className="font-bold text-on-surface-variant">Capteurs IoT</span>
              </div>
            </Link>
          </div>`
);

fs.writeFileSync('src/components/Home.jsx', homeData);

// UPDATE PRODUCTS.JSX
let prodData = fs.readFileSync('src/components/Products.jsx', 'utf8');

prodData = prodData.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);
prodData = prodData.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link, useLocation } from 'react-router-dom';"
);

prodData = prodData.replace(
  /const Products = \(\) => {[\s\n]*const \[activeCategory, setActiveCategory\] = useState\('All Products'\);/,
  `const Products = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All Products');
  
  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state?.category]);`
);


fs.writeFileSync('src/components/Products.jsx', prodData);
console.log('Routing and category links applied!');
