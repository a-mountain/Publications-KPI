const repository = async (client) => {
    const publications = await client.db("publicationsdb").collection("publications")
    return {
        findPublicationsByAuthorAndDate(author, date) {
            const predicates = []
            if (author) predicates.push({$or: [{"issues.articles.authors.name": {$regex: author}}, {'authors.name': {$regex: author}}]})
            if (date) predicates.push({$or: [{"issues.date": date}, {'date': date}]})
            const query = {$and: predicates};
            console.log(`Query ${JSON.stringify(query)}`)
            return publications.find(query).toArray();
        }
    }
}

module.exports = {repository}
