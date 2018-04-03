const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


//TODO: get mnemonic from disk and keep on learning
const provider = new HDWalletProvider(

);


