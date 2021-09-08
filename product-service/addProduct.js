const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');
const { headers } = require('./headers');

module.exports = async (event) => {
  const { body:product } = event;
  const { title, description, image, price, count } = product;
  const client = new Client(dbOptions);
  await client.connect();

  try {
      const response  = await client.query(`
        insert into product (image, title, description, price) values
        ('${image}', '${title}', '${description}', ${price} ) returning *;
      `);
      const {rows} = response;
      const created = rows[0];
      const {id} = created;
      await client.query(`
        insert into stock (product_id, count) values
        ('${id}', ${count});
      `);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(created),
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
