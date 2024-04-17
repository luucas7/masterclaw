const deleteOneDocument = async (collection, key, value) => {

    if (key === '_id') {
        value = new ObjectId(value);
    }

    try {
        await collection.deleteOne({ [key]: value });
    } catch (err) {
        console.error(err);
    }
}

const deleteEverything = async (collection) => {

    try {
        await collection.deleteMany({});
    } catch (err) {
        console.error(err);
    }
}


module.exports = { deleteOneDocument, deleteEverything };