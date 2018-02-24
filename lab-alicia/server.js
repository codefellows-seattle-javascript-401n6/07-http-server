'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('request url:', req.url);
    console.log('request query:', req.url.query);
    // console.log('request method:', req.method);
    // console.log('request headers:', req.headers);

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
                <!-- project description -->
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
            <pre>${cowsay.say({text: message})}            
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
        let say = req.url.query.text;
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/json'
        });
        res.write(JSON.stringify({"content": say}));
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