
const { mongoose } = require('./client');
const { schemas } = require('./schemas');


const Deck = mongoose.model('Deck', schemas.deckSchema);
const User = mongoose.model('User', schemas.userSchema);
const Card = mongoose.model('Card', schemas.cardSchema);


module.exports = {
    Deck,
    User,
    Card
}
