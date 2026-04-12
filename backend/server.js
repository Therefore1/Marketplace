const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for Base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check endpoint for deployment monitoring
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Get all products
app.get('/api/products', (req, res) => {
    // Force browser not to cache empty results
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            console.error('API Error (Products):', err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(`API Success: Returning ${rows ? rows.length : 0} products.`);
        res.json(rows || []);
    });
});

// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Produit non trouvé' });
            return;
        }
        res.json(row);
    });
});

// Add a new product (Admin) - Supports Base64 images
app.post('/api/products', (req, res) => {
    try {
        const { name, category, price, image } = req.body;
        console.log('Attempting to add product (Base64):', { name, category });

        if (!name || !category || !price) {
            return res.status(400).json({ error: 'Champs obligatoires manquants (Nom, Catégorie, Prix)' });
        }
        
        // Calculate numeric price for sorting
        let numericPrice = 0;
        try {
            numericPrice = typeof price === 'string' 
                ? parseInt(price.replace(/[^0-9]/g, '')) 
                : Number(price);
        } catch (e) {
            console.error('Price parsing error:', e);
        }
            
        const query = `
            INSERT INTO products (name, category, price, numericPrice, image, availability) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        db.run(query, [name, category, price, numericPrice, image || '', 'In Stock'], function(err) {
            if (err) {
                console.error('DB Error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID, name, category, price, numericPrice, image });
        });
    } catch (globalErr) {
        console.error('Server error in POST /api/products:', globalErr);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Delete a product (Admin)
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});


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

// Create a new order with items and address
app.post('/api/orders', (req, res) => {
    const { userId, orderNum, date, amount, status, items, address } = req.body;
    
    db.run(
        'INSERT INTO orders (user_id, order_num, date, amount, status, farm_name, parcel_num, street, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, orderNum, date, amount, status, address?.farmName, address?.parcelNum, address?.street, address?.city],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            const orderId = this.lastID;
            
            // Insert all items
            if (items && items.length > 0) {
                const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)');
                items.forEach(item => {
                    stmt.run(orderId, item.product_id, item.quantity, item.price);
                });
                stmt.finalize();
            }
            
            res.json({ id: orderId, orderNum, date, amount, status });
        }
    );
});

// Get detailed order information
app.get('/api/orders/details/:orderNum', (req, res) => {
    const { orderNum } = req.params;
    
    // Get order header
    db.get('SELECT * FROM orders WHERE order_num = ?', [orderNum], (err, order) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        
        // Get order items with product details
        const sql = `
            SELECT oi.*, p.name as product_name, p.image as product_image, p.category as product_category
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `;
        
        db.all(sql, [order.id], (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ ...order, items });
        });
    });
});

// Fetch all orders for a user
app.get('/api/orders/:userId', (req, res) => {
    const { userId } = req.params;
    db.all('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC', [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Get user wishlist with product details
app.get('/api/wishlist/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT p.* FROM products p
        JOIN wishlist w ON p.id = w.product_id
        WHERE w.user_id = ?
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add to wishlist
app.post('/api/wishlist', (req, res) => {
    const { userId, productId } = req.body;
    db.run('INSERT OR IGNORE INTO wishlist (user_id, product_id) VALUES (?, ?)', [userId, productId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// Remove from wishlist
app.delete('/api/wishlist', (req, res) => {
    const { userId, productId } = req.body;
    db.run('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?', [userId, productId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get user cart with product details
app.get('/api/cart/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT c.id as cart_item_id, c.quantity, p.* FROM products p
        JOIN cart c ON p.id = c.product_id
        WHERE c.user_id = ?
    `;
    db.all(query, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add to cart or increment quantity
app.post('/api/cart', (req, res) => {
    const { userId, productId, quantity = 1 } = req.body;
    const query = `
        INSERT INTO cart (user_id, product_id, quantity) 
        VALUES (?, ?, ?)
        ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + EXCLUDED.quantity
    `;
    db.run(query, [userId, productId, quantity], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID });
    });
});

// Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM cart WHERE id = ?', [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Clear cart for a user
app.delete('/api/cart/user/:userId', (req, res) => {
    const { userId } = req.params;
    db.run('DELETE FROM cart WHERE user_id = ?', [userId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
