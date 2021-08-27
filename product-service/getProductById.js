const {readMockFile} = require('./utils.js');

module.exports = async (event) => {
    const {id} = event.pathParameters;
    const productsRaw = await readMockFile();
    const products = JSON.parse(productsRaw);
    const product = products.find((item)=> item.id === id);
  
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
};