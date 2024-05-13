const fs = require('fs');
const client = require('https');
const path = require('path');
const fetcher = {};
require('dotenv').config('../../.env');

/**
 * @param {string} url - The url of the image to download
 * @param {string} filepath - The path to save the image
 * @returns {Promise<string>} - The result of the operation
 * @description - Downloads an image from a url and saves it to a file
 */
fetcher.downloadImage = async (url, filepath) => {
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

/**
 * @param {Array<Object<>>} cards 
 * @param {path} folder 
 * @returns {Promise<Object>} - The result of the operation
 */
fetcher.downloadCards = async (cards, folder) => {
    const result = cards.map(card => {
        const filepath = path.join(folder, `${card.passcode}.jpg`);
        fetcher.downloadImage(card.image_url, filepath)
            .then(() => console.log(`Downloaded '${card.name}'`) )
            .catch((err) => console.error(`Failed to download '${card.name}': ${err}`) );
    });
    return { status: 'success', message: 'Downloaded images', data: result};
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
