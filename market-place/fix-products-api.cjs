const fs = require('fs');

let prodData = fs.readFileSync('src/components/Products.jsx', 'utf8');

// Replace the hardcoded productsData with an empty array initialization or remove it.
// I will just use state for products!
prodData = prodData.replace(/const productsData = \[[\s\S]*?\];\s*const categoriesData/, 'const categoriesData');

prodData = prodData.replace(
  "const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All Products');",
  `const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All Products');`
);

prodData = prodData.replace(
  "useEffect(() => {\n    if (location.state?.category) {",
  `useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProductsData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state?.category) {`
);

// If isLoading, show a spinner or loading text
prodData = prodData.replace(
  '<main className="flex-1 bg-surface-container-low p-6 md:p-10">',
  '<main className="flex-1 bg-surface-container-low p-6 md:p-10">\n          {isLoading ? (<div className="flex justify-center items-center h-64"><p className="text-stone-500 font-bold">Loading products...</p></div>) : (<>'
);

prodData = prodData.replace(
  '</main>',
  '</>)}\n        </main>'
);

fs.writeFileSync('src/components/Products.jsx', prodData);
console.log('Products API integrated');
