'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;

let cowText = 'I need something good to say!';

const server = http.createServer((req, res) => {
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

    let userText = req.url.query.text;
    let userEyes = req.url.query.eyes;
    let userTongue = req.url.query.tongue;
    cowText = cowsay.say({
      text: userText,
      e: userEyes,
      T: userTongue,
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
            <li><a href="/cosway">Cowsay</a></li>
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
    let message = cowsay.say({text: 'bad request\ntry localhost:3000/cowsay with a proper body'});
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(message);
    res.end();
  }
}

});

server.listen(PORT, () => {
  console.log(`Listening on port: `, PORT);
});