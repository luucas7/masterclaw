const { Model } = require("mongoose");

/** 
 * 
 * @param {Object} document the document to be created in the database
 * @param {Model} model the model to be used to create the document
 * 
 **/
const createDocument = async (document, model) => {
    try {
        model.create(document);
    } catch (err) {
        console.error(err);
    }
};

const createDocuments = async (documents, model) => {
    model.insertMany(documents);
}

module.exports = { createDocument, createDocuments };