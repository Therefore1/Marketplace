const { createClient } = require('@libsql/client');
const path = require('path');

const client = createClient({
  url: `file:${path.resolve(__dirname, 'market.sqlite')}`
});

async function runMigration() {
    try {
        await client.execute(`
            UPDATE products 
            SET 
                name_ar = 'ماليفوس 50 - مبيد حشري وقرادي متعدد الاستخدامات (100 مل)',
                short_description = 'Insecticide et acaricide liquide puissant pour une protection maximale de vos cultures.',
                short_description_ar = 'مبيد حشري وقرادي سائل قوي لحماية قصوى لمحاصيلكم.',
                description_ar = 'ماليفوس 50 هو مبيد حشري وقرادي سائل يعتمد على الملاثيون بنسبة 50٪. يعمل بفعالية عن طريق الملامسة والابتلاع للقضاء على مجموعة واسعة من الآفات التي تصيب المحاصيل الزراعية ومخزونات الحبوب. إنه مناسب للأشجار المثمرة والخضروات ومحاصيل الخضروات الورقية وحماية المواد المخزونة. إنه حل متعدد الاستخدامات لضمان صحة المحاصيل وتحسين العائد الزراعي.',
                advantages = '• Large spectre d''action contre les ravageurs.\n• Action rapide par contact et ingestion.\n• Excellente persistance d''action.',
                advantages_ar = '• طيف واسع من التأثير ضد الآفات.\n• مفعول سريع عن طريق الملامسة والابتلاع.\n• ثبات ممتاز للمفعول.',
                usage_tips = 'Diluer 100ml dans 100L d''eau. Pulvériser uniformément sur le feuillage dès l''apparition des premiers insectes.',
                usage_tips_ar = 'تخفيف 100 مل في 100 لتر من الماء. يرش بشكل موحد على الأوراق بمجرد ظهور الحشرات الأولى.'
            WHERE id = 16
        `);
        console.log('MALYPHOS 50 FULLY SEEDED SUCCESSFULLY!');
    } catch (e) {
        console.log('Error:', e.message);
    }
}

runMigration();
