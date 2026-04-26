import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import './navbar.css';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [shouldBounce, setShouldBounce] = React.useState(false);

  // Trigger bounce animation when cart count changes
  React.useEffect(() => {
    if (cartCount > 0) {
      setShouldBounce(true);
      const timer = setTimeout(() => setShouldBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'fr' : 'ar';
    i18n.changeLanguage(nextLang);
  };


  const getLinkClass = (path, isMobile = false) => {
    let isActive = false;
    if (path === '/') {
        isActive = location.pathname === '/' && location.hash !== '#services';
    } else if (path === '/#services') {
        isActive = location.pathname === '/' && location.hash === '#services';
    } else {
        isActive = location.pathname === path;
    }

    const activeClass = isActive
      ? "text-primary border-b-2 border-primary pb-1"
      : "text-stone-500 dark:text-stone-400 hover:text-primary transition-colors";
      
    if (isMobile) {
        return isActive
          ? "text-primary font-bold bg-primary/10 px-4 py-3 rounded-xl flex items-center gap-3"
          : "text-stone-600 dark:text-stone-300 px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors";
    }
    return activeClass;
  };

  return (
    <>
      <header className="bg-surface/80 dark:bg-stone-950/80 backdrop-blur-md fixed top-0 w-full z-[100] shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4 lg:gap-8 overflow-hidden">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden material-symbols-outlined p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
            >
              menu
            </button>
            <Link to="/" className="text-xl font-bold tracking-tighter text-primary shrink-0">AgriCentral</Link>
            <nav className="hidden md:flex gap-6 font-manrope text-sm font-semibold tracking-tight">
              {isAdmin ? (
                <>
                  <Link className={getLinkClass('/admin')} to="/admin">{t('admin') === 'Admin' ? 'Tableau de Bord' : 'لوحة التحكم'}</Link>
                  <Link className={getLinkClass('/admin/orders')} to="/admin/orders">{t('nav_orders')}</Link>
                  <Link className={getLinkClass('/admin/products')} to="/admin/products">{t('nav_products')}</Link>
                </>
              ) : (
                <>
                  <Link className={getLinkClass('/')} to="/">{t('nav_marketplace')}</Link>
                  <Link className={getLinkClass('/products')} to="/products">{t('nav_products')}</Link>
                  <Link className={getLinkClass('/#services')} to="/#services">{t('nav_services')}</Link>
                  <Link className={getLinkClass('/orders')} to="/orders">{t('nav_orders')}</Link>
                </>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all uppercase"
            >
              <span className="material-symbols-outlined text-sm">language</span>
              {i18n.language === 'ar' ? 'FR' : 'AR'}
            </button>
            <button className="material-symbols-outlined p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-600 hidden md:block">notifications</button>
            {!isAdmin && (
              <Link 
                to="/cart" 
                className={`relative p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-600 transition-all ${shouldBounce ? 'cart-bounce' : ''}`}
              >
                <span className={`material-symbols-outlined block transition-all ${shouldBounce ? 'text-primary scale-110' : ''}`}>shopping_cart</span>
                {cartCount > 0 && (
                  <span className={`absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform ${shouldBounce ? 'scale-125' : 'scale-100'}`}>
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button onClick={logout} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-400 material-symbols-outlined hidden md:block" title="Logout">logout</button>
                <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-outline/30 hover:border-primary transition-colors block">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuByagiouTGiogJYSIW4jm0BaWfE5y06fhTYicnyLCsbKi8ALaC1Gf44wdTcEEeZi6NfWJRCuMbm7Z7RBOy69OTjLbCo6Lb1JSdaKbmSxcvERBgwoUTcSUHXVJa9m3NWqzUUk_Xk1Ox0RqG2NMHw0oM5U1-69QIuRmh7onldE5yXJFHaXyzns0DiZSlq_lJTrWnrYiKUS2E7dwz8Yl6ruJcNppCFfA1MVzW0LnZmXGGPZ1drBLJ-bRZmRtRfXy9YtB929ibEJ5vMu9Q" alt="User Profile" className="w-full h-full object-cover" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-stone-600 dark:text-stone-300 px-3 py-2 text-sm font-semibold hover:text-primary transition-colors hidden sm:block">{t('nav_login')}</Link>
                <Link to="/signup" className="bg-primary text-on-primary px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-container transition-colors shadow-sm">{t('nav_signup')}</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <aside className={`absolute left-0 top-0 h-full w-4/5 max-w-xs bg-surface shadow-2xl transition-transform duration-300 ease-out border-r border-outline/20 p-6 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-10">
            <span className="text-xl font-bold tracking-tighter text-primary">AgriCentral</span>
            <button onClick={() => setIsMenuOpen(false)} className="material-symbols-outlined p-2 text-stone-500">close</button>
          </div>
          
          <nav className="flex flex-col gap-2">
            {isAdmin ? (
               <>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/admin', true)} to="/admin">
                  <span className="material-symbols-outlined">dashboard</span>
                  {t('admin') === 'Admin' ? 'Tableau de Bord' : 'لوحة التحكم'}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/admin/orders', true)} to="/admin/orders">
                  <span className="material-symbols-outlined">assignment</span>
                  {t('nav_orders')}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/admin/products', true)} to="/admin/products">
                  <span className="material-symbols-outlined">inventory_2</span>
                  {t('nav_products')}
                </Link>
               </>
            ) : (
              <>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/', true)} to="/">
                  <span className="material-symbols-outlined">home</span>
                  {t('nav_marketplace')}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/products', true)} to="/products">
                  <span className="material-symbols-outlined">storefront</span>
                  {t('nav_products')}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/#services', true)} to="/#services">
                  <span className="material-symbols-outlined">agriculture</span>
                  {t('nav_services')}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/orders', true)} to="/orders">
                  <span className="material-symbols-outlined">history</span>
                  {t('nav_orders')}
                </Link>
                <Link onClick={() => setIsMenuOpen(false)} className={getLinkClass('/profile', true)} to="/profile">
                  <span className="material-symbols-outlined">person</span>
                  {t('nav_profile')}
                </Link>
              </>
            )}
          </nav>

          <div className="mt-auto absolute bottom-10 left-6 right-6 pt-6 border-t border-outline/10">
            {isLoggedIn ? (
              <button 
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined">logout</span>
                {t('nav_logout')}
              </button>
            ) : (
                <div className="flex flex-col gap-3">
                    <Link onClick={() => setIsMenuOpen(false)} to="/login" className="w-full py-3 text-center font-bold text-stone-600">{t('nav_login')}</Link>
                    <Link onClick={() => setIsMenuOpen(false)} to="/signup" className="w-full py-3 text-center font-bold bg-primary text-on-primary rounded-xl">{t('nav_signup')}</Link>
                </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
