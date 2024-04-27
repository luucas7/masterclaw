const pool = require('./client');

/**
 * 
 * @param {string} query 
 * @returns {Promise<Array>} - The result of the operation
 * 
 * @description - Gets all the query substrings cached in the database
 * 
 * @example
 * getQuerySubstring('darke');
 * // Output: { status: 'success', data: [ { query: 'dark' } ] 
 */
const getQuerySubstring = async (query) => {
    const [rows] = await pool.query("SELECT * FROM query q WHERE ? LIKE CONCAT('%',REPLACE(q.query,'%','\%'),'%');", [query]);
    return rows.length > 0 ? { status: 'success', found: true, data: rows } : { status: 'success', found: false };
}

/**
 * 
 * @param {string} query
 * @returns {Promise<Object>} - The result of the operation
 * 
 * @description - Stores a query in the database
 * 
 * @example
 * storeQuery('dark');
 * // Output: { status: 'success', message: 'Query stored' }
 */
const storeQuery = async (query) => {
    const [rows] = await pool.query("INSERT INTO query (id, query) VALUES (NULL,?) RETURNING id", [query]);
    return rows ? { status: 'success', message: "Query stored" } : { status: 'error', message: `Failed to store query ${query}` };
}

module.exports = { getQuerySubstring, storeQuery };