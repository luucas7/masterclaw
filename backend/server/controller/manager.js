
const fs = require('fs');
const downloader = require('./downloader');
const { Card, Query } = require('../mongo/models');
const { create } = require('../crud');
const string = require('./string');
const path = require('path');


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

manager.alreadySearched = async (search, filters) => {
    let result = [];
    console.log(search, filters);
    result = await Query.find({ query: { $in: filters } });
    result = result.map((item) => item.query);
    return result;
}

manager.saveCard = async (card) => {
    create.createDocument(card, Card);

    downloader.putInStorage(card.name);


}

manager.fetchCards = async (fname) => {
    downloader.fetchCards(fname,  path.join(__dirname, '../../public/cards'));
}

manager.getSavedCards = async (regex) => {
    console.log('getSavedCards(', regex, ')');
    const result = {};
    result.data = await Card.find({ name: regex });;

    console.log(result.data);

    return result;
}


manager.getCardsInfo = async (name) => {

    if (name.length < 3) return { status: 'error', message: 'Name is too short' }

    let result = {};

    const ngrams = string.getNGrams(name, 3);
    const cache = await manager.alreadySearched(name, ngrams);

    if (cache.length > 0) {
        // We already stored the card
        console.log(cache); 

        const regex = new RegExp(cache[0], 'i');
        result = await manager.getSavedCards(regex);

    } else {
        manager.fetchCards(name);

    }
}


module.exports = manager;

