import React from 'react';
import WeatherWidget from './WeatherWidget';
import './home.css';

const Home = () => {
  return (
    <>
      <main className="pt-20">
        {/* Hero Section with Search */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" data-alt="vast rolling hills of a wheat field at sunrise with golden morning light and mist in the distance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjku8HWOkw4IiywAKkX8RHuZTAcp7lrkb8U7Q16KafsYcrUPiSoQ6VuA-JC7xpslJYCJlbHoOgPR8E0wLV9u7vbkfdJRVaRwfHihNwdsyJnAsYOeQOTbBJj2viCds7LSnoRATRcMZJNMFEqRGIPLIPaN3H8kv_pvk63arm6ImiSNyh5H2_6VxM5V90W2CzhBA6xb1DbbUJyXxh15bDBLn3NpWOFbrh16YRaZqQ5cJf_s4-53T8uUgGWsL51-8LLfnS-lrPi1pHyEg" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 w-full max-w-4xl px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">Precision Earth Engineering.</h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">Access the world's most sophisticated agricultural marketplace for high-yield farming.</p>
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex-1 w-full relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">search</span>
                  <input className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-none focus:ring-2 focus:ring-primary text-on-surface" placeholder="Search for seeds, equipment, or chemicals..." type="text" />
                </div>
                <button className="w-full md:w-auto px-10 py-4 bg-primary text-on-primary rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all">
                  Find Resources
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bento Grid */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-xl">
              <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-2 block">Departments</span>
              <h2 className="text-4xl font-bold text-on-surface tracking-tight">Farm Ecosystem Essentials</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">psychology_alt</span>
                <span className="font-bold text-on-surface-variant">Plantes</span>
              </div>
            </a>
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-primary-container/10 rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">grass</span>
                <span className="font-bold text-on-surface-variant">Semences</span>
              </div>
            </a>
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">science</span>
                <span className="font-bold text-on-surface-variant">Engrais</span>
              </div>
            </a>
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">agriculture</span>
                <span className="font-bold text-on-surface-variant">Matériel</span>
              </div>
            </a>
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-surface-container-low rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-3">vaccines</span>
                <span className="font-bold text-on-surface-variant">Phytosanitaires</span>
              </div>
            </a>
            <a className="group relative aspect-square lg:aspect-auto lg:h-64 bg-tertiary-container/10 rounded-xl overflow-hidden hover:translate-y-[-4px] transition-all" href="#">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-tertiary mb-3">sensors</span>
                <span className="font-bold text-on-surface-variant">Capteurs IoT</span>
              </div>
            </a>
          </div>
        </section>

        {/* Weather Widget & Recommendations Asymmetric Section */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Weather Widget */}
            <div className="lg:col-span-4 space-y-6">
              <WeatherWidget />
            </div>

            {/* Recommendations */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Personalized for Your Land</h3>
                <a className="text-sm font-bold text-primary underline underline-offset-4" href="#">See Analysis</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="industrial grade fertilizer spreaders" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEkYDpCdG56EFDrUNP5-nL5W7JlgiLgOtebLpvOcGYJqqfv_RgPubvF-D4iB6syHsV6_6T36cUDF1AvFzOuOl9FZq77zYyQppmq8f7nAPuztMudOGdJFY7Lh6C3mkpbwTLtbLqaqB5ounAHVgaBU-B7qVliGoYstcpE6VzBetqNEzbCLgWx97QLFIoTyn1BB_nCszwC69fixmrO__coxRt2HFeBNPDu7zfYUUlQbFmJFleWqOwwhyMPqr7LjtYfEVutYvGMo2rR7Q" />
                    <div className="absolute top-4 left-4 bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Recommended</div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-1">Nitrogen Optimizer XL</h4>
                    <p className="text-sm text-on-surface-variant mb-4">Based on your recent soil analytics for Sector 4-B.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">$1,240.00 / Ton</span>
                      <button className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-full">add_shopping_cart</button>
                    </div>
                  </div>
                </div>

                <div className="group bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-48">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="digital farm management tablet" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvQbLdatr8E13v1TKJn30kvkN4-M3MZ3K6DlQj4l2-aoe2Mh8M8eKVHcg3dbUthSFAH8kVDSj3VEkIYfc1ORCp23o5XnvRsit7fpHNGMpcZRiONf-sVduJcnrfZEPK6DZPxhivWLRRm3gIaRphWXN5W3OCsMrTqBPSq4I69g1QvuJIAwD-Ss-XZBIJ9ft733ZesEu4s-6G5DyjdwDrTafAsCZ6LqOCMbUtsiUlxef3Jc9kJaz2y7o2YquCK3NR3XJh7ywM5L_bxGo" />
                    <div className="absolute top-4 left-4 bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">New Technology</div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-lg mb-1">AgroSensor Node v4</h4>
                    <p className="text-sm text-on-surface-variant mb-4">Real-time moisture monitoring for precision irrigation.</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">$189.00 / Node</span>
                      <button className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-full">add_shopping_cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Products Grid */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight mb-2">Marketplace Leaders</h2>
            <p className="text-on-surface-variant">High-demand essentials currently trending across the ledger.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="large industrial sacks" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhq_Tjbz6ma-QcDDwf88GM1P6-G3IztUTId8OrauNkkMgeZMubIiXVEvzKgAy87v9IbRS-Uj7kZLCorP-2wkj3g8Pq0nw_5kJbHoB5Rak7jMziNN802heOoVWtvJeeLN9m1wWxfbFo81P7UhW0yzJvSR8AXHOSjcTZcU0dcSUq0t0MmA7P_8nVmBMYZgRKchbTLP_IPp63SqDi4hxLvdGUZRxQpN2YmmciZvEO90aOFxa7IUTgmY-YqDYhY2jfyqTyaXmzg8qDB2o" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                </button>
              </div>
              <span className="text-xs font-bold text-tertiary uppercase mb-1">Livestock Feed</span>
              <h3 className="font-bold text-lg">Premium Barley Blend</h3>
              <p className="text-primary font-bold mt-2">$45.00 <span className="text-on-surface-variant font-normal text-sm">/ 50kg</span></p>
            </div>
            <div className="flex flex-col">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="macro close-up of seeds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG5YPa9TlLkSGjKzGbZ7UTJ8wykPyvcv2OBEbZoEUEhK6qF3MLTdvBDD7L4MzVGAJap2MyeVqCqC9x-InixnyMz5wq9o1DSVPiW0x2QMu4vjpl0ggbNCPRvP0krNPGwIcTp_wlXky4thqb2jVhgvio2d1DF1ysX-gCIqpIlyE6bnn8D-6lcBePnJtNrJrFh3pylJF1SCTqJHwdJYCwd_b5sKFfjnyttAEKXwcdwCN3Ji6DOjmb_hz_WOdfkXngiMGMQcBaynYEeSc" />
                <div className="absolute top-4 left-4 bg-primary text-on-primary text-[10px] font-bold px-2 py-1 rounded">PROMO</div>
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                </button>
              </div>
              <span className="text-xs font-bold text-tertiary uppercase mb-1">Seeds</span>
              <h3 className="font-bold text-lg">Drought-Resistant Sunflower</h3>
              <p className="text-primary font-bold mt-2">$112.00 <span className="text-on-surface-variant font-normal text-sm">/ bag</span></p>
            </div>
            <div className="flex flex-col">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="shiny red modern tractor tires" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqCKa8dvEL06lZ1Z2IuT_eKVo4BYs9zDcGm5Q0PoMAiazfXo-UBseA6CfFW-RAv2qK9Pk2ZyUFAHbFwDcbvjwIptn82yXPpVEB9tFrpgsVy_SSc3k9XfHx_q7rqJKRIMyQDrk1AmUmQuf2rhOdopPb-Y4belSmu795SjtW2s7kt_AUqwFOi1qhSNzsSP7nDBIwtJ4_7YccQuYnf0TEVXNXlE4aeXvNfIYRppJ_J6NU62JvDv8aZwUJHToPuLdfxbAqqLi3_rPxa58" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                </button>
              </div>
              <span className="text-xs font-bold text-tertiary uppercase mb-1">Equipment</span>
              <h3 className="font-bold text-lg">Heavy Duty Tractor Tires</h3>
              <p className="text-primary font-bold mt-2">$890.00 <span className="text-on-surface-variant font-normal text-sm">/ unit</span></p>
            </div>
            <div className="flex flex-col">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 relative group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="professional organic fertilizer spray bottles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLUwfzMNJZ7awIxBF1o2R6xbPEYA3hYvF2aOemEDnbhVJzKCZN9WMnvtFAXNBRSt9E40cejeXFwgyA3TOwRD9P-aV8u7EHDQhdDAykgZWd0r8kiRLhUGkDVPygVbsik0dWBTLNduv7VSj5d98D96rMdh_Tf2tsP7g_EfGU7l7jI6ffqQKTCNn_0r9jFpw-6lIJuTnR5ZHD2Gc3Y-RRDVr__QXZ5GEeSyYVmhaLG__YosuRexP-TioyOZrhslWYNTqfsVFn0uz8R6c" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-primary">shopping_bag</span>
                </button>
              </div>
              <span className="text-xs font-bold text-tertiary uppercase mb-1">Crop Health</span>
              <h3 className="font-bold text-lg">Bio-Guardian Fungicide</h3>
              <p className="text-primary font-bold mt-2">$78.00 <span className="text-on-surface-variant font-normal text-sm">/ 5L</span></p>
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="relative bg-primary text-on-primary rounded-2xl overflow-hidden p-12 md:p-20 flex flex-col md:flex-row items-center gap-12">
            <div className="absolute inset-0 z-0 opacity-10">
              <img className="w-full h-full object-cover" data-alt="abstract pattern of agricultural field rows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0YXASAdgaOAv_1DmYkkCQL-2QDpLWwZtgtF2Cm5lnY26ro70BHsSklHcAGfKp_KJCwky_2mb_HcibJFex8bXRtPK2ko1LKSJifY1QAv56-cp9QqaGBGEK3V6ipX--Eh_dYE9z-1xUlo98Gto-yAOLh0IYzjmfCaOnCifSVChpwnhKWGVLZVwPQJTUCNsKWTdSHYZ6fbrzKEGvWkCedhR4VZ16gTs5Zrrb76JD4wttZrwmajrsNioPtss9uOf5rVQP63MOZO-AcaE" />
            </div>
            <div className="relative z-10 flex-1">
              <span className="text-sm font-bold tracking-[0.2em] uppercase mb-4 block text-on-primary/70">Limited Time Liquidation</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Soil Analytics Hardware Sale</h2>
              <p className="text-xl text-on-primary/80 mb-10 max-w-lg">Get 35% off all portable soil testing kits this week. Precision measurement at your fingertips.</p>
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-on-primary-container transition-colors">Shop The Event</button>
            </div>
            <div className="relative z-10 w-full md:w-1/3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <span className="material-symbols-outlined text-4xl">timer</span>
                  <div>
                    <p className="text-sm uppercase font-bold text-white/60">Ending In</p>
                    <p className="text-2xl font-bold">14h : 22m : 08s</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 dark:bg-stone-950 w-full border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 px-10 py-12 max-w-7xl mx-auto">
          <div className="col-span-2">
            <span className="text-sm font-bold text-stone-900 dark:text-stone-50 block mb-4">Cultivated Ledger</span>
            <p className="text-stone-500 text-sm max-w-xs mb-6">Precision Earth Engineering. The global standard for agricultural resource management and trade.</p>
            <div className="flex gap-4">
              <a className="material-symbols-outlined p-2 bg-stone-200 dark:bg-stone-800 rounded-lg text-stone-600" href="#">public</a>
              <a className="material-symbols-outlined p-2 bg-stone-200 dark:bg-stone-800 rounded-lg text-stone-600" href="#">mail</a>
            </div>
          </div>
          <div className="flex flex-col gap-4 font-inter text-xs uppercase tracking-widest">
            <span className="font-bold text-green-900 dark:text-green-100">Market</span>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Crop Sector</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Livestock Trading</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Seeds &amp; Feed</a>
          </div>
          <div className="flex flex-col gap-4 font-inter text-xs uppercase tracking-widest">
            <span className="font-bold text-green-900 dark:text-green-100">Tech</span>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Ag-Tech Solutions</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Soil Analytics</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">IoT Integration</a>
          </div>
          <div className="flex flex-col gap-4 font-inter text-xs uppercase tracking-widest">
            <span className="font-bold text-green-900 dark:text-green-100">Company</span>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Support</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Logistics</a>
            <a className="text-stone-500 dark:text-stone-400 hover:underline" href="#">Privacy</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-10 py-6 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="text-stone-400 text-[10px] uppercase tracking-widest">© 2024 Cultivated Ledger. Precision Earth Engineering.</p>
        </div>
      </footer>

      {/* FAB for quick action */}
      <button className="fixed bottom-8 right-8 bg-primary text-on-primary w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </>
  );
};

export default Home;
