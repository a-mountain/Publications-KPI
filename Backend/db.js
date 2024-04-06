const repository = async (client) => {
    const publications = await client.db("publicationsdb").collection("publications")

    return {

    }
}

module.exports = {repository}
