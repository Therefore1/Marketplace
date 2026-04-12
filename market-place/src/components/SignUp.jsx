import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${lastName}`, email, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }
      
      login({ id: data.id, name: data.name, email: data.email });
      navigate('/products');
    } catch (err) {
      setError('Erreur de connexion au serveur.');
      console.error(err);
    }
  };

  return (
    <div className="bg-[#fafaf5] text-[#1a1c19] min-h-screen flex flex-col font-body">
      <main className="flex-grow flex items-stretch min-h-screen">
        {/* Visual Sidebar */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1f3a1b]">
          <img alt="Vue aérienne d'un champ agricole de précision" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfoNktTC117M5m8ZbT1ysuZGSOL0dDdyrw31YK8m9LvTGrpYYoa2CM5wBIcjwXxXzDOxbKLUWAdxHiDQgQ58TSZ0WGJIxwZBNZ12U9Ja62xXIwIpYtKbxeW7hTFaavBMyclhF7uDsNJ5_R1aMm7DgiQ-IwUbxTGUbEam5qvtnVc03KYoS9daSKS8K3KTJ-USIwFBX5hFRpmFiSi1gwoOp5jGZnw1JkzDEStMfFl0irNY0Y9U-WZuKajQ5Dk2UTTFjCjfAejS1m2no" />

          {/* Subtle gradient overlay to make text pop beautifully */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#152912]/80 via-[#1f3a1b]/30 to-transparent pointer-events-none"></div>

          <div className="relative z-10 p-16 flex flex-col justify-center h-full w-full max-w-2xl mx-auto">
            <div className="inline-flex self-start items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ccffbe] text-sm font-bold tracking-widest mb-8 shadow-lg">
              Rejoignez AgriCentral
            </div>

            <h2 className="font-headline text-[3.5rem] md:text-6xl font-black text-white leading-tight mb-8 drop-shadow-md">
              Simplifiez vos<br />achats agricoles.
            </h2>

            <p className="text-xl md:text-2xl text-[#dffcca] font-medium leading-relaxed opacity-95 drop-shadow">
              Accédez rapidement à tous vos intrants<br />agricoles en un seul endroit.
            </p>
          </div>

          {/* Small decorative accent in the bottom corner */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#fafaf5] transform rotate-45 translate-x-20 translate-y-20 hidden xl:block shadow-xl"></div>
        </div>

        {/* Registration Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#fafaf5]">
          <div className="max-w-md w-full space-y-10 mt-12 md:mt-0">
            <div className="space-y-4">
              <div className="lg:hidden font-headline text-xl font-extrabold tracking-tight text-[#32602c] mb-8">
                The Cultivated Ledger
              </div>
              <h1 className="font-headline text-4xl font-extrabold text-[#1a1c19] tracking-tight leading-tight">
                Rejoignez AgriCentral
              </h1>
              <p className="text-[#40493d] font-medium leading-relaxed">
                Créez votre compte pour accéder à votre marketplace agricole.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#40493d] ml-1" htmlFor="first_name">Prénom</label>
                  <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all" id="first_name" placeholder="Jean" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[14px] font-semibold text-[#40493d] ml-1" htmlFor="last_name">Nom</label>
                  <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all" id="last_name" placeholder="Dupont" type="text" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#40493d] ml-1" htmlFor="email">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">mail</span>
                  <input required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all" id="email" placeholder="jean.dupont@exploitation.fr" type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#40493d] ml-1" htmlFor="password">Mot de passe</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">lock</span>
                  <input required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all tracking-widest text-lg" id="password" placeholder="••••••••" type="password" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[14px] font-semibold text-[#40493d] ml-1" htmlFor="confirm_password">Confirmer le mot de passe</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#707a6c]">lock_reset</span>
                  <input required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#e8e8e3] border-none focus:ring-2 focus:ring-[#32602c] text-[#1a1c19] placeholder-[#a0aa9c] outline-none transition-all tracking-widest text-lg" id="confirm_password" placeholder="••••••••" type="password" />
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <input required className="h-5 w-5 rounded-[4px] border-[#bfcaba] bg-[#e3e3de] text-[#32602c] focus:ring-[#32602c] transition-all cursor-pointer" id="terms" type="checkbox" />
                </div>
                <label className="text-[14px] text-[#40493d] leading-tight" htmlFor="terms">
                  J'accepte les <a className="text-[#32602c] font-semibold hover:underline" href="#">conditions d'utilisation</a> et la <a className="text-[#32602c] font-semibold hover:underline" href="#">politique de confidentialité</a>.
                </label>
              </div>

              <button className="w-full bg-[#2E7D32] hover:bg-[#4a7942] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center space-x-2" type="submit">
                <span>Créer mon compte</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-[#40493d] font-medium text-[15px]">
                Déjà membre ?
                <Link to="/login" className="text-[#32602c] font-bold hover:underline ml-2">Se connecter</Link>
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

export default SignUp;
