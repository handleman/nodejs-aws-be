require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3002;

app.all('/*', (req, res) => {
    let originalUrl = req.originalUrl;
    console.log('originalUrl', originalUrl);
    console.log('method', req.method);
    const body = req.body;
    console.log('body', body);

    const recipient = originalUrl.split('/')[1];
    console.log('recipient', recipient);

    // unfortuntelly current cart service api doesent have "/cart" at its URI by default
    // so we have to remove it from the begining of the uri
    if (recipient === 'cart') {
        const sep = '/';
        originalUrlArr = originalUrl.split(sep);
        originalUrlArr.splice(1, 1);
        originalUrl = originalUrlArr.join(sep);

    }

    const recepientURL = process.env[recipient.toUpperCase()];
    console.log('recepientURL', recepientURL);
    if (recepientURL) {
        const isBodyHasValues = Object.keys(body || {}).length > 0;
        const axiosConfig = {
            method: req.method,
            url: `${recepientURL}${originalUrl}`,
            ...(isBodyHasValues && { data: body })
        };
        console.log('axiosConfig', axiosConfig);

        axios(axiosConfig)
            .then(response => {
                const { data } = response;
                console.log('response from recipient', data);
                res.json(data);
            })
            .catch(err => {
                console.log('[ REQUEST ERROR ]: ', JSON.stringify(err));
                const response = err.response;
                if (response) {
                    const { status, data } = response;
                    res.status(status).json(data);
                } else {
                    const message = err.message;
                    res.status(500).json({ error: message });
                }

            });
    } else {
        res.status(502).json({ error: 'Cannot process request' });
    }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})