const {readMockFile} = require('./utils.js');

module.exports = async () => {
    const productsRaw = await readMockFile();
    const products = JSON.parse(productsRaw.toString('utf-8'));

    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
};