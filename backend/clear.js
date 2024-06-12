//TODO DEV
const cacheManager = require('./server/admin/cache');

const clearCache = async () => { 
    await cacheManager.clearCache();
    process.exit(0);
}

clearCache();
