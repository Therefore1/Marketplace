import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const getTabClass = (tabName) => {
    return activeTab === tabName
      ? "flex items-center gap-3 px-6 py-3 text-[#32602c] font-bold bg-[#e3e3de] rounded-r-full hover:translate-x-1 transition-transform duration-200 cursor-pointer w-full text-left"
      : "flex items-center gap-3 px-6 py-3 text-[#40493d] hover:bg-[#e8e8e3] hover:translate-x-1 transition-transform duration-200 rounded-r-full cursor-pointer w-full text-left";
  };

  return (
    <div className="bg-[#fafaf5] text-[#1a1c19] min-h-screen font-body">
      <div className="flex pt-[72px] max-w-[1440px] mx-auto min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex flex-col py-8 gap-4 h-[calc(100vh-72px)] w-64 border-r border-[#bfcaba]/15 bg-[#f4f4ef] sticky top-[72px]">
          <div className="px-6 mb-4">
            <h2 className="text-lg font-extrabold text-[#32602c] font-headline">John Deere</h2>
            <p className="text-xs text-[#40493d] font-medium">Premium Ledger Member</p>
          </div>
          <nav className="flex flex-col gap-1 pr-4">
            <button onClick={() => setActiveTab('profile')} className={getTabClass('profile')}>
              <span className="material-symbols-outlined">person</span>
              <span className="text-sm font-medium font-body">Profil</span>
            </button>
            <button onClick={() => setActiveTab('orders')} className={getTabClass('orders')}>
              <span className="material-symbols-outlined">history</span>
              <span className="text-sm font-medium font-body">Historique commandes</span>
            </button>
            <button onClick={() => setActiveTab('wishlist')} className={getTabClass('wishlist')}>
              <span className="material-symbols-outlined">favorite</span>
              <span className="text-sm font-medium font-body">Liste d'Envies</span>
            </button>
            <button onClick={() => setActiveTab('settings')} className={getTabClass('settings')}>
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium font-body">Paramètres</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Tab: Profile */}
            {activeTab === 'profile' && (
              <>
                <section className="space-y-8" id="personal-infos">
                  <div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
                    <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Profil</h3>
                    <span className="text-[#32602c] font-bold text-sm cursor-pointer hover:underline">Modifier</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom complet</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="John Deere"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Email Professionnel</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="email" value="john.deere@horizons.farm"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Téléphone</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="+33 6 12 34 56 78"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom de l'exploitation</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="Ferme des Horizons"/>
                    </div>
                  </div>
                </section>

                <section className="space-y-8" id="addresses">
                  <h3 className="text-2xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Mes Adresses</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-[#f4f4ef] rounded-xl p-6 relative overflow-hidden group border border-[#bfcaba]/30">
                      <div className="relative z-10">
                        <span className="bg-[#32602c] text-[#ffffff] text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase">Principal</span>
                        <h4 className="text-xl font-bold text-[#32602c] mb-1">Ferme des Horizons</h4>
                        <p className="text-[#40493d] text-sm mb-4">42 Route de la Plaine, 64000 Pau, France</p>
                        <div className="flex gap-4">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[#40493d] uppercase">Parcelles</span>
                            <span className="text-lg font-bold text-[#1a1c19]">12 Zones</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-[#40493d] uppercase">Superficie</span>
                            <span className="text-lg font-bold text-[#1a1c19]">85 Hectares</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                        <img alt="Aerial farm view" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4mveaPQVsPKcBRtgOAN_ImGcLvH3bUnKqpm3nmNc5JYsAH6x-_9-01IMlbp09kUIz7eiN6uQQ0o1d_essb9L5GiRFq2bhZiOkR67JQxRNoarsY8PaS3cBQb_O-Q9Y5PGEj-qwC2ZFVNBqYTinwaBMIln-mzdylAgYvX8wi9jzET9ORSb6K0UiXX8eAimaYmz3ysMyHiQFwqs97kzty3nRxava1H6JYbusubq0gnD7XP8XgoC5rs830NkTwE-NuNKrSHsAu_SQVCs"/>
                      </div>
                    </div>
                    <div className="bg-[#e3e3de] rounded-xl p-6 flex flex-col justify-center items-center border-2 border-dashed border-[#bfcaba]/60 hover:border-[#32602c]/50 transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[#32602c] text-4xl mb-2">add_location</span>
                      <span className="font-bold text-sm text-[#40493d]">Ajouter une parcelle</span>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* Tab: Orders */}
            {activeTab === 'orders' && (
              <section className="space-y-8" id="orders">
                <div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
                  <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Historique commandes</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-[10px] font-bold uppercase tracking-widest text-[#40493d]">
                        <th className="px-6 py-2">ID Commande</th>
                        <th className="px-6 py-2">Date</th>
                        <th className="px-6 py-2">Montant</th>
                        <th className="px-6 py-2">Statut</th>
                        <th className="px-6 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#f4f4ef] hover:bg-[#e8e8e3] transition-colors border border-[#bfcaba]/30 rounded-xl">
                        <td className="px-6 py-4 font-bold rounded-l-xl text-[#1a1c19]">#CL-89231</td>
                        <td className="px-6 py-4 text-sm text-[#40493d]">12 Oct 2023</td>
                        <td className="px-6 py-4 font-bold text-[#1a1c19]">1 240,00 €</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#c6c8b7] text-[#1a1d12] text-[10px] font-bold px-3 py-1 rounded-full">LIVRÉ</span>
                        </td>
                        <td className="px-6 py-4 rounded-r-xl">
                          <span className="material-symbols-outlined text-[#32602c] cursor-pointer">description</span>
                        </td>
                      </tr>
                      <tr className="bg-[#e3e3de] hover:bg-[#e8e8e3] transition-colors border border-[#bfcaba]/30 rounded-xl">
                        <td className="px-6 py-4 font-bold rounded-l-xl text-[#1a1c19]">#CL-88102</td>
                        <td className="px-6 py-4 text-sm text-[#40493d]">05 Sep 2023</td>
                        <td className="px-6 py-4 font-bold text-[#1a1c19]">850,50 €</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#c6c8b7] text-[#1a1d12] text-[10px] font-bold px-3 py-1 rounded-full">LIVRÉ</span>
                        </td>
                        <td className="px-6 py-4 rounded-r-xl">
                          <span className="material-symbols-outlined text-[#32602c] cursor-pointer">description</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Tab: Wishlist */}
            {activeTab === 'wishlist' && (
              <section className="space-y-8" id="wishlist">
                <div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
                  <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Liste d'Envies</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 relative">
                      <img alt="Precision sensor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIRQ5S0ftlSMZCIiqQwpS6DwS8i5xW5j__FkR6Oaej4wKFx0YNVuWPqx1l2Kn5cjOPXmSN_X5lRm6VaxndLHMLWokFA4xVRe927FYPeMYNmOM2fGhQN5f2xtat6zZvAUoSEDnt_zlo4odxT-BAF9Vm5-Yv6WcjketpGvP-MOcGM83NhRPV3O-Pw3tOT_6uqcrjqzUnwOxKc25ZbilCIeDnxafF_0gHrhMXwgRq-wV5h7p_dO13jhlMgR6IbxwceT3enjuzTyGEaWY" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm cursor-pointer">
                        <span className="material-symbols-outlined text-[#923357]" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-[#1a1c19]">Capteur NPK de précision V3</h4>
                        <p className="text-[#40493d] text-sm">Hardware &amp; Analyse Sols</p>
                      </div>
                      <span className="text-[#32602c] font-bold">489,00 €</span>
                    </div>
                  </div>
                  <div className="group">
                    <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 relative">
                      <img alt="Bio fertilizer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAURuzDpigXbogNaSdyCivHJ-889JTWDIagqBzau5C6jjYVAU_Y1mKyEKu_LSZTfcDJD07hJoBEUvHQkE7nTXPcGVvYGzHgvmxrSAI6X80CHC8O43iFBsT5sXIoC0pFjKVZaYCc1mkMXKL0hJMRPlX4ir1INBVJvvDe2Bnmlegtnp6gCl75TX8AZNTVCwJFzROT9W85_R72vExBDkuMuppHETF9HhnBgIZhYTzZkkvlkjLLt5EUaW437mPjPzOME2qBs8DRteq1BTU" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm cursor-pointer">
                        <span className="material-symbols-outlined text-[#923357]" style={{fontVariationSettings: "'FILL' 1"}}>favorite</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-[#1a1c19]">Bio-Nutriments 'Terra Prime'</h4>
                        <p className="text-[#40493d] text-sm">Fertilisants Organiques</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-[#b14b6f] text-[#ffedf0] text-[10px] font-bold px-2 py-0.5 rounded mb-1">-15% OFF</span>
                        <span className="text-[#32602c] font-bold">115,00 €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Tab: Settings */}
            {activeTab === 'settings' && (
              <section className="space-y-8 pb-12" id="settings">
                <div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
                  <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Paramètres</h3>
                </div>
                <div className="bg-[#f4f4ef] rounded-2xl p-8 space-y-6 border border-[#bfcaba]/30">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1a1c19]">Notifications push</h4>
                      <p className="text-sm text-[#40493d]">Alertes sur les prix du marché et l'état des sols.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-[#bfcaba] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32602c]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1a1c19]">Alertes SMS</h4>
                      <p className="text-sm text-[#40493d]">Résumé hebdomadaire de l'activité.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input className="sr-only peer" type="checkbox" />
                      <div className="w-11 h-6 bg-[#bfcaba] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#32602c]"></div>
                    </label>
                  </div>
                  <div className="pt-4 border-t border-[#bfcaba]/15 flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1a1c19]">Langue du compte</h4>
                      <p className="text-sm text-[#40493d]">Préférence d'affichage de l'interface.</p>
                    </div>
                    <select className="bg-[#e8e8e3] border-none rounded-lg text-sm font-bold text-[#32602c] focus:ring-[#32602c] py-2 pl-4 pr-10 outline-none">
                      <option value="fr">Français (FR)</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>
                </div>
              </section>
            )}

          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Component */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-[#fafaf5]/90 backdrop-blur-lg border-t border-[#bfcaba]/10 shadow-[0px_-12px_32px_rgba(26,28,25,0.04)]">
        <div className="flex justify-around items-center h-20 px-4">
          <div className="flex flex-col items-center justify-center text-[#636658] active:scale-90 transition-all cursor-pointer">
            <span className="material-symbols-outlined">home</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Home</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[#636658] active:scale-90 transition-all cursor-pointer">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Market</span>
          </div>
          <div className="flex flex-col items-center justify-center text-[#636658] active:scale-90 transition-all cursor-pointer">
            <span className="material-symbols-outlined">favorite</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Wishlist</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#32602c] text-white rounded-xl px-6 py-1 active:scale-90 transition-all cursor-pointer">
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">Account</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
