const apiModule = require('./api.js')
const dbModule = require('./db.js')

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
    const fastify = require('fastify')({logger: true});
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
        await fastify.listen({port: 3000});
        console.log(`Server is listening on ${fastify.server.address().port}`);
    } catch (err) {
        await dbClient.close()
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
