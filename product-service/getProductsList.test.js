
const getProductsList = require('./getProductsList');

test('Product service: getProductsList()', async () => {
    const response = await getProductsList();
    const {body} = response;
    const items = JSON.parse(body);
  
    expect(items.length).toBe(8);
  });