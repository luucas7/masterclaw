const { Model } = require("mongoose");

/** 
 * 
 * @param {Object} document the document to be created in the database
 * @param {Model} model the model to be used to create the document
 * 
 **/
const dropDocument = async (document, model) => {
    try {
        return model.deleteOne(document);
    } catch (err) {
        console.error(err);
    }
};

const dropDocuments = async (documents, model) => {
    return model.deleteMany(documents);
}

const dropAllDocuments = async (model) => {
    return model.deleteMany({});
}

module.exports = { dropDocument, dropDocuments, dropAllDocuments};