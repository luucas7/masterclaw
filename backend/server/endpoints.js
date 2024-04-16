
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
    }], {}, "and");

    if (users === undefined) {
        res.send({ status: 'error', message: 'An error occured, Code : E100' });
        return;
    }

    switch (users.length) {
        case 0:
            res.send({ status: 'error', message: 'An error occured, Code : E101' });
            break;
        case 1:

            console.log(users[0]);

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

        default:
            res.send({ status: 'error', message: 'Multiple users found, Code : E102' });
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

    if (users === undefined) {
        res.send({ status: 'error', message: 'An error occured, Code : E103' });
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
            res.send({ status: 'error', message: 'An error occured, Code : E104' });
            break;
            
        default:
            res.send({ status: 'error', message: 'Multiple users found, Code : E105' });
            break;
    }


}




module.exports = {
    auth_login,
    auth_register
}