const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'market.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        price TEXT,
        numericPrice INTEGER,
        image TEXT,
        availability TEXT,
        availabilityBg TEXT,
        availabilityText TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating products table', err.message);
            return;
        }
        
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            phone TEXT
        )`, (err) => {
            if (err) console.error('Error creating users table', err.message);
            
            // Create addresses table
            db.run(`CREATE TABLE IF NOT EXISTS addresses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                name TEXT,
                location TEXT,
                zones TEXT,
                surface TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`, (err) => {
                if (err) console.error('Error creating addresses table', err.message);
            });

            // Create orders table
            db.run(`CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                order_num TEXT,
                date TEXT,
                amount TEXT,
                status TEXT,
                farm_name TEXT,
                parcel_num TEXT,
                street TEXT,
                city TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )`, (err) => {
                if (err) console.error('Error creating orders table', err.message);
                
                // Add columns if they don't exist (handle migration)
                const columns = ['farm_name', 'parcel_num', 'street', 'city'];
                columns.forEach(col => {
                    db.run(`ALTER TABLE orders ADD COLUMN ${col} TEXT`, (err) => {
                        // Ignore error if column already exists
                    });
                });
            });

            // Create order_items table
            db.run(`CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                unit_price TEXT,
                FOREIGN KEY (order_id) REFERENCES orders (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )`, (err) => {
                if (err) console.error('Error creating order_items table', err.message);
            });

            // Create wishlist table
            db.run(`CREATE TABLE IF NOT EXISTS wishlist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                product_id INTEGER,
                UNIQUE(user_id, product_id),
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )`, (err) => {
                if (err) console.error('Error creating wishlist table', err.message);
            });

            // Create cart table
            db.run(`CREATE TABLE IF NOT EXISTS cart (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                product_id INTEGER,
                quantity INTEGER DEFAULT 1,
                UNIQUE(user_id, product_id),
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )`, (err) => {
                if (err) console.error('Error creating cart table', err.message);
            });
        });

        // Seed products if empty
        db.get('SELECT count(*) as count FROM products', [], (err, row) => {
            if (row && row.count === 0) {
                console.log('Seeding initial products data...');
                const seedData = [
                    {
                        name: "Precision-Track 400XT", category: "Matériel", price: "1 245 000 DH", numericPrice: 1245000,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFyaAv34LIZQS6o1Hn-yv40GunFyI8yRqqsz-P7HxGejVvgR7DOy5wquldxITVGt4whq_j0OH4rlKr0V0OxpTjImUr5jyxC5uSXbBKlQYPniLUJRW5lsDPDpy34MisZY4TsItzSHDPH3-4KCXwb8XmvCyps5byRnvfYFP0t7_eeAMWg5u8YlReK5SOkDo1sdHt5jCUSCLXOIrD9DgoH0Ao1BJdvLOhzX7pMlQCLcRnKptyHC73lMypbdfE6r2rdVpAuvhk5EgFeUo",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    },
                    {
                        name: "Heirloom Winter Wheat", category: "Semences", price: "420 DH / sac", numericPrice: 420,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtmGEZGtY1LD4s4wkCMhWdEwWv_YzORWKkBAqPqwN8TAYTMSWMOYI-80-PijqCH1G4fsLKw4exX7ZIt3rkL6lEAqVOVF17kK8-7WOdhLBggiL4HRP4MREji7Sv9DasmCkgu0AAsFSRO3at4RK5LZUpWhkFX0nlRIMFd36G-SwyDCRrdUW8FNJNVL8Yv43-v6adBkkmj2PEMh24iCuLtYi5pXUcy6bIUmc2A61qMFGeJ9kxDeY2jxuYR49WXkVPYNq8eqnR18OekGQ",
                        availability: "Limited Stock", availabilityBg: "bg-tertiary-container", availabilityText: "text-on-tertiary-container"
                    },
                    {
                        name: "SoilSense IoT Hub v2", category: "Capteurs IoT", price: "8 990 DH", numericPrice: 8990,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOFxFF9Fj9X5vMcYTjadqbpk87bJfywhuapDPyYnQk3vWi9aCmqIeGPVSLgb91zUDWMZhB4o_kCe0onxcBk0xrOaPPcyQlzfeb5G5BRk7lSLy5324sBpMyOJ7je9hucetDfZlR9goKb4LhE_3r0GDdv__1y-h2Fhh57CvlRyY5481KSgaFnZMG47MgCySr3K4OPqyEEJPPT1t5v5CCg4Z-KOXW-oiUfou6a53DnjtjEVYFis4fUsWmr3LoB-3br0jgSJQndLNAw7U",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    },
                    {
                        name: "Cerisiers 'Bigarreau' (Lot 20)", category: "Plantes", price: "3 200 DH", numericPrice: 3200,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaybp1bFdjjwfnn7EXjO89WpDnP4c4eo1mHMFJCUQ3dGU-TJDKIitBIZlZF_AuqA0BeEiGizNCTmCWYVv1xsEB-btxsTm8e4UoyVtQb5uXsDQgqdu4yyKrBwc0hy0AyM0zwzHizaqpxfd_zLExDkv1PC2-wuquSapbsFPiDYe2u2GV-tdveoTKEnD2DQSjjCNc8rNeUljjusk_U8vSI86IV1qgC9_2DPyBy8_6vZyCGeBjLnvTOHstJbkpHvYybVm9liiaRyO1Ka0",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    },
                    {
                        name: "Nitro-Boost Organic", category: "Engrais", price: "1 550 DH", numericPrice: 1550,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjF2-Jc5WWEea0Ppi4iMeTErRB5OS9GaZPORnwACAFF-bqkVsyxAJb9ebKzlK9Ls3xg-wcUuUH_a1n1FIHWRom8YFIz2jKcU4cXZVrbMZRYIgUuzr1ipzXCO3yqdwLahDNmgdutXqnBY1OtTAOo_Xa95s_1Ge1VjcUTrcKRY64EiowSi6lG2MHyyx8K3JiNL2L_ZC5IPmwc-LZS6Ap21tGr6Ur4sqBEERH9LjdTSmEAhIER1GSMz7x6EU0yAea5V-PNDwUPpYhJkY",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    },
                    {
                        name: "Hybrid Douglas Fir Saplings", category: "Semences", price: "25 DH / unité", numericPrice: 25,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL33nqlZAgnyXIXG6N5FccFulp-ePEs35TzROrNUz8zif2x5p8elwAq5qvgyukJv4WXK9A7EIHoLjgT19n4Y8191ZXYgBQojKMPEFbJGoaq8GTk7Dx0edcvtuBiUOSXWEdFOay_KISSWyzzPzFhT4uChRII_iGq_np9nRXOlU2P6DpnJg4z_rQR41CZa4OFprYhHnXMD23CIzEiLxe_yn-NfSkst-T6EuyRXdnRVSDN_RKXT-O5N4tNnr9aov371Gv1f3wBOY1t5s",
                        availability: "Limited Stock", availabilityBg: "bg-tertiary-container", availabilityText: "text-on-tertiary-container"
                    },
                    {
                        name: "Aero-Weeder Pro", category: "Matériel", price: "450 000 DH", numericPrice: 450000,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDhx7HlewOSMAWf1SBYzX3gumVvkD3q4LPNaRuWrKNY7-cq1j8YZryAQy8JAKGx8GVfhG8vAarY9B8SEfOCz58Jaj1NETBMJse1kuqTCWhkONIrb1X-iiIXw9XybWC-iqbuOkDRsi_XQuokk-86yPJBE9QlMXumikzXOHzMomw9XnXKKJrJnURaH35uatM1VCfpqTV-JSPELKUBbyEUPX5jfa5dtcahENlfL0UpvC47nH4cFUFr5Bvgopqd14fr9jwwRvPZRuCino",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    },
                    {
                        name: "Fongicide Bio-Protect (20L)", category: "Phytosanitaires", price: "6 500 DH", numericPrice: 6500,
                        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_4QpcaOpxoEEOxYDZNnR9sMBC3jQEC63_SlWgYbkwkGUuR92cPTymTpWB_rHTeuXceSn4OjpGhSyMG851QK7l0VgU-CnQQtClrCOQNcNJTy7lw7RukS6RpGvhFTwqm_P3Eep_ngJ0CNyXPQKy6SWX_-auYx3i5_kNdRKmjtVoqbLGVe9XMgcG0PLuJZErlzH7_gT7ggu2wwit2f8IA7ySJlkM7ylr567OjYuTnXcH0ply6ABGZySwflrqOZq66aFXK5wQLXPYaY8",
                        availability: "In Stock", availabilityBg: "", availabilityText: ""
                    }
                ];
                
                const stmt = db.prepare('INSERT INTO products (name, category, price, numericPrice, image, availability, availabilityBg, availabilityText) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
                seedData.forEach(p => {
                    stmt.run(p.name, p.category, p.price, p.numericPrice, p.image, p.availability, p.availabilityBg, p.availabilityText);
                });
                stmt.finalize();
            }
        });
    });
  }
});

module.exports = db;
