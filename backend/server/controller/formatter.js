

const formatter = {}



formatter.toNecessary = async (data) => {
    return data.map(item => ({
        passcode: item.id,
        name: item.name,
        archetype: item.archetype,
        image_url: item.card_images[0]?.image_url_small
    }));
}

formatter.addImageUrl = async (data, url, imageFolder) => {
    return data.map(item => ({
        passcode: item.passcode,
        name: item.name,
        image_url: `${url}${imageFolder}${item.passcode}.jpg`
    }));
}

module.exports = formatter;