

const parser = {}


parser.takeNecessaryData = async (resp) => {



    const data = await resp.json();

    return data.data.map(item => ({
        passcode: item.id,
        name: item.name,
        archetype: item.archetype,
        image_url: item.card_images[0]?.image_url_small
    }));
}


module.exports = parser;