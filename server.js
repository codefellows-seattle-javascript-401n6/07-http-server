'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const cowsay = require('cowsay');


 const server = http.createServer((req, res) =>{
     req.url = url.parse(req.url);
     req.url.query = querystring.parse(req.url.query);
     var cowText = cowsay.say(req.url.query);
     console.log('cowtext', cowText)
     console.log('METHOD:', req.method);
     console.log('url:', req.url);

if (req.method === 'GET' && req.url.pathname === '/'){
    handelGit(res, req);
    
}else if(req.method === 'GET' && req.url.pathname === '/cowsay'){
   
    handelGitCowsay(res,req, cowText);

} else if (req.method === 'POST' && req.url.pathname === '/api/cowsay'){
    handelPost(res, req, cowText, (err, body));
    };
// else{
//     res.writeHead(404, {'Content-Type':'text/plain'});
//     res.write('I hecka borked'+ req.url.pathname);
//     res.end();
// };


});
function handelGit(res,req){
    fs.readFile('fileData.html',(err,data) => {
        console.log('here is file data',data.toString())
        if(err){
            res.writeHead(401,{'Content-Type':'text/plain'});
            res.write({text:'401 it hecka borked'});
            res.end();
            return
        }else
        res.writeHead(200,{'Content-Type':'text/html'});
         res.write(data.toString());
         res.end();
    });
}

function handelGitCowsay(res, req, cowText) {

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


function handelPost(res, req){
    bodyParse(req, function(err,body){
       if(err){
           console.error(err);
       }
       console.log('BODY',body);
       res.writeHead(200,{'content-type':'application/json'});
       let cowtext = cow.say({text: body});
       let json = JSON.stringify({content:cowtext});
       res.write(json);
       res.end();
    });
   
}

function bodyParse(req, callback){
    req.body = '';
    req.on('data', function(data){
        req.body += data.toString();
    });

    req.on('end', function(){
        try{
            req.body = JSON.parse(req.body);
            callback(null, req.body);
        }catch (err){
            callback(err);
        };
    });
};


 const PORT = process.ENV || 3000;
 server.listen(PORT,() =>{
     console.log('http://localhost'+PORT);
 })


 