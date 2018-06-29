'use strict';

const bitcore = require('bitcore-lib');
const Account = require('../models/Account');
const { getWorkingAccount } = require('../../bitcoin/bitcoin');

exports.getAccount = async function(req, res) {
  var account = await getWorkingAccount(req.params.user_id, req.body.passphrase);
  if (!account) {
    res.send({ error: 'could not find user' });
    return;
  }

  res.json(
    Object.assign(
      {},
      {
        userId: account.userId,
        btcDefaultAddress: account.dbData.btcDefaultAddress,
        //balance: balance, TODO: research best way to do this
        addresses: account.address.toString(),
      },
    ),
  );
};

exports.getAddress = async function(req, res) {
  var account = await getWorkingAccount(req.params.user_id, req.body.passphrase);
  if (!account) {
    res.send({ error: 'could not find user' });
    return;
  }
  res.send({ address: account.address.toString() });
};

exports.postTransaction = async function(req, res) {
  var from = await getTransactionAccount(req.body.from);
  var to = await getTransactionAccount(req.body.to);

  if (!to) {
    res.json({ error: 'could not find receiver!' });
    return;
  }
  if (!from) {
    res.json({ error: 'could not find sender!' });
    return;
  }
};

exports.getWIF = async function(req, res) {
  res.send('Not Implemented');
};

var getTransactionAccount = async user_id => {};
