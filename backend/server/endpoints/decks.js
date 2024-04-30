const { Deck, Card } = require('../mongo/models');
const { create, drop, read, update } = require('../crud');
const sanitize = require('../controller/sanitize');
const formatter = require('../controller/formatter');
const client = require('../mongo/client');

const replacePasscodesWithIds = async (main_deck) => {
    // Créer un ensemble unique de passcodes
    const uniquePasscodes = [...new Set(main_deck)];

    // Trouver toutes les cartes qui correspondent aux passcodes
    const cards = await Card.find({ passcode: { $in: uniquePasscodes } });

    // Créer une carte de passcode à _id
    const passcodeToId = cards.reduce((map, card) => {
        map[card.passcode] = card._id;
        return map;
    }, {});

    // Remplacer les passcodes par les _id dans le deck principal
    return main_deck.map(passcode => (passcodeToId[passcode]));
}

const new_deck = async (name, description, main_deck, uuid) => {

    try {
        name = sanitize.deckName(name);
        description = sanitize.deckDescription(description);
        uuid = sanitize.uuid(uuid);
        read.
        // Making sure that each card appears at most 3 times, and that the passcodes are valid
        main_deck = sanitize.deck(main_deck);
        // Replacing passcode with MongoDB IDs
        main_deck = await replacePasscodesWithIds(main_deck);
        
        // Creating the deck and saving it to the database
        (new Deck({
            name: name,
            description: description,
            main_deck: main_deck,
            owner: uuid
        })).save();

        return { status: 'success', message: 'Deck created successfully' };

    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

const deck_add = async (req, res) => {
    const { name, description, main_deck, uuid } = req.body;
    console.log('/decks/add', name, uuid, main_deck.length());
    res.send(await new_deck(username, password));
}




module.exports = {
    deck_add,
    new_deck
};