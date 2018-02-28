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
    response.write('cowsay.say({text:' );
    response.write(text);
    response.write('}');
    //   <!-- cowsay.say({text: req.query.text}) -->
    response.write(`</pre>
          </body>
        </html>`);
    response.end();
  };
  if (request.method === 'POST') {
      
  }

//   response.writeHead(200, {'Content-Type': 'text/html'});
//   response.write('testing');
//   response.end();
});

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
  console.log('http://localhost:' + PORT);
});