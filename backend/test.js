const manager = require('./server/controller/manager');

const test = async () => {
const infos = await manager.getCardInfo('dark')
console.log(infos)
}


test()


//https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=dark