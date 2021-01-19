const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI;
db.user = require("./user.model")(mongoose);
db.item = require("./item.model")(mongoose);

module.exports = db;