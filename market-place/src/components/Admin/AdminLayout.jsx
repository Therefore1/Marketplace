import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { path: '/admin', icon: 'dashboard', label: 'Dashboard' },
        { path: '/admin/orders', icon: 'shopping_cart', label: 'Commandes' },
        { path: '/admin/products', icon: 'inventory_2', label: 'Produits' }
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col md:flex-row pt-16">
            {/* Mobile Header */}
            <div className="md:hidden bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 p-4 flex justify-between items-center sticky top-16 z-30">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">agriculture</span>
                    <h1 className="font-headline font-black text-primary uppercase tracking-tighter text-lg">AgriAdmin</h1>
                </div>
                <button onClick={toggleSidebar} className="p-2 text-stone-600 dark:text-stone-300">
                    <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 transform transition-transform duration-300 ease-in-out mt-16 md:mt-0 md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                ${i18n.language === 'ar' ? 'md:border-r-0 md:border-l' : ''}
            `}>
                <div className="p-8 hidden md:flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
                    <h1 className="font-headline font-black text-2xl text-primary uppercase tracking-tighter">AgriAdmin</h1>
                </div>

                <nav className="px-4 space-y-2 mt-4">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`
                                    flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all relative group
                                    ${isActive 
                                        ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                                        : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'}
                                `}
                            >
                                <span className={`material-symbols-outlined transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                                {isActive && (
                                    <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-stone-100 dark:border-stone-800">
                        <Link
                            to="/"
                            className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-primary hover:bg-primary/5 transition-all"
                        >
                            <span className="material-symbols-outlined">storefront</span>
                            <span>Retour Boutique</span>
                        </Link>
                    </div>
                </nav>

                <div className="absolute bottom-8 left-0 w-full px-4 hidden md:block">
                    <div className="p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-200/50 dark:border-stone-700/50">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <span className="material-symbols-outlined text-xs animate-ping">sensors</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Système Live</span>
                        </div>
                        <p className="text-xs font-bold text-stone-900 dark:text-stone-50">Prototype v1.2</p>
                        <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tight">© 2026 AgriCentral</p>
                    </div>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
