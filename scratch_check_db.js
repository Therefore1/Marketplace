const db = require('./backend/database.js');

async function checkAdmin() {
    try {
        console.log('Checking for admin user...');
        const row = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', ['admin@injaz.ma'], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });

        if (row) {
            console.log('Admin user found:', JSON.stringify(row, null, 2));
        } else {
            console.log('Admin user NOT found.');
            
            // Try to force seed
            console.log('Attempting to seed admin manually...');
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
                    ['Admin Injaz', 'admin@injaz.ma', 'admin', 'admin'], 
                    (err) => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
            console.log('Admin seeded successfully.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

checkAdmin();
