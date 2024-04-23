const validator = require('validator');

const sanitizor = {};

sanitizor.sanitizeCardName = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (input.length < 3) throw new Error('Name is too short');
    if (input.length > 56) throw new Error('Name is too long'); // Longest card name is 56 characters

    return validator.escape(input);
}


module.exports = sanitizor;