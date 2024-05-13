
const { create, drop, read, update } = require('../crud');
const { generateToken, generateUUID } = require('../misc/jwt');
const sanitize = require('../misc/sanitize');
const { User, Deck } = require('../mongo/models');

const login = async (username, password) => {
    try {
        username = sanitize.username(username);
        password = sanitize.password(password);
    } catch (error) { return { status: 'error', message: error.message }; }

    const users = await read.readDocuments({ $and: [{ username: username }, { password: password }] }, User, { username: 1, email: 1, _id: 0 });
    if (users === undefined) {
        return { status: 'error', message: 'An error occured, Code : E100' };
    }
    switch (users.length) {
        case 0:
            return { status: 'error', message: 'An error occured, Code : E101' };
        case 1:
            const { email } = users[0];
            const jwt = {
                token: generateToken({ username, email }),
                tokenType: 'Bearer',
                expiresIn: 36000
            };
            const user = { username, email };
            return { status: 'success', message: 'Succesfully connected', jwt: jwt, user: user };
        default:
            return { status: 'error', message: 'Multiple users found, Code : E102' };
    }
}
const register = async (username, email, password) => {
    try {
        username = sanitize.username(username);
        email = sanitize.email(email);
        password = sanitize.password(password);
    }
    catch (error) { return { status: 'error', message: error.message }; }

    const users = await read.readDocuments({ $or: [{ username: username }, { email: email }] }, User, { username: 1, email: 1, _id: 0 });
    if (users === undefined) return { status: 'error', message: 'An error occured, Code : E103' };
    switch (users.length) {
        case 0:
            const jwt = {
                token: generateToken({ username, email }),
                tokenType: 'Bearer',
                expiresIn: 36000
            }
            const user = {
                username,
                email
            }
            await create.createDocument({ username: username, email: email, password: password }, User);
            return { status: 'success', message: 'Account created', jwt: jwt, user: user };

        case 1:
            return { status: 'error', message: 'An error occured, Code : E104' };

        default:
            return { status: 'error', message: 'Multiple users found, Code : E105' };
    }
}

const auth_login = async (req, res) => {
    const { username, password } = req.body;
    console.log('/auth/login', username, password);
    res.send(await login(username, password));
}

const auth_register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('/auth/register', username, email, password);
    res.send(await register(username, email, password));
}

module.exports = {
    auth_login,
    auth_register,
    login,
    register
}
