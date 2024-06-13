const fs = require('fs');
const client = require('https');
const path = require('path');
const fetcher = {};
require('dotenv').config('.env');

/**
 * @param {string} url - The url of the image to download
 * @param {string} filepath - The path to save the image
 * @returns {Promise<string>} - The result of the operation
 * @description - Downloads an image from a url and saves it to a file
 */
fetcher.downloadImage = async (url, filepath) => {
    return new Promise((resolve, reject) => {
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

/**
 * @param {Array<Object<>>} cards 
 * @param {path} folder 
 * @returns {Promise<Object>} - The result of the operation
 */
fetcher.downloadCardImages = async (cards, folder) => {
    // Create directory if it doesn't exist
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    let i = 0;
    for (const card of cards) {
        const filepath = path.join(folder, `${card.passcode}.jpg`);

        if (fs.existsSync(filepath)) {
            console.log(`'${card.name}' already exists`);
            continue;
        }

        fetcher.downloadImage(card.image_url, filepath)
            .then(() => console.log(`Downloaded '${card.name}'`))
            .catch((err) => console.error(`Failed to download '${card.name}': ${err}`));

        if (++i % 20 === 0) {
            await new Promise(resolve => setTimeout(resolve, 1200));
            console.log('Waiting for ~1 second to avoid rate limiting...');
        }
    }
    return { status: 'success', message: 'Downloaded images' };
}

/**
 * 
 * @param {string} url 
 * @param {string} query 
 * @returns {Promise<Object>} - Fetched data from the API
 */
fetcher.fetch = async (url, query) => {
    console.log(`Fetching : ${url}${query}`);
        return new Promise((resolve, reject) => {
            client.get(`${url}${query}`, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                });
            }).on('error', (err) => {
                reject(err);
                throw new Error('Failed to fetch data');
            });
        });
  }

module.exports = fetcher;
