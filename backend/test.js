const manager = require('./server/controller/manager');
const downloader = require('./server/controller/downloader');
const path = require('path');


const test = async () => {

    //await downloader.downloadImage('https://images.ygoprodeck.com/images/cards_small/1861630.jpg', path.join(__dirname, 'public/cards/salut.jpg'));

    await manager.getCardsInfo('skilled dark magician');
}


test()


//https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark