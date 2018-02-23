'use strict';

module.exports = (req, cb) => {
    req.body = '';

    req.on('data', (data) => {
        req.body += data.toString();
    });

    req.on('end', () => {
        try {
            req.body = JSON.parse(req.body);
            cb(null, req.body);
        } catch (err) {
            cb(err);
        };
    });
};