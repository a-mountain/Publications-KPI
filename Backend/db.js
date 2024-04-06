const repository = async (client) => {
    const publications = await client.db("publicationsdb").collection("publications")

    return {

    }
}

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ping: 1});
        const list = await client.db("publicationsdb").collection("publications").find().toArray();
        console.log(JSON.stringify(list, null, 2));
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

module.exports = {repository}
