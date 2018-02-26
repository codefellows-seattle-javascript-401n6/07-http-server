'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const parseBody = require('./lib/parse-body.js');
const PORT = process.env.PORT || 3000;

// setup the HTTP Server
const server = http.creatServer ((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);

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




});