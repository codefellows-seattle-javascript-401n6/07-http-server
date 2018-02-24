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
http://localhost:3000/api/cowsay?text=<what you want your cow to say>&eyes=<how you want the cow's eyes to look>&tongue=<Your cow's eyes>
```
Proper POST requests will return the html content for your cow.

### Invalid pathnames
Will return text and 400 message from the cow.