const app = require('./server/misc/express');
const path = require('path');
require('dotenv').config();

const { auth, cards, decks } = require('./server/endpoints');
const manager = require('./server/controller/manager');

const test = async () => {

    const result = await manager.controller('Dark Magician');
    console.log("Final result: ", result);

    //const result = await decks.new_deck('lucas', 'description', Array(3).fill('65338781'), 'dc41cf20-c7cc-444e-a4b4-68c68453619a');
    //console.log("Final result: ", result);
}

test();
