'use strict';

const web3 = require('../../ethereum/web3');
const userClient = require('../../userAPIClient/userAPIClient');

exports.getAccount = async function(req, res) {
  userClient
    .getUser(req.params.user_id)
    .then(async user => {
      var web3i = web3.createInstance(user.mnemonic);

      var accounts = await web3i.eth.getAccounts();
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

  var mnemonic = bip39.generateMnemonic();
  var web3i = web3.createReadOnly();

  var user = await userClient.getUser(req.params.user_id);

  var account = web3i.eth.accounts.create(mnemonic);
  console.log('** account created with address: ' + account.address);

  console.log('** updating user mnemonic ...');
  await userClient
    .updateUser(req.params.user_id, { mnemonic })
    .then(_ => {
      console.log('** user mnemonic updated');
    })
    .catch(err => {
      res.json({ error: 'Error creating ethereum account' });
      console.log('Error creating ethereum account: ' + err);
    });

  res.json({ mnemonic, address: account.address });
};
exports.postTransaction = async function(req, res) {
  var userFrom = await userClient.getUser(req.body.from);
  var web3From = web3.createInstance(userFrom.mnemonic);
  var accountsFrom = await web3From.eth.getAccounts();
  var addressFrom = accountsFrom[userFrom.defaultAccount];

  var userTo = await userClient.getUser(req.body.to);
  var web3To = await web3.createInstance(userTo.mnemonic);
  var accountsTo = await web3To.eth.getAccounts();
  var addressTo = accountsTo[userTo.defaultAccount];

  console.log(
    '**Executing transaction:\n' +
      `    from: ${userFrom.name} (${addressFrom})` +
      '\n' +
      `    to: ${userTo.name} (${addressTo})`,
  );

  web3From.eth
    .sendTransaction({
      from: addressFrom,
      to: addressTo,
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
