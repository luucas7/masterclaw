const path = require('path');
require('dotenv').config('../../.env');

const formatter = require('./formatter');
const fetcher = require('./fetcher');
const sanitizor = require('./sanitizor');
const { getQuerySubstring, storeQuery } = require('../mysql/queries');

const { read, create } = require('../crud');
const { Card } = require('../mongo/models');

const manager = {};

manager.fetchFromApi = async (input, url) => {
    return fetcher.fetch(url, `?fname=${input}`)
}

manager.cacheCards = async (data, query) => {
    storeQuery(query);
    create.createDocuments(data, Card);

}

manager.getCachedData = async (input) => {
    return await read.readDocuments({ name: { $regex: input, $options: 'i' } }, Card, { _id: 0, __v: 0 });
}

manager.getQueries = async (input) => {
    return await read.readDocuments({ query: input }, Query, { _id: 0, __v: 0 });
}

/**
 * 
 * @param {String} input - The card name to search for
 * @returns {Object} - The result of the operation
 * 
 * @description - This function is the main controller for the manager module. It sanitizes the input, checks if the data is cached, and fetches the data from the API if it isn't.
 * 
 * @example
 * manager.controller('skilled dark magicia');
 * // Output: { status: 'success', message: 'Data fetched', data: [ { passcode: 43973174, name: 'Skilled Dark Magician', archetype: 'Dark Magician', image_url: 'https://storage.googleapis.com/ygoprodeck.com/pics/43973174.jpg' } ] }
 */
manager.controller = async (input) => {

    let initialInput;
    let isCached;
    try {
        // Sanitizing and formatting the input
        initialInput = sanitizor.sanitizeCardName(input)
        input = initialInput.toLowerCase();
        console.log(`Input : ${input}`);
        // Checking if any queries which are substrings of the input are already cached
        // If `ab` is stored, then any query *ab* will concern data containing `ab`
        isCached = (await getQuerySubstring(input)).found;
    } catch (error) { return { status: 'error', message: error.message } }

    if (isCached) {
        // We just have to fetch the data from the database since it's already stored
        let data = await manager.getCachedData(input);
        console.log('Cached data : ', data);
        data = await formatter.addImageUrl(data, process.env.SERVER_HOST, '/cards/');

        return { status: 'success', message: 'Sending cached data', data: data };

    } else {
        try {
            // Fetching data from the API
            const result = await manager.fetchFromApi(input, process.env.API_URL);
            let data = await formatter.toNecessary(result.data);
            console.log('Data : ', data);

            // Removing already cached data from the cards to fetch
            let storedPasscodes = await formatter.getUniqueValues((await manager.getCachedData(input)), 'passcode');
            console.log('Stored passcodes : ', storedPasscodes);
            data = data.filter(card => !storedPasscodes.has(String(card.passcode)));

            console.log('Data after filtering : ', data);

            fetcher.downloadCards(data, path.join(__dirname, '../../public/cards'));

            await manager.cacheCards(data, initialInput);

        } catch (error) { return { status: 'error', message: error.message } }

    }

}


module.exports = manager;

