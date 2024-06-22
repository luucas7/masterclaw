//TODO DEV

const app = require('./src/misc/express');
const path = require('path');
require('dotenv').config();

const { auth, cards, decks } = require('./src/endpoints');
const manager = require('./src/controller/manager');
const { read, create } = require('./src/crud');
const { Card, Query } = require('./src/mongo/models');

const test = async () => {

    const result = await manager.handleCardQuery('two-mouth');
    console.log("Final result: ", result.data.length);

    //const result = await decks.new_deck('lucas', 'description', Array(3).fill('65338781'), 'dc41cf20-c7cc-444e-a4b4-68c68453619a');
    //console.log("Final result: ", result);

    //create.createDocument({ query: 'Dark Magician' }, Query);
}

test();
