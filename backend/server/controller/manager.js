
const fs = require('fs');
const downloader = require('./downloader');
const { Card } = require('../mongo/models');
const { create } = require('../crud');
const { parser } = require('parser');


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

manager.getCardInfo = async (name) => {

    const result = {};

    if (name.length <= 3){
        return { status: 'error', message: 'Name is too short' }
    }

    const regex = new RegExp(name, 'i');
    if (await this.alreadyInStorage()) {
        result.data = await Card.find({ name: regex });
        //TODO
        //result.image = await 
    }}

manager.saveCard = async (card) => {
    create.createDocument(card, Card);


}

manager.getSavedCards = async () => {
    return ;
}


module.exports = manager;

