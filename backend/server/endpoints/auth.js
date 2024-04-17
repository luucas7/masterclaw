
const { create, drop, read, update } = require('../crud');
const { generateToken, generateUUID } = require('../misc/jwt');
const { User, Deck } = require('../mongo/models');


const auth_login = async (req, res) => {
    const { username, password } = req.body;
    console.log('/auth/login', username, password);

    const users = await read.readDocuments({ $and: [{ username: username }, { password: password }] }, User);

    if (users === undefined) {
        res.send({ status: 'error', message: 'An error occured, Code : E100' });
        return;
    }

    console.log(users);

    switch (users.length) {
        case 0:
            res.send({ status: 'error', message: 'An error occured, Code : E101' });
            break;
        case 1:

            
            const { email, uuid } = users[0];

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
            
            res.send({ status: 'success', message: 'Succesfully connected', jwt: jwt, user: user});
            break;

        default:
            res.send({ status: 'error', message: 'Multiple users found, Code : E102' });
            break;
    }

}

const auth_register = async (req, res) => {

    const { username, email, password } = req.body;
    console.log('/auth/register', username, password);

    const users = await read.readDocuments({ $or: [{username: username, email: email}] }, User);
    console.log(users);

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

            await create.createDocument({ username:username, email:email, password:password, uuid:uuid}, User);
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

module.exports =  {
        auth_login,
        auth_register
    }
