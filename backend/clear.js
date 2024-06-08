//TODO DEV
const cacheManager = require('./server/admin/cache');

const clearCache = () => { 
    const result = cacheManager.clearCache();
    console.log(result);
}

clearCache();
