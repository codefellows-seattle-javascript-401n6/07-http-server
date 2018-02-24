'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PORT = process.ENV || 3000;
const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('url: ', req.url);

    req.on('data', (buffer) => {
        console.log('Buffer: ', buffer.toString());
    })
    res.write(`
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
         <!-- project description -->
       </main>
      </body>
    </html>`);
    
    res.end();
})


server.listen(PORT, () => {
    console.log(`Your port is on: ${PORT}`);
})