'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PORT = process.ENV || 3000;

const server = http.createServer((request, response) => {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);
  console.log('METHOD:', request.method);
  console.log('query:', request.url.query);
  console.log('url', request.url);
  if (request.method === 'GET') {
    if (request.url.path === '/') {
      response.write(
        `<!DOCTYPE html>
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
          </html>`);
      response.end();
      return;
    };
    var text = request.url.query.text;
    if (text === undefined) {
      text = 'I need something good to say!';
    };
    console.log('TEXT:', text);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(
      `<!DOCTYPE html>
        <html>
          <head>
            <title> cowsay </title>  
          </head>
          <body>
            <h1> cowsay </h1>
            <pre>`);
    response.write('cowsay.say({text: ');
    response.write(text);
    response.write('}');
    //   <!-- cowsay.say({text: req.query.text}) -->
    response.write(`</pre>
          </body>
        </html>`);
    response.end();
  };
  if (request.method === 'POST') {
    if (request.url.path === '/api/cowsay') {
    //some POST response here
      console.log('Processing POST request');
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function() {
        if (body === '') {
          //error 400
          response.writeHead(400, {'error': 'invalid request: body required'});
        } else {
          var post = querystring.parse(body);
          if (post.text === null) {
            //error 400
            response.writeHead(400, {'error': 'invalid request: text query required'});
          } else {
            console.log('POST', post.text);
            response.writeHead(200, {'Content-Type': 'text/JSON'});
            response.write(JSON.stringify({"content": post.text }));//??
            response.end();
          };
        };
      });
    } else {
      console.log('404 error');
      response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
      response.end();
    };
  };
//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.write('testing');
//   response.end();
});

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
  console.log('http://localhost:' + PORT);
});