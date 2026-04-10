const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'backend', 'market.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Fixing old orders...');

db.all('SELECT * FROM orders', [], (err, orders) => {
    if (err) {
        console.error(err);
        return;
    }
    
    db.all('SELECT * FROM products LIMIT 1', [], (err, products) => {
        if (err || products.length === 0) {
            console.error('No products found to link');
            return;
        }
        
        const defaultProduct = products[0];
        console.log(`Using default product: ${defaultProduct.name}`);
        
        orders.forEach(order => {
            db.get('SELECT count(*) as count FROM order_items WHERE order_id = ?', [order.id], (err, row) => {
                if (row.count === 0) {
                    console.log(`Adding items to order ${order.order_num}`);
                    const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)');
                    stmt.run(order.id, defaultProduct.id, 1, defaultProduct.price);
                    stmt.finalize();
                }
            });
        });
        
        // Also update address if null
        db.run(`UPDATE orders SET 
            farm_name = 'AgriCentral Demo', 
            city = 'Casablanca', 
            street = 'Boulevard de la Corniche' 
            WHERE farm_name IS NULL`);
            
        console.log('Update commands sent.');
    });
});
