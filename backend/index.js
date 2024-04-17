const app = require('./server/misc/express');

const {auth, cards} = require('./server/endpoints');





app.post('/auth/login', auth.auth_login)

app.post('/auth/register', auth.auth_register);

app.post('/cards/add', cards.cards_add);

app.listen(8081, () => {});