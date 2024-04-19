const fs = require('fs');
const client = require('https');
const parser = require('./parser');
const path = require('path');
const downloader = {};
require('dotenv').config('../../.env');

downloader.downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        // Create directory if it doesn't exist
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }

        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
}

downloader.putInStorage = (cards, folder) => {

    const result = cards.map(card => {
        const url = card.image_url;
        const name = card.name;
        const passcode = card.passcode;

        const filename = `${passcode}.jpg`;
        const filepath = path.join(folder, filename);

        downloader.downloadImage(url, filepath)
            .then(() => {
                console.log(`Downloaded ${filename}`);
            })
            .catch((err) => {
                console.error(`Failed to download ${filename}: ${err}`);
            });
        return { 
            name: name,
            passcode: passcode,
            image_url: process.env.SERVER_HOST + '/images/cards/' + filename
        }
        

    });

    console.log('result', result);

    return { status: 'success', message: 'Downloaded images', data: result};

}

downloader.fetchCards = async (fname, folder) => {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${fname}`;
    const response = await fetch(url);

    if (!response.ok) return { status: 'error', message: 'Failed to fetch data' };

    /* 
        [
            {
                passcode: 73752131,
                name: 'Skilled Dark Magician',
                archetype: 'Dark Magician',
                image_url_small: 'https://images.ygoprodeck.com/images/cards_small/73752131.jpg'
            }
        ]
    */
    data = await parser.takeNecessaryData(response);
    console.log('data', data);

    return downloader.putInStorage(data, folder);


}



module.exports = downloader;
