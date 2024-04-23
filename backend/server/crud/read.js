const { Model } = require("mongoose");

/**
 * Fetches documents from the database
 * @param {Object} query - The query to search for documents, { key: value }
 * @param {Model} model - The model to search for documents in
 * @param {Object} projection - The projection to specify which fields to include or exclude from the result
 * 
 * @returns {Promise<Array>} - An array of documents
 */
const readDocuments = async (query, model, projection) => {
    try {
        return await model.find(query, projection);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { readDocuments };
