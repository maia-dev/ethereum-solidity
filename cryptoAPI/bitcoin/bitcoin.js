var bitcore = require('bitcore-lib');

var privateKeyWIF = 'cNvm4zMH6pcMzS1mRqUtXbizMQGdSS5w5HmaqFqKLJJ1Kn4WDUJZ';

var privateKey = bitcore.PrivateKey.fromWIF(privateKeyWIF);
var address = privateKey.toAddress();

console.log('address: ' + address);

var value = new Buffer(
  'this is a way to generate an address from a string--risky--not random--guessable!!!',
);

var hash = bitcore.crypto.Hash.sha256(value);
var bn = bitcore.crypto.BN.fromBuffer(hash);

var address2 = new bitcore.PrivateKey(bn, 'testnet').toAddress();

console.log('address2: ' + address2);
