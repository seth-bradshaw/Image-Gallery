const { MongoClient } = require('mongodb');

let client;

async function runClientWith(handler) {
    if (!client) {
        client = new MongoClient(process.env.MONGO_URI)
    }
    try {
        await client.connect();
        console.log('client connected')
        await handler(client);
    } finally {
        console.log('client connection closing')
        await client.close();
    }
}

module.exports = runClientWith;