# Welcome to Cowsay
### Author: Alicia Lycan

Cowsay is an application for developing skills to build an http server incorporating a restful API and the cowsay npm package.

## Installment:

  - Clone this repository
  - Create your own branch
  - Run the commands:
  -       $npm init -y
  -       $npm install cowsay

## How to Run This Server:

  - Run the server.js file
  -       $node server.js
  - Open a second terminal window to run your server with the above command in the command line

## Request/Response Routes:
  - Access the app in your browser by going to your localhost. For example:
  -        http://localhost:3000/
  - Click the 'cowsay' link to access a GET request URL.

## GET Requests:
  - Use a query string in the url to make a GET request
  -        http://localhost:3000/cowsay?text=<textgoeshere>&f=<animalgoeshere>
  - Enter the text you would like the cow to say and/or the animal you would like to display. This will return html.
  - The default GET request will retrieve text from your query and return a cow.

## POST Requests:
  - Post requests will retrieve text and return html for your cow
  -         http://localhost:3000/cowsay?text=<textgoeshere>&f=<animalgoeshere>

### Tested Queries:
  - cow (default)
  - sheep
  - dragon
  - squirrel

### Moo!
