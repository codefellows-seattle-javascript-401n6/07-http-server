'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring'); //everything after the question mark

let cowText = 'unknown';

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  
  if (req.method === 'PUT') {
    cowText = req.url.query.name;
  } else if (req.method === 'DELETE'){
    cowText = 'unknown';
  }

  res.writeHead(200, {
    // text/plain for plain text
    'Content-Type': 'text/html'
  });

  req.on('data', buffer => {
    buffer.toString();
  });

  res.write(`
  <head>
    <title>Cowsay</title>
  </head>
  <body>
    <header>
      <nav>
        <ul>
          <li><a href="#">Cowsay Something</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <section>
        <p>Cowsay: ${cowText}</p>
      </section>
      <section>
        <h1>Project Description</h1>
        <p>This project is an exercise in building a Vanilla JavaScript server and RESTful API's with the fun NPM Cowsay package.</p>
      <section>
    </mail>
  </body>
  `);
  res.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port: `, PORT);
});