const fs = require('fs');
const path = require('path');

const loginPath = path.resolve(__dirname, 'src/components/Login.jsx');
const signupPath = path.resolve(__dirname, 'src/components/SignUp.jsx');

// ==============================
// 1. LOGIN JSX
// ==============================
let loginCode = fs.readFileSync(loginPath, 'utf8');

// Add error state
loginCode = loginCode.replace(
  "const [showPassword, setShowPassword] = useState(false);",
  "const [showPassword, setShowPassword] = useState(false);\n  const [error, setError] = useState('');"
);

// Add clear error and replace alert
loginCode = loginCode.replace(
  "const handleLogin = async (e) => {\n    e.preventDefault();\n    \n    try {\n      const response = await fetch('http://localhost:5000/api/login', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ email, password })\n      });\n      const data = await response.json();\n      \n      if (!response.ok) {\n        alert(data.error);\n        return;\n      }",
  `const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error);
        return;
      }`
);

loginCode = loginCode.replace(
  "} catch (err) {\n      alert('Error connecting to server.');\n      console.error(err);\n    }",
  `} catch (err) {
      setError('Erreur de connexion au serveur.');
      console.error(err);
    }`
);

// Add error UI before the <form>
loginCode = loginCode.replace(
  '<form onSubmit={handleLogin} className="space-y-6">',
  `{error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">`
);

fs.writeFileSync(loginPath, loginCode);


// ==============================
// 2. SIGNUP JSX
// ==============================
let signupCode = fs.readFileSync(signupPath, 'utf8');

// Add error state
signupCode = signupCode.replace(
  "const [confirmPassword, setConfirmPassword] = useState('');",
  "const [confirmPassword, setConfirmPassword] = useState('');\n  const [error, setError] = useState('');"
);

signupCode = signupCode.replace(
  "const handleSignUp = async (e) => {\n    e.preventDefault();\n    if (password !== confirmPassword) {\n      alert(\"Les mots de passe ne correspondent pas !\");\n      return;\n    }\n    \n    try {\n      const response = await fetch('http://localhost:5000/api/signup', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ name: \`\${firstName} \${lastName}\`, email, password })\n      });\n      const data = await response.json();\n      \n      if (!response.ok) {\n        alert(data.error);\n        return;\n      }",
  `const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
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
        setError(data.error);
        return;
      }`
);

signupCode = signupCode.replace(
  "} catch (err) {\n      alert('Error connecting to server.');\n      console.error(err);\n    }",
  `} catch (err) {
      setError('Erreur de connexion au serveur.');
      console.error(err);
    }`
);

signupCode = signupCode.replace(
  '<form onSubmit={handleSignUp} className="space-y-6">',
  `{error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-200">
                {error}
              </div>
            )}
            <form onSubmit={handleSignUp} className="space-y-6">`
);

fs.writeFileSync(signupPath, signupCode);

console.log('UI alerts replaced by React state components!');
