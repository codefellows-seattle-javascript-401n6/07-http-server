'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parse.js');
const PORT = process.ENV || 3000;

const server = http.createServer(function (req, res) {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('url: ', req.url);

    if (req.method === 'GET' && req.url.pathname === '/') {
        handleGet(res);
    }
});

function handleGet(res) {
    fs.readFile('index.html', (err, data) => {
        if(err) {
            res.writeHead(404, { 'Content-Type': 'text/plain '});
            res.end();
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data.toString());
        res.end();
    });
}

server.listen(PORT, () => {
    console.log(`Your port is on http://localhost:${PORT}`);
})