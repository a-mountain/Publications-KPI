const fastify = require('fastify')({logger: true});
const apiModule = require('./api.js')
const dbModule = require('./db.js')
const {MongoClient, ServerApiVersion} = require("mongodb");

const uri = "mongodb+srv://root:9HIsfk70IzvvmCq6@cluster0.jcxfi04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const initDB = async () => {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    return client.connect();
}

const start = async () => {
    const dbClient = await initDB();
    try {
        const repo = await dbModule.repository(dbClient);
        apiModule.api(repo, fastify);
        await fastify.listen({port: 3000});
        console.log(`Server is listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    } finally {
        await fastify.close()
        await dbClient.close()
    }
};

start();
