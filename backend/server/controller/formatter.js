const formatter = {}

/**
 * 
 * @param {Array<Object>} data 
 * @returns {Promise<Array<Object>>} - The result of the operation
 * @description - Formats the data to the necessary format
 * @example
 * formatter.toNecessary([{ id: 43973174, name: 'Skilled Dark Magician', archetype: 'Dark Magician', card_images: [ { image_url_small: 'https://storage.googleapis.com/ygoprodeck.com/pics/43973174.jpg' } ] }]);
 * // Output: [ { passcode: 43973174, name: 'Skilled Dark Magician', archetype: 'Dark Magician', image_url: 'https://storage.googleapis.com/ygoprodeck.com/pics/43973174.jpg' } ]
 */
formatter.toNecessary = async (data) => {
    return data.map(item => ({
        passcode: item.id,
        name: item.name,
        type: item.type,
        desc: item.desc,
        race: item.race,
        image_url: item.card_images[0]?.image_url_small
    }));
}

/**
 * 
 * @param {Array<Object>} data 
 * @param {string} url 
 * @param {string} imageFolder 
 * @returns {Promise<Array<Object>>} - The result of the operation
 * @description - Adds the field `image_url` to the cards
 * @example
 */
formatter.addImageUrl = async (data, url, imageFolder) => {
    return data.map(item => ({
        image_url: `${url}${imageFolder}${item.passcode}.jpg`,
        ...item._doc
    }));
}

/**
 * 
 * @param {Array<Object>} data 
 * @param {string} filter
 * @returns {Promise<Set<string>>} - The result of the operation
 * @description - Returns a set with all the different values of the filter field
 * @example
 * formatter.getUniqueValues([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'John' }], 'name');
 * // Output: Set { 'John', 'Jane' }
 */
formatter.getUniqueValues = async (data, filter) => {
    const values = new Set();
    data.forEach(item => {
        values.add(item[filter]);
    });
    return values;
}

formatter.cardNameToObjectId = async (name) => {
    
}

module.exports = formatter;