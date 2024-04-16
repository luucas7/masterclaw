const app = require('./server/app');

const { auth_login, auth_register } = require('./server/endpoints');











app.post('/auth/login', auth_login)

app.post('/auth/register', auth_register);



app.listen(8081, () => {});