var Account = require('../api/models/Account');
var Mnemonic = require('bitcore-mnemonic');

exports.getWorkingAccount = async (userId, passphrase) => {
  var account = await Account.findOne({ userId: userId });
  console.log('account: ' + account);

  var mnemonic = new Mnemonic(account.mnemonic);
  console.log('Mnemonic: ' + mnemonic);

  var pKey = mnemonic.toHDPrivateKey(passphrase, 'testnet');
  console.log('pKey: ' + pKey);

  var derived = pKey.derive("m/44'/1'/0'/" + account.btcDefaultAddress + '/0');
  console.log('derived: ' + derived);

  var address = derived.privateKey.toAddress();
  console.log('address: ' + address);

  return { dbData: account, mnemonic, pKey, derived, address };
};
