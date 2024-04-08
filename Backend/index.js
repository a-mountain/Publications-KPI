const apiModule = require('./api.js')
const dbModule = require('./db.js')
const fs = require('fs');
const path = require('path');

const uri = "mongodb+srv://root:9HIsfk70IzvvmCq6@cluster0.jcxfi04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const initDB = async () => {
    const {MongoClient, ServerApiVersion} = require("mongodb");
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.connect();
}

const initFastify = () => {
    const keyPath = path.join(__dirname, 'server.key');
    const certPath = path.join(__dirname, 'server.cert');
    const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };
    const fastify = require('fastify')({logger: true, https: httpsOptions});
    const cors = require('@fastify/cors');

    fastify.register(cors, {
        origin: '*'
    });

    return fastify;
}

const start = async () => {
    const dbClient = await initDB();
    const fastify = initFastify();
    try {
        const repo = await dbModule.repository(dbClient);
        apiModule.api(repo, fastify);
        await fastify.listen({port: 80, host: '0.0.0.0'});
        console.log(`Server is listening on ${fastify.server.address().port}`);
    } catch (err) {
        await dbClient.close()
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
