const fs = require('fs');

let data = fs.readFileSync('src/components/Products.jsx', 'utf8');

// Add numericPrice to each product
data = data.replace(/price:\s*"1 245 000 DH",/, 'price: "1 245 000 DH",\n    numericPrice: 1245000,');
data = data.replace(/price:\s*"420 DH \/ sac",/, 'price: "420 DH / sac",\n    numericPrice: 420,');
data = data.replace(/price:\s*"8 990 DH",/, 'price: "8 990 DH",\n    numericPrice: 8990,');
data = data.replace(/price:\s*"3 200 DH",/, 'price: "3 200 DH",\n    numericPrice: 3200,');
data = data.replace(/price:\s*"1 550 DH",/, 'price: "1 550 DH",\n    numericPrice: 1550,');
data = data.replace(/price:\s*"25 DH \/ unité",/, 'price: "25 DH / unité",\n    numericPrice: 25,');
data = data.replace(/price:\s*"450 000 DH",/, 'price: "450 000 DH",\n    numericPrice: 450000,');
data = data.replace(/price:\s*"6 500 DH",/, 'price: "6 500 DH",\n    numericPrice: 6500,');

// Replace state
data = data.replace(
  "const [activeCategory, setActiveCategory] = useState('All Products');",
  `const [activeCategory, setActiveCategory] = useState('All Products');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMin, setAppliedMin] = useState('');
  const [appliedMax, setAppliedMax] = useState('');
  const [sortBy, setSortBy] = useState('Popularity');`
);

// Filtering logic
data = data.replace(
  `const filteredProducts = activeCategory === 'All Products' 
    ? productsData 
    : productsData.filter(product => product.category === activeCategory);`,
  `let filteredProducts = activeCategory === 'All Products' 
    ? [...productsData] 
    : productsData.filter(product => product.category === activeCategory);

  if (appliedMin !== '') {
    filteredProducts = filteredProducts.filter(p => p.numericPrice >= Number(appliedMin));
  }
  if (appliedMax !== '') {
    filteredProducts = filteredProducts.filter(p => p.numericPrice <= Number(appliedMax));
  }

  filteredProducts.sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.numericPrice - b.numericPrice;
    if (sortBy === 'Price: High to Low') return b.numericPrice - a.numericPrice;
    if (sortBy === 'Newest Arrivals') return b.id - a.id;
    return a.id - b.id; // Popularity default
  });`
);

// Min price input
data = data.replace(
  '<input type="number" placeholder="Min" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />',
  '<input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />'
);

// Max price input
data = data.replace(
  '<input type="number" placeholder="Max" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />',
  '<input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />'
);

// Apply filters button
data = data.replace(
  '<button className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">Apply Filters</button>',
  '<button onClick={() => { setAppliedMin(minPrice); setAppliedMax(maxPrice); }} className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">Apply Filters</button>'
);

// Sort by select
data = data.replace(
  '<select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer pr-10">',
  '<select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer pr-10">'
);

fs.writeFileSync('src/components/Products.jsx', data);
console.log('Filters updated');
