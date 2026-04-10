import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

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
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { addToCart } = useCart();

  const [productsData, setProductsData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All Products');
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 4);
  };

  useEffect(() => {
    // Reset visible products when category changes
    setVisibleProducts(8);
  }, [activeCategory]);

  useEffect(() => {
    // Fetch products
    fetch('http://127.0.0.1:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProductsData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setIsLoading(false);
      });

    // Fetch wishlist if logged in
    if (isLoggedIn && user?.id) {
      fetch(`http://127.0.0.1:5000/api/wishlist/${user.id}`)
        .then(res => res.json())
        .then(data => setWishlist(data.map(p => p.id)))
        .catch(err => console.error('Error fetching wishlist:', err));
    }
  }, [isLoggedIn, user?.id]);

  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const isFav = wishlist.includes(productId);
    const method = isFav ? 'DELETE' : 'POST';

    try {
      const response = await fetch('http://127.0.0.1:5000/api/wishlist', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId })
      });

      if (response.ok) {
        if (isFav) {
          setWishlist(wishlist.filter(id => id !== productId));
        } else {
          setWishlist([...wishlist, productId]);
        }
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const success = await addToCart(productId, 1);
    if (success) {
      // Simple feedback could be added here
      // alert('Produit ajouté au panier !');
    }
  };

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state?.category]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMin, setAppliedMin] = useState('');
  const [appliedMax, setAppliedMax] = useState('');
  const [sortBy, setSortBy] = useState('Popularity');

  let filteredProducts = activeCategory === 'All Products'
    ? [...productsData]
    : productsData.filter(product => product.category === activeCategory);

  if (appliedMin !== '') {
    filteredProducts = filteredProducts.filter(p => p.numericPrice >= Number(appliedMin));
  }
  if (appliedMax !== '') {
    filteredProducts = filteredProducts.filter(p => p.numericPrice <= Number(appliedMax));
  }

  if (searchTerm.trim() !== '') {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filteredProducts.sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.numericPrice - b.numericPrice;
    if (sortBy === 'Price: High to Low') return b.numericPrice - a.numericPrice;
    if (sortBy === 'Newest Arrivals') return b.id - a.id;
    return a.id - b.id; // Popularity default
  });

  return (
    <>
      <div className="flex flex-col md:flex-row pt-16 min-h-screen">
        {/* SideNavBar / Filter Sidebar */}
        <aside className="flex md:h-[calc(100vh-4rem)] max-h-[40vh] md:max-h-none w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-200/80 dark:border-stone-800/80 sticky top-16 z-30 bg-stone-100 dark:bg-stone-950 flex-col gap-4 py-6 md:py-8 px-4 overflow-y-auto shrink-0">

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 px-4">Categories</p>
            {categoriesData.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all ${activeCategory === cat.id
                    ? 'bg-green-800 dark:bg-green-700 text-white dark:text-stone-50 font-bold active:translate-x-1 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span className="font-inter text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Price Range</p>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">DH</span>
            </div>
            <div className="px-4 flex items-center gap-2">
              <div className="flex-1">
                <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />
              </div>
              <span className="text-stone-300 font-bold">-</span>
              <div className="flex-1">
                <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 px-4">Availability</p>
            <label className="flex items-center gap-3 px-4 py-1 cursor-pointer">
              <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium">In Stock</span>
            </label>
            <label className="flex items-center gap-3 px-4 py-1 cursor-pointer">
              <input className="rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
              <span className="text-sm font-medium">Limited Stock</span>
            </label>
          </div>
          <div className="mt-auto pt-6 border-t border-stone-200/50">
            <button onClick={() => { setAppliedMin(minPrice); setAppliedMax(maxPrice); }} className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">Apply Filters</button>
            <div className="mt-4 flex flex-col gap-1">
              <button className="w-full flex items-center gap-3 text-stone-500 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors text-sm">
                <span className="material-symbols-outlined text-sm">help_center</span>
                Support
              </button>
              <button className="w-full flex items-center gap-3 text-stone-500 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors text-sm">
                <span className="material-symbols-outlined text-sm">settings</span>
                Settings
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-surface-container-low p-6 md:p-10">
          {isLoading ? (<div className="flex justify-center items-center h-64"><p className="text-stone-500 font-bold">Loading products...</p></div>) : (<>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div className="flex-1 w-full md:w-auto">
                <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tighter mb-1">Product Catalog</h1>
                <p className="text-on-surface-variant font-medium mb-4">Showing {filteredProducts.length} product(s)</p>

                {/* Search Bar Implementation */}
                <div className="relative max-w-xl group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-primary transition-colors">search</span>
                  <input
                    type="text"
                    placeholder="Rechercher un produit "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl pl-12 pr-4 py-3.5 text-on-surface focus:border-primary focus:ring-0 transition-all outline-none shadow-sm placeholder:text-stone-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-stone-900 p-2 px-4 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm shrink-0 self-start md:self-auto">
                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider">Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer pr-10 text-on-surface">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.slice(0, visibleProducts).map(product => (
                <div key={product.id} className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                  <div className="relative aspect-square overflow-hidden bg-surface-dim">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      alt={product.name} 
                      src={product.image?.startsWith('data:') || product.image?.startsWith('http') 
                        ? product.image 
                        : `http://127.0.0.1:5000${product.image}`} 
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">{product.category}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`material-symbols-outlined transition-colors ${wishlist.includes(product.id) ? 'text-[#923357]' : 'text-outline hover:text-primary'}`}
                        style={wishlist.includes(product.id) ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${product.availabilityBg || 'bg-secondary-container'} ${product.availabilityText || 'text-on-secondary-container'}`}>{product.availability}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                        <span className="text-xl font-headline font-extrabold text-on-surface">{product.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/product/${product.id}`} title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20"
                        >
                          <span className="material-symbols-outlined">shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Area */}
            {filteredProducts.length > visibleProducts && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-primary text-on-primary rounded-md font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/10"
                >
                  Afficher plus de produits
                </button>
              </div>
            )}
          </>)}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-manrope font-extrabold text-green-950 dark:text-white text-2xl">The Cultivated Ledger</span>
            <p className="text-stone-500 dark:text-stone-400 font-inter text-xs tracking-wide max-w-sm">
              © 2024 The Cultivated Ledger. All rights reserved. Built for the Field. Providing precision data and premium marketplace access for the modern agricultural enterprise.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-green-900 dark:text-green-100 text-sm mb-2">Legal</h4>
              <a className="text-stone-500 dark:text-stone-400 font-inter text-xs tracking-wide hover:underline decoration-green-800/30 transition-opacity opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
              <a className="text-stone-500 dark:text-stone-400 font-inter text-xs tracking-wide hover:underline decoration-green-800/30 transition-opacity opacity-80 hover:opacity-100" href="#">Terms of Service</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-green-900 dark:text-green-100 text-sm mb-2">Company</h4>
              <a className="text-stone-500 dark:text-stone-400 font-inter text-xs tracking-wide hover:underline decoration-green-800/30 transition-opacity opacity-80 hover:opacity-100" href="#">Sustainability Report</a>
              <a className="text-stone-500 dark:text-stone-400 font-inter text-xs tracking-wide hover:underline decoration-green-800/30 transition-opacity opacity-80 hover:opacity-100" href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Products;
