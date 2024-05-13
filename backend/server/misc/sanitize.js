const validator = require('validator');

const sanitize = {};

sanitize.cardName = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (input.length < 3) throw new Error('Name is too short');
    if (input.length > 56) throw new Error('Name is too long'); // Longest card name is 56 characters

    return validator.escape(input);
}

sanitize.deckName = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (input.length < 3) throw new Error('Name is too short');
    if (input.length > 30) throw new Error('Name is too long');
    return validator.escape(input);
}

sanitize.deckDescription = (input) => {
    if (typeof input !== 'string' || input.length < 3) return "No description...";
    if (input.length > 256) throw new Error('Description is too long');
    return validator.escape(input);
}

sanitize.username = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (input.length < 3) throw new Error('Username is too short');
    if (input.length > 30) throw new Error('Username is too long');
    return validator.escape(input);
}

sanitize.uuid = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (!validator.isUUID(input)) throw new Error('Invalid UUID');
    return validator.escape(input);
}

sanitize.passcode = (input) => {
    if (typeof input !== 'string') throw new Error('Invalid input');
    if (!validator.isNumeric(input)) throw new Error('Invalid passcode');
    return input;
}

sanitize.deck = (input) => {
    if (!Array.isArray(input)) throw new Error('Invalid input');

    const counts = input.reduce((acc, passcode) => {
        passcode = sanitize.passcode(passcode);
        if (typeof passcode !== 'string') throw new Error('Invalid passcode');
        acc[passcode] = (acc[passcode] || 0) + 1;
        return acc;
    }, {});

    const isValid = Object.values(counts).every(count => count <= 3);
    if (!isValid) throw new Error('A card appears more than three times');

    return input;
}

module.exports = sanitize;