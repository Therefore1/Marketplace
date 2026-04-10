const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'backend', 'market.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('--- ORDERS ---');
db.all('SELECT * FROM orders', [], (err, rows) => {
    if (err) console.error(err);
    console.log(JSON.stringify(rows, null, 2));
    
    console.log('\n--- ORDER ITEMS ---');
    db.all('SELECT * FROM order_items', [], (err, rows) => {
        if (err) console.error(err);
        console.log(JSON.stringify(rows, null, 2));
        db.close();
    });
});
