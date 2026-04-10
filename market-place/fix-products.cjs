const fs = require('fs');

const data = fs.readFileSync('src/components/Products.jsx', 'utf8');

let updatedData = data.replace(
  "import React from 'react';", 
  "import React, { useState } from 'react';"
);

let newData = updatedData.replace(
  "const Products = () => {",
  `const productsData = [
  {
    id: 1,
    name: "Precision-Track 400XT",
    category: "Matériel",
    price: "1 245 000 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFyaAv34LIZQS6o1Hn-yv40GunFyI8yRqqsz-P7HxGejVvgR7DOy5wquldxITVGt4whq_j0OH4rlKr0V0OxpTjImUr5jyxC5uSXbBKlQYPniLUJRW5lsDPDpy34MisZY4TsItzSHDPH3-4KCXwb8XmvCyps5byRnvfYFP0t7_eeAMWg5u8YlReK5SOkDo1sdHt5jCUSCLXOIrD9DgoH0Ao1BJdvLOhzX7pMlQCLcRnKptyHC73lMypbdfE6r2rdVpAuvhk5EgFeUo",
    availability: "In Stock"
  },
  {
    id: 2,
    name: "Heirloom Winter Wheat",
    category: "Semences",
    price: "420 DH / sac",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtmGEZGtY1LD4s4wkCMhWdEwWv_YzORWKkBAqPqwN8TAYTMSWMOYI-80-PijqCH1G4fsLKw4exX7ZIt3rkL6lEAqVOVF17kK8-7WOdhLBggiL4HRP4MREji7Sv9DasmCkgu0AAsFSRO3at4RK5LZUpWhkFX0nlRIMFd36G-SwyDCRrdUW8FNJNVL8Yv43-v6adBkkmj2PEMh24iCuLtYi5pXUcy6bIUmc2A61qMFGeJ9kxDeY2jxuYR49WXkVPYNq8eqnR18OekGQ",
    availability: "Limited Stock",
    availabilityBg: "bg-tertiary-container",
    availabilityText: "text-on-tertiary-container"
  },
  {
    id: 3,
    name: "SoilSense IoT Hub v2",
    category: "Capteurs IoT",
    price: "8 990 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOFxFF9Fj9X5vMcYTjadqbpk87bJfywhuapDPyYnQk3vWi9aCmqIeGPVSLgb91zUDWMZhB4o_kCe0onxcBk0xrOaPPcyQlzfeb5G5BRk7lSLy5324sBpMyOJ7je9hucetDfZlR9goKb4LhE_3r0GDdv__1y-h2Fhh57CvlRyY5481KSgaFnZMG47MgCySr3K4OPqyEEJPPT1t5v5CCg4Z-KOXW-oiUfou6a53DnjtjEVYFis4fUsWmr3LoB-3br0jgSJQndLNAw7U",
    availability: "In Stock"
  },
  {
    id: 4,
    name: "Cerisiers 'Bigarreau' (Lot 20)",
    category: "Plantes",
    price: "3 200 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaybp1bFdjjwfnn7EXjO89WpDnP4c4eo1mHMFJCUQ3dGU-TJDKIitBIZlZF_AuqA0BeEiGizNCTmCWYVv1xsEB-btxsTm8e4UoyVtQb5uXsDQgqdu4yyKrBwc0hy0AyM0zwzHizaqpxfd_zLExDkv1PC2-wuquSapbsFPiDYe2u2GV-tdveoTKEnD2DQSjjCNc8rNeUljjusk_U8vSI86IV1qgC9_2DPyBy8_6vZyCGeBjLnvTOHstJbkpHvYybVm9liiaRyO1Ka0",
    availability: "In Stock"
  },
  {
    id: 5,
    name: "Nitro-Boost Organic",
    category: "Engrais",
    price: "1 550 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjF2-Jc5WWEea0Ppi4iMeTErRB5OS9GaZPORnwACAFF-bqkVsyxAJb9ebKzlK9Ls3xg-wcUuUH_a1n1FIHWRom8YFIz2jKcU4cXZVrbMZRYIgUuzr1ipzXCO3yqdwLahDNmgdutXqnBY1OtTAOo_Xa95s_1Ge1VjcUTrcKRY64EiowSi6lG2MHyyx8K3JiNL2L_ZC5IPmwc-LZS6Ap21tGr6Ur4sqBEERH9LjdTSmEAhIER1GSMz7x6EU0yAea5V-PNDwUPpYhJkY",
    availability: "In Stock"
  },
  {
    id: 6,
    name: "Hybrid Douglas Fir Saplings",
    category: "Semences",
    price: "25 DH / unité",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL33nqlZAgnyXIXG6N5FccFulp-ePEs35TzROrNUz8zif2x5p8elwAq5qvgyukJv4WXK9A7EIHoLjgT19n4Y8191ZXYgBQojKMPEFbJGoaq8GTk7Dx0edcvtuBiUOSXWEdFOay_KISSWyzzPzFhT4uChRII_iGq_np9nRXOlU2P6DpnJg4z_rQR41CZa4OFprYhHnXMD23CIzEiLxe_yn-NfSkst-T6EuyRXdnRVSDN_RKXT-O5N4tNnr9aov371Gv1f3wBOY1t5s",
    availability: "Limited Stock",
    availabilityBg: "bg-tertiary-container",
    availabilityText: "text-on-tertiary-container"
  },
  {
    id: 7,
    name: "Aero-Weeder Pro",
    category: "Matériel",
    price: "450 000 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDhx7HlewOSMAWf1SBYzX3gumVvkD3q4LPNaRuWrKNY7-cq1j8YZryAQy8JAKGx8GVfhG8vAarY9B8SEfOCz58Jaj1NETBMJse1kuqTCWhkONIrb1X-iiIXw9XybWC-iqbuOkDRsi_XQuokk-86yPJBE9QlMXumikzXOHzMomw9XnXKKJrJnURaH35uatM1VCfpqTV-JSPELKUBbyEUPX5jfa5dtcahENlfL0UpvC47nH4cFUFr5Bvgopqd14fr9jwwRvPZRuCino",
    availability: "In Stock"
  },
  {
    id: 8,
    name: "Fongicide Bio-Protect (20L)",
    category: "Phytosanitaires",
    price: "6 500 DH",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_4QpcaOpxoEEOxYDZNnR9sMBC3jQEC63_SlWgYbkwkGUuR92cPTymTpWB_rHTeuXceSn4OjpGhSyMG851QK7l0VgU-CnQQtClrCOQNcNJTy7lw7RukS6RpGvhFTwqm_P3Eep_ngJ0CNyXPQKy6SWX_-auYx3i5_kNdRKmjtVoqbLGVe9XMgcG0PLuJZErlzH7_gT7ggu2wwit2f8IA7ySJlkM7ylr567OjYuTnXcH0ply6ABGZySwflrqOZq66aFXK5wQLXPYaY8",
    availability: "In Stock"
  }
];

const categoriesData = [
  { id: 'All Products', name: 'All Products', icon: 'agriculture' },
  { id: 'Plantes', name: 'Plantes', icon: 'eco' },
  { id: 'Semences', name: 'Semences', icon: 'grass' },
  { id: 'Engrais', name: 'Engrais', icon: 'science' },
  { id: 'Matériel', name: 'Matériel', icon: 'handyman' },
  { id: 'Phytosanitaires', name: 'Phytosanitaires', icon: 'pest_control' },
  { id: 'Capteurs IoT', name: 'Capteurs IoT', icon: 'sensors' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts = activeCategory === 'All Products' 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);
`
);

