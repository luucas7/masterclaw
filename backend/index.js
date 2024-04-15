const app = require('./app');

const jwt = require('jsonwebtoken');

const { auth_login, auth_register } = require('./endpoints');















app.post('/auth/login', auth_login)

app.post('/auth/register', auth_register);



app.listen(8081, () => {});

