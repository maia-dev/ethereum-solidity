const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var accountSchema = new Schema({
  userId: Schema.ObjectId,
  mnemonic: String,
  ethDefaultAddress: Number,
  btcDefaultAddress: Number,
});

module.exports = mongoose.model('Account', accountSchema);
