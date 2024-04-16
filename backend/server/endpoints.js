
const { create, _delete, read, update } = require('./crud');

const {client, database} = require('./client');
const usersCollection = database.collection('users');
const { generateToken, generateUUID } = require('./auth');


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
    }], "and");

    switch (users.length) {
        case 0:
            res.send({ status: 'error', message: 'User not found' });
            break;
        case 1:
            
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
    }], {}, "$or");

    console.log(users);
    if (users === undefined) {
        res.send({ status: 'error', message: 'An error occured' });
        return;
    }
    
    switch (users.length) {
        case 0:

            const uuid = generateUUID();

            const jwt = {
                token : generateToken({ username, email, uuid }),
                tokenType : 'Bearer',
                expiresIn : 36000
            }

            const user = {
                username,
                email,
                uuid
            }

            const result = await create.createDocument(usersCollection, { username, email, password, uuid });

            res.send({ status: 'success', message: 'Account created', jwt: jwt, user: user});
            break;
        case 1:
            res.send({ status: 'error', message: 'An error occured' });
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