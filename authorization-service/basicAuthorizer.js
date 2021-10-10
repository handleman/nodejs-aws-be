const _generatePolicy = (principalId, resource, effect = 'Allow') => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource

                }
            ]
        }
    }
};

module.exports = (event, context, callback) => {
    console.log('Event:', JSON.stringify(event));


    if (event['type'] !== 'TOKEN') {
        callback('Unauthorized');
    }

    try {
        const authorizationToken = event.authorizationToken;
        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64'); //todo: look for definition
        const plainCreds = buff.toString('utf-8').split(':');

        const userName = plainCreds[0];
        const password = plainCreds[1];

        console.log(`username: ${username} and password: ${password}`);

        const storedPassword = process.env[userName];
        const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';

        // const iam = new AWS.IAM({ apiVersion: '2010-05-08' });
        const policy = _generatePolicy(encodedCreds, event.methodArn, effect);

        callback(null, policy);


    } catch (error) {
        callback(`Unauthorized: ${e.message}`);
    }

};