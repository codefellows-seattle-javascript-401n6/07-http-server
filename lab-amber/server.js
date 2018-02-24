'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;

const bodyParse = (req, callback) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let body = ''
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err))
  } else {
    callback(null, '{}')
  }
}

const server = http.createServer((req, res) => {
  let cowText;
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.method === 'GET') {
    if (req.url.pathname === '/') {
      req.on('error', err => {
        console.error(err);
      });

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      res.write(`
    <head>
      <title>Cowsay</title>
    </head>
    <body>
      <header>
        <nav>
          <ul>
            <li><a href="/cowsay">Cowsay</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>Project Description</h1>
          <p>This project is an exercise in building a Vanilla JavaScript server and RESTful API's with the fun NPM Cowsay package.</p>
        <section>
      </mail>
    </body>
    `);
      res.end();
    } else if (req.url.pathname === '/cowsay') {
      req.on('error', err => {
        console.error(err);
      });

      let userText;
      let userCow;
      let userEyes;
      let userTongue;

      if (req.url.query.text === undefined) {
        userText = 'I need something good to say!';
        userEyes = 'oo';
        cowText = cowsay.say({
          text: userText,
          e: userEyes,
        });
      } else {
        userText = req.url.query.text;
        userCow = req.url.query.cow;
        userEyes = req.url.query.eyes;
        userTongue = req.url.query.tongue;
        cowText = cowsay.say({
          text: userText,
          f: userCow,
          e: userEyes,
          T: userTongue,
        });
      }

      res.writeHead(200, {
        'Content-Type': 'text/html'
      });

      res.write(`
    <head>
      <title>Cowsay</title>
    </head>
    <body>
      <header>
        <nav>
          <ul>
            <li><a href="/cowsay">Cowsay</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <p>Cowsay:</p>
          <pre>${cowText}</pre>
        </section>
        <section>
          <h1>Project Description</h1>
          <p>This project is an exercise in building a Vanilla JavaScript server and RESTful API's with the fun NPM Cowsay package.</p>
        <section>
      </mail>
    </body>
    `);
      res.end();
    } else {
      let message = cowsay.think({ text: 'error. invalid request\ntry localhost:3000/cowsay with a proper text query' });
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(message);
      res.end();
    }
  } else if (req.method === 'POST') {

    if (req.url.pathname === '/api/cowsay') {
      bodyParse(req, (err, body) => {
        try {
          body = JSON.parse(body);
          if (body.text !== undefined) {
            let userText = body.text;
            cowText = cowsay.say({
              text: userText,
            });
            res.writeHead(200, {
              'Content-Type': 'application/json'
            });
            res.write(JSON.stringify({
              content: cowText,
            }));
            res.end();
          } else {
            let message = JSON.stringify({
              error: 'invalid request: text query required',
            });
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(message);
            res.end();
          }
        } catch (error) {
          let message = JSON.stringify({
            error: 'invalid request: body required',
          });
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.write(message);
          res.end();
        }
      });
    } else {
      let message = JSON.stringify({
        error: 'invalid request: please use api/cowsay',
      });
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(message);
      res.end();
    }
  }

});

server.listen(PORT, () => {
  console.log(`Listening on port: `, PORT);
});