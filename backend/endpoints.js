
const { create, _delete, read, update } = require('./crud');

const {client, database} = require('./mongo/client');
const usersCollection = database.collection('users');


const auth_login = async (req, res) => {
    const { username, password } = req.body;
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

    switch (users.length) {
        case 0:
            res.send({ status: 'failed', message: 'User not found' });
            break;
        case 1:
            //TODO JWT
            res.send({ status: 'success', message: 'User found' });
            break;
        default:
            res.send({ status: 'error', message: 'Multiple users found' });
            break;
    }

}




const auth_register = async (req, res) => {

    const { username, email, password } = req.body;
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

    switch (users.length) {
        case 0:
            const result = await create.createDocument(usersCollection, {
                username,
                email,
                password
            });
            res.send({ status: 'success', message: 'Account created', result});
            break;
        case 1:
            res.send({ status: 'failed', message: 'An error occured' });
            break;
        default:
            res.send({ status: 'error', message: 'Multiple users found' });
            break;
    }


}




module.exports = {
    auth_login,
    auth_register
}