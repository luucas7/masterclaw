

const read = require("./read.js");
const update = require("./update.js");
const create = require("./create.js");
const _delete = require("./_delete.js");


module.exports = {
    _delete,
    read,
    update,
    create
}