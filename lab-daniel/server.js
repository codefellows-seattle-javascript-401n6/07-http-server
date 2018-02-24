'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PORT = process.ENV || 3000;
const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('url: ', req.url)
})





server.listen(PORT, () => {
    console.log(`Your port is on: ${PORT}`);
})