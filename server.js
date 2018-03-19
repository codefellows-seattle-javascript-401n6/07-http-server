'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const cowsay = require('cowsay');
const bodyParse = require('./lib/bodyparser.js');

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    let text = req.url.query.text;
    if (!text) text = 'Existiance is pain :D';
    let cowText = cowsay.say({ text });

    console.log('METHOD:', req.method);
    console.log('url:', req.url.text);
    console.log('req.url.pathname', req.url.pathname);
    try {
        if (req.method === 'GET' && req.url.pathname === '/') {
            handelGet(res, req, cowText);
            // && req.url.pathname === '/api/cowsay'
        } else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
            handelPost(req, res);
        };
    } catch (err) {
        res.writeHead(404, { 'content-Type': 'text/plain' });
        res.write('I hecka borked' + req.url.pathname);
        res.end();
    }

});

function resError(res, req, msg, num){
    res.writeHead(400,{'Conten-Type':'text/plain'});
    res.write('I heck broked'+ msg);
    res.end();
}

function handelGet(res, req, cowText) {

return fs.readFile('one.html', (err, one) => {
 return fs.readFile('two.html', (err, two) => {
            if (err) {
                resError(res,req,'',401);
                return
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(one.toString());
                res.write(cowText);
                res.write(two.toString());
                res.end();
            }
        })
    })
}


function handelPost(req, res) {
    return bodyParse(req, function (err, reqBody) {
        if(err||!req.body.text) resError(res,req,'', 400);
        res.writeHead(200, { 'Content-type': 'application/json' });
        let json = JSON.stringify({ content: req.body.text });
        console.log('post ran!');
        res.write(json);
        res.end();
    });
}


const PORT = process.ENV || 3000;
server.listen(PORT, () => {
    console.log('http://localhost' + PORT);
})


