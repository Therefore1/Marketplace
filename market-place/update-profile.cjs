const fs = require('fs');

let profileCode = fs.readFileSync('src/components/Profile.jsx', 'utf8');

// 1. Update useAuth to include user
profileCode = profileCode.replace(
  "const { isLoggedIn } = useAuth();",
  `const { isLoggedIn, user, login } = useAuth();`
);

// 2. Add local state for the form right after setActiveTab
const stateCode = `  const [activeTab, setActiveTab] = useState('profile');
  
  const initialName = user?.name || "";
  const firstSpaceIndex = initialName.indexOf(' ');
  const initFirst = firstSpaceIndex !== -1 ? initialName.substring(0, firstSpaceIndex) : initialName;
  const initLast = firstSpaceIndex !== -1 ? initialName.substring(firstSpaceIndex + 1) : "";

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(initFirst);
  const [lastName, setLastName] = useState(initLast);
  const [phone, setPhone] = useState("+212 6 00 00 00 00");

  const handleSave = () => {
    // Ideally this would save to the backend. For now, just update context locally
    login({ ...user, name: \`\${firstName} \${lastName}\` });
    setIsEditing(false);
  };`;
  
profileCode = profileCode.replace("const [activeTab, setActiveTab] = useState('profile');", stateCode);

// 3. Update the header name dynamically in the sidebar
profileCode = profileCode.replace(
  '<h2 className="text-lg font-extrabold text-[#32602c] font-headline">John Deere</h2>',
  '<h2 className="text-lg font-extrabold text-[#32602c] font-headline">{user?.name || "Utilisateur"}</h2>'
);

// 4. Update the Profile Tab UI
const oldProfileTab = `<div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
                    <h3 className="text-3xl font-extrabold text-[#1a1c19] font-headline tracking-tight">Profil</h3>
                    <span className="text-[#32602c] font-bold text-sm cursor-pointer hover:underline">Modifier</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom complet</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="John Deere"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Email Professionnel</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="email" value="john.deere@horizons.farm"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Téléphone</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="+33 6 12 34 56 78"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom de l'exploitation</label>
                      <input className="w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] focus:ring-2 focus:ring-[#32602c] outline-none" readOnly type="text" value="Ferme des Horizons"/>
                    </div>
                  </div>`;

const newProfileTab = `<div className="flex justify-between items-end border-b border-[#bfcaba]/15 pb-4">
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
                        className={\`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none \${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}\`} 
                        readOnly={!isEditing}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text" 
                        value={firstName}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#40493d]">Nom</label>
                      <input 
                        className={\`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none \${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}\`} 
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
                        className={\`w-full bg-[#e8e8e3] border-none rounded-xl px-4 py-3 text-[#1a1c19] outline-none \${isEditing ? 'focus:ring-2 focus:ring-[#32602c] ring-1 ring-[#bfcaba]' : 'opacity-80 cursor-not-allowed'}\`} 
                        readOnly={!isEditing}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text" 
                        value={phone}
                      />
                    </div>
                  </div>`;

profileCode = profileCode.replace(oldProfileTab, newProfileTab);

fs.writeFileSync('src/components/Profile.jsx', profileCode);
console.log('Profile settings modified!');
