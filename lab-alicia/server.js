'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
let message = '';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('request url:', req.url);
    console.log('request query:', req.url.query);

    let home = `<!DOCTYPE html>
    <html>
        <head>
            <title> cowsay </title>  
        </head>
        <body>
            <header>
                <nav>
                    <ul> 
                        <li><a href="/cowsay">cowsay</a></li>
                    </ul>
                </nav>
            <header>
            <main>
                'I built an http server using the cowsay module.'
            </main>
        </body>
    </html>`

    let getCowsay = (message) => {
    return `<!DOCTYPE html>
        <html>
            <head>
                <title> cowsay </title>
            </head>
            <body>
                <h1> cowsay </h1>
            <pre>${message}            
            </pre>
            </body>
        </html>`
    };

    if (req.method === 'GET' && req.url.pathname === '/') {
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html'
        });
        res.write(home);
        res.end();
    };

    if (req.method === 'GET' && req.url.pathname === '/cowsay' && !req.url.query.text) {
        let say = req.url.query.text;
            res.writeHead(200, 'OK', {
                'Content-Type': 'text/html'
        });
        res.write(getCowsay('I need something good to say!'));
        res.end();
    };
    if (req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text) {
            let say = req.url.query.text;
            res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
            res.write(getCowsay(say));
            res.end();
    };

    if (req.method === 'GET' && req.url.pathname === '/api/cowsay') {
        if (!req.url.query.text) {
            res.writeHead(400, 'Error', {
                'Content-Type': 'text/json'
            });
            res.write('{"error": "invalid request: text query required"}');
            res.end();
            return;
        };
        let text = req.url.query.text;
        if (req.url.query.f) {
            let f = req.url.query.f 
            message = {
                text: text,
                f: f
            }
        } else {
                message = {
                    text: text
            }
        }
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/json'
        });
        res.write(cowsay.say(message));
        res.end();
    };

    if(req.method === 'POST' || req.method === 'PUT' && req.url.pathname === '/api/cowsay') {
        parseBody(req, (err, body) => {
        if (body.text === null) {
            res.writeHead(400, 'Error', {'Content-Type': 'text/json'});
            res.write('{"error": "invalid request: text query required"}');
            res.end();
            return;
        }
        if (body === null) {
            res.writeHead(400, 'Error', {'Content-Type': 'text/json'});
            res.write('{"error": "invalid request: body required"}');
            res.end();
            return;
        }
            let data = JSON.stringify(body);
            res.writeHead(200, 'OK', {'Content-Type': 'text/json'});
            res.write(getCowsay(data));
            res.end();
        })
    };
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});