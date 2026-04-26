import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center justify-center transition-all active:scale-90 cursor-pointer ${
      isActive ? 'text-primary' : 'text-stone-500 dark:text-stone-400'
    }`;
  };

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[100] bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200/50 dark:border-stone-800/50 shadow-2xl rounded-2xl overflow-hidden">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={getLinkClass('/')}>
          <span className={`material-symbols-outlined text-[28px] ${location.pathname === '/' ? 'fill-1' : ''}`} style={{ fontVariationSettings: location.pathname === '/' ? "'FILL' 1" : "''" }}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">{t('nav_home')}</span>
        </Link>
        <Link to="/products" className={getLinkClass('/products')}>
          <span className={`material-symbols-outlined text-[28px] ${location.pathname === '/products' ? 'fill-1' : ''}`} style={{ fontVariationSettings: location.pathname === '/products' ? "'FILL' 1" : "''" }}>storefront</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">{t('nav_marketplace')}</span>
        </Link>
        <Link to="/orders" className={getLinkClass('/orders')}>
          <span className={`material-symbols-outlined text-[28px] ${location.pathname === '/orders' ? 'fill-1' : ''}`} style={{ fontVariationSettings: location.pathname === '/orders' ? "'FILL' 1" : "''" }}>history</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">{t('nav_orders')}</span>
        </Link>
        <Link to="/profile" className={getLinkClass('/profile')}>
          <div className={`p-1 rounded-lg ${location.pathname === '/profile' ? 'bg-primary text-on-primary' : ''}`}>
            <span className={`material-symbols-outlined text-[28px] ${location.pathname === '/profile' ? 'fill-1' : ''}`} style={{ fontVariationSettings: location.pathname === '/profile' ? "'FILL' 1" : "''" }}>person</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5">{t('nav_account')}</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
