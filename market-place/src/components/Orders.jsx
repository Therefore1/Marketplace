import React from 'react';
import { Link } from 'react-router-dom';

const Orders = () => {
  return (
    <div className="bg-background text-on-surface">
      <main className="pt-32 pb-20 px-8 max-w-screen-xl mx-auto mt-16 font-body">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-4">
                <span className="cursor-pointer hover:text-primary">Commandes</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="font-semibold text-on-surface">#CL-88902</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">Suivre ma Commande #CL-88902</h1>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <p className="text-stone-500 dark:text-stone-400 text-sm font-medium uppercase tracking-widest">Date d'achat</p>
              <p className="text-xl font-bold">18 Mars 2024</p>
            </div>
          </div>
        </header>

        {/* Bento Layout for Status & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tracking Timeline (Main Bento Column) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-stone-100 dark:bg-stone-900/50 rounded-xl p-8 md:p-12 border border-stone-200/20 dark:border-stone-800/20">
              <h2 className="text-xl font-headline font-bold mb-10 text-primary">État de la livraison</h2>
              <div className="relative">
                {/* Horizontal Timeline Line (Mobile Vertical, Desktop Horizontal) */}
                <div className="absolute top-5 left-5 md:left-0 md:top-6 w-0.5 md:w-full h-[calc(100%-40px)] md:h-0.5 bg-stone-200 dark:bg-stone-800"></div>
                <div className="flex flex-col md:flex-row justify-between relative gap-10 md:gap-4">
                  {/* Step 1: En attente (Completed) */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-stone-100 dark:bg-stone-900/50 pr-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">En attente</p>
                      <p className="text-xs text-stone-500">18 Mars, 09:42</p>
                    </div>
                  </div>
                  {/* Step 2: Validée (Completed) */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-stone-100 dark:bg-stone-900/50 pr-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">Validée</p>
                      <p className="text-xs text-stone-500">18 Mars, 14:15</p>
                    </div>
                  </div>
                  {/* Step 3: En préparation (Active/Current) */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-stone-100 dark:bg-stone-900/50 pr-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container border-4 border-primary flex items-center justify-center shadow-lg relative">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-primary">En préparation</p>
                      <p className="text-xs text-stone-500 italic">En cours à l'entrepôt</p>
                    </div>
                  </div>
                  {/* Step 4: En livraison (Future) */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-stone-100 dark:bg-stone-900/50 pr-4">
                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center border-2 border-stone-300 dark:border-stone-700">
                      <span className="material-symbols-outlined">local_shipping</span>
                    </div>
                    <div>
                      <p className="font-bold text-stone-400">En livraison</p>
                      <p className="text-xs text-stone-500 opacity-0">—</p>
                    </div>
                  </div>
                  {/* Step 5: Livrée (Future) */}
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-stone-100 dark:bg-stone-900/50 pr-4">
                    <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-400 flex items-center justify-center border-2 border-stone-300 dark:border-stone-700">
                      <span className="material-symbols-outlined">home_pin</span>
                    </div>
                    <div>
                      <p className="font-bold text-stone-400">Livrée</p>
                      <p className="text-xs text-stone-500 opacity-0">—</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Content */}
            <section className="bg-stone-100 dark:bg-stone-900/50 rounded-xl p-8 border border-stone-200/20 dark:border-stone-800/20">
              <h2 className="text-xl font-headline font-bold mb-8 text-primary">Détails de la commande</h2>
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-950 rounded-lg shadow-sm border border-stone-200/50 dark:border-stone-800/50">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-stone-100 dark:bg-stone-900 flex-shrink-0">
                      <img className="w-full h-full object-cover" data-alt="Modern precision soil analyzer device on a clean white surface with scientific lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRhZRdSLuANIOGjKI_S-lYY6WYCg1l12CHRceD7aZ6VS_AhKcuzi1dGz7VXc5QDxrrp_0t0W-OrVO_XoRSz99YlaHEln_Iv3Autrjp623dZg6lg1NpImrl80U96cEzJqx5aciH9oXI_4m_fI1zUoyLzjIG2rZNo9wqpRGkZgaak0vbCUv5tnkTLte_blI4-MqNq8alfg19lEGZtLenblgTynr6aOyqcsE-Zv63KvTnmGHh0GWcQ5S-31dEAmNipp_iGHmxRiuGZ-U" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-headline">Analyseur de Sol Pro</h3>
                      <p className="text-stone-500 dark:text-stone-400 text-sm">Capteur NPK High-Precision</p>
                      <p className="text-primary font-semibold mt-1">Qté: 1</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl font-headline">4 500 DH</p>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-950 rounded-lg shadow-sm border border-stone-200/50 dark:border-stone-800/50">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-stone-100 dark:bg-stone-900 flex-shrink-0">
                      <img className="w-full h-full object-cover" data-alt="Large 25kg bags of organic fertilizer stacked neatly in a sunlit modern warehouse setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl4uGNx8VxG6qLoesGTtmemNfB2zuXV2kt4v2sZ4-4z--urE4knvsnujU1msNegZoWUdCHCcCv3LMbN1hWT9fY1p2NI1vLuhzsfxfOUauUF9habZDDMdVhOFpK8L4f0cQjIspXYyaaeBAsoXENV9EJhklyGzBZSE9OJ6bxq2Mn57KL10XaTgXbTNVcv3v_d9GfmR1aK-Iryxa-TSa4aCHxxGFM4nIjmWeyt7C4Rpt-PxICiT1kiMTNbaTgpwc8tZRuIYg8s_32xPw" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg font-headline">Azote Organique 25kg</h3>
                      <p className="text-stone-500 dark:text-stone-400 text-sm">Formule Croissance Rapide</p>
                      <p className="text-primary font-semibold mt-1">Qté: 4</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-xl font-headline">1 560 DH</p>
                    <p className="text-xs text-stone-500">390 DH / unité</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Summary & Actions (Side Bento Column) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Delivery Summary Card */}
            <section className="bg-primary-container text-on-primary-container rounded-xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl">event_available</span>
                <h2 className="text-xl font-headline font-bold">Livraison estimée</h2>
              </div>
              <p className="text-4xl font-headline font-black mb-8">24 Mars 2024</p>
              <div className="space-y-4 pt-6 border-t border-on-primary-container/20">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined opacity-70">location_on</span>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-tighter opacity-70">Adresse de livraison</p>
                    <p className="font-bold">Ferme des Horizons</p>
                    <p>Zone B-42, Route des Champs</p>
                    <p>69000 Lyon, France</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Map / Location Context */}
            <section className="bg-stone-100 dark:bg-stone-900 rounded-xl overflow-hidden h-64 relative border border-stone-200/20 dark:border-stone-800/20">
              <div className="absolute inset-0 bg-stone-200/20 dark:bg-stone-800/20">
                <img className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" data-alt="Abstract satellite topographic map view of agricultural fields with clean graphic overlays" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCytNHRmT4zoDzc13-jmYb4JHhnOnpW82hQWerKSi7uw5CVWqeGp6BciLw5hFMsqshorGI35is7zu28TxEUx5_TkvzcDzfIUPdu_tj9tnRQTpc0GLGCUmeCRo8Sgh1i_55iCprv1ubyDefJkmtPC1Q3LWe_JDsg9NiRiBfzGcejBiKNz574GxAlBRyuZ2zwvV0mYAYRWV_90ugduD796e3-dVHEU41Yodz6wWcFxdAN674gv5Yh7CAwUppsrCRKuceZoSYGhVGGuY8" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-stone-900 p-2 rounded-full shadow-2xl">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-stone-900/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-primary">
                Dernier scan: Lyon Hub
              </div>
            </section>

            {/* Support CTA */}
            <section className="bg-stone-100 dark:bg-stone-900/50 rounded-xl p-8 flex flex-col items-center text-center border border-stone-200/20 dark:border-stone-800/20">
              <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <span className="material-symbols-outlined text-tertiary text-3xl">support_agent</span>
              </div>
              <h3 className="font-headline font-bold text-lg mb-2 text-stone-900 dark:text-stone-100">Besoin d'aide ?</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">Nos experts agronomes sont disponibles pour toute question sur votre livraison.</p>
              <button className="w-full bg-primary text-on-primary font-bold py-4 rounded-md transition-all active:scale-95 shadow-md hover:bg-primary-container flex items-center justify-center gap-2">
                <span>Contacter le Support</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="bg-stone-100 dark:bg-stone-900 w-full border-t border-stone-200 dark:border-stone-800 mt-20">
        <div className="max-w-screen-2xl mx-auto px-6 py-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-headline font-bold text-stone-900 dark:text-stone-100 text-xl">
              AgriCentral
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest font-bold">
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Terms of Service</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Privacy Policy</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Shipping Rates</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Support</a>
            </nav>
          </div>
          <div className="text-center md:text-left text-stone-400 dark:text-stone-500 text-xs uppercase tracking-widest pt-8 border-t border-stone-200 dark:border-stone-800 font-bold">
            © 2024 AgriCentral. Precision Earth Management.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Orders;
