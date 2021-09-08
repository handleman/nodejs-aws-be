const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');
const { headers } = require('./headers');

module.exports = async () => {
    const client = new Client(dbOptions);
    await client.connect();

    try {
        const { rows: products } = await client.query(`
            select a.id, a.title, a.description, a.image, a.price, b.count from product a
            join stock b on (a.id = b.product_id);
        `);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(products),
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error),
        };
    } finally {
       await client.end();
    }

};