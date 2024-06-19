const app = require('./src/misc/express');
const path = require('path');
require('dotenv').config();

const {auth, cards, decks} = require('./src/endpoints');

app.post('/auth/login', auth.auth_login)

app.post('/auth/register', auth.auth_register);

app.post('/cards/add', cards.cards_add);

app.post('/decks/add', decks.deck_add);

app.get('/decks/:name', decks.decks_preview_get);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});