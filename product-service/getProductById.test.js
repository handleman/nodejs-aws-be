const getProductById = require('./getProductById');

test('Product service: getProductsByID()', async () => {
    const MOCKUP_EVENT_OBJECT = { "pathParameters": { "id": "6daf2210-f804-4b33-a686-153c5288c957" } };
    const MOCKUP_ITEM = {
        "count": 4,
        "description": "Mephisto has yet another plan to obtain the Silver Surfer's soul. He disguises himself and walks among the humans. He now comes up with another plot.",
        "id": "6daf2210-f804-4b33-a686-153c5288c95",
        "price": 4,
        "title": "The Silver Surfer",
        "image": "https://comicvine.gamespot.com/a/uploads/scale_large/11/117763/2403520-ss16.png",
        "count": 200
        }
    const response = await getProductById(MOCKUP_EVENT_OBJECT);
    const {body} = response;
    const item = JSON.parse(body);
    expect(item).toMatchObject(MOCKUP_ITEM);
});