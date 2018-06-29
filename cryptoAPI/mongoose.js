const mongoose = require('mongoose');
const nconf = require('nconf');

var host = nconf.get('mongo:host');
var port = nconf.get('mongo:port');
var database = nconf.get('mongo:database');

mongoose.connect('mongodb://' + host + ':' + port + '/' + database);

module.exports = mongoose;
