const validator = require('validator');
const mongoose = require('./client');
const { validate } = require('uuid');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Username must only contain letters and numbers');
            }
            if (!validator.isLength(value, { min: 3, max: 20 })) {
                throw new Error('Username must be at least 3 characters long and at most 20 characters long');
            }
        }
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isUUID(value)) {
                throw new Error('UUID is invalid');
            }
        }
    },
    join_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const deckSchema = mongoose.Schema({
    main_deck: {
        type: Array,
        required: true,
        validate(value) {
            if (value.length < 40) {
                throw new Error('Main deck must contain at least 40 cards');
            }
        }
    },
    extra_deck: {
        type: Array,
        required: true,
        validate(value) {
            if (value.length > 15) {
                throw new Error('Extra deck must contain at most 15 cards');
            }
        }
    },

    name: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Deck name must only contain letters and numbers');
            }
            if (!validator.isLength(value, { min: 3, max: 20 })) {
                throw new Error('Deck name must be at least 3 characters long and at most 20 characters long');
            }
        }
    },
    description: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isLength(value, { max: 100 })) {
                throw new Error('Deck description must be at least 3 characters long and at most 100 characters long');
            }
        }
    },
    creation_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    owner: {
        type: String,
        required: true,
    }
});

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlphanumeric(value.replace(/\s+/g, ''))) throw new Error('Card name must only contain letters and numbers');
        }
    },
    passcode: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isNumeric(value)) {
                throw new Error('Passcode must only contain numbers');
            }
            if (!validator.isLength(value, { min: 8, max: 8 })) {
                throw new Error('Passcode must be 8 characters long');
            }
        }
    },
    });

const querySchema = mongoose.Schema({
    query: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isLength(value, { min: 3 })) {
                throw new Error('Query must be at least 3 characters long');
            }

        }
    },

    creation_date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = {
    schemas: {
        userSchema,
        deckSchema,
        cardSchema,
        querySchema
    }
};