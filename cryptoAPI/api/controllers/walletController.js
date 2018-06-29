'use strict';

const Account = require('../models/Account');
const web3 = require('../../ethereum/web3');
const Mnemonic = require('bitcore-mnemonic');
const brypt = require('bcrypt');
const bip39 = require('bip39');

exports.getFullWallet = async (req, res) => {
  res.send('Not Implemented');
};

exports.generateFullWallet = async (req, res) => {
  var account = await Account.findOne({ userId: req.body.userId });
  if (account) {
    res.json({ error: 'User already registed!' });
    return;
  }

  account = new Account();
  account.userId = req.body.userId;
  account.mnemonic = req.body.mnemonic;
  account.ethDefaultAddress = req.body.ethDefaultAddress || 0;
  account.btcDefaultAddress = req.body.btcDefaultAddress || 0;
  account.save(err => {
    if (err) res.json({ error: err });
    return;
  });

  var mnemonic = new Mnemonic(account.mnemonic);
  var pKey = mnemonic.toHDPrivateKey(req.body.passphrase, 'testnet');
  var derived = pKey.derive(account.btcDefaultAddress);
  var address = derived.privateKey.toAddress();

  var web3i = web3.createInstance();
  var ethAccount = web3i.eth.accounts.create(account.mnemonic);

  res.json({
    account: {
      _id: account._id,
      userId: account.userId,
      ethDefaultAddress: account.ethDefaultAddress,
      btcDefaultAddress: account.btcDefaultAddress,
    },
    btcAddress: ethAccount.address.toString(),
    ethAddress: address.toString(),
  });
};

exports.generateMnemonic = async (req, res) => {
  res.json({ mnemonic: bip39.generateMnemonic() });
};
