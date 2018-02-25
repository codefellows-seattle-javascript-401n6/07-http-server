'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const  PORT = process.env.PORT || 3000;

function bodyParser(req, cb){
    if(req.method === 'POST'){
        let body = '';
        req.on('data', (buf) => {
            body += buf.toString();
        })
        req.on('end', () => cb(null, body));
        req.on('error', (err) => cb(err));
    } else {
        cb(null, '{}');
    }
}

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query =  querystring.parse(req.url.query);
    console.log('url', req.url);

    if(req.url.pathname === '/cowsay'){
        if(req.method === 'GET'){
            res.write('uhhh')
        }
        if(req.method === 'POST'){
            res.write('helllllp')
        }
    }
})


server.listen(PORT, () => {
    console.log('listening on port' + PORT);
});

// req.on('data', (buf) =>{
//     console.log('buffer', buf.toString());
// })