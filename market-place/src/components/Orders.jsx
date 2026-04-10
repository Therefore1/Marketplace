import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { isLoggedIn, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, user?.id]);

  const fetchOrders = () => {
    setIsLoading(true);
    fetch(`http://127.0.0.1:5000/api/orders/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setIsLoading(false);
      });
  };

  const handleOrderClick = async (orderNum) => {
    setIsDetailLoading(true);
    scrollTo(0, 0);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/orders/details/${orderNum}`);
      const data = await response.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error('Error fetching order details:', err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'EN PRÉPARATION': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'EXPÉDIÉE': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'LIVRÉE': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  if (selectedOrder) {
    return (
      <div className="bg-[#fafaf5] dark:bg-stone-950 min-h-screen text-on-surface">
        <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-xl mx-auto mt-16 font-body">
          {/* Header Section */}
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <nav className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-4">
                  <span className="cursor-pointer hover:text-primary transition-colors" onClick={handleBackToList}>Mes Commandes</span>
                  <span className="material-symbols-outlined text-xs">chevron_right</span>
                  <span className="font-semibold text-on-surface">{selectedOrder.order_num}</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">Détails Commande {selectedOrder.order_num}</h1>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <p className="text-stone-500 dark:text-stone-400 text-sm font-medium uppercase tracking-widest">Date d'achat</p>
                <p className="text-xl font-bold">{selectedOrder.date}</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {/* Tracking Timeline */}
              <section className="bg-white dark:bg-stone-900 rounded-2xl p-8 md:p-12 border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
                <h2 className="text-xl font-headline font-bold mb-10 text-primary">État de la livraison</h2>
                <div className="relative">
                  <div className="absolute top-5 left-6 md:left-6 md:top-6 w-0.5 md:w-[calc(100%-48px)] h-[calc(100%-40px)] md:h-0.5 bg-stone-100 dark:bg-stone-800"></div>
                  <div className="flex flex-col md:flex-row justify-between relative gap-10 md:gap-4">
                    {/* Progress indicators based on status */}
                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-white dark:bg-stone-900 pr-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                        <span className="material-symbols-outlined">check_circle</span>
                      </div>
                      <div>
                        <p className="font-bold">Validée</p>
                        <p className="text-xs text-stone-500">{selectedOrder.date}</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-white dark:bg-stone-900 pr-4 text-center md:text-left">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${selectedOrder.status !== 'EN PRÉPARATION' ? 'bg-primary text-white' : 'bg-primary-container text-on-primary-container border-4 border-primary'}`}>
                        <span className="material-symbols-outlined">inventory_2</span>
                      </div>
                      <div>
                        <p className={`font-bold ${selectedOrder.status === 'EN PRÉPARATION' ? 'text-primary' : ''}`}>En préparation</p>
                        <p className="text-xs text-stone-500">Prêt pour l'expédition</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-white dark:bg-stone-900 pr-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${selectedOrder.status === 'EXPÉDIÉE' || selectedOrder.status === 'LIVRÉE' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-stone-50 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'}`}>
                        <span className="material-symbols-outlined">local_shipping</span>
                      </div>
                      <div>
                        <p className={`font-bold ${selectedOrder.status === 'EXPÉDIÉE' ? 'text-primary' : selectedOrder.status === 'LIVRÉE' ? '' : 'text-stone-400'}`}>Expédiée</p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-6 z-10 bg-white dark:bg-stone-900 pr-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${selectedOrder.status === 'LIVRÉE' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-stone-50 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'}`}>
                        <span className="material-symbols-outlined">home_pin</span>
                      </div>
                      <div>
                        <p className={`font-bold ${selectedOrder.status === 'LIVRÉE' ? 'text-primary' : 'text-stone-400'}`}>Livrée</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order Items */}
              <section className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
                <h2 className="text-xl font-headline font-bold mb-8 text-primary">Articles commandés</h2>
                <div className="space-y-4">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-100 dark:border-stone-800 transition-all hover:bg-stone-100 dark:hover:bg-stone-900 group">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-white dark:bg-stone-900 flex-shrink-0 border border-stone-200/50 shadow-sm group-hover:scale-105 transition-transform">
                            <img 
                              className="w-full h-full object-cover" 
                              src={item.product_image?.startsWith('data:') || item.product_image?.startsWith('http') 
                                ? item.product_image 
                                : `http://127.0.0.1:5000${item.product_image}`} 
                              alt={item.product_name} 
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-stone-900 dark:text-stone-50 text-lg">{item.product_name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-stone-500 text-[10px] uppercase font-black tracking-widest bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">{item.product_category}</span>
                              <span className="text-primary font-black text-sm">Quantité: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xl text-stone-900 dark:text-stone-50">{item.unit_price}</p>
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">Prix Unitaire</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Fallback for old orders to show the UI design */
                    <div className="p-8 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-2xl">
                      <div className="w-24 h-24 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                        <span className="material-symbols-outlined text-4xl">inventory_2</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">Détails non archivés</h3>
                      <p className="text-stone-500 text-sm max-w-xs mx-auto mb-6">Cette commande a été passée sur une version précédente. Les visuels détaillés ne sont pas disponibles.</p>
                      
                      {/* Optional: Generic placeholder if you want a mock item */}
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {/* Delivery Address */}
              <section className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl shadow-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-3xl">location_on</span>
                  <h2 className="text-xl font-headline font-bold">Lieu des Travaux</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase font-black tracking-widest opacity-70 mb-1">Exploitation</p>
                    <p className="text-xl font-bold">{selectedOrder.farm_name || 'Non spécifié'}</p>
                  </div>
                  {(selectedOrder.parcel_num || selectedOrder.street || selectedOrder.city) && (
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-sm opacity-90">{selectedOrder.street}</p>
                      <p className="text-sm opacity-90">{selectedOrder.parcel_num && `Parcelle ${selectedOrder.parcel_num}`}</p>
                      <p className="text-sm opacity-90">{selectedOrder.city}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Order Total Summary */}
              <section className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
                <h3 className="font-headline font-bold text-lg mb-6">Résumé Financier</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-stone-500">
                    <span>Montant total</span>
                    <span>{selectedOrder.amount}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Livraison Agricole</span>
                    <span className="text-green-600 font-bold uppercase text-xs font-black">Gratuite</span>
                  </div>
                  <div className="pt-4 border-t-2 border-primary/10 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest">Payer à la réception</p>
                      <span className="font-headline text-lg font-black tracking-tighter">TOTAL DE PAYEMENT</span>
                    </div>
                    <span className="text-3xl font-black text-primary font-headline">{selectedOrder.amount}</span>
                  </div>
                </div>
              </section>
              
              <button 
                onClick={handleBackToList}
                className="w-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Retour à la liste
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf5] dark:bg-stone-950 min-h-screen text-on-surface">
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-xl mx-auto mt-16 font-body">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-on-surface">Mes Commandes</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-2 font-medium">Suivez l'historique et l'état de vos acquisitions AgriCentral.</p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-16 text-center border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-stone-300 mb-6">package_2</span>
            <h2 className="text-2xl font-bold mb-4">Aucune commande trouvée</h2>
            <p className="text-stone-500 mb-8 max-w-md mx-auto">Vous n'avez pas encore passé de commande sur AgriCentral. Explorez notre catalogue pour trouver le meilleur équipement.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              Explorer le catalogue
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order.order_num} className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/50 dark:border-stone-800/50 overflow-hidden hover:shadow-xl hover:shadow-stone-200/20 dark:hover:shadow-black/20 transition-all duration-300">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-3xl">shopping_bag</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold tracking-tight">Commande {order.order_num}</h3>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-stone-500 text-sm font-medium">Passée le {order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-none pt-6 md:pt-0">
                      <div className="flex-1 md:text-right">
                        <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mb-1">Montant Total</p>
                        <p className="text-2xl font-black text-primary font-headline">{order.amount}</p>
                      </div>
                      <button 
                        onClick={() => handleOrderClick(order.order_num)}
                        className="w-12 h-12 rounded-full border border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-400 hover:text-primary hover:border-primary transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Visual Progress Bar (Simplified) */}
                <div className="h-1 w-full bg-stone-100 dark:bg-stone-800">
                  <div 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: order.status === 'LIVRÉE' ? '100%' : order.status === 'EXPÉDIÉE' ? '66%' : '33%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Banner */}
        <section className="mt-12 bg-stone-800 text-stone-200 rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-stone-700">
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2 text-white font-headline">Besoin d'aide avec un colis ?</h3>
            <p className="opacity-80 max-w-lg">Nos experts sont disponibles 24/7 pour le suivi logistique de vos équipements sensibles et fournitures agricoles.</p>
          </div>
          <button className="relative z-10 bg-white text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors whitespace-nowrap shadow-xl">
            Contacter le support
          </button>
          <div className="absolute -right-4 -bottom-8 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[160px]">local_shipping</span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 mt-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter text-stone-900 dark:text-stone-50">AgriCentral</div>
          <div className="text-stone-400 text-xs uppercase font-bold tracking-widest">© 2024 Precision Earth. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Orders;
