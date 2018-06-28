'use strict';

module.exports = function(app) {
  var ethController = require('../controllers/ethController');
  var btcController = require('../controllers/btcController');

  //Ethereum Routes
  app.route('/eth/account/create/:user_id').post(ethController.createAccount);

  app
    .route('/eth/account/:user_id')
    .get(ethController.getAccount)
    .post(ethController.createAccount);

  app.route('/eth/address/:user_id').get(ethController.getAddress);

  app.route('/eth/transaction').post(ethController.postTransaction);

  //Bitcoin Routes
  app.route('/btc/account/create/:user_id').post(btcController.createAccount);
};
