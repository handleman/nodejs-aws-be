const handler = require('./handler.js');


test('Product service: getProductsByID handler exists', async () => {
  const {getProductById} = handler;
  expect(getProductById).toBeDefined();
  expect(typeof getProductById).toBe('function');
});

test('Product service: getProductsList handler exists', async () => {
  const {getProductsList} = handler;
  expect(getProductsList).toBeDefined();
  expect(typeof getProductsList).toBe('function');
});