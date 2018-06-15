const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const secrets = require('./secrets.json');

var web3 = (function() {
  var createInstance = mnemonic => new Web3(new HDWalletProvider(mnemonic, secrets.infura, 0, 10));

  var createReadOnly = () => new Web3(new HDWalletProvider(secrets.infura));

  return { createInstance, createReadOnly };
})();

module.exports = web3;
