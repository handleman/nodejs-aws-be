const AWS = require('aws-sdk');
const { Client } = require('pg');
const { dbOptions } = require('./dbOptions');

module.exports = async (event) => {
    const products = event.Records.map(({ body }) => body);

    const sns = new AWS.SNS({ region: 'eu-west-1' });

    try {
        const client = new Client(dbOptions);
        await client.connect();
        for (product of products) {
            const { title, description, image, price, count } = product;

            const response = await client.query(`
                insert into product (image, title, description, price) values
                ('${image}','${title}','${description}',${price}) returning *;
            `);
            const { rows } = response;
            const created = rows[0];
            const { id } = created;
            await client.query(`
                insert into stock (product_id, count) values
                ('${id}','${count}');
            `);
        }
        sns.publish({
            Subject: 'Products were imported successfully',
            Message: JSON.stringify(products),
            TopicAnn: process.env.SNS_ARN
        }, () => {
            console.log('Email notification has sent for adding products: ', JSON.stringify());

        });

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