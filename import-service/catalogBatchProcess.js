const AWS = require('aws-sdk');
const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');

module.exports = async (event) => {
    const products = event.Records.map(({ body }) => JSON.parse(body));
    console.log('products', products);
    
    const sns = new AWS.SNS({ region: 'eu-west-1' });

    const client = new Client(dbOptions);
    await client.connect();
    try {
        for (product of products) {
            const { title, description, image, price, count } = product;
            const query = `
                insert into product (image, title, description, price) values
                ('${image}','${title.replace(/["']/g, '&quot;')}','${description.replace(/["']/g, '&quot;')}',${price}) returning *;
            `;
            const response = await client.query(query);
            const { rows } = response;
            const created = rows[0];
            const { id } = created;
            await client.query(`
                insert into stock (product_id, count) values
                ('${id}','${count}');
            `);
            console.log('product inserted', product);
            
        }
        sns.publish({
            Subject: 'Products were imported successfully',
            Message: JSON.stringify(products),
            TopicAnn: process.env.SNS_ARN
        }, () => {
            console.log('Email notification has sent for adding products: ', JSON.stringify(products, null, 1));
        });

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    } finally {
        await client.end();
    }

};