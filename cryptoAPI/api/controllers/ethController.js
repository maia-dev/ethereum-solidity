'use strict';

const web3 = require('../../ethereum/web3');
const mongoose = require('../../mongoose');
const Account = require('../models/Account');

exports.getAccount = async function(req, res) {
  var account = await Account.findOne({ userId: req.params.user_id });
  if (!account) {
    res.json({ error: 'could not find user!' });
    return;
  }
  var web3i = web3.createInstance(account.mnemonic);
  var addresses = await web3i.eth.getAccounts();
  var address = addresses[account.ethDefaultAddress];
  var balance = await web3i.eth.getBalance(addresses[account.ethDefaultAddress]);
  res.json(
    Object.assign(
      {},
      {
        userId: account.userId,
        ethDefaultAddress: account.ethDefaultAddress,
        balance: balance,
        address: address,
      },
    ),
  );
};

exports.getAddress = async function(req, res) {
  var account = await Account.findOne({ userId: req.params.user_id });
  if (!account) {
    res.json({ error: 'could not find user!' });
    return;
  }
  var web3i = web3.createInstance(account.mnemonic);
  var accounts = await web3i.eth.getAccounts();
  var address = accounts[account.ethDefaultAddress];
  res.json({ address });
};

exports.postTransaction = async function(req, res) {
  var from = await getTransactionAccount(req.body.from);

  var to;
  if (req.body.addressTo || req.body.addressTo !== '') {
    to = { address: req.body.addressTo };
  } else {
    to = await getTransactionAccount(req.body.to);
  }

  if (!to) {
    res.json({ error: 'could not find receiver!' });
    return;
  }
  if (!from) {
    res.json({ error: 'could not find sender!' });
    return;
  }

  from.web3i.eth
    .sendTransaction({
      from: from.address,
      to: to.address,
      value: req.body.weiAmount,
    })
    .on('receipt', receipt => {
      res.json({ receipt: receipt });
    })
    .on('error', err => {
      res.json({ error: err });
    });
};

var getTransactionAccount = async user_id => {
  var account = await Account.findOne({ userId: user_id });
  var web3i = web3.createInstance(account.mnemonic);
  var accounts = await web3i.eth.getAccounts();
  var address = accounts[account.ethDefaultAddress];
  return { account, web3i, accounts, address };
};
