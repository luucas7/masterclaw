const manager = require('./server/controller/manager');
const downloader = require('./server/controller/downloader');


const test = async () => {

    await downloader.fetchCards('Skilled dark magician', 'public/cards');
}


test()


//https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark