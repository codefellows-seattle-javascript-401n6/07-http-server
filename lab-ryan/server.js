'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    req.on('data', (buffer) => {

    });
});


server.listen(PORT, () => {
    console.log('listening on PORT: ', PORT)
})