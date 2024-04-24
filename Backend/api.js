const api = (repo, server) => {
    server.get('/publications', async (request, reply) => {
        try {
            const {author, date} = request.query;
            const publications = await repo.findPublicationsByAuthorAndDate(author, date);
            return reply.send(publications);
        } catch (error) {
            console.log(error);
            return reply.status(500).send({error: 'An error occurred while fetching publications'});
        }
    });
    server.post('/publications', async (request, reply) => {
        try {
            const payload = request.body;
            const createdPublication = await repo.createPublication(payload);
            return reply.send(createdPublication);
        } catch (error) {
            console.log(error);
            return reply.status(500).send({error: 'An error occurred while creating publication'});
        }
    });
    server.get('/publications/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const publications = await repo.findPublicationById(id);
            return reply.send(publications);
        } catch (error) {
            console.log(error);
            return reply.status(500).send({error: 'An error occurred while fetching publications'});
        }
    });
    server.put('/publications/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const payload = request.body;
            const publications = await repo.updatePublication(id, payload);
            return reply.send(publications);
        } catch (error) {
            console.log(error);
            return reply.status(500).send({error: 'An error occurred while fetching publications'});
        }
    });
    server.delete('/publications/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const confirmation = await repo.deletePublication(id);
            console.log(confirmation);
            return reply.send(confirmation);
        } catch (error) {
            console.log(error);
            return reply.status(500).send({error: 'An error occurred while fetching publications'});
        }
    });
}

module.exports = {api}
