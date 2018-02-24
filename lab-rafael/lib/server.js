'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const bodyParser = require('./bodyParser.js');
const cowsay = require('cowsay');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('url', req.url);
  console.log('url query', req.url.query.text);
  let home = `
  <!DOCTYPE html>
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
        <p>This is a website that replicates a CLI program called cowsay. You can tell the cow what to say.</p><p> To use, click the "cowsay" link above and on the next page type the following at the end of the URL ?text=somthing to say.</p>
      </main>
      </body>
    </html>`;


  let cowsay = {
      top: `<!DOCTYPE html>
      <html>
        <head>
          <title> cowsay </title>
        </head>
        <body>
         <h1> cowsay </h1>
         <pre>`,
      cow: `__\n< I need something good to say! >\n  --\n         \\   ^__^ \n          \\  (oo)\\_______\n             (__)\\       )\\/\\\n                 ||----w |\n                 ||     ||\n</pre>`,
      bottom: `
         </pre>
      </body>
      </html>`
  }

  if(req.method === 'GET' && req.url.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(home);
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && !req.url.query.text) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let say = 'I need something to say';
    cowsay.cow = cowsay.cow.replace(/<(.*?)\>/, `< ${say} >`);
    res.write(cowsay.top + cowsay.cow + cowsay.bottom);
    res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/cowsay' && req.url.query.text) {
     let say = req.url.query.text;
     cowsay.cow = cowsay.cow.replace(/<(.*?)\>/, `< ${say} >`);
     res.writeHead(200, {'Content-Type': 'text/html'});
     res.write(cowsay.top + cowsay.cow + cowsay.bottom);
     res.end();
  }

  if(req.method === 'GET' && req.url.pathname === '/api/cowsay') {
    if(!req.url.query.text) {
      res.writeHead(400, {'Content-Type': 'text/json'});
      res.write('{"error": "invalid request: text query required"}');
      res.end();
      return;
    }

    let say = req.url.query.text;
    let data = JSON.stringify({content: say});
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(data);
    res.end();
  }

  if(req.method === 'POST' && req.url.pathname === '/api/cowsay') {
    bodyParser(req, (err, body) => {
      if (body.length === 0) {
        res.writeHead(400, {'Content-Type': 'text/json'});
        res.write('{"error": "invalid request: body required"}');
        res.end();
        return;
      }

      let bodyParsed = JSON.parse(body);

      if (!bodyParsed['text']) {
        res.writeHead(400, {'Content-Type': 'text/json'});
        res.write('{"error": "invalid request: text query required"}');
        res.end();
        return;
      }
      let text = bodyParsed.text;
      let data = JSON.stringify({content: text});

      res.writeHead(200, {'Content-Type': 'text/json'});
      res.write(data);
      console.log(data);
      res.end();
   });
  }
});

server.start = (PORT) => {
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

server.stop = () => {
  server.close();
}

module.exports.server = server;
