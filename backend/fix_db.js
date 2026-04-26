const { createClient } = require('@libsql/client');
const path = require('path');

const dbUrl = `file:${path.resolve(__dirname, 'market.sqlite')}`;
const client = createClient({ url: dbUrl });

async function checkAndFix() {
    try {
        console.log("Checking users table...");
        const result = await client.execute("PRAGMA table_info(users);");
        const roleCol = result.rows.find(c => c.name === 'role');
        
        if (!roleCol) {
            console.log("Adding 'role' column...");
            await client.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
        } else {
            console.log("'role' column already exists.");
        }

        console.log("Checking for admin user...");
        const adminCheck = await client.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: ["admin@injaz.ma"]
        });

        if (adminCheck.rows.length === 0) {
            console.log("Adding admin user...");
            await client.execute({
                sql: "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                args: ["Admin Injaz", "admin@injaz.ma", "admin", "admin"]
            });
            console.log("Admin seeded.");
        } else {
            console.log("Admin exists:", adminCheck.rows[0]);
        }

    } catch (err) {
        console.error("Error during check/fix:", err);
    } finally {
        process.exit();
    }
}

checkAndFix();
