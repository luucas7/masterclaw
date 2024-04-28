const { Model } = require("mongoose");

/** 
 * 
 * @param {Object} document the document to be created in the database
 * @param {Model} model the model to be used to create the document
 * 
 **/
const dropDocument = async (document, model) => {
    try {
        model.deleteOne(document);
    } catch (err) {
        console.error(err);
    }
};

const dropDocuments = async (documents, model) => {
    model.deleteMany(documents);
}

module.exports = { dropDocument, dropDocuments};