
const fs = require('fs');
const downloader = require('./downloader');
const { Card, Query } = require('../mongo/models');
const { create } = require('../crud');
const { parser } = require('./parser');
const string = require('./string');


const manager = {};
 
manager.checkPathToFile = (path) => {
    return fs.existsSync(path);
}

manager.downloadImage = async (url, filepath) => {
    return downloader.downloadImage(url, filepath);
}

manager.alreadyInStorage = async (name) => {
    return Card.exists({ name: name });
}

manager.alreadySearched = async (search) => {
    let result = [];
    const filters = string.getNGrams(search, 3);
    console.log(search, filters);
    result = await Query.find({ query: { $in: filters } });
    result = result.map((item) => item.query);
    return result;
}

manager.saveCard = async (card) => {
    create.createDocument(card, Card);

    downloader.putInStorage(card.name);


}

manager.fetchCards = async (regex) => {

    await Card.find({ name: regex });

    downloader.putInStorage(name);

}

manager.getSavedCards = async (regex) => {
    console.log('getSavedCards', regex);
    const result = {};
    result.data = await Card.find({ name: regex });


    return result;
}


manager.getCardInfo = async (name) => {

    if (name.length < 3) return { status: 'error', message: 'Name is too short' }

    const result = {};

    const cache = await manager.alreadySearched(name);
        const regex = new RegExp(cache[0], 'i');

    if (cache.length > 0) {
        // We already stored the card
        console.log(cache); 

        result = await manager.getSavedCards(regex);
    } else {

        manager.fetchCards(regex);

    }
}


module.exports = manager;

