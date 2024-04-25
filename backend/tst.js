const manager = require('./server/controller/manager');
const fetcher = require('./server/controller/fetcher');
const path = require('path');


const test = async () => {

    //await fetcher.downloadImage('https://images.ygoprodeck.com/images/cards_small/1861630.jpg', path.join(__dirname, 'public/cards/salut.jpg'));

    const result = await manager.controller('skilled ');
    console.log('Final result : ', result);
}


test()


//https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark