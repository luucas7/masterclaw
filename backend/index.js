const app = require('./server/misc/express');
const path = require('path');
require('dotenv').config();

const {auth, cards} = require('./server/endpoints');

app.post('/auth/login', auth.auth_login)

app.post('/auth/register', auth.auth_register);

app.post('/cards/add', cards.cards_add);

app.listen(process.env.SERVER_PORT, () => { 
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});