

const parser = {}


parser.takeNecessaryData = async (resp) => {

    const data = JSON.parse(resp);

    return data.map(item => ({
        id: item.id,
        name: item.name,
        archetype: item.archetype,
        image_url_small: item.card_images[0]?.image_url_small
    }));
}


module.exports = parser;