const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = Schema({
  name: { type: String, required: true },
	description: { type: String, required: true },
	img: {type: String},
  price: {type: Number},
  qty: {type: Number}
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;