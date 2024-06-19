//TODO DEV
const cacheManager = require('./src/admin/cache');

const clearCache = async () => { 
    await cacheManager.clearCache();
    process.exit(0);
}

clearCache();
