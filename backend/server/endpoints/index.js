const auth = require('./auth');
const cards = require('./cards');
const decks = require('./decks');

const endpoints = {
    auth,
    cards,
    decks
}

module.exports = endpoints;