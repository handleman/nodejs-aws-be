const getProductById = require('./getProductById');

test('Product service: getProductsByID()', async () => {
    const MOCKUP_EVENT_OBJECT = {"pathParameters":{"id":"7567ec4b-b10c-48c5-9345-fc73c48a80aa"}};
    const MOCKUP_ITEM = {
        "count": 4,
        "description": "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans. He now comes up with another plot.",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 2.4,
        "title": "The Silver Surfer",
        "image": "https://comicvine.gamespot.com/a/uploads/scale_large/11/117763/2403520-ss16.png"
        }
    const response = await getProductById(MOCKUP_EVENT_OBJECT);
    const {body} = response;
    const item = JSON.parse(body);
    expect(item).toMatchObject(MOCKUP_ITEM);
});