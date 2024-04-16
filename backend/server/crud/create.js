const createDocument = async (collection, data) => {
    try {
        collection.insertOne(data);
    } catch (err) {
        console.error(err);
    }
};


module.exports = { createDocument };