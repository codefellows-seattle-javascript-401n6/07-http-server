'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const cowsay = require('cowsay');
const bodyParse = require('./lib/body-parse.js');
const PORT = process.ENV || 3000;

const server = http.createServer((req, res) => {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
    console.log('url: ', req.url);

    if(req.method === 'GET' && req.url.query === '/') {
        //insert callback function (res)
    }

    if(req.method === 'GET' && req.url.query === '/cowsay/') {
        //insert callback function (res)
    }
    
    
    if(req.method === 'POST' && req.url.query === '/api/cowsay/') {
        //insert callback function (res)
    }
});

// function handleGet(res, res) {
//     if (err){
//     res.writeHead(404)
//     write(cowsay.say) -> bad file
//     res.end
//     return
// }
    //write header(200) -> It works
    //write(cowsay.say) -> good file {text: 'it works!'}
    //res.end

//function cowsayget(res){
    //write head(200 ) {content type: works}
    //res.head(cowsay.say) -> good file {yaaap: yaaap}
    //res.end
//}

//function cowpost(res)
// parseBody


server.listen(PORT, () => {
    console.log(`Your port is on http://localhost:${PORT}`);
})