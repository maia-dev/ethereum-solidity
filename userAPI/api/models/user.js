var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  mnemonic: String,
  defaultAccount: Number,
});

module.exports = mongoose.model('User', userSchema);
