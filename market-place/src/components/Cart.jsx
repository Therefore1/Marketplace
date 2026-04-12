import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, isLoading, updateQuantity, removeFromCart, cartTotal } = useCart();

  // Ensure we start at the top of the page when navigating to Cart
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tva = Math.round(cartTotal * 0.2);
  const totalWithTva = cartTotal + tva + (cartItems.length > 0 ? 125 : 0);

  return (
    <div className="bg-surface text-on-surface pb-32">
      <main className="max-w-screen-2xl mx-auto px-6 py-12 md:py-20 mt-16">
        {/* Editorial Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-primary mb-4 font-headline">Votre Panier</h1>
          <p className="text-stone-600 dark:text-stone-400 font-medium tracking-wide flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            Précision et clarté pour votre inventaire d'exploitation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product List Section */}
          <div className="lg:col-span-8 space-y-8">
            {isLoading ? (
              <div className="text-center py-20 text-stone-500 font-bold">Chargement du inventaire...</div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-20 bg-stone-100 dark:bg-stone-900/40 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-800">
                <p className="text-stone-500 font-bold text-xl mb-4">Votre panier est vide.</p>
                <Link to="/products" className="text-primary font-bold hover:underline">Découvrir nos produits</Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cart_item_id} className="group relative flex flex-col md:flex-row gap-6 p-6 bg-stone-100 dark:bg-stone-900/50 rounded-lg transition-all hover:bg-stone-200/50 dark:hover:bg-stone-800/50">
                  <div className="w-full md:w-48 h-48 rounded-md overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <img alt={item.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" src={item.image} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-1 font-headline">{item.name}</h3>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.availability === 'In Stock' ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                          {item.availability === 'In Stock' ? 'En Stock' : 'Stock Limité'}
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.cart_item_id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors" title="Supprimer produit">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Modifier quantité</span>
                        <div className="flex items-center bg-white dark:bg-stone-900 rounded-md overflow-hidden border border-stone-200 dark:border-stone-800">
                          <button onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)} className="px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            <span className="material-symbols-outlined text-sm">remove</span>
                          </button>
                          <span className="px-6 py-2 font-bold text-stone-900 dark:text-stone-50">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)} className="px-4 py-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                            <span className="material-symbols-outlined text-sm">add</span>
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-stone-500 block">Prix unitaire</span>
                        <span className="text-2xl font-black text-primary font-headline">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="pt-8">
              <Link className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-300" to="/products">
                <span className="material-symbols-outlined">arrow_back</span>
                Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4">
            <div className="bg-stone-100 dark:bg-stone-900/80 p-8 rounded-lg sticky top-32 border border-stone-200/50 dark:border-stone-800/50">
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-8 font-headline">Récapitulatif</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                  <span className="font-medium">Sous-total</span>
                  <span className="font-bold text-stone-900 dark:text-stone-50">{cartTotal.toLocaleString()} DH</span>
                </div>
                <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                  <span className="font-medium">Livraison estimée</span>
                  <span className="font-bold text-stone-900 dark:text-stone-50">{cartItems.length > 0 ? "125 DH" : "0 DH"}</span>
                </div>
                <div className="flex justify-between items-center text-stone-600 dark:text-stone-400 pb-6">
                  <span className="font-medium">Taxes (TVA 20%)</span>
                  <span className="font-bold text-stone-900 dark:text-stone-50">{tva.toLocaleString()} DH</span>
                </div>

                <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-sm font-bold uppercase tracking-widest text-stone-500">Total prix</span>
                    <span className="text-4xl font-black text-primary font-headline">{totalWithTva.toLocaleString()} DH</span>
                  </div>
                  {cartItems.length > 0 ? (
                    <Link to="/checkout" className="w-full h-14 bg-gradient-to-r from-green-800 to-green-700 dark:from-green-700 dark:to-green-600 text-white font-bold rounded-md flex items-center justify-center gap-3 shadow-lg hover:opacity-90 transition-all active:scale-[0.98]">
                      Commander
                      <span className="material-symbols-outlined">shopping_cart_checkout</span>
                    </Link>
                  ) : (
                    <button disabled className="w-full h-14 bg-stone-300 text-white font-bold rounded-md flex items-center justify-center gap-3 cursor-not-allowed">
                      Commander
                      <span className="material-symbols-outlined">shopping_cart_checkout</span>
                    </button>
                  )}
                  <p className="mt-4 text-center text-xs text-stone-400 leading-relaxed font-medium">
                    Les délais de livraison pour les équipements techniques peuvent varier selon la zone géographique de votre exploitation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Shell */}
      <footer className="bg-stone-100 dark:bg-stone-900 w-full border-t border-stone-200 dark:border-stone-800 mt-20">
        <div className="max-w-screen-2xl mx-auto px-6 py-12 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="font-headline font-bold text-stone-900 dark:text-stone-100 text-xl">
              The Cultivated Ledger
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-widest font-bold">
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Terms of Service</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Privacy Policy</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Shipping Rates</a>
              <a className="text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" href="#">Support</a>
            </nav>
          </div>
          <div className="text-center md:text-left text-stone-400 dark:text-stone-500 text-xs uppercase tracking-widest pt-8 border-t border-stone-200 dark:border-stone-800 font-bold">
            © 2024 The Cultivated Ledger. High-End Editorial Utility for the Modern Estate.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
