const deleteOneDocument = async (collection, idDocument) => {
    const currentCollection = database.collection(collection);

    try {
        await currentCollection.deleteOne({ _id: new ObjectId(idDocument) });
    } catch (err) {
        console.error(err);
    }
}

module.exports = { deleteOneDocument };