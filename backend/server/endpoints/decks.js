const { Deck, Card } = require('../mongo/models');
const { create, drop, read, update } = require('../crud');
const sanitize = require('../misc/sanitize');
const { verifyToken } = require('../misc/jwt');

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

const createDeck = async (username, deckname, description, main_deck) => {
    try {
        uuid = sanitize.username(username);
        deckname = sanitize.deckName(deckname);
        description = sanitize.deckDescription(description);

        // Retrive the owner's ID
        const owner = User.findOne({ username: username });
        if (!owner) {
            return { status: 'error', message: 'User not found' };
        }
        const ownerId = owner._id;

        // Making sure that each card appears at most 3 times, and that the passcodes are valid
        main_deck = sanitize.deck(main_deck);
        // Replacing passcode with MongoDB IDs
        main_deck = await replacePasscodesWithIds(main_deck);

        // Creating the deck and saving it to the database
        (new Deck({
            name: deckname,
            description: description,
            main_deck: main_deck, 
            owner: ownerId,
        })).save();

        return { status: 'success', message: 'Deck created successfully' };

    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

const deck_add = async (req, res) => {
    const { jwt, username, deckname, description, main_deck } = req.body;
    
    console.log('/decks/add', username, deckname, main_deck.length());
    if (!verifyToken(jwt)){
        return res.send({ status: 'error', message: 'Invalid token'});
    }
    res.send(await createDeck(username, deckname, description, main_deck));
}

const getDecksPreview = async (name) => {
    try {

        // Retrive the owner's ID
        const owner = User.findOne({
            username: name
        });
        if (!owner) {
            return { status: 'error', message: 'User not found' };
        }
        const ownerId = owner._id;

        return await read.readDocuments({ owner: ownerId}, Deck, { name: 1, description: 1, image: 1 });
    } catch (error) {
        return { status: 'error', message: error.message };
    }
}

const decks_preview_get = async (req, res) => {
    const { name } = req.params;
    console.log('/decks/:name', name);
    res.send(await getDecksPreview(name));
}

module.exports = {
    createDeck,
    deck_add,
    decks_preview_get,
};