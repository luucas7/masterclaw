const path = require('path');
require('dotenv').config('../../.env');

const formatter = require('./formatter');
const fetcher = require('./fetcher');
const sanitize = require('../misc/sanitize');

const { read, create } = require('../crud');
const { Card, Query } = require('../mongo/models');

const manager = {};

manager.fetchFromApi = async (input, url) => {
  return fetcher.fetch(url, `?fname=${input}`)
}

manager.storeCards = async (data, query) => {
  const result = await create.createDocuments(data, Card);

  if (result) {
    create.createDocument({ query: query }, Query);
  }
}

manager.getCachedData = async (input) => {
  return read.readDocuments({ name: { $regex: input, $options: 'i' } }, Card, { _id: 0, __v: 0 });
}

manager.getQueries = async (input) => {
  return read.readDocuments({ query: input }, Query, { _id: 0, __v: 0 });
}

manager.doesSubqueryExists = async (input) => {

  // Not scalable, trying to find a better way, maybe using mysql but that's not the point of this project
  const allSubQueries = await read.readDocuments({}, Query, { _id: 0, __v: 0 });
  return allSubQueries.some(subQuery => input.includes(subQuery.query));
}

manager.getCardsInfo = async (initialInput) => {

  // Sanitizing and formatting the input
  const input = sanitize.cardName(initialInput).toLowerCase();
  console.log(`Input : ${input}`);

  // Checking if any queries is a substring of the input
  // If `ab` is stored, then any query containing `ab` will be considered as stored
  const isCached = await manager.doesSubqueryExists(input);

  console.log('Is cached : ', isCached);

  if (isCached) {
    // We just have to fetch the data from the database since it's already stored
    let data = await manager.getCachedData(input);
    console.log('Stored data : ', data.length);
    data = await formatter.addImageUrlFromCache(data, process.env.SERVER_HOST, '/cards/');
    return { status: 'success', message: 'Sending stored data', data: data };

  } else {
    // Fetching data from the API
    const result = await manager.fetchFromApi(input, process.env.API_URL);
    let data = await formatter.toNecessary(result.data);
    console.log('Data : ', data.length);

    // Getting all the cards that we already store, to stop already stored data from the cards to fetch
    const storedPasscodes = await formatter.getUniqueValues((await manager.getCachedData(input)), 'passcode');
    console.log('Stored passcodes : ', storedPasscodes);

    // Splitting the data into new and existing cards
    let newCards = [], existingCards = [];
    data.forEach(card => {
      if (storedPasscodes.has(String(card.passcode))) {
        existingCards.push(card);
      } else {
        newCards.push(card);
      }
    });

    console.log('New cards : ', newCards.length);
    console.log('Stored data : ', existingCards.length);

    // Adding manually the image url to the already stored data
    existingCards = await formatter.addImageUrl(existingCards, process.env.SERVER_HOST, '/cards/');

    // Downloading the card images and putting them in the public folder
    // Only cards that are not stored will be downloaded
    fetcher.downloadCardImages(newCards, path.join(__dirname, '../../public/cards'));

    // Storing the new cards in the database
    manager.storeCards(newCards, input);

    const final = [...existingCards, ...newCards];

    return { status: 'success', message: 'Data fetched from the API', data: final };
  }
}

manager.handleCardQuery = async (input) => {
  try {
    const result = await manager.getCardsInfo(input);
    return result;
  } catch (error) {
    console.error(error);
    return { status: 'error', message: error.message }
  }
}


module.exports = manager;

