const { createClient } = require('@libsql/client');
const path = require('path');

const client = createClient({
  url: `file:${path.resolve(__dirname, '..', 'backend', 'market.sqlite')}`
});

async function runMigration() {
    const cols = [
        'name_ar', 'description_ar', 'technical_specs_ar', 
        'short_description', 'short_description_ar', 
        'advantages', 'advantages_ar', 
        'usage_tips', 'usage_tips_ar'
    ];

    for (const col of cols) {
        try {
            await client.execute(`ALTER TABLE products ADD COLUMN ${col} TEXT`);
            console.log(`Added ${col} successfully.`);
        } catch (e) {
            console.log(`Skipped ${col}: ${e.message}`);
        }
    }
}

runMigration();
