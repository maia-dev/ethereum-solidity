'use strict';

module.exports = function(app) {
  var walletController = require('../controllers/walletController');

  //account routes
  app.route('/account/create/:user_id').post(walletController.createAccount);

  app
    .route('/account/:user_id')
    .get(walletController.getAccount)
    .post(walletController.createAccount);
  app.route('/address/:user_id').get(walletController.getAddress);

  //transaction routes
  app.route('/transaction').post(walletController.postTransaction);
};
