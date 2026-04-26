const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for Base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Global JSON replacer to handle BigInt serialization from libSQL
app.set('json replacer', (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
);

// Health check endpoint for deployment monitoring
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Get all products (excluding rentals)
app.get('/api/products', (req, res) => {
    // Force browser not to cache empty results
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    
    db.all('SELECT * FROM products WHERE is_rental = 0 OR is_rental IS NULL', [], (err, rows) => {
        if (err) {
            console.error('API Error (Products):', err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(`API Success: Returning ${rows ? rows.length : 0} products.`);
        res.json(rows || []);
    });
});

// Get all rentals
app.get('/api/rentals', (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    
    db.all('SELECT * FROM products WHERE is_rental = 1', [], (err, rows) => {
        if (err) {
            console.error('API Error (Rentals):', err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        console.log(`API Success: Returning ${rows ? rows.length : 0} rentals.`);
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
        const { 
            name, category, price, image, images_gallery, is_rental, description, 
            rental_period, rental_prices, technical_specs, name_ar, description_ar, 
            technical_specs_ar, short_description, short_description_ar, advantages, 
            advantages_ar, usage_tips, usage_tips_ar 
        } = req.body;
        console.log('Attempting to add product (Base64):', { name, name_ar, category, is_rental });

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
            INSERT INTO products (
                name, category, price, numericPrice, image, images_gallery, 
                availability, is_rental, description, rental_period, rental_prices, 
                technical_specs, name_ar, description_ar, technical_specs_ar,
                short_description, short_description_ar, advantages, advantages_ar,
                usage_tips, usage_tips_ar
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.run(query, [
            name, 
            category, 
            price, 
            numericPrice, 
            image || '', 
            images_gallery ? JSON.stringify(images_gallery) : '[]', 
            'In Stock', 
            is_rental ? 1 : 0, 
            description || '', 
            rental_period || '', 
            rental_prices ? JSON.stringify(rental_prices) : '', 
            technical_specs ? JSON.stringify(technical_specs) : '[]',
            name_ar || '',
            description_ar || '',
            technical_specs_ar ? JSON.stringify(technical_specs_ar) : '[]',
            short_description || '',
            short_description_ar || '',
            advantages || '',
            advantages_ar || '',
            usage_tips || '',
            usage_tips_ar || ''
        ], function(err) {
            if (err) {
                console.error('DB Error:', err.message);
                return res.status(500).json({ error: err.message });
            }
            res.json({ 
                id: this.lastID, name, name_ar, category, price, numericPrice, 
                image, images_gallery, is_rental: is_rental ? 1 : 0, 
                description, description_ar, rental_period, rental_prices, 
                technical_specs, technical_specs_ar, short_description, 
                short_description_ar, advantages, advantages_ar, usage_tips, usage_tips_ar 
            });
        });
    } catch (globalErr) {
        console.error('Server error in POST /api/products:', globalErr);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Update a product (Admin)
app.put('/api/products/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, category, price, image, images_gallery, is_rental, description, 
            rental_period, rental_prices, technical_specs, name_ar, description_ar, 
            technical_specs_ar, short_description, short_description_ar, advantages, 
            advantages_ar, usage_tips, usage_tips_ar 
        } = req.body;
        
        if (!name || !category || !price) {
            return res.status(400).json({ error: 'Champs obligatoires manquants (Nom, Catégorie, Prix)' });
        }
        
        let numericPrice = 0;
        try {
            numericPrice = typeof price === 'string' 
                ? parseInt(price.replace(/[^0-9]/g, '')) 
                : Number(price);
        } catch (e) {
            console.error('Price parsing error:', e);
        }
        
        const query = `
            UPDATE products SET 
                name = ?, category = ?, price = ?, numericPrice = ?, image = ?, images_gallery = ?, 
                is_rental = ?, description = ?, rental_period = ?, rental_prices = ?, 
                technical_specs = ?, name_ar = ?, description_ar = ?, technical_specs_ar = ?,
                short_description = ?, short_description_ar = ?, advantages = ?, advantages_ar = ?,
                usage_tips = ?, usage_tips_ar = ?
            WHERE id = ?
        `;
        
        db.run(query, [
            name, category, price, numericPrice, image || '', 
            images_gallery ? (typeof images_gallery === 'string' ? images_gallery : JSON.stringify(images_gallery)) : '[]', 
            is_rental ? 1 : 0, description || '', rental_period || '', 
            rental_prices ? (typeof rental_prices === 'string' ? rental_prices : JSON.stringify(rental_prices)) : '', 
            technical_specs ? (typeof technical_specs === 'string' ? technical_specs : JSON.stringify(technical_specs)) : '[]',
            name_ar || '', description_ar || '', 
            technical_specs_ar ? (typeof technical_specs_ar === 'string' ? technical_specs_ar : JSON.stringify(technical_specs_ar)) : '[]',
            short_description || '', short_description_ar || '', 
            advantages || '', advantages_ar || '', 
            usage_tips || '', usage_tips_ar || '',
            id
        ], function(err) {
            if (err) {
                console.error('DB Error:', err.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json({ message: 'Produit mis à jour avec succès', id });
        });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
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
    
    db.get('SELECT id, name, email, role FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
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
        'INSERT INTO orders (user_id, order_num, date, amount, status, farm_name, parcel_num, street, city, payment_method, payment_status, delivery_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, orderNum, date, amount, status, address?.farmName, address?.parcelNum, address?.street, address?.city, req.body.payment_method, req.body.payment_status, req.body.delivery_status],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            // Convert BigInt to Number for JSON serialization
            const orderId = Number(this.lastID);
            
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
    
    const orderQuery = `
        SELECT o.*, u.name as user_name, u.email as user_email, u.phone as user_phone
        FROM orders o
        JOIN users u ON o.user_id = u.id
        WHERE o.order_num = ?
    `;
    
    // Get order header
    db.get(orderQuery, [orderNum], (err, order) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        
        // Get order items with product details
        const sql = `
            SELECT oi.*, p.name as product_name, p.image as product_image, p.category as product_category, p.price as product_price
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

// ADMIN ROUTES

// Get all orders (Admin)
app.get('/api/admin/orders', (req, res) => {
    const query = `
        SELECT o.*, u.name as user_name, u.email as user_email 
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.id DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Update order delivery or payment status (Admin)
app.put('/api/admin/orders/:id', (req, res) => {
    const { id } = req.params;
    const { delivery_status, payment_status, estimated_delivery, assigned_driver, cancellation_reason } = req.body;
    
    let query = 'UPDATE orders SET ';
    let params = [];
    let updates = [];
    
    if (delivery_status) {
        updates.push('delivery_status = ?');
        params.push(delivery_status);
        // Also sync the legacy 'status' field for backward compatibility
        let legacyStatus = 'EN PRÉPARATION';
        if (delivery_status === 'Expédié') legacyStatus = 'EXPÉDIÉE';
        if (delivery_status === 'Livré') legacyStatus = 'LIVRÉE';
        if (delivery_status === 'En Transit') legacyStatus = 'EXPÉDIÉE'; // Mapping transit to shipped for legacy
        if (delivery_status === 'Annulée') legacyStatus = 'ANNULÉE';
        
        updates.push('status = ?');
        params.push(legacyStatus);
    }
    
    if (payment_status) {
        updates.push('payment_status = ?');
        params.push(payment_status);
    }
    
    if (estimated_delivery !== undefined) {
        updates.push('estimated_delivery = ?');
        params.push(estimated_delivery);
    }
    
    if (assigned_driver !== undefined) {
        updates.push('assigned_driver = ?');
        params.push(assigned_driver);
    }
    
    if (cancellation_reason !== undefined) {
        updates.push('cancellation_reason = ?');
        params.push(cancellation_reason);
    }
    
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
    
    query += updates.join(', ') + ' WHERE id = ?';
    params.push(id);
    
    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Get admin stats
app.get('/api/admin/stats', (req, res) => {
    const queries = {
        totalSales: 'SELECT SUM(REPLACE(REPLACE(amount, " DH", ""), " ", "")) as total FROM orders WHERE payment_status = "Paid" OR payment_method = "COD"',
        totalOrders: 'SELECT COUNT(*) as count FROM orders',
        pendingOrders: 'SELECT COUNT(*) as count FROM orders WHERE delivery_status = "Préparation"',
        totalUsers: 'SELECT COUNT(*) as count FROM users'
    };
    
    const results = {};
    const keys = Object.keys(queries);
    let completed = 0;
    
    keys.forEach(key => {
        db.get(queries[key], [], (err, row) => {
            if (err) {
                results[key] = 0;
            } else {
                results[key] = (row ? (row.total || row.count) : 0) || 0;
            }
            completed++;
            if (completed === keys.length) {
                res.json(results);
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
