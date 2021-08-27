'use strict';
const fs = require('fs').promises;
const path = require('path');

const { PRODUCTS_MOCK_FILENAME } = require('./constants.js')

const readMockFile = () => fs.readFile(path.resolve(__dirname, `./${PRODUCTS_MOCK_FILENAME}`));

module.exports.getProductsList = async () => {
  const productsRaw = await readMockFile();
  const products = JSON.parse(productsRaw.toString('utf-8'));

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};

module.exports.getProductById = async (event) => {
  const {id} = event.pathParameters;
  const productsRaw = await readMockFile();
  const products = JSON.parse(productsRaw);
  const product = products.find((item)=> item.id === id);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
