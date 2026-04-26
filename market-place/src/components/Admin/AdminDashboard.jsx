import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t, i18n } = useTranslation();
    const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, pendingOrders: 0, totalUsers: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const [isMounted, setIsMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        
        fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`)
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching admin stats:", err);
                setIsLoading(false);
            });
            
        return () => clearInterval(timer);
    }, []);

    const cards = [
        { title: 'Ventes Totales', value: `${stats.totalSales || 0} DH`, icon: 'payments', color: 'bg-green-500', trend: '+12% ce mois' },
        { title: 'Commandes', value: stats.totalOrders || 0, icon: 'shopping_basket', color: 'bg-blue-500', trend: 'Toutes périodes' },
        { title: 'À Préparer', value: stats.pendingOrders || 0, icon: 'pending_actions', color: 'bg-amber-500', trend: 'Actions urgentes' },
        { title: 'Collaborateurs', value: stats.totalUsers || 0, icon: 'group', color: 'bg-purple-500', trend: 'Inscrits sur Injaz' }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-headline font-black text-stone-900 dark:text-stone-50">Vue d'ensemble</h1>
                    <p className="text-stone-500 dark:text-stone-400 mt-2">Bienvenue sur le prototype Injaz. Voici l'état actuel de votre marketplace.</p>
                </div>
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Heure Système</span>
                    <span className="text-lg font-mono font-bold text-primary">{currentTime}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/50 dark:border-stone-800/50 shadow-sm transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-stone-200/20 dark:hover:shadow-black/20 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${card.color} p-3 rounded-xl text-white shadow-lg transition-transform group-hover:rotate-12`}>
                                <span className="material-symbols-outlined">{card.icon}</span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{card.trend}</span>
                        </div>
                        <h3 className="text-stone-500 dark:text-stone-400 text-sm font-medium">{card.title}</h3>
                        <p className="text-3xl font-black text-stone-900 dark:text-stone-50 mt-1 font-headline">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Recent Activity Placeholder */}
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200/50 dark:border-stone-800/50 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        Performance Prototype
                    </h2>
                    <div className="space-y-4">
                        <p className="text-stone-500 text-sm">Ce graphique montre la croissance simulée des commandes sur le mois d'avril 2026.</p>
                        <div className="h-48 bg-stone-50 dark:bg-stone-950 rounded-xl flex items-end justify-between p-4 gap-2 overflow-hidden">
                            {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                <div key={i} className="bg-primary/20 w-full rounded-t-md relative group">
                                    <div 
                                        className="bg-primary w-full rounded-t-md absolute bottom-0 transition-all duration-1000 ease-out" 
                                        style={{ height: isMounted ? `${h}%` : '0%' }}
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {Math.round(h * 1.5)}v
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
