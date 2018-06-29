const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const nconf = require('nconf');
var rpcHost = nconf.get('nodeRPCHost');

var web3 = (function() {
  var createInstance = mnemonic => new Web3(new HDWalletProvider(mnemonic, rpcHost, 0, 10));

  var createReadOnly = () => new Web3(new HDWalletProvider(rpcHost));

  return { createInstance, createReadOnly };
})();

module.exports = web3;
