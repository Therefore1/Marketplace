import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email });
    navigate('/products');
  };

  return (
    <div className="bg-[#fafaf5] text-[#1a1c19] min-h-screen flex flex-col font-body">
      <main className="flex-grow flex items-stretch min-h-screen">
        {/* Visual Sidebar (same layout as SignUp) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1f3a1b]">
          <img alt="Vue aérienne d'un champ agricole de précision" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfoNktTC117M5m8ZbT1ysuZGSOL0dDdyrw31YK8m9LvTGrpYYoa2CM5wBIcjwXxXzDOxbKLUWAdxHiDQgQ58TSZ0WGJIxwZBNZ12U9Ja62xXIwIpYtKbxeW7hTFaavBMyclhF7uDsNJ5_R1aMm7DgiQ-IwUbxTGUbEam5qvtnVc03KYoS9daSKS8K3KTJ-USIwFBX5hFRpmFiSi1gwoOp5jGZnw1JkzDEStMfFl0irNY0Y9U-WZuKajQ5Dk2UTTFjCjfAejS1m2no" />
          
          {/* Subtle gradient overlay to make text pop beautifully */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#152912]/80 via-[#1f3a1b]/30 to-transparent pointer-events-none"></div>

          <div className="relative z-10 p-16 flex flex-col justify-center h-full w-full max-w-2xl mx-auto">
            <div className="inline-flex self-start items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ccffbe] text-sm font-bold tracking-widest mb-8 shadow-lg">
              Content de vous revoir
            </div>
            
            <h2 className="font-headline text-[3.5rem] md:text-6xl font-black text-white leading-tight mb-8 drop-shadow-md">
              Achetez vos produits agricoles<br/>en toute simplicité.
            </h2>
            
            <p className="text-xl md:text-2xl text-[#dffcca] font-medium leading-relaxed opacity-95 drop-shadow">
              Trouvez semences, engrais et matériel<br/>au meilleur prix.
            </p>
          </div>
          
          {/* Small decorative accent in the bottom corner */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#fafaf5] transform rotate-45 translate-x-20 translate-y-20 hidden xl:block shadow-xl"></div>
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#fafaf5]">
          <div className="max-w-md w-full space-y-10 mt-12 md:mt-0">
            <div className="space-y-4">
              <div className="lg:hidden font-headline text-xl font-extrabold tracking-tight text-[#32602c] mb-8">
                AgriCentral
              </div>
              <h1 className="font-headline text-4xl font-extrabold text-[#1a1c19] tracking-tight leading-tight">
                Bon retour parmi nous
              </h1>
              <p className="text-[#40493d] font-medium leading-relaxed">
                Connectez-vous pour accéder à votre espace personnel.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#40493d] ml-1">Email ou Numéro de téléphone</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">person</span>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all"
                    placeholder="agriculteur@domaine.fr"
                  />
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="block text-[14px] font-semibold text-[#40493d] ml-1">Mot de passe</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">lock</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all tracking-widest text-lg"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c88] hover:text-stone-700 p-1 flex items-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded-[4px] border-[#bfcaba] bg-[#e3e3de] text-[#32602c] focus:ring-[#32602c]" />
                  <span className="text-[14px] font-medium text-[#40493d]">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-[14px] font-bold text-[#91405a] hover:underline hover:text-[#7d374d]">Mot de passe oublié ?</a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2E7D32] hover:bg-[#4a7942] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                <span>Se connecter</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-[#40493d] font-medium text-[15px]">
                Nouveau sur la plateforme ? 
                <Link to="/signup" className="text-[#32602c] font-bold hover:underline ml-2">Créer un compte</Link>
              </p>
            </div>

            <div className="pt-10 flex items-center justify-center border-t border-[#bfcaba]/30">
              <div className="flex items-center space-x-2 text-[#707a6c] text-[10px] uppercase tracking-widest font-bold">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>Données Sécurisées</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
