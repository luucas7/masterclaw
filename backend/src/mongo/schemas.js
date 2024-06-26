const validator = require('validator');
const mongoose = require('./client');
const { generateUUID } = require('../misc/jwt');

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
        unique: true,
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
        default: generateUUID(),
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
            // TODO DEBUG VALUE, REPLACE 3 BY 40
            if (value.length < 3 || value.length > 60) {
                throw new Error('Main deck must contain at least 40 cards and at most 60 cards');
            }
        }
    },
    extra_deck: {
        type: Array,
        required: false,
        validate(value) {
            if (value.length > 15) {
                throw new Error('Extra deck must contain at most 15 cards');
            }
        }
    },

    name: {
        type: String,
        required: true,
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
                throw new Error('Deck description must be at most 100 characters long');
            }
        }
    },
    // user+name
    id: {
        type: String,
        required: true,
        unique: true,
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
    },
    passcode: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isNumeric(value)) {
                throw new Error('Passcode must only contain numbers');
            }
        }
    },
    type: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    race: {
        type: String,
        required: true,
    },
    });

const deckPreviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isAlphanumeric(value.replace(/\s+/g, ''))) {
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
                throw new Error('Deck description must be at most 100 characters long');
            }
        }
    },
    image: {
        type: String,
        required: false
    }
});

const querySchema = mongoose.Schema({
    query: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isLength(value, { min: 3, max: 100})){
                throw new Error('Query must be at least 3 characters long and at most 100 characters long');
            }
        }
    }
});

module.exports = {
    schemas: {
        userSchema,
        deckSchema,
        cardSchema,
        deckPreviewSchema,
        querySchema
    }
};