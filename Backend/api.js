const api = (repo, server) => {
    server.get('/publications', async (request, reply) => {
        try {
            const {author, date} = request.query;
            const publications = await repo.findPublicationsByAuthorAndDate(author, date);
            return reply.send(publications);
        } catch (error) {
            request.log.error(error);
            return reply.status(500).send({error: 'An error occurred while fetching publications'});
        }
    });
}

module.exports = {api}
