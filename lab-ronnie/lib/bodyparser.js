'use strict';

module.exports = function(req, callback) {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', function(buf) {
      body += buf.toString();
    });
    req.on('end', function() {
      callback(null, body);
    });
    req.on('error', function(error) {
      callback(error);
    });
  } else {
    callback(null, '{}');
  }

};
