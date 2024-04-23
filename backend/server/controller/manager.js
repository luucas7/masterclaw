
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

manager.alreadySearched = async (search) => {
    let result = await Query.find({ query: search }, { query: 1, _id: 0 });
    result = result.map((item) => item.query);
    return result;
}

manager.fetchCards = async (fname) => {
    return downloader.fetchCards(fname,  path.join(__dirname, '../../public/cards'));
}

manager.getSavedCards = async (regex) => {
    console.log('getSavedCards(', regex, ')');
    const result = {};
    result.data = await Card.find({ name: regex });;

    console.log(result.data);

    return result;
}

manager.registerQuery = async (query, cards) => {
    create.createDocument({ query: query }, Query);
    cards.forEach((card) => {
        create.createDocument(card, Card);
    });
}


manager.getCardsInfo = async (name) => {

    if (name.length < 3) return { status: 'error', message: 'Name is too short' }
    name = name.toLowerCase();

    let result = {};

    const cache = await manager.alreadySearched(name);

    console.log('cache', cache); 

    if (cache.length > 0) {
        // We already stored the card
        const regex = new RegExp(cache[0], 'i');
        result = await manager.getSavedCards(regex);
    } else {
        const result = await manager.fetchCards(name);
        const cards = result.data;
        console.log('cards', cards);
        manager.registerQuery(name, cards);
    }
}


module.exports = manager;

