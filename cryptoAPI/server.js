var bodyParser = require('body-parser');
var nconf = require('./nconf');
var port = nconf.get('http:port');
var express = require('express'),
  app = express();

app.use(bodyParser.json());

var routes = require('./api/routes/walletRoutes');
routes(app);

app.listen(port);
console.log('wallet REST API server started on: ' + port);
