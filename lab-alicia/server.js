'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const fs = require('fs');
const parseBody = require(`${dirname}/lib/parse-body.js`);
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('request url:', req.url);
    console.log('request query:', req.url.query);
    // console.log('request method:', req.method);
    // console.log('request headers:', req.headers);

    if (req.method === 'GET' && req.url.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404, 'Bad Request', {'Content-Type': 'text/plain'});
                res.write(cowsay.say({text: 'bad request'}))
            }
            res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
            res.write('Hello!');
            res.end();
         });
    };

    if (req.method === 'GET' && req.url.pathname === '/cowsay') {
        fs.readFile('index.html', (err, data) => {
       if (err) {
           res.writeHead(404, 'Bad Request', {'Content-Type': 'text/plain'});
           res.write(cowsay.say({text: 'bad request'}))
       }
        if (req.url.query.text) {
            let cowTalk = req.url.query['text'];
            res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        };
    });

    if (req.method === 'GET' && req.url.pathname === '/api/cowsay') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404, 'Bad Request', {'Content-Type': 'text/html'});
                res.write(cowsay.say({text: 'bad request'}));
                res.end();
            }
            if (req.url.query.text) {
                let cowTalk = req.url.query['text'];
                res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
             res.write(data);
             res.end();
         };
    });

    if (req.method === 'POST' && req.url.pathname === 'api/cowsay') {
        parseBody(req, (err) => {
            if (err) return console.error(err);
        });
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404, 'Bad Request', {'Content-Type': 'text/html'});
                res.write(cowsay.say({text: 'bad request'}));
                res.end();
            }
            if (data['text']) {
                let cowTalk = data['text'];
                console.log(cowTalk);
                res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
                res.write(cowsay.say({text: cowTalk}));
                res.end();
            }
         });
    };
    res.end();
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});