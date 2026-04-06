import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row pt-16 min-h-screen">
        {/* SideNavBar / Filter Sidebar */}
        <aside className="flex md:h-[calc(100vh-4rem)] max-h-[40vh] md:max-h-none w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-200/80 dark:border-stone-800/80 sticky top-16 z-30 bg-stone-100 dark:bg-stone-950 flex-col gap-4 py-6 md:py-8 px-4 overflow-y-auto shrink-0">

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 px-4">Categories</p>
            <button className="w-full flex items-center gap-3 bg-green-800 dark:bg-green-700 text-white dark:text-stone-50 rounded-md font-bold px-4 py-2 active:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-sm">agriculture</span>
              <span className="font-inter text-sm font-medium">All Products</span>
            </button>
            <button className="w-full flex items-center gap-3 text-stone-600 dark:text-stone-400 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors">
              <span className="material-symbols-outlined text-sm">psychology_alt</span>
              <span className="font-inter text-sm font-medium">Machinery</span>
            </button>
            <button className="w-full flex items-center gap-3 text-stone-600 dark:text-stone-400 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors">
              <span className="material-symbols-outlined text-sm">grass</span>
              <span className="font-inter text-sm font-medium">Seeds &amp; Fert</span>
            </button>
            <button className="w-full flex items-center gap-3 text-stone-600 dark:text-stone-400 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors">
              <span className="material-symbols-outlined text-sm">pets</span>
              <span className="font-inter text-sm font-medium">Live Stock</span>
            </button>
            <button className="w-full flex items-center gap-3 text-stone-600 dark:text-stone-400 px-4 py-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors">
              <span className="material-symbols-outlined text-sm">handyman</span>
              <span className="font-inter text-sm font-medium">Equipment</span>
            </button>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Price Range</p>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">DH</span>
            </div>
            <div className="px-4 flex items-center gap-2">
              <div className="flex-1">
                <input type="number" placeholder="Min" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />
              </div>
              <span className="text-stone-300 font-bold">-</span>
              <div className="flex-1">
                <input type="number" placeholder="Max" className="w-full font-medium px-3 py-2 bg-white dark:bg-stone-900 shadow-sm border border-stone-200 dark:border-stone-800 rounded-lg text-sm text-center focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-stone-400" />
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
            <button className="w-full bg-primary text-on-primary py-3 rounded-md font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">Apply Filters</button>
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tighter mb-1">Product Catalog</h1>
              <p className="text-on-surface-variant font-medium">Showing 1-24 of 120 products</p>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/10">
              <label className="text-xs font-bold px-3 text-on-surface-variant uppercase tracking-wider">Sort By</label>
              <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer pr-10">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Product Card 1 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="high-tech agricultural tractor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFyaAv34LIZQS6o1Hn-yv40GunFyI8yRqqsz-P7HxGejVvgR7DOy5wquldxITVGt4whq_j0OH4rlKr0V0OxpTjImUr5jyxC5uSXbBKlQYPniLUJRW5lsDPDpy34MisZY4TsItzSHDPH3-4KCXwb8XmvCyps5byRnvfYFP0t7_eeAMWg5u8YlReK5SOkDo1sdHt5jCUSCLXOIrD9DgoH0Ao1BJdvLOhzX7pMlQCLcRnKptyHC73lMypbdfE6r2rdVpAuvhk5EgFeUo" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Machinery</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">Precision-Track 400XT</h3>
                  <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">favorite</button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">1 245 000 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/1" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="close-up of organic green seedlings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtmGEZGtY1LD4s4wkCMhWdEwWv_YzORWKkBAqPqwN8TAYTMSWMOYI-80-PijqCH1G4fsLKw4exX7ZIt3rkL6lEAqVOVF17kK8-7WOdhLBggiL4HRP4MREji7Sv9DasmCkgu0AAsFSRO3at4RK5LZUpWhkFX0nlRIMFd36G-SwyDCRrdUW8FNJNVL8Yv43-v6adBkkmj2PEMh24iCuLtYi5pXUcy6bIUmc2A61qMFGeJ9kxDeY2jxuYR49WXkVPYNq8eqnR18OekGQ" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Seeds</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">Heirloom Winter Wheat</h3>
                  <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">favorite</button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-bold">Limited Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">420 DH / sac</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/2" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="IoT smart farming sensors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOFxFF9Fj9X5vMcYTjadqbpk87bJfywhuapDPyYnQk3vWi9aCmqIeGPVSLgb91zUDWMZhB4o_kCe0onxcBk0xrOaPPcyQlzfeb5G5BRk7lSLy5324sBpMyOJ7je9hucetDfZlR9goKb4LhE_3r0GDdv__1y-h2Fhh57CvlRyY5481KSgaFnZMG47MgCySr3K4OPqyEEJPPT1t5v5CCg4Z-KOXW-oiUfou6a53DnjtjEVYFis4fUsWmr3LoB-3br0jgSJQndLNAw7U" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Equipment</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">SoilSense IoT Hub v2</h3>
                  <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">favorite</button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">8 990 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/3" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="magnificent brown horse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaybp1bFdjjwfnn7EXjO89WpDnP4c4eo1mHMFJCUQ3dGU-TJDKIitBIZlZF_AuqA0BeEiGizNCTmCWYVv1xsEB-btxsTm8e4UoyVtQb5uXsDQgqdu4yyKrBwc0hy0AyM0zwzHizaqpxfd_zLExDkv1PC2-wuquSapbsFPiDYe2u2GV-tdveoTKEnD2DQSjjCNc8rNeUljjusk_U8vSI86IV1qgC9_2DPyBy8_6vZyCGeBjLnvTOHstJbkpHvYybVm9liiaRyO1Ka0" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Livestock</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary transition-colors">Champion Quarter Horse</h3>
                  <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">favorite</button>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">120 000 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/4" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="professional organic fertilizer pellets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjF2-Jc5WWEea0Ppi4iMeTErRB5OS9GaZPORnwACAFF-bqkVsyxAJb9ebKzlK9Ls3xg-wcUuUH_a1n1FIHWRom8YFIz2jKcU4cXZVrbMZRYIgUuzr1ipzXCO3yqdwLahDNmgdutXqnBY1OtTAOo_Xa95s_1Ge1VjcUTrcKRY64EiowSi6lG2MHyyx8K3JiNL2L_ZC5IPmwc-LZS6Ap21tGr6Ur4sqBEERH9LjdTSmEAhIER1GSMz7x6EU0yAea5V-PNDwUPpYhJkY" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Fertilizer</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary mb-2 transition-colors">Nitro-Boost Organic</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">1 550 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/5" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="aerial view of a deep green pine forest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL33nqlZAgnyXIXG6N5FccFulp-ePEs35TzROrNUz8zif2x5p8elwAq5qvgyukJv4WXK9A7EIHoLjgT19n4Y8191ZXYgBQojKMPEFbJGoaq8GTk7Dx0edcvtuBiUOSXWEdFOay_KISSWyzzPzFhT4uChRII_iGq_np9nRXOlU2P6DpnJg4z_rQR41CZa4OFprYhHnXMD23CIzEiLxe_yn-NfSkst-T6EuyRXdnRVSDN_RKXT-O5N4tNnr9aov371Gv1f3wBOY1t5s" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Seeds</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary mb-2 transition-colors">Hybrid Douglas Fir Saplings</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-bold">Limited Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">25 DH / unité</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/6" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 7 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="modern autonomous weeding robot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDhx7HlewOSMAWf1SBYzX3gumVvkD3q4LPNaRuWrKNY7-cq1j8YZryAQy8JAKGx8GVfhG8vAarY9B8SEfOCz58Jaj1NETBMJse1kuqTCWhkONIrb1X-iiIXw9XybWC-iqbuOkDRsi_XQuokk-86yPJBE9QlMXumikzXOHzMomw9XnXKKJrJnURaH35uatM1VCfpqTV-JSPELKUBbyEUPX5jfa5dtcahENlfL0UpvC47nH4cFUFr5Bvgopqd14fr9jwwRvPZRuCino" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Machinery</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary mb-2 transition-colors">Aero-Weeder Pro</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">450 000 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/7" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Card 8 */}
            <div className="group flex flex-col h-full bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
              <div className="relative aspect-square overflow-hidden bg-surface-dim">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="vast green pasture under a dramatic sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_4QpcaOpxoEEOxYDZNnR9sMBC3jQEC63_SlWgYbkwkGUuR92cPTymTpWB_rHTeuXceSn4OjpGhSyMG851QK7l0VgU-CnQQtClrCOQNcNJTy7lw7RukS6RpGvhFTwqm_P3Eep_ngJ0CNyXPQKy6SWX_-auYx3i5_kNdRKmjtVoqbLGVe9XMgcG0PLuJZErlzH7_gT7ggu2wwit2f8IA7ySJlkM7ylr567OjYuTnXcH0ply6ABGZySwflrqOZq66aFXK5wQLXPYaY8" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-primary">Real Estate</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline font-bold text-lg leading-tight group-hover:text-primary mb-2 transition-colors">High-Yield Acreage (50ac)</h3>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">In Stock</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Price</span>
                    <span className="text-xl font-headline font-extrabold text-on-surface">6 500 000 DH</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/product/8" title="Voir Détails" className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors active:scale-95 group-hover:shadow-sm">
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                    </Link>
                    <button className="w-12 h-12 rounded-lg bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <span className="material-symbols-outlined">info</span>
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Area */}
          <div className="mt-16 flex flex-col items-center gap-6">
            <button className="px-8 py-4 bg-primary text-on-primary rounded-md font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-primary/10">Load More Products</button>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-md text-stone-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md font-bold bg-primary text-on-primary">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md font-bold text-stone-600 hover:bg-stone-200">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md font-bold text-stone-600 hover:bg-stone-200">3</button>
              <span className="px-2 text-stone-400">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-md font-bold text-stone-600 hover:bg-stone-200">5</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md text-stone-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
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
