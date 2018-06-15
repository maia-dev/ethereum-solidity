const http = require('http');
const nconf = require('../nconf');

var userClient = (function() {
  const protocol = nconf.get('userAPIClient:protocol');
  const host = nconf.get('userAPIClient:host');
  const port = nconf.get('userAPIClient:port');

  var getUser = async function(user_id) {
    return new Promise((resolve, reject) => {
      http
        .get(createUrl('user', user_id), res => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];

          let error;
          if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error(
              'Invalid content-type.\n' + `Expected application/json but received ${contentType}`,
            );
          }

          if (error) {
            console.error(error.message);
            reject(error);
            return;
          }

          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', chunk => {
            rawData += chunk;
          });

          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            } catch (e) {
              reject(e);
            }
          });
        })
        .on('error', e => {
          console.error('Error getting user from userAPI:\n' + e.message);
          reject(e);
        });
    });
  };

  var updateUser = async function(user_id, user_data) {
    const options = {
      hostname: host,
      port: port,
      path: '/api/user/' + user_id,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    new Promise((resolve, reject) => {
      var req = http
        .request(options, res => {
          res.setEncoding('utf8');

          res.on('end', () => {
            try {
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        })
        .on('error', e => {
          console.error('Error updating user from userAPI:\n' + e);
          reject(e);
        });

      req.write(JSON.stringify(user_data));
      return req.end();
    });
  };

  var createUrl = (path, params) =>
    protocol + '://' + host + ':' + port + '/api/' + path + '/' + params;

  return { getUser, updateUser };
})();

module.exports = userClient;
