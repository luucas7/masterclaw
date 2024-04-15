const insertOneDocument = async (collection, data) => {
    try {
        collection.insertOne(data);
    } catch (err) {
        console.error(err);
    }
};


module.exports = { insertOneDocument };