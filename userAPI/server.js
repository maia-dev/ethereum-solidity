var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('./config.json');
var mongoose = require('mongoose');
mongoose.connect(
  'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.database,
);

var User = require('./api/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5001;

var router = express.Router();

router.get('/', (req, res) => res.json({ message: 'This is the user API' }));

router
  .route('/user')
  .post((req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.mnemonic = req.body.mnemonic;
    user.defaultAccount = req.body.defaultAccount;

    user.save(err => {
      if (err) res.send(err);

      res.json(user);
    });
  })

  .get((req, res) => {
    User.find((err, users) => {
      if (err) res.send(err);

      res.json(users);
    });
  });

router
  .route('/user/:user_id')
  .get((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      res.json(user);
    });
  })
  .put((req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);
      if (!user) res.json({ err: 'user not found' });

      user.name = req.body.name || user.name;
      user.mnemonic = req.body.mnemonic || user.mnemonic;
      user.defaultAccount = req.body.defaultAccount || user.defaultAccount;

      user.save(err => {
        if (err) res.send(err);
        res.json(user);
      });
    });
  })
  .delete((req, res) => {
    User.remove({ _id: req.params.user_id }, (err, user) => {
      if (err) res.send(err);

      res.json(user);
    });
  });

app.use('/api', router);

app.listen(port);
console.log('UserAPI started on port ' + port);
