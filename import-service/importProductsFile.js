const AWS = require('aws-sdk');
const { headers } = require('./headers');
const { IMPORT_BUCKET_NAME } = require('./constants');

module.exports = async (event) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const {name} = event.queryStringParameters;
    const destinationFileName = `uploaded/${name}`;
    
    const options = {
        Bucket: IMPORT_BUCKET_NAME,
        Key: destinationFileName,
        Expires: 60,
        ContentType: 'text/csv'
    };

    try {
       return new Promise((resolve, reject)=>{
        s3.getSignedUrl('putObject', options, (err, url)=>{
            if (err){
                return reject(err);
            }
            resolve({
                statusCode: 200,
                headers,
                body: url
            })
        });
       });
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify(error),
        };
    } 

};