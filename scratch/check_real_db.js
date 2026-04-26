const db = require('../backend/database.js');

async function check() {
    try {
        const result = await db.execute('SELECT id, name, name_ar, category FROM products');
        console.log(JSON.stringify(result.rows, null, 2));
    } catch (e) {
        console.error(e);
    }
}
check();
