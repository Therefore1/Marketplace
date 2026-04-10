import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const Profile = () => {
  const { isLoggedIn, user, login } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'profile');

  const initialName = user?.name || "";
  const firstSpaceIndex = initialName.indexOf(' ');
  const initFirst = firstSpaceIndex !== -1 ? initialName.substring(0, firstSpaceIndex) : initialName;
  const initLast = firstSpaceIndex !== -1 ? initialName.substring(firstSpaceIndex + 1) : "";

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(initFirst);
  const [lastName, setLastName] = useState(initLast);
  const [phone, setPhone] = useState(user?.phone || "");

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", location: "", zones: "", surface: "" });
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState({ message: '', type: '' });
  const [newProduct, setNewProduct] = useState({ name: "", category: "Semences", price: "", image: null });

  // Load addresses, orders and wishlist on mount
  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
      fetchOrders();
      fetchWishlist();
      fetchAllProducts();
    }
  }, [user?.id]);

  const fetchAllProducts = async () => {
    setIsLoadingAdmin(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      const data = await response.json();
      if (response.ok) {
        setAllProducts(data);
      }
    } catch (err) {
      console.error('Error fetching all products:', err);
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setIsAddingProduct(true);
    setAdminFeedback({ message: '', type: '' });

    // Helper to convert file to Base64
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    };

    try {
      let imageBase64 = "";
      if (newProduct.image && typeof newProduct.image !== 'string') {
        imageBase64 = await fileToBase64(newProduct.image);
      } else {
        imageBase64 = newProduct.image;
      }

      const response = await fetch('http://127.0.0.1:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          image: imageBase64
        })
      });

      const data = await response.json();
      if (response.ok) {
        setAllProducts([data, ...allProducts]);
        setNewProduct({ name: "", category: "Semences", price: "", image: null });
        setAdminFeedback({ message: 'Produit ajouté au catalogue avec succès !', type: 'success' });
        setTimeout(() => setAdminFeedback({ message: '', type: '' }), 3000);
      } else {
        setAdminFeedback({ message: `Erreur: ${data.error || 'Impossible d\'ajouter le produit'}`, type: 'error' });
      }
    } catch (err) {
      console.error('Error adding product:', err);
      setAdminFeedback({ message: 'Erreur réseau ou serveur.', type: 'error' });
    } finally {
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Voulez-vous supprimer ce produit du catalogue ?')) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/products/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setAllProducts(allProducts.filter(p => p.id !== id));
        }
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const fetchWishlist = async () => {
    setIsLoadingWishlist(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/wishlist/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setWishlistItems(data);
      }
    } catch (err) {
      console.error('Error fetching wishlist:', err);
    } finally {
      setIsLoadingWishlist(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId })
      });
      if (response.ok) {
        setWishlistItems(wishlistItems.filter(p => p.id !== productId));
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  };

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/orders/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchAddresses = async () => {
    setIsLoadingAddresses(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/addresses/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setAddresses(data);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (newAddress.name && newAddress.location) {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/addresses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, ...newAddress })
        });
        const data = await response.json();
        if (response.ok) {
          setAddresses([...addresses, data]);
          setNewAddress({ name: "", location: "", zones: "", surface: "" });
          setIsAddingAddress(false);
        }
      } catch (err) {
        console.error('Error adding address:', err);
      }
    }
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette adresse ?')) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/addresses/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setAddresses(addresses.filter(addr => addr.id !== id));
        }
      } catch (err) {
        console.error('Error deleting address:', err);
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${lastName}`, phone })
      });
      if (response.ok) {
        login({ ...user, name: `${firstName} ${lastName}`, phone });
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

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
      <div className="flex pt-[72px] w-full min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="flex flex-col py-8 gap-4 h-[calc(100vh-72px)] w-64 border-r border-[#bfcaba]/15 bg-[#f4f4ef] sticky top-[72px]">
          <div className="px-6 mb-4">
            <h2 className="text-lg font-extrabold text-[#32602c] font-headline">{user?.name || "Utilisateur"}</h2>
            <p className="text-xs text-[#40493d] font-medium">Member</p>
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
            <button onClick={() => setActiveTab('admin')} className={getTabClass('admin')}>
              <span className="material-symbols-outlined text-red-600">admin_panel_settings</span>
              <span className="text-sm font-bold font-body text-red-800">Administration</span>
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
                    {isEditing ? (
                      <span onClick={handleSave} className="text-[#32602c] font-bold text-sm cursor-pointer hover:underline bg-[#e3e3de] px-3 py-1.5 rounded-lg border border-[#32602c]/20">Enregistrer</span>
                    ) : (
                      <span onClick={() => setIsEditing(true)} className="text-[#32602c] font-bold text-sm cursor-pointer hover:underline">Modifier</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Prénom</label>
                      <input
                        className={`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none ${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}`}
                        readOnly={!isEditing}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        value={firstName}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom</label>
                      <input
                        className={`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none ${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}`}
                        readOnly={!isEditing}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        value={lastName}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Email</label>
                      <input
                        className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none opacity-60 cursor-not-allowed"
                        readOnly
                        type="email"
                        value={user?.email || ""}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Téléphone</label>
                      <input
                        className={`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none ${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}`}
                        readOnly={!isEditing}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        value={phone}
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-8" id="addresses">
                  <h3 className="text-2xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Mes Adresses</h3>

                  {isAddingAddress ? (
                    <form onSubmit={handleAddAddress} className="bg-[#f4f4ef] rounded-xl p-6 border border-[#bfcaba]/30 space-y-4">
                      <h4 className="font-bold text-[#32602c] mb-4">Nouvelle Parcelle / Adresse</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Nom (ex: Ferme Horizon)</label>
                          <input required value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Adresse complète</label>
                          <input required value={newAddress.location} onChange={e => setNewAddress({ ...newAddress, location: e.target.value })} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Nombre de zones</label>
                          <input value={newAddress.zones} onChange={e => setNewAddress({ ...newAddress, zones: e.target.value })} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" placeholder="ex: 12" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Superficie totale</label>
                          <input value={newAddress.surface} onChange={e => setNewAddress({ ...newAddress, surface: e.target.value })} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" placeholder="ex: 85 Hectares" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="bg-[#32602c] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#254720]">Sauvegarder</button>
                        <button type="button" onClick={() => setIsAddingAddress(false)} className="bg-[#e8e8e3] text-[#40493d] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#d5d5d0]">Annuler</button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {isLoadingAddresses ? (
                        <div className="lg:col-span-3 text-center py-12">
                          <p className="text-[#40493d] font-bold">Chargement des adresses...</p>
                        </div>
                      ) : (
                        <>
                          {addresses.map((addr, idx) => (
                            <div key={addr.id} className="lg:col-span-2 bg-[#f4f4ef] rounded-xl p-6 relative overflow-hidden group border border-[#bfcaba]/30">
                              <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                  {idx === 0 && <span className="bg-[#32602c] text-[#ffffff] text-[10px] font-bold px-2 py-1 rounded inline-block uppercase">Principal</span>}
                                  {!idx === 0 && <span></span>}
                                  <button onClick={() => handleDeleteAddress(addr.id)} className="material-symbols-outlined text-red-600 hover:text-red-800 transition-colors p-1 bg-white/50 rounded-full">delete</button>
                                </div>
                                <h4 className="text-xl font-bold text-[#32602c] mb-1">{addr.name}</h4>
                                <p className="text-[#40493d] text-sm mb-4">{addr.location}</p>
                                <div className="flex gap-4">
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-[#40493d] uppercase">Parcelles</span>
                                    <span className="text-lg font-bold text-[#1a1c19]">{addr.zones || '-'}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-[#40493d] uppercase">Superficie</span>
                                    <span className="text-lg font-bold text-[#1a1c19]">{addr.surface || '-'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img alt="Aerial farm view" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4mveaPQVsPKcBRtgOAN_ImGcLvH3bUnKqpm3nmNc5JYsAH6x-_9-01IMlbp09kUIz7eiN6uQQ0o1d_essb9L5GiRFq2bhZiOkR67JQxRNoarsY8PaS3cBQb_O-Q9Y5PGEj-qwC2ZFVNBqYTinwaBMIln-mzdylAgYvX8wi9jzET9ORSb6K0UiXX8eAimaYmz3ysMyHiQFwqs97kzty3nRxava1H6JYbusubq0gnD7XP8XgoC5rs830NkTwE-NuNKrSHsAu_SQVCs" />
                              </div>
                            </div>
                          ))}
                        </>
                      )}

                      <div onClick={() => setIsAddingAddress(true)} className="bg-[#e3e3de] rounded-xl p-6 flex flex-col justify-center items-center border-2 border-dashed border-[#bfcaba]/60 hover:border-[#32602c]/50 transition-colors cursor-pointer min-h-[200px]">
                        <span className="material-symbols-outlined text-[#32602c] text-4xl mb-2">add_location</span>
                        <span className="font-bold text-sm text-[#40493d]">Ajouter une parcelle</span>
                      </div>
                    </div>
                  )}
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
                      {isLoadingOrders ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-stone-500 font-bold">Chargement de vos commandes...</td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-stone-500 font-bold">Vous n'avez pas encore passé de commande.</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="bg-[#f4f4ef] hover:bg-[#e8e8e3] transition-colors border border-[#bfcaba]/30 rounded-xl">
                            <td className="px-6 py-4 font-bold rounded-l-xl text-[#1a1c19]">{order.order_num}</td>
                            <td className="px-6 py-4 text-sm text-[#40493d]">{order.date}</td>
                            <td className="px-6 py-4 font-bold text-[#1a1c19]">{order.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                                order.status === 'LIVRÉ' ? 'bg-[#c6c8b7] text-[#1a1d12]' : 'bg-[#32602c] text-white'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 rounded-r-xl">
                              <span className="material-symbols-outlined text-[#32602c] cursor-pointer">description</span>
                            </td>
                          </tr>
                        ))
                      )}
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
                  {isLoadingWishlist ? (
                    <div className="md:col-span-2 text-center py-12 text-stone-500 font-bold">Chargement de votre liste d'envies...</div>
                  ) : wishlistItems.length === 0 ? (
                    <div className="md:col-span-2 text-center py-12 text-stone-500 font-bold">Votre liste d'envies est vide.</div>
                  ) : (
                    wishlistItems.map((product) => (
                      <div key={product.id} className="group">
                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 relative">
                          <img alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} />
                          <div onClick={() => removeFromWishlist(product.id)} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm cursor-pointer hover:bg-red-50 transition-colors">
                            <span className="material-symbols-outlined text-[#923357]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-lg text-[#1a1c19]">{product.name}</h4>
                            <p className="text-[#40493d] text-sm">{product.category}</p>
                          </div>
                          <span className="text-[#32602c] font-bold">{product.price}</span>
                        </div>
                      </div>
                    ))
                  )}
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

            {/* Tab: Admin */}
            {activeTab === 'admin' && (
              <section className="space-y-12 pb-24" id="admin">
                <div className="flex justify-between items-end border-b border-red-200/50 pb-4">
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Administration</h3>
                    <p className="text-xs text-red-600 font-bold uppercase tracking-widest mt-1">Gestion du catalogue</p>
                  </div>
                </div>

                {/* Add Product Form */}
                <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-[#bfcaba]/30 shadow-sm">
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">add_circle</span>
                    Ajouter un nouveau produit
                  </h4>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#40493d]">Nom du produit</label>
                      <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full bg-[#f4f4ef] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent" type="text" placeholder="ex: Tracteur John Deere" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#40493d]">Catégorie</label>
                      <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-[#f4f4ef] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent appearance-none">
                        <option>Plantes</option>
                        <option>Semences</option>
                        <option>Engrais</option>
                        <option>Matériel</option>
                        <option>Phytosanitaires</option>
                        <option>Capteurs IoT</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#40493d]">Prix (format: 0 000 DH)</label>
                      <input required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full bg-[#f4f4ef] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent" type="text" placeholder="ex: 12 500 DH" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase text-[#40493d]">Image du produit</label>
                      <div className="relative">
                        <input 
                          required 
                          onChange={e => setNewProduct({...newProduct, image: e.target.files[0]})} 
                          className="w-full bg-[#f4f4ef] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary border border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
                          type="file" 
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-2">
                      {adminFeedback.message && (
                        <div className={`mb-4 p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${adminFeedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                          <span className="material-symbols-outlined">{adminFeedback.type === 'success' ? 'check_circle' : 'error'}</span>
                          {adminFeedback.message}
                        </div>
                      )}
                      <button 
                        type="submit" 
                        disabled={isAddingProduct}
                        className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${isAddingProduct ? 'bg-stone-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
                      >
                        {isAddingProduct ? (
                          <>
                            <span className="animate-spin material-symbols-outlined">autorenew</span>
                            Ajout en cours...
                          </>
                        ) : (
                          <>Ajouter au Catalogue</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Product Management List */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold flex justify-between items-center">
                    <span>Produits Actuels ({allProducts.length})</span>
                    <button onClick={fetchAllProducts} className="text-primary text-sm flex items-center gap-1 hover:underline">
                      <span className="material-symbols-outlined text-sm">refresh</span>
                      Actualiser
                    </button>
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {isLoadingAdmin ? (
                      <p className="text-center py-12 text-stone-500 font-bold">Chargement du catalogue...</p>
                    ) : (
                      allProducts.map(product => (
                        <div key={product.id} className="bg-white dark:bg-stone-900 p-4 rounded-xl border border-[#bfcaba]/30 flex items-center justify-between group hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100">
                              <img 
                                src={product.image?.startsWith('data:') || product.image?.startsWith('http') 
                                  ? product.image 
                                  : `http://127.0.0.1:5000${product.image}`} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <h5 className="font-bold text-[#1a1c19]">{product.name}</h5>
                              <p className="text-xs text-[#40493d]">{product.category} • <span className="font-bold text-primary">{product.price}</span></p>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteProduct(product.id)} className="w-10 h-10 rounded-full flex items-center justify-center text-red-200 group-hover:text-red-600 hover:bg-red-50 transition-all">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      ))
                    )}
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
