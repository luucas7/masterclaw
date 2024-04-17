const { Model } = require("mongoose");



/**
 * Fetches documents from the database
 * @param {Object} query - The query to search for documents, { key: value }
 * @param {Model} model - The model to search for documents in, 
 * 
 * @returns {Array} - An array of documents
 */
const readDocuments = async (query, model) => {
    try {
        return documents = await model.find(query);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { readDocuments };