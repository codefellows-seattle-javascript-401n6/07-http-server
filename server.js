'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
// built into node//


// const bodyParse = (res, callback) => {
//     if(req.method === 'POST' || 'PUT'){
//         let body = ''
//         req.on('data', (buf) => {
//             body += buf.toString();
//         });
//         req.on('end', () => callback(null, body));
//         req.on('error', (err) => callback(err))
//     } else{
//         callback(null, '{}')
//     }
// }
 const server = http.createServer((req, res) =>{
     req.url = url.parse(req.url);
     req.url.query = querystring.parse(req.url.query);
     console.log('METHOD:', req.method);
     console.log('url:', req.url);

if (req.method === 'GET'){
     let html = `
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
     </body>`

     res.writeHead(200,{
         'Content-Type':'text/html; charset=utf-8'
     });
     res.write(html,'utf-8');
     res.end();
    }
    });

 const PORT = process.ENV || 3000;
 server.listen(PORT,() =>{
     console.log('http://localhost'+PORT);
 })