let result = newData.replace(
  /<div className="space-y-1">[\s\S]*?<\/div>\s*<div className="mt-8 space-y-4">/,
  `<div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 px-4">Categories</p>
            {categoriesData.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={\`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all \${
                  activeCategory === cat.id 
                    ? 'bg-green-800 dark:bg-green-700 text-white dark:text-stone-50 font-bold active:translate-x-1 shadow-sm' 
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                }\`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span className="font-inter text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-4">`
);

let regexProducts = /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">[\s\S]*?{.*?\/\* Pagination Area \*\//;
result = result.replace(
  regexProducts,
  `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative aspect-square overflow-hidden bg-surface-dim">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={product.name} src={product.image} />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">favorite</button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={\`px-2 py-0.5 rounded-full text-[10px] font-bold \${product.availabilityBg || 'bg-secondary-container'} \${product.availabilityText || 'text-on-secondary-container'}\`}>{product.availability}</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                      <span className="text-xl font-headline font-extrabold text-on-surface">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={\`/product/\${product.id}\`} title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                      </Link>
                      <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Area */`
);

// Fallback search and replace for count
result = result.replace(
  /<p className="text-on-surface-variant font-medium">Showing [\s\S]*?<\/p>/,
  '<p className="text-on-surface-variant font-medium">Showing {filteredProducts.length} product(s)</p>'
);

fs.writeFileSync('src/components/Products.jsx', result);
console.log('updated');
