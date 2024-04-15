const {client, database} = require('./mongo/client');
const app = require('./app');

const { create, _delete, read, update } = require('./crud');

const usersCollection = database.collection("users");














app.get('/auth/login', async (req, res) => {
    const { username, password } = req.query;
    console.log('/auth/login', username, password);

    const users = await read.fetchDocumentsWithMultipleRelations(usersCollection, [{
        key: 'username',
        value: username,
        relation: 'equal'
    }, {
        key: 'password',
        value: password,
        relation: 'equal'
    }]);

    console.log(users);
})

app.get('/auth/register', async (req, res) => {

    const { username, email, password } = req.query;
    console.log('/auth/register', username, password);

    const users = await read.fetchDocumentsWithMultipleRelations(usersCollection, [{
        key: 'username',
        value: username,
        relation: 'equal'
    },
    {
        key: 'email',
        value: email,
        relation: 'equal'
    }]);

    if (users.length > 0) {
        res.send({ status: 'error', message: 'User already exists' });
        return;
    }

    create.insertOneDocument(usersCollection, {
        username,
        email,
        password
    });

});



app.listen(8081, () => {});

