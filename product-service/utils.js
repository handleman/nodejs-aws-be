const fs = require('fs').promises;
const path = require('path');

const { PRODUCTS_MOCK_FILENAME } = require('./constants.js')

const readMockFile = () => fs.readFile(path.resolve(__dirname, `./${PRODUCTS_MOCK_FILENAME}`));

module.exports.readMockFile = readMockFile;