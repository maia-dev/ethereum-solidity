'use strict';

const bitcore = require('bitcore-lib');
const userClient = require('../../userAPIClient/userAPIClient');
var Networks = bitcore.Networks;
var PrivateKey = bitcore.PrivateKey;
Networks.defaultNetwork = Networks.testnet;

exports.createAccount = async function(req, res) {
  var Mnemonic = require('bitcore-mnemonic');

  var user = await userClient.getUser(req.params.user_id);
  var mnemonic = user.mnemonic ? new Mnemonic(user.mnemonic) : new Mnemonic();

  console.log('mnemonic: ' + mnemonic);

  var passphrase = req.body.passphrase;
  console.log('passphrase: ' + passphrase);
  var pKey = mnemonic.toHDPrivateKey(passphrase, 'testnet');
  console.log('pKey: ' + pKey);

  var derived = pKey.derive('m/0');
  var address = derived.privateKey.toAddress();
  console.log('address: ' + address.toString());

  await userClient
    .updateUser(req.params.user_id, { mnemonic: mnemonic.toString() })
    .then(_ => {
      console.log('** user address created');
    })
    .catch(err => {
      res.json({ error: 'Error creating bitcoin account: ' + err });
      console.log('Error creating bitcoin account: ' + err);
    });

  res.json({ mnemonic: mnemonic.toString(), address: address.toString() });
};
