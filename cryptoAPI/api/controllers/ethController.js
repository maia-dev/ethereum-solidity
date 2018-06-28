'use strict';

const web3 = require('../../ethereum/web3');
const userClient = require('../../userAPIClient/userAPIClient');

exports.getAccount = async function(req, res) {
  userClient
    .getUser(req.params.user_id)
    .then(async user => {
      console.log('** creating web3 instance!');
      var web3i = web3.createInstance(user.mnemonic);
      console.log(' web3 instance created');

      var accounts = await web3i.eth.getAccounts();
      console.log('account @ 0: ' + accounts[0]);
      var balance = await web3i.eth.getBalance(accounts[user.defaultAccount]);
      res.json(
        Object.assign(
          {},
          {
            name: user.name,
            weiBalance: balance,
            defaultAccount: user.defaultAccount,
            accounts: accounts,
          },
        ),
      );
    })
    .catch(err => {
      res.send('error getting user: ' + err);
    });
};

exports.getAddress = async function(req, res) {
  var user = await userClient.getUser(req.params.user_id);
  var web3i = web3.createInstance(user.mnemonic);
  var accounts = await web3i.eth.getAccounts();
  var address = accounts[user.defaultAccount];
  res.send(address);
};

exports.createAccount = async function(req, res) {
  const bip39 = require('bip39');

  var web3i = web3.createReadOnly();

  var user = await userClient.getUser(req.params.user_id);
  var mnemonic = user.mnemonic ? user.mnemonic : bip39.generateMnemonic();

  var account = web3i.eth.accounts.create(mnemonic);
  console.log('** account created with address: ' + account.address);

  console.log('** updating user mnemonic ...');
  await userClient
    .updateUser(req.params.user_id, { mnemonic })
    .then(_ => {
      console.log('** user mnemonic updated');
    })
    .catch(err => {
      res.json({ error: 'Error creating ethereum account' + err });
      console.log('Error creating ethereum account: ' + err);
    });

  res.json({ mnemonic, address: account.address });
};

exports.postTransaction = async function(req, res) {
  var from = await getTransactionActor(req.body.from);

  var to;
  //TODO: validate address of the receiver to prevent money loss
  if (req.body.addressTo || req.body.addressTo !== '') {
    to = { address: req.body.addressTo };
  } else {
    to = await getTransactionActor(req.body.to);
  }

  console.log(
    '**Executing transaction:\n' + `from: (${from.address})` + '\n' + `to: (${to.address})`,
  );

  from.web3i.eth
    .sendTransaction({
      from: from.address,
      to: to.address,
      value: req.body.weiAmount,
    })
    .on('transactionHash', hash => {
      console.log('** transaction hash: ' + hash);
    })
    .on('receipt', receipt => {
      var stringReceipt = JSON.stringify(receipt);
      var parsedReceipt = JSON.parse(stringReceipt);
      console.log('**transaction finished: ' + stringReceipt);
      res.json({
        receipt: parsedReceipt,
      });
    })
    .on('error', err => {
      res.json({ error: 'error executing transaction: ' + err });
    });
};

var getTransactionActor = async user_id => {
  var user = await userClient.getUser(user_id);
  var web3i = web3.createInstance(user.mnemonic);
  var accounts = await web3i.eth.getAccounts();
  var address = accounts[user.defaultAccount];
  return { user, web3i, accounts, address };
};
