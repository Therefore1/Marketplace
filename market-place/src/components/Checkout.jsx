import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  // Ensure we start at the top of the page when navigating to Checkout
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-surface text-on-surface">
      <main className="pt-24 pb-20 px-6 md:px-12 max-w-[1440px] mx-auto mt-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface font-headline">Finaliser la Commande</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 font-medium">Precision Earth Marketplace — Étape de Paiement</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Checkout Forms */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Shipping Address Section */}
            <section className="bg-stone-100 dark:bg-stone-900/50 rounded-xl p-8 border border-stone-200/50 dark:border-stone-800/50">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">agriculture</span>
                <h2 className="text-2xl font-bold tracking-tight font-headline text-stone-900 dark:text-stone-50">Adresse de Livraison</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-600 dark:text-stone-400 px-1">Nom de l'Exploitation / Domaine</label>
                  <input className="w-full bg-white dark:bg-stone-800 border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 shadow-sm" placeholder="ex: Ferme des Horizons" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-600 dark:text-stone-400 px-1">Numéro de Parcelle / Secteur</label>
                  <input className="w-full bg-white dark:bg-stone-800 border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 shadow-sm" placeholder="ex: Zone B-42" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-600 dark:text-stone-400 px-1">Rue / Chemin d'accès</label>
                  <input className="w-full bg-white dark:bg-stone-800 border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 shadow-sm" placeholder="ex: 12 Chemin de la Plaine" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-600 dark:text-stone-400 px-1">Ville / Code Postal</label>
                  <input className="w-full bg-white dark:bg-stone-800 border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 shadow-sm" placeholder="ex: 84000 Avignon" type="text" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-stone-600 dark:text-stone-400 px-1">Instructions Spécifiques de Livraison</label>
                  <textarea className="w-full bg-white dark:bg-stone-800 border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 resize-none shadow-sm" placeholder="ex: Derrière le silo à grain principal, accès par le portail sud..." rows="3"></textarea>
                </div>
              </div>
            </section>

            {/* Payment Method Section */}
            <section className="bg-stone-100 dark:bg-stone-900/50 rounded-xl p-8 border border-stone-200/50 dark:border-stone-800/50">
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                <h2 className="text-2xl font-bold tracking-tight font-headline text-stone-900 dark:text-stone-50">Mode de Paiement</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* COD Option (Selected) */}
                <div className="relative group cursor-pointer border-2 border-primary bg-white dark:bg-stone-950 rounded-xl p-6 transition-all active:scale-95 duration-150 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 dark:text-stone-50">Paiement à la livraison</h3>
                        <p className="text-sm text-stone-500">Réglez directement au chauffeur lors de la réception.</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Online Payment Option */}
                <div className="relative group cursor-pointer border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 rounded-xl p-6 transition-all hover:bg-stone-50 dark:hover:bg-stone-800/80 active:scale-95 duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="bg-stone-100 dark:bg-stone-900 p-3 rounded-lg">
                        <span className="material-symbols-outlined text-stone-500">credit_card</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-900 dark:text-stone-50">Paiement en ligne</h3>
                        <p className="text-sm text-stone-500">Carte bancaire, Virement instantané ou Apple Pay.</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-stone-300 dark:border-stone-600"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-stone-50 dark:bg-stone-900/80 rounded-xl p-8 border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
                <h2 className="text-xl font-bold tracking-tight mb-8 text-stone-900 dark:text-stone-50 font-headline">Résumé de la Commande</h2>
                <div className="space-y-6 mb-8">
                  
                  {/* Item 1 */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-stone-200 dark:bg-stone-800 overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" data-alt="professional laboratory soil analyzer device with digital display on a clean surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-bNWcqFBuEOMAmTMAYYNXzODYWI3DF0fcf6yxYPNYVrjXvhEJL9FTN0758BFpxnOiVul-wf7mUcZgZw2esHv382HBk4mAOwjh-qeQOF0BEGtONSUmSrHqRb-ueLvtLdPLbx_x7ktQsHxFkkDeNu74m40bkJbaSWRwutdphZF24xUlDYye8QRsbuz0ayrxb74BWrx3KQibeBDDY1AnISRxxJXvyol1znrfbL7lib8WRKerBLw2B_VCe0h4jb14FAoCryA1zoWEPDY" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-50">Analyseur de Sol Pro</span>
                      <span className="text-xs text-stone-500 font-medium">Quantité: 1</span>
                      <span className="text-sm font-bold mt-1 text-primary">4 200 DH</span>
                    </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-stone-200 dark:bg-stone-800 overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" data-alt="large bag of organic nitrogen fertilizer granules for agricultural use" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxJJgbf9IzH00nubImHouiSXAPmImwWaM1lhcTJHRAG4wOrzbgIjYLloAUQOQEtKNaoo24ebB6M4oCW_US4ntYPmcXX5MBWQaxAAxhnKo_WQb6pUXYpE4vXCGuqNceMaOyWSXDAXoeC8EzS6g19iqpMHT52jh8_kkHnHwv8J1aFnGw3A-AcnHKk6kvYGUJHoy7itXHdC-PrHuc1pzrYCkrIKrzvx292ZC7ECSpmYlLZB_ZqWF1Fkm09m45GO_AZCvhPDvkftffiNw" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-bold text-stone-900 dark:text-stone-50">Azote Organique 25kg</span>
                      <span className="text-xs text-stone-500 font-medium">Quantité: 4</span>
                      <span className="text-sm font-bold mt-1 text-primary">1 560 DH</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 font-medium">
                    <span>Sous-total</span>
                    <span className="font-bold text-stone-900 dark:text-stone-50">5 760 DH</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 font-medium">
                    <span>Frais de livraison (Rural)</span>
                    <span className="font-bold text-stone-900 dark:text-stone-50">245 DH</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600 dark:text-stone-400 font-medium">
                    <span>TVA (20%)</span>
                    <span className="font-bold text-stone-900 dark:text-stone-50">1 201 DH</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-stone-800 mt-2">
                    <span className="text-lg font-bold text-stone-900 dark:text-stone-50">Total Final</span>
                    <span className="text-2xl font-black text-primary font-headline">7 206 DH</span>
                  </div>
                </div>

                {/* Confirmation Button */}
                <Link to="/products" className="w-full mt-8 bg-gradient-to-r from-green-800 to-green-700 dark:from-green-700 dark:to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] duration-150 flex items-center justify-center gap-3">
                  Confirmer la Commande
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>

                <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest font-bold">Transaction sécurisée par Precision Earth</p>
              </div>

              {/* Side Promotion / Info Card */}
              <div className="bg-stone-800 text-stone-200 rounded-xl p-6 relative overflow-hidden border border-stone-700 shadow-md">
                <div className="relative z-10">
                  <span className="material-symbols-outlined mb-2 text-green-400">eco</span>
                  <h3 className="font-bold text-lg mb-1 text-white font-headline">Programme Fidélité</h3>
                  <p className="text-sm opacity-90 font-medium">Gagnez 72 points avec cet achat pour votre prochaine commande de semences.</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <span className="material-symbols-outlined text-8xl text-green-300">local_florist</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="w-full border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 md:px-12 max-w-[1440px] mx-auto gap-8">
          <div className="font-headline font-bold text-stone-900 dark:text-stone-50 text-xl">
            The Cultivated Ledger
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest font-bold">
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Privacy Policy</a>
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Terms of Service</a>
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Shipping Logistics</a>
            <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Contact Support</a>
          </div>
          <div className="text-center md:text-left text-stone-400 dark:text-stone-500 text-xs uppercase tracking-widest pt-8 md:pt-0 border-t md:border-t-0 border-stone-200 dark:border-stone-800 font-bold">
            © 2024 The Cultivated Ledger. Precision Earth Marketplace.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
