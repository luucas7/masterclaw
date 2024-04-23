const path = require('path');
require('dotenv').config('../../.env');

const formatter = require('./formatter');
const fetcher = require('./fetcher');
const sanitizor = require('./sanitizor');

const { read, create } = require('../crud');
const { Card, Query } = require('../mongo/models');

const manager = {};

manager.fetchFromApi = async (input, url) => {
    return fetcher.getCards(url, `?fname=${input}`)
}

manager.cacheCards = async (data, query) => {
    create.createDocument({query: query}, Query);
    create.createDocuments(data, Card);
}

manager.getCachedData = async (input) => {
    return await read.readDocuments({ name: { $regex: input, $options: 'i' } }, Card, { _id: 0, __v: 0});
}

manager.getQueries = async (input) => {
    return await read.readDocuments({ query: input }, Query, { _id: 0, __v: 0});
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
    try {
        initialInput = sanitizor.sanitizeCardName(input)
        input = initialInput.toLowerCase();
    } catch (error) { return { status: 'error', message: error.message } }

    console.log(`Input : ${input}`);
    const isCached = (await manager.getQueries(input)).length > 0;


    console.log(`isCached : ${isCached}`);
    if (isCached){
        let data = await manager.getCachedData(input);
        console.log('Cached data : ', data);
        data = await formatter.addImageUrl(data, process.env.SERVER_HOST, '/cards/');

        return { status: 'success', message: 'Data fetched', data: data };


    } else {
        try {
            const result = await manager.fetchFromApi(input, process.env.API_URL);
    
            let data = await formatter.toNecessary(result.data);
            console.log('Data : ', data);

            fetcher.downloadCards(data, path.join(__dirname, '../../public/cards'));

            await manager.cacheCards(data, initialInput);

        } catch (error) { return { status: 'error', message: error.message } }

    }
    
}


module.exports = manager;

