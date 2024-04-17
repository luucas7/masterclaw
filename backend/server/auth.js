const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');


const generateToken = (payload) => {
    payload.exp = Math.floor(Date.now() / 1000) + (60 * 3600);
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

generateUUID = () => {
    return v4();
}


module.exports = {
    generateToken,
    verifyToken,
    generateUUID
}