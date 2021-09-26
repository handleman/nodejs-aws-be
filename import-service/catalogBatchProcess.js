const AWS = require('aws-sdk');

module.exports = async (event) => {
    const products = event.Records.map(({ body }) => body);

    const sns = new AWS.SNS({ region: 'eu-west-1' });
    //todo: send products to database

    try {
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
    }

};