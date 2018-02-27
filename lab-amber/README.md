# Amber Kim CodeFellows Lab 07 Vanilla JavaScript Http Server, Restful API & Cowsay

## Introduction
This is a simple node.js app with an Http Server that implements Restful API's. It is built using Vanilla JavaScript and plays around with the Cosway NPM package.

## To Run This Application
Run server.js. Some example tools and commands you can use:
```
node server.js
// for node

nodemon server.js
// if you have nodemon installed globally

npm run start
// the package.json in this repo is configured to run "nodemon server.js" with this command.
```

Open the app in your browser by going to your localhost. For example, with node:
```
http://localhost:3000/
```

Click on the "Cowsay" link to get a sample GET request URL you can use and play around with it.

### For Get requests in your browser use:
```
http://localhost:3000/cowsay?text=<what you want your cow to say>&eyes=<how you want the cow's eyes to look>&tongue=<Your cow's eyes>
```
Proper GET requests will return html with the cow displayed.


### For POST requests, use:
```
http://localhost:3000/api/cowsay?
```
Proper POST requests will return JSON

### Tested settings
COWS:
* sheep
* dragon
* cow (leave blank for this default)

EYES:
* Oo
* <<
* >>
* pp
* @@

TONGUE:
* U
* O
* L

### Invalid pathnames
Get requests using http queries will return error messages from the cow. Post request will return object error messages.

#### Example GET error messages:
localhost:3000/cows
```
 ____________________________________________________
( error. invalid request                             )
( try localhost:3000/cowsay with a proper text query )
 ----------------------------------------------------
        o   ^__^
         o  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

http://localhost:3000/cowsay?comment=hello
```
 _______________________________
< I need something good to say! >
 -------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

#### Example PUT error messages:
http://localhost:3000/api/cows
400 bad request
```
{
    "error": "invalid request: please use api/cowsay"
}
```

No body in the request. 400 bad request
```
{
    "error": "invalid request: body required"
}
```

Request body asks for "comment" instead of "text". 400 bad request
```
{
    "error": "invalid request: text query required"
}
```

## Collaboration
Special thanks to JB Tellez for writing the server tests using SuperAgent and Cheerio at [test/server.test.js](https://github.com/JB-Tellez). Find his original repl at [here](https://repl.it/@JonathynTellez/Vanilla-HTTP-Tests).