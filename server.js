'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');



 const server = http.createServer((req, res) =>{
     req.url = url.parse(req.url);
     req.url.query = querystring.parse(req.url.query);
     console.log('METHOD:', req.method);
     console.log('url:', req.url);

if (req.method === 'GET' && req.url.pathname === '/'){
    handelGit(res, req);
    
}else{
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.writeHead('I hecka borked'+ req.url.pathname);
    res.end();
};

// if (req.method === 'GET' && req.url.pathname === '/cowsay'){
//     handelGit(req, res);
// };

// if (req.method === 'POST' && req.url.pathname === '/api/cowsay'){
//     handelGit(req, res);
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

// function handelGitCowsay(res,req){

//     res.writeHead(200,{
//         'Content-Type':'text/html; charset=utf-8'
//     });
//     res.write(html,'utf-8');
//     res.end();
// }
// function handelPostCowsay(res,req){

//     res.writeHead(200,{
//         'Content-Type':'text/html; charset=utf-8'
//     });
//     res.write(html,'utf-8');
//     res.end();
// }

 const PORT = process.ENV || 3000;
 server.listen(PORT,() =>{
     console.log('http://localhost'+PORT);
 })




 