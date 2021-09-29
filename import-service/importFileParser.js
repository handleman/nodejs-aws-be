const AWS = require('aws-sdk');
const csv = require('csv-parser');
const { IMPORT_BUCKET_NAME } = require('./constants');

module.exports = async (event) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const {Records} = event;

    const readStream = async (stream, Key, dataProcessor)=> {
        return new Promise((resolve, reject)=>{
            try{

                stream.pipe(csv())
                    .on('data', async(data)=>{
                        await dataProcessor(data)
                    })
                    .on('end', async()=>{
                        console.log(`Copy from ${IMPORT_BUCKET_NAME}/${Key}`);
                        const destinationKey = Key.replace('uploaded', 'parsed');
                        await s3.copyObject({
                            Bucket: IMPORT_BUCKET_NAME,
                            CopySource: `${IMPORT_BUCKET_NAME}/${Key}`,
                            Key: destinationKey
                        }).promise();
                        console.log(`Copied into ${IMPORT_BUCKET_NAME}/${destinationKey}`);
                        resolve();
                    });
            }
            catch (error) {
                reject(error)
            }
        });
    }
    const sendToQueue = (message) =>{
        const sqs = new AWS.SQS();
        const QUEUE_URL = process.env.SQS_URL;
        return sqs.sendMessage({
            QueueUrl: QUEUE_URL,
            MessageBody:JSON.stringify(message)
        }, ()=> console.log('send message for', message)
        ).promise();
    };

    for (const record of Records){
        const {key: Key} = record.s3.object;
    
        const stream = s3.getObject({
            Bucket: IMPORT_BUCKET_NAME,
            Key
        }).createReadStream();
        await readStream(stream, Key, sendToQueue);
    }

};