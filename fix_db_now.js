const { createClient } = require('@libsql/client');
const path = require('path');

const dbUrl = `file:${path.resolve(__dirname, 'backend', 'market.sqlite')}`;
const client = createClient({ url: dbUrl });

async function checkSchema() {
    try {
        const result = await client.execute("PRAGMA table_info(users);");
        console.log("Users table schema:");
        console.log(JSON.stringify(result.rows, null, 2));

        const roleCol = result.rows.find(c => c.name === 'role');
        if (!roleCol) {
            console.log("Column 'role' missing. Manually adding it...");
            await client.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
            console.log("Column 'role' added.");
        }

        const adminCheck = await client.execute({
            sql: "SELECT * FROM users WHERE email = ?",
            args: ["admin@injaz.ma"]
        });
        if (adminCheck.rows.length === 0) {
            console.log("Admin user missing. Manually adding it...");
            await client.execute({
                sql: "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                args: ["Admin Injaz", "admin@injaz.ma", "admin", "admin"]
            });
            console.log("Admin user added.");
        } else {
            console.log("Admin user already exists:", JSON.stringify(adminCheck.rows[0], null, 2));
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        process.exit();
    }
}

checkSchema();
