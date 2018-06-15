const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { interface, bytecode } = require('./compile');

const mnemonicPath = path.resolve(__dirname,'authData','mnemonic.txt');
const mnemonic = fs.readFileSync(mnemonicPath, 'utf8').split('\n')[0];

const infuraPath = path.resolve(__dirname,'authData', 'Infura.txt');
const infuraLink = fs.readFileSync(infuraPath, 'utf8').split('\n')[0];


const provider = new HDWalletProvider(
    mnemonic,
    infuraLink
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Atempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface);
    console.log('Contract deployed to ', result.options.address);
};
deploy();
