const insertOneDocument = async (collection, data) => {
    try {
        collection.insertOne(data);
    } catch (err) {
        console.error(err);
    }
};


export default { insertOneDocument };