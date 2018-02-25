'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query =  querystring.parse(req.url.query);
    console.log('url', req.url);

    res.writeHead(200, {
        'Content-Type': 'text/plain'
        //'Content-Type': 'application/json'
        //'Content-Type': text/html; charset=utf-8
    });

    res.write("hellllo");
})

const  PORT = process.ENV || 3000;
server.listen(PORT, () => {
    console.log('listening on port' + PORT);
});

// req.on('data', (buf) =>{
//     console.log('buffer', buf.toString());
// })