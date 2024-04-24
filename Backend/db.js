const {ObjectId} = require("mongodb");
const repository = async (client) => {
    const publications = await client.db("publicationsdb").collection("publications")
    return {
        findPublicationsByAuthorAndDate(author, date) {
            const predicates = []
            if (author) predicates.push({$or: [{"issues.articles.authors.name": {$regex: author}}, {'authors.name': {$regex: author}}]});
            if (date) predicates.push({$or: [{"issues.date": date}, {'date': date}]});
            const query = {$and: predicates};
            console.log(`Query ${JSON.stringify(query)}`);
            return publications.find(query).toArray();
        },
        async createPublication(publication) {
            console.log(`Inserting publication ${JSON.stringify(publication)}`);
            const createdPublication = await publications.insertOne(publication);
            return publications.findOne({"_id": createdPublication.insertedId});
        },
        updatePublication(id, publication) {
            publications.updateOne({_id: id}, {$set: publication});
        },
        async deletePublication(id) {
            console.log(id)
            const result = await publications.deleteOne({"_id": new ObjectId(id)});
            if (result.deletedCount === 1) {
                return { message: "Successfully deleted publication:  " + id };
            } else {
                return { message: "Publication was not found: " + id };
            }
        }
    }
}

module.exports = {repository}
