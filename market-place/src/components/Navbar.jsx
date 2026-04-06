import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "text-green-900 dark:text-green-50 border-b-2 border-green-800 dark:border-green-500 pb-1"
      : "text-stone-500 dark:text-stone-400 hover:text-green-700 dark:hover:text-green-300 transition-colors";
  };

  return (
    <header className="bg-[#fafaf5]/80 dark:bg-stone-950/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm dark:shadow-none transition-all duration-300 ease-in-out active:scale-95">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-4 lg:gap-8 flex-1">
          <Link to="/" className="text-xl font-bold tracking-tighter text-green-900 dark:text-green-50 shrink-0">AgriCentral</Link>
          <nav className="flex gap-3 lg:gap-6 font-manrope text-sm font-semibold tracking-tight overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link className={getLinkClass('/')} to="/">Marketplace</Link>
            <Link className={getLinkClass('/products')} to="/products">Products</Link>
            <Link className={getLinkClass('/orders')} to="/orders">Orders</Link>
            <Link className={getLinkClass('/equipment')} to="#"></Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <button className="material-symbols-outlined p-2 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg text-stone-600 hidden md:block">notifications</button>
          <Link to="/cart" className="material-symbols-outlined p-2 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg text-stone-600 text-center block">shopping_cart</Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button onClick={logout} className="p-2 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-lg text-stone-400 material-symbols-outlined" title="Logout">logout</button>
              <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#bfcaba]/30 hover:border-[#32602c] transition-colors block">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuByagiouTGiogJYSIW4jm0BaWfE5y06fhTYicnyLCsbKi8ALaC1Gf44wdTcEEeZi6NfWJRCuMbm7Z7RBOy69OTjLbCo6Lb1JSdaKbmSxcvERBgwoUTcSUHXVJa9m3NWqzUUk_Xk1Ox0RqG2NMHw0oM5U1-69QIuRmh7onldE5yXJFHaXyzns0DiZSlq_lJTrWnrYiKUS2E7dwz8Yl6ruJcNppCFfA1MVzW0LnZmXGGPZ1drBLJ-bRZmRtRfXy9YtB929ibEJ5vMu9Q" alt="User Profile" className="w-full h-full object-cover" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-stone-600 dark:text-stone-300 px-3 py-2 text-sm font-semibold hover:text-green-800 transition-colors">Se connecter</Link>
              <Link to="/signup" className="bg-primary text-on-primary px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-container transition-colors shadow-sm">S'inscrire</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
