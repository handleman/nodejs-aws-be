const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');

module.exports = async () => {
    const client = new Client(dbOptions);
    await client.connect();

    try {
        const { rows: products } = await client.query(`
            select a.id, a.title, a.description, a.image, b.count from product a
            join stock b on (a.id = b.product_id);
        `);
        return {
            statusCode: 200,
            body: JSON.stringify(products),
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    } finally {
        client.end();
    }

};