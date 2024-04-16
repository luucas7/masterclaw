
const fetchOneValue = async (collection, option) => {
    try {
        const document = await collection.findOne();
        return document[option];
    } catch (err) {
        console.error(err);
    }
};

const fetchDocumentsWithRelation = async (collection, relation, projection) => {
    try {
        const document = await collection
            .find({ [relation.key]: { $eq: relation.value } })
            .project(projection)
            .toArray();
        return document;
    } catch (err) {
        console.error(err);
    }
};

const fetchDocumentsWithMultipleRelations = async (collection, relations, projection, condition) => {
    try {
        const conditions = relations.map(relation => ({ [relation.key]: { $eq: relation.value } }));
        const document = await collection
            .find({ [condition] : conditions})
            .project(projection)
            .toArray();
        return document;
    } catch (err) {
        console.error(err);
    }
};

const fetchDocuments = async (collection, projection = {}) => {
    try {
        const documents = await collection
            .find()
            .project(projection)
            .toArray();
        return documents;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { fetchOneValue, fetchDocumentsWithRelation, fetchDocuments, fetchDocumentsWithMultipleRelations };