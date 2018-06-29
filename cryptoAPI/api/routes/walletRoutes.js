'use strict';

const ethController = require('../controllers/ethController');
const btcController = require('../controllers/btcController');
const walletController = require('../controllers/walletController');

module.exports = function(app) {
  app.route('/').get((req, res) => res.send('Ethereum and Bitcoin Wallet API - POC.'));
  app.route('/mnemonic').get(walletController.generateMnemonic);

  //Wallet Routes
  app
    .route('/wallet/')
    .get(walletController.getFullWallet)
    .post(walletController.generateFullWallet);

  //Ethereum Routes
  app.route('/eth/account/:user_id').get(ethController.getAccount);
  app.route('/eth/address/:user_id').get(ethController.getAddress);
  app.route('/eth/transaction').post(ethController.postTransaction);

  //Bitcoin Routes
  app.route('/btc/account/:user_id').post(btcController.getAccount);
  app.route('/btc/address/:user_id').post(btcController.getAddress);
  app.route('/btc/address/:user_id/WIF').post(btcController.getWIF);
  app.route('/btc/transaction').post(btcController.postTransaction);
};
