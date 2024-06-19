const { Card, Query } = require('../mongo/models')
const { drop } = require('../crud')

const cacheManager = {}



cacheManager.clearCache = async () => {
  const deletedCards = await drop.dropAllDocuments(Card);
  const deletedQueries = await drop.dropAllDocuments(Query);
  console.log(deletedCards);
  console.log(deletedQueries);
}

module.exports = cacheManager;