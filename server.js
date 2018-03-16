'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const cowsay = require('cowsay');
const bodyParse = require('./lib/bodyparser.js');

 const server = http.createServer((req, res) =>{
     req.url = url.parse(req.url);
     req.url.query = querystring.parse(req.url.query);
     let text = req.url.query.text;
     if(!text) text = 'Existiance is pain :D';
     let cowText = cowsay.say({text});
    //  console.log('cowtext', cowText)
     console.log('METHOD:', req.method);
     console.log('url:', req.url.text);
     console.log('req.url.pathname',req.url.pathname);
if (req.method === 'GET' && req.url.pathname === '/'){
  return  handelGet(res, req, cowText);
    // && req.url.pathname === '/api/cowsay'
} else if(req.method === 'POST' && req.url.pathname === '/api/cowsay' ){
    handelPost(req, res);
    };
// else{
//     res.writeHead(404, {'Content-Type':'text/plain'});
//     res.write('I hecka borked'+ req.url.pathname);
//     res.end();
// };


});

function handelGet(res, req, cowText) {

    fs.readFile('one.html', (err, one) => {
        fs.readFile('two.html', (err, two) => {
            if (err) {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.write({ text: '401 it hecka borked' });
                res.end();
                return
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(one.toString());
                res.write(cowText);
                res.write(two.toString());
                res.end();
            }
        })
    })
}


function handelPost(req,res){
    bodyParse(req, function(err,reqBody){
       if(err){
        return console.error(err);
       }
       res.writeHead(200,{'Content-type':'application/json'});
       let json = JSON.stringify({content: req.body.text});
       console.log('post ran!');
       res.write(json);
       res.end();
    });  
}


 const PORT = process.ENV || 3000;
 server.listen(PORT,() =>{
     console.log('http://localhost'+PORT);
 })


 