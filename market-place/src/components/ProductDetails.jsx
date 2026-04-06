import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  // Ensure we start at the top of the page when opening details
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm font-label text-stone-500 dark:text-stone-400 gap-2 items-center">
          <Link className="hover:text-primary transition-colors font-medium" to="/products">Marketplace</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <a className="hover:text-primary transition-colors font-medium" href="#">Machinery</a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="font-bold text-stone-900 dark:text-stone-50">Precision-Track 400XT</span>
        </nav>
        
        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Gallery: Asymmetric Layout */}
          <div className="lg:col-span-7 grid grid-cols-6 gap-4">
            <div className="col-span-6 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900">
              <img className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105" data-alt="Close-up of a high-tech agricultural IoT sensor module mounted on a sleek carbon fiber frame in a sunny organic farm field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvlWjU-MWo5OKTBIveaaYeETjgDHdRlJRjGXkKmzgGgpIqqesJ-LTOinfuT2nDX8e4dNbH9KgfHgzs0XzBr7qqSxpukyAmtVjwprD1OoYzqMdrhtKR9RPyT81b9AeJBhLnUJQUMLkWCWYe-gLiuhT9gifF74ag0dRr9B1GITY1dVOob-0eiyyTKsu5qKrxku6r7bPiN5WlqIW-bHMu_v3g_bbZTm_QyQmqk43H9PtfJOWJTPDkQ4e6jW1LKcrnCNLaJsEpxFeClD8" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900">
              <img className="w-full h-40 object-cover" data-alt="Modern sleek industrial design of an agricultural motherboard with copper tracing and minimalist green indicator lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHMwMMs4wxuIgNvDlMTR2l5XDke3xUyyKYETweCdAKYKRPnYZvlugqC782Du9fesc5fPS2tGyyy13jxPUTQu25kLYK0ILKLP4kMjF2Jx9ddlig30Fggr_73KLAwR2W2tyZKu1keMu3JdSgPt2D_21rOOF7y4e2Mfq1-q_X2tfSbypE-xFSXQt5rWz3zVuxNlPHzgAD2EHTh7wCUwhnakyPAXlG05yyBNRDngLGn7XsTVhZHtkCpyjBZne6EFSB1t0HrqiCGmXRyiA" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900">
              <img className="w-full h-40 object-cover" data-alt="Professional farmer using a tablet to monitor soil data from the sensor in a bright open wheat field at dawn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk9VIAdIgIog8C1tC5v1qxJ4qwZtXdZji8rlOF8mcV5ITjbhfULv8VDPXLrRuGuqZgOBxFAby-EbmohTgllMfA5igu_RLtQdIk3IDq9AG9OrPZoTATHPAqpdT08g0GwXHp7bOwfoRwhFoPVLa40goG2O0LWCdvdAMXotUpkgAIy0GYEiA9T2i5puuyULZMnBg-Cp8uEk5hceV4707N0HNL1AWF8ZsfkASMxVoKc1gFnIs_TUJ7CfrbOXcWD7POWLULJ5sdS9-HjUs" />
            </div>
            <div className="col-span-2 overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 flex items-center justify-center cursor-pointer hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors group">
              <div className="text-center">
                <span className="material-symbols-outlined text-stone-500 group-hover:scale-110 transition-transform">add_a_photo</span>
                <p className="text-xs font-label mt-1 text-stone-500 font-bold">+12 View All</p>
              </div>
            </div>
          </div>
          
          {/* Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col pt-2">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-bold uppercase tracking-widest border border-green-200 dark:border-green-800/50">In Stock - Ready to Ship</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-50 mb-4 leading-tight font-headline tracking-tight">Precision-Track 400XT</h1>
            <p className="text-stone-600 dark:text-stone-300 text-lg mb-8 leading-relaxed font-medium">The ultimate IoT powerhouse for modern viticulture and row-crop precision. Real-time telemetry paired with enterprise-grade durability.</p>
            <div className="mb-10">
              <div className="text-sm font-bold text-stone-500 mb-1 uppercase tracking-widest">Investment Price</div>
              <div className="text-5xl font-black text-stone-900 dark:text-stone-50 font-headline">1 245 000<span className="text-xl font-bold text-primary bg-primary/10 px-2 py-1 rounded ml-3">DH</span></div>
            </div>
            <div className="space-y-4">
              <Link to="/cart" className="w-full h-14 bg-gradient-to-r from-green-800 to-green-700 dark:from-green-700 dark:to-green-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg hover:opacity-90 hover:shadow-green-900/20 transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </Link>
              <button className="w-full h-14 bg-stone-200/50 dark:bg-stone-800/50 text-stone-800 dark:text-stone-200 font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">
                <span className="material-symbols-outlined">request_quote</span>
                Get a Custom Quote
              </button>
            </div>
            <div className="mt-8 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 flex items-start gap-4">
              <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-2">verified</span>
              <div>
                <h4 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-1">Precision Guarantee</h4>
                <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">Includes 2-year enterprise support and real-time field calibration assistance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid (Bento Style) */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Technical Specs */}
          <div className="md:col-span-8 bg-white dark:bg-stone-900 p-10 rounded-3xl shadow-sm border border-stone-200/50 dark:border-stone-800/50">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-stone-900 dark:text-stone-50 font-headline">
              <span className="material-symbols-outlined text-primary bg-primary/10 rounded-full p-2">analytics</span>
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Sensor Accuracy</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-50 font-headline">± 0.02% Deviation</span>
                <p className="text-sm text-stone-500 font-medium leading-relaxed">Proprietary hyper-spectral calibration array for soil density.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Battery Performance</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-50 font-headline">480 Hours Continuous</span>
                <p className="text-sm text-stone-500 font-medium leading-relaxed">Solar-assisted energy recovery system with rapid-charge ports.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Connectivity</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-50 font-headline">5G / LoRaWAN / Sat-Link</span>
                <p className="text-sm text-stone-500 font-medium leading-relaxed">Automatic switching to maintain uptime in remote valleys.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Build Grade</span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-50 font-headline">IP69K Certified</span>
                <p className="text-sm text-stone-500 font-medium leading-relaxed">Military-grade anodized aluminum housing with heat-sink fins.</p>
              </div>
            </div>
          </div>
          
          {/* Usage Advice (Offset/Asymmetric) */}
          <div className="md:col-span-4 bg-gradient-to-br from-green-900 to-green-950 dark:from-green-900 dark:to-stone-950 text-white p-10 rounded-3xl flex flex-col justify-between shadow-xl shadow-green-900/10">
            <div>
              <h3 className="text-2xl font-bold mb-8 font-headline">Usage Advice</h3>
              <ul className="space-y-8">
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-green-400" >landscape</span>
                  <div>
                    <strong className="block mb-2 font-headline text-lg">Ideal Soil Types</strong>
                    <p className="text-sm text-green-50 leading-relaxed font-medium">Optimized for silty clay and sandy loam with active organic matter monitoring.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="material-symbols-outlined text-green-400" >gps_fixed</span>
                  <div>
                    <strong className="block mb-2 font-headline text-lg">Placement Strategy</strong>
                    <p className="text-sm text-green-50 leading-relaxed font-medium">Install at 15° angles in cardinal transition zones for peak signal integrity.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm font-medium italic leading-relaxed text-green-50">"The 400XT transformed our harvest timing by identifying sub-surface hydration pockets we never saw before."</p>
              <p className="text-xs mt-4 font-bold tracking-widest text-green-300 uppercase">— Estate Manager, Napa Valley</p>
            </div>
          </div>
        </section>

        {/* AI Recommendation: Souvent acheté avec */}
        <section className="mt-32">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block flex items-center gap-2"><span className="material-symbols-outlined text-sm">memory</span> AI Precision Engine</span>
              <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 font-headline tracking-tight">Souvent acheté avec</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Related 1 */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 rounded-2xl p-4 group cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="aspect-video mb-5 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Heavy duty industrial weather resistant solar panel charging station for remote agricultural sensors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGcGvsoVTxet4YNCORv58TH24hymKW4EhPkDF4OSXohx_2yab8NXBBgAJ-dmXC8rsMS2bgw_uaCB_j-0XHJOh6b5uU5qcWgwBH_bdKyu2d81S-clEhJ3saxnF_cE0xr47LPDqILNHGJ8sfy0lltKlPwTNthC57JKC4g4dEfGCkN7tgH3DvFKUoWqkwA0Nqkqyt0OsqgTCws5ucobYMh-m0lNIAtxfQVXFKoUD-EOOikuHIvnZD_AqvF3gqIMnFz4hh5cLFenCgSE" />
              </div>
              <h4 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-2 font-headline">Solar-Hub 50W Panel</h4>
              <p className="text-sm text-stone-500 font-medium mb-6">Extended uptime for remote installs.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-black text-stone-900 dark:text-stone-50 text-xl">12 500 DH</span>
                <button className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
            {/* Related 2 */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 rounded-2xl p-4 group cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="aspect-video mb-5 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Professional grade digital connectivity hub with glowing fiber optic ports and matte black finish" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGCuMAEbTUpkVY7ie0yQgw-LxTea1IT2xGSYEavaufuCUhn3qLtPeVCIjyTxtyJMjCGS47JLTOzNHMgd9bLGBWF0M1eqBAQfVfGfE5NKv6O9yyqvF8XfWz3vjrRATs6Vo_V0rNHZO95ZP3MSTV7g9TCcKBrglcRObEgaiOypqXOctQ477xRVtCBuq9EfaH8oDsGuDFurrYR2HWoOUiNIO_xizJzw5mnk29Rp-L6KBKKh3YImr1-PCXQECyhTxld5dCFQgi1TgBjDA" />
              </div>
              <h4 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-2 font-headline">LoRa Bridge Node</h4>
              <p className="text-sm text-stone-500 font-medium mb-6">Mesh network amplifier for large estates.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-black text-stone-900 dark:text-stone-50 text-xl">34 000 DH</span>
                <button className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
            {/* Related 3 */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 rounded-2xl p-4 group cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="aspect-video mb-5 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Digital software dashboard displaying complex agricultural crop analytics and growth charts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUcc1_u7OFor3lzDm7oy0_LHBMe-jYSBzve-nNcrd72wXd9nB2PjHmIV1sDtNHufLPXyAMBhVtfCBk2G33ouJaiZZc_h7FlqT46fxq81UebPw1VurpqBjWhvErlYLE_b61VDXIrMznspXhb__b_5irQWYdd-JhkWy0ftq1PcuuVJPfJoSDNH51x9-MvMdKGRyHBv3C0XxweXXWO6_mRtdjcaG3snq37FpQYJokdiNObVru1nkQyqptxtZNtBbQl5VytBLPSM0ZgXQ" />
              </div>
              <h4 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-2 font-headline">Enterprise Analytics Cloud</h4>
              <p className="text-sm text-stone-500 font-medium mb-6">Real-time data visualization suite.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-black text-stone-900 dark:text-stone-50 text-xl">4 990 DH/mo</span>
                <button className="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products: Produits similaires */}
        <section className="mt-32 pt-20 border-t border-stone-200/50 dark:border-stone-800/50">
          <h2 className="text-3xl font-extrabold text-stone-900 dark:text-stone-50 font-headline mb-10 tracking-tight">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Sim 1 */}
            <Link to="/product/2" className="group block cursor-pointer">
              <div className="aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 mb-4 overflow-hidden rounded-2xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Sleek silver agricultural sensor probe being inserted into dark rich soil in a commercial nursery" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG-oRx81B4lZLgx3P0OOVuU6oTywFAcP0xitfeAnnsMy5RGeg35y7sbOK_Q411aiClalVPStq-rKAAeduiNAA7m7VzAtLOOOM8a-Z-4YThsmpYLAjcm-oOzt2Yn_R83bS1OsDYLClQCM-uLxZ2xHu_DIhIZ9o4mMh5crJBl1qbLpOMsaZp72RPYJsc5DpIs96HxfzYOWSNQlZMSBNZh_o1ICbqqwpASWpJv-Dl_j4wuXeC7bk9PGC8CMxkusAM6xHSPFNt3ZSVPx8" />
              </div>
              <h5 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-1 group-hover:text-primary transition-colors">Soil-Probe 200 Pro</h5>
              <p className="text-sm font-bold text-stone-500">852 000 DH</p>
            </Link>
            {/* Sim 2 */}
            <Link to="/product/3" className="group block cursor-pointer">
              <div className="aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 mb-4 overflow-hidden rounded-2xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Autonomous agricultural drone hovereing above a vineyard for precision mapping" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrJF8O0G-YFFwsfjX8vwfVWon1rRddGBBIzm8HDmUUUPZrEBdQgE6dy_QqnqtMzmE_z30D3OIrR8gqps9dkuaxD1AaM_ZR7n2yxqTq6oWf-OOGKr74fcRpjyjymde-_pCvf9OlefKXs4v6lAURHadDEFvDKWxICK_NrtSHqfQSoPQbF7xOgS2Rku8XaYMrJ9KDjyb3ZmL7kIA8lLjPjAq9E4PSTtiLF1mgrGlvPajFfQij-7SPdpEI7r3xwu_n-lmuGwycZmJMPxE" />
              </div>
              <h5 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-1 group-hover:text-primary transition-colors">Agro-Drone X4</h5>
              <p className="text-sm font-bold text-stone-500">1 120 000 DH</p>
            </Link>
            {/* Sim 3 */}
            <Link to="/product/4" className="group block cursor-pointer">
              <div className="aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 mb-4 overflow-hidden rounded-2xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Close up of a heavy duty irrigation control box with multiple cables and weather-sealed housing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg2z94-WbiBD2ZPxZIMNTyazCzkK7d8_8vd5dnDMoD_cRkOU5yOeakDa-1RO4u55vM3K9su3rAQPL4munabOrRYyykSv2saHilsdUi51cR2jInq7d7GpnZ1814xMq8AZjaCrou6yBBHoa3XSfNFkskup5GuCA0osOgvL8ac3BInnVK4Tc8_Ifyroh38AD0_FZD8cHf2xFWo-gOQHnedOElVzgUGdisFlQ5wp-RbptTu1SczQn0QcSjhY839wKxmivmio7vTKnxxO8" />
              </div>
              <h5 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-1 group-hover:text-primary transition-colors">Flow-Master Node</h5>
              <p className="text-sm font-bold text-stone-500">450 000 DH</p>
            </Link>
            {/* Sim 4 */}
            <Link to="/product/5" className="group block cursor-pointer">
              <div className="aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/50 mb-4 overflow-hidden rounded-2xl group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-300">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A rack of high performance agricultural server blades with soft green led indicator lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD72AUTXYDuBWggxHxc5tsEBYxUrb2gFJR3S-JfCkntGofSBf-Vz-fq5Uz2QSumAxBm_vQRwlAUbFQ3cvSDIdjd4fQOaMohKpeMdL4ika1Oj1WCjYI7dVRmbFKSAWaXDpAAZy6T2W9bqKJUfEQUCrINs2whkPgQRaIKQ5KKQ_F0A3sUw-3sxKjSat71z4MvEMFWLHlL8P8i8AGa1M6htapulfAqOPRgPKaYYJCRfS5eIjb7kqqI2NoR_Z0YJ477czvQmxaU3fnW1KE" />
              </div>
              <h5 className="font-bold text-stone-900 dark:text-stone-50 text-lg mb-1 group-hover:text-primary transition-colors">Precision-Track 300</h5>
              <p className="text-sm font-bold text-stone-500">780 000 DH</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-headline font-extrabold text-green-950 dark:text-white text-2xl">The Cultivated Ledger</span>
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

export default ProductDetails;
