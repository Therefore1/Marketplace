const fs = require('fs');

let profileCode = fs.readFileSync('src/components/Profile.jsx', 'utf8');

// 1. Add states for addresses
const oldStates = `const [firstName, setFirstName] = useState(initFirst);
  const [lastName, setLastName] = useState(initLast);
  const [phone, setPhone] = useState("+212 6 00 00 00 00");

  const handleSave = () => {`;

const newStates = `const [firstName, setFirstName] = useState(initFirst);
  const [lastName, setLastName] = useState(initLast);
  const [phone, setPhone] = useState("");
  
  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", location: "", zones: "", surface: "" });

  const handleAddAddress = (e) => {
    e.preventDefault();
    if(newAddress.name && newAddress.location) {
      setAddresses([...addresses, newAddress]);
      setNewAddress({ name: "", location: "", zones: "", surface: "" });
      setIsAddingAddress(false);
    }
  };

  const handleSave = () => {`;

profileCode = profileCode.replace(oldStates, newStates);


// 2. Replace the hardcoded `addresses` section
const addressSectionOldRegex = /<section className="space-y-8" id="addresses">[\s\S]*?<\/section>/;

const addressSectionNew = `<section className="space-y-8" id="addresses">
                  <h3 className="text-2xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Mes Adresses</h3>
                  
                  {isAddingAddress ? (
                    <form onSubmit={handleAddAddress} className="bg-[#f4f4ef] rounded-xl p-6 border border-[#bfcaba]/30 space-y-4">
                      <h4 className="font-bold text-[#32602c] mb-4">Nouvelle Parcelle / Adresse</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Nom (ex: Ferme Horizon)</label>
                          <input required value={newAddress.name} onChange={e => setNewAddress({...newAddress, name: e.target.value})} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Adresse complète</label>
                          <input required value={newAddress.location} onChange={e => setNewAddress({...newAddress, location: e.target.value})} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Nombre de zones</label>
                          <input value={newAddress.zones} onChange={e => setNewAddress({...newAddress, zones: e.target.value})} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" placeholder="ex: 12" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-[#40493d]">Superficie totale</label>
                          <input value={newAddress.surface} onChange={e => setNewAddress({...newAddress, surface: e.target.value})} className="w-full bg-[#e8e8e3] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#32602c]" type="text" placeholder="ex: 85 Hectares" />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button type="submit" className="bg-[#32602c] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-[#254720]">Sauvegarder</button>
                        <button type="button" onClick={() => setIsAddingAddress(false)} className="bg-[#e8e8e3] text-[#40493d] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#d5d5d0]">Annuler</button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {addresses.map((addr, idx) => (
                        <div key={idx} className="lg:col-span-2 bg-[#f4f4ef] rounded-xl p-6 relative overflow-hidden group border border-[#bfcaba]/30">
                          <div className="relative z-10">
                            {idx === 0 && <span className="bg-[#32602c] text-[#ffffff] text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase">Principal</span>}
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
                            <img alt="Aerial farm view" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4mveaPQVsPKcBRtgOAN_ImGcLvH3bUnKqpm3nmNc5JYsAH6x-_9-01IMlbp09kUIz7eiN6uQQ0o1d_essb9L5GiRFq2bhZiOkR67JQxRNoarsY8PaS3cBQb_O-Q9Y5PGEj-qwC2ZFVNBqYTinwaBMIln-mzdylAgYvX8wi9jzET9ORSb6K0UiXX8eAimaYmz3ysMyHiQFwqs97kzty3nRxava1H6JYbusubq0gnD7XP8XgoC5rs830NkTwE-NuNKrSHsAu_SQVCs"/>
                          </div>
                        </div>
                      ))}
                      
                      <div onClick={() => setIsAddingAddress(true)} className="bg-[#e3e3de] rounded-xl p-6 flex flex-col justify-center items-center border-2 border-dashed border-[#bfcaba]/60 hover:border-[#32602c]/50 transition-colors cursor-pointer min-h-[200px]">
                        <span className="material-symbols-outlined text-[#32602c] text-4xl mb-2">add_location</span>
                        <span className="font-bold text-sm text-[#40493d]">Ajouter une parcelle</span>
                      </div>
                    </div>
                  )}
                </section>`;

profileCode = profileCode.replace(addressSectionOldRegex, addressSectionNew);

fs.writeFileSync('src/components/Profile.jsx', profileCode);
console.log('Address form added successfully!');
