const { Card } = require('../mongo/models')
const mysqlClient = require('../mysql/client')
const { drop } = require('../crud')

const cacheManager = {}



cacheManager.clearCache = async () => {
  try {
    drop.dropAllDocuments(Card);
    mysqlClient.query('DELETE FROM query WHERE 1=1');

  } catch (error) {
    console.error(error)
  }
  return { status: 'success', message: 'Cache cleared successfully' };
}

module.exports = cacheManager;