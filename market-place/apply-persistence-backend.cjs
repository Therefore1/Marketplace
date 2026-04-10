const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../backend/database.js');
const serverPath = path.resolve(__dirname, '../backend/server.js');

// 1. Update database.js
let dbData = fs.readFileSync(dbPath, 'utf8');

// Add phone column to users table if not exists (a bit tricky with SQLite and CREATE TABLE IF NOT EXISTS)
// Instead, we'll modify the table creation
dbData = dbData.replace(
    /db\.run\(`CREATE TABLE IF NOT EXISTS users \([\s\S]*?email TEXT UNIQUE,[\s\S]*?password TEXT[\s\S]*?\)`\)/,
    `db.run(\`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            phone TEXT
        )\`)`
);

// Add addresses table
const addressesTable = `
        db.run(\`CREATE TABLE IF NOT EXISTS addresses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT,
            location TEXT,
            zones TEXT,
            surface TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )\`, (err) => {
            if (err) console.error('Error creating addresses table', err.message);
        });
`;

if (!dbData.includes("CREATE TABLE IF NOT EXISTS addresses")) {
    dbData = dbData.replace(
        "if (err) console.error('Error creating users table', err.message);",
        `if (err) console.error('Error creating users table', err.message);
        });`
    );
    // This replace is a bit fragile if the previous one didn't work exactly as expected.
    // Let's just append it after the users table run call.
    dbData = dbData.replace(
        /db\.run\(`CREATE TABLE IF NOT EXISTS users \([\s\S]*?\), \(err\) => \{[\s\S]*?\}\);/,
        (match) => match + addressesTable
    );
}

fs.writeFileSync(dbPath, dbData);

// 2. Update server.js
let serverData = fs.readFileSync(serverPath, 'utf8');

if (!serverData.includes("/api/users/:id")) {
    const persistenceRoutes = `
// Update user profile
app.put('/api/users/:id', (req, res) => {
    const { name, phone } = req.body;
    const { id } = req.params;
    
    db.run('UPDATE users SET name = ?, phone = ? WHERE id = ?', [name, phone, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get user addresses
app.get('/api/addresses/:userId', (req, res) => {
    const { userId } = req.params;
    db.all('SELECT * FROM addresses WHERE user_id = ?', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add address
app.post('/api/addresses', (req, res) => {
    const { userId, name, location, zones, surface } = req.body;
    db.run('INSERT INTO addresses (user_id, name, location, zones, surface) VALUES (?, ?, ?, ?, ?)', 
        [userId, name, location, zones, surface], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name, location, zones, surface });
    });
});

// Delete address
app.delete('/api/addresses/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM addresses WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});
`;

    serverData = serverData.replace(
        "app.listen(PORT",
        persistenceRoutes + "\napp.listen(PORT"
    );
    fs.writeFileSync(serverPath, serverData);
}

console.log('Database and Server persistence logic added!');
