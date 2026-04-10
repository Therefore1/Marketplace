const fs = require('fs');
const path = require('path');

const authCtxPath = path.resolve(__dirname, 'src/context/AuthContext.jsx');
const loginPath = path.resolve(__dirname, 'src/components/Login.jsx');
const signupPath = path.resolve(__dirname, 'src/components/SignUp.jsx');

// =======================
// 1. AuthContext.jsx
// =======================
let authCtx = `import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
`;
fs.writeFileSync(authCtxPath, authCtx);


// =======================
// 2. SignUp.jsx
// =======================
let signupText = fs.readFileSync(signupPath, 'utf8');

signupText = signupText.replace(
  "const handleSignUp = (e) => {\n    e.preventDefault();\n    if (password !== confirmPassword) {\n      alert(\"Les mots de passe ne correspondent pas !\");\n      return;\n    }\n    // Immediate login after sign up\n    login({ name: `${firstName} ${lastName}`, email });\n    navigate('/products');\n  };",
  `const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: \`\${firstName} \${lastName}\`, email, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error);
        return;
      }
      
      login({ id: data.id, name: data.name, email: data.email });
      navigate('/products');
    } catch (err) {
      alert('Error connecting to server.');
      console.error(err);
    }
  };`
);
fs.writeFileSync(signupPath, signupText);


// =======================
// 3. Login.jsx
// =======================
let loginText = fs.readFileSync(loginPath, 'utf8');
loginText = loginText.replace(
  "const handleLogin = (e) => {\n    e.preventDefault();\n    // Fake authentication process\n    login({ email });\n    navigate('/products');\n  };",
  `const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.error);
        return;
      }
      
      login({ id: data.id, name: data.name, email: data.email });
      navigate('/products');
    } catch (err) {
      alert('Error connecting to server.');
      console.error(err);
    }
  };`
);
fs.writeFileSync(loginPath, loginText);

console.log('Frontend Auth components patched with actual fetch logic!');
