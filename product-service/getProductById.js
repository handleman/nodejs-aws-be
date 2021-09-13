const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');
const { headers } = require('./headers');

module.exports = async (event) => {
  const { id } = event.pathParameters;
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: product } = await client.query(`
          select a.id, a.title, a.description, a.image, a.price, b.count from product a
          join stock b on (a.id = b.product_id) where a.id = '${id}';
      `);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
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
