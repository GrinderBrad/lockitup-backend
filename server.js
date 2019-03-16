const express = require('express')
const cors = require('cors')
const app = express()

const mockSecrets = [
    {
        id: 'leet1337',
        passphrase: 'leet',
        secret: 'this is a compete secret. I fucked your mom',
    }, {
        id: 'wewewe',
        secret: 'card code is 89238492384'
    }
]
 
app.use(cors())

const findSecret = (secretId) => {
    const secret = mockSecrets.find((secret) => secret.id === secretId);
    if (!secret) {
        throw { message: 'secret not found', code: 404 };
    }
    return secret;
}

app.post('/secret', (req, res) => res.status(200).send('Not supported yet'));

app.get('/secret/:secretId/open', (req, res) => {
    try {
        const secretId = req.params.secretId;
        const passphrase = req.query.passphrase;
        console.log(secretId, passphrase);
        const secret = findSecret(secretId);
        if (secret.passphrase && !passphrase) {
            throw { message: 'passphrase needed', code: 403 }; 
        }
        if (secret.passphrase && secret.passphrase != passphrase) {
            throw { message: 'secret not found', code: 404 }; 
        }
        return res.status(200).json(secret);
    } catch(error) {
        return res.status(error.status || 500).json(error.message || error);
    }
});

app.get('/secret/:secretId', (req, res) => {
    try {
        const secretId = req.params.secretId;
        const secret = findSecret(secretId);
        if (!secret) {
            throw { message: 'secret not found', code: 404 }; 
        }
        return res.status(200).json({ secretId, exists: true });
    } catch (error) {
        return res.status(error.status || 500).json(error.message || error);
    }
});

app.set('port', 8081);
 
app.listen(app.get('port'), () => {
    console.log(`server starts at ${app.get('port')}`)
});