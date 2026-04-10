const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../backend/database.js');
const serverPath = path.resolve(__dirname, '../backend/server.js');

// 1. Update database.js
let dbData = fs.readFileSync(dbPath, 'utf8');

// We want to add the users table after the products table creation.
if (!dbData.includes("CREATE TABLE IF NOT EXISTS users")) {
    dbData = dbData.replace(
        "console.error('Error creating table', err.message);\n            return;\n        }",
        `console.error('Error creating table', err.message);
            return;
        }
        
        db.run(\`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )\`, (err) => {
            if (err) console.error('Error creating users table', err.message);
        });`
    );
    fs.writeFileSync(dbPath, dbData);
}

// 2. Update server.js
let serverData = fs.readFileSync(serverPath, 'utf8');

if (!serverData.includes("/api/signup")) {
    const signupLoginRoutes = `
// Sign up
app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing Required Fields' });
    }
    
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Un compte avec cet email existe déjà.' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, name, email });
    });
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.get('SELECT id, name, email FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (!row) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
        }
        
        res.json(row);
    });
});
`;

    serverData = serverData.replace(
        "app.listen(PORT",
        signupLoginRoutes + "\napp.listen(PORT"
    );
    fs.writeFileSync(serverPath, serverData);
}

console.log('Backend routes and db updated.');